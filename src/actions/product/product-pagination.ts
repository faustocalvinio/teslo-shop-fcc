"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
   page?: number;
   take?: number;
}

export const getPaginatedProductWithImages = async ({
   page = 1,
   take = 12,
}: PaginationOptions) => {
   if (isNaN(Number(page))) page = 1;
   if (page < 1) page = 1;
   try {
      const products = await prisma.product.findMany({
         include: {
            ProductImage: {
               take: take,
               skip: (page - 1) * take,
               select: {
                  url: true,
               },
            },
         },
      });
      return await {
         products: products.map((product) => ({
            ...product,
            images: product.ProductImage.map((image) => image.url),
         })),
      };
   } catch (error) {
      throw new Error("Error al obtener los productos");
   }
};
