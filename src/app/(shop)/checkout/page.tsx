import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
   initialData.products[0],
   initialData.products[1],
   initialData.products[2],
];

export default function CartPage() {
   return (
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
         <div className="flex flex-col w-[1000px]">
            <Title title="Verificar orden" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="flex flex-col mt-5">
                  <span className="text-xl">Ajustar elementos</span>
                  <Link href="/cart" className="text-blue-500 mb-5 underline">
                     Editar carrito
                  </Link>

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

                  <p className="mb-5">
                     {/* Disclaimer */}
                     <span className="text-xs">
                        Al hacer clic en `Colocar orden`, aceptas nuestros{" "}
                        <a href="#" className="underline">
                           términos y condiciones
                        </a>{" "}
                        y{" "}
                        <a href="#" className="underline">
                           política de privacidad
                        </a>
                     </span>
                  </p>

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
                  <div className="mt-5 w-full">
                     <Link
                        className="flex btn-primary justify-center"
                        href={`/orders/123`}
                     >
                        Colocar orden
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
