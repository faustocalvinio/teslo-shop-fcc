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
            <Title title="Carrito" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="flex flex-col mt-5">
                  <span className="text-xl">Agregar mas items</span>
                  <Link href="/" className="text-blue-500 mb-5 underline">
                     Continua comprando
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
                            width:'100px',
                            height:'100px',
                           }}
                        />
                        <div>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                        <QuantitySelector quantity={3}/>
                     <button className="underline mt-3">Remover</button>
                     </div>
                     </div>
                     
                  </>
               ))}
               </div>

                {/* resumen */}

                <div className="bg-white rounded-lg shadow-lg p-7">
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
                    <Link className="flex btn-primary justify-center" href={`/checkout/address`}>
                      Checkout
                    </Link>
                  </div> 
                </div>

            </div>
         </div>
      </div>
   );
}
