"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
   productId: string;
   quantity: number;
   size: Size;
}

export const placeOrder = async (
   productIds: ProductToOrder[],
   address: Address
) => {
   const session = await auth();
   const userId = session?.user.id;

   if (!userId) {
      return {
         ok: false,
         message: "No hay sesion de usuario",
      };
   }

   const products = await prisma.product.findMany({
      where: {
         id: {
            in: productIds.map((p) => p.productId),
         },
      },
   });

   const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

   const { tax, subTotal, total } = productIds.reduce(
      (totals, item) => {
         const productQuantity = item.quantity;
         const product = products.find((p) => p.id === item.productId);
         if (!product)
            throw new Error(`Product with id: ${item.productId} not found`);
         const subTotal = product.price * productQuantity;
         totals.subTotal += subTotal;
         totals.tax += subTotal * 0.15;
         totals.total += subTotal * 1.15;
         return totals;
      },
      { subTotal: 0, tax: 0, total: 0 }
   );

   try {
      const prismaTx = await prisma.$transaction(async (tx) => {
         const updatedProductsPromises = products.map(async (product) => {
            const productQuantity = productIds
               .filter((p) => p.productId === product.id)
               .reduce((acc, item) => item.quantity + acc, 0);

            if (productQuantity === 0)
               throw new Error(
                  `Producto no tiene la cantidad defininida ${product.id}`
               );
            return tx.product.update({
               where: { id: product.id },
               data: {
                  inStock: {
                     decrement: productQuantity,
                  },
               },
            });
         });

         const updatedProducts = await Promise.all(updatedProductsPromises);

         updatedProducts.forEach((product) => {
            if (product.inStock < 0)
               throw new Error(
                  `Producto con id: ${product.id} no tiene suficiente stock`
               );
         });

         const order = await tx.order.create({
            data: {
               userId,
               itemsInOrder,
               tax,
               subTotal,
               total,

               OrderItem: {
                  createMany: {
                     data: productIds.map((p) => ({
                        productId: p.productId,
                        quantity: p.quantity,
                        size: p.size,
                        price:
                           products.find(
                              (product) => product.id === p.productId
                           )?.price ?? 0,
                     })),
                  },
               },
            },
         });

         const { country, ...restAddress } = address;
         const orderAddress = await tx.orderAddress.create({
            data: {
               ...restAddress,
               countryId: country,
               orderId: order.id,
            },
         });
         return {
            order: order,
            updatedProducts: updatedProducts,
            orderAddress: orderAddress,
         };
      });

      return {
         ok: true,
         order: prismaTx.order,
         prismaTx: prismaTx,
      };
   } catch (error: any) {
      return {
         ok: false,
         message: `Error al procesar la orden ${error.message}`,
      };
   }
};
