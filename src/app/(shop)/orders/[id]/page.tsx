import { getOrderById } from "@/actions";
import {
   OrderStatus,
   PayPalButton,
   QuantitySelector,
   Title,
} from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { IoCardOutline, IoCartOutline } from "react-icons/io5";
import { currencyFormatter } from "../../../../utils/currencyFormatter";
import { redirect } from "next/navigation";

const productsInCart = [
   initialData.products[0],
   initialData.products[1],
   initialData.products[2],
];

interface Props {
   params: {
      id: string;
   };
}

export default async function CartPage({ params }: Props) {
   const { id } = params;
   const { ok, order } = await getOrderById(id);
   if (!ok) return redirect("/");
   if (!order) return redirect("/");
   const address = order.OrderAddress;

   return (
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
         <div className="flex flex-col w-[1000px]">
            <Title title={`Orden #${id}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="flex flex-col mt-5">
                  <OrderStatus isPaid={order.isPaid} />
                  {order.OrderItem.map((item) => (
                     <>
                        <div key={crypto.randomUUID()} className="flex mb-3">
                           <Image
                              src={`/products/${item.product.ProductImage[0].url}`}
                              alt={item.product.title}
                              width={100}
                              height={100}
                              className="mr-5 rounded"
                              style={{
                                 width: "100px",
                                 height: "100px",
                              }}
                           />
                           <div>
                              <p>{item.product.title}</p>
                              <p>{item.price}</p>
                              <p className="font-bold">
                                 Subtotal:{" "}
                                 {currencyFormatter(item.price * item.quantity)}
                              </p>
                           </div>
                        </div>
                     </>
                  ))}
               </div>

               {/* resumen */}

               <div className="bg-white rounded-lg shadow-lg p-7">
                  <h2 className="text-2xl mb-2">Direccion de entrega</h2>
                  <div className="mb-10">
                     <p className="text-xl">
                        {address?.firstName} {address?.lastName}
                     </p>
                     <p className="font-bold">{address?.address}</p>
                     <p>
                        {address?.city} , {address?.countryId}
                     </p>
                     <p>{address?.postalCode}</p>
                  </div>

                  <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                  <h2 className="mb-2 text-2xl">Resumen de orden</h2>
                  <div className="grid grid-cols-2 mb-4">
                     <span>No. Productos</span>
                     <span className="text-right">
                        {order?.itemsInOrder} Producto(s)
                     </span>
                     <span>Subtotal</span>
                     <span className="text-right">
                        {currencyFormatter(order?.subTotal!)}
                     </span>

                     <span>Impuestos (15%)</span>
                     <span className="text-right">
                        {currencyFormatter(order?.tax!)}
                     </span>

                     <span className="text-2xl mt-5">Total</span>
                     <span className="text-2xl mt-5 text-right">
                        {currencyFormatter(order?.total!)}
                     </span>
                  </div>
                  {order.isPaid ? (
                     <OrderStatus isPaid={order.isPaid ?? false} />
                  ) : (
                     <PayPalButton amount={order.total} orderId={order.id} />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
{
   /* <div
                     className={clsx(
                        "flex items-center rounded-lg py-2 px-3.5 text-xs mt-6 font-bold text-white mb-5",
                        {
                           "bg-red-500": !order.isPaid,
                           "bg-green-700": order.isPaid,
                        }
                     )}
                  >
                     <IoCardOutline size={30} />
                     {order.isPaid ? (
                        <span className="mx-2">Orden paga</span>
                     ) : (
                        <span className="mx-2">Pendiente de pago</span>
                     )}
                  </div> */
}
