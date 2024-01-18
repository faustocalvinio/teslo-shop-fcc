import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

const productsInCart = [
   initialData.products[0],
   initialData.products[1],
   initialData.products[2],
];

export default function CartPage() {
   // if (true) redirect("/empty");

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

                  <ProductsInCart />
                  
               </div>

               {/* resumen */}

               <div className="bg-white rounded-lg shadow-lg p-7 h-fit ">
                  <h2 className="mb-2 text-2xl">Resumen de orden</h2>
                  <div className="grid grid-cols-2">
                     <OrderSummary />
                  </div>
                  <div className="mt-5 w-full">
                     <Link
                        className="flex btn-primary justify-center"
                        href={`/checkout/address`}
                     >
                        Checkout
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
