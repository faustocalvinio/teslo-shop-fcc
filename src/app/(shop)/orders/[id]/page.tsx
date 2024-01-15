import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline, IoCartOutline } from "react-icons/io5";

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

export default function CartPage({ params }: Props) {
   const { id } = params;
   return (
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
         <div className="flex flex-col w-[1000px]">
            <Title title={`Orden ${id}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="flex flex-col mt-5">
                  <div
                     className={clsx(
                        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                        {
                           "bg-red-500": false,
                           "bg-green-700":true
                        }
                     )}
                  >
                     <IoCardOutline size={30} />
                     <span className="mx-2">Pendiente de pago</span>
                     <span className="mx-2">Orden paga</span>
                  </div>

                  {productsInCart.map((product) => (
                     <>
                        <div key={product.slug} className="flex mb-3">
                           <Image
                              src={`/products/${product.images[0]}`}
                              alt={product.title}
                              width={100}
                              height={100}
                              className="mr-5 rounded"
                              style={{
                                 width: "100px",
                                 height: "100px",
                              }}
                           />
                           <div>
                              <p>{product.title}</p>
                              <p>{product.price}</p>
                              <p className="font-bold">
                                 Subtotal: ${product.price * 3}
                              </p>
                              <button className="underline mt-3">
                                 Remover
                              </button>
                           </div>
                        </div>
                     </>
                  ))}
               </div>

               {/* resumen */}

               <div className="bg-white rounded-lg shadow-lg p-7">
                  <h2 className="text-2xl mb-2">Direccion de entrega</h2>
                  <div className="mb-10">
                     <p className="text-xl">Fausto Calvinio</p>
                     <p className="font-bold">Pueyrredon 141 Bis</p>
                     <p>Rosario</p>
                     <p>Argentina</p>
                     <p>C.P. 2000</p>
                  </div>

                  <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                  

                  <h2 className="mb-2 text-2xl">Resumen de orden</h2>
                  <div className="grid grid-cols-2">
                     <span>No. Productos</span>
                     <span className="text-right">3 Productos</span>
                     <span>Subtotal</span>
                     <span className="text-right">$ 139</span>

                     <span>Impuestos (15%)</span>
                     <span className="text-right">$ 15</span>

                     <span className="text-2xl mt-5">Total</span>
                     <span className="text-2xl mt-5 text-right">$ 155</span>
                  </div>
                  <div
                     className={clsx(
                        "flex items-center rounded-lg py-2 px-3.5 text-xs mt-6 font-bold text-white mb-5",
                        {
                           "bg-red-500": false,
                           "bg-green-700":true
                        }
                     )}
                  >
                     <IoCardOutline size={30} />
                     <span className="mx-2">Pendiente de pago</span>
                     <span className="mx-2">Orden paga</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
