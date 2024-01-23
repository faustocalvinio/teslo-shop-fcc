import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";



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

                 <ProductsInCart />
               </div>

               {/* resumen */}

               <PlaceOrder />
            </div>
         </div>
      </div>
   );
}
