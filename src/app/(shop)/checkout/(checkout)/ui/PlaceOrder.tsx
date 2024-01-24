"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormatter, sleep } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
   const router = useRouter();
   const [loaded, setLoaded] = useState(false);
   const [isPlacingOrder, setIsPlacingOrder] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const address = useAddressStore((state) => state.address);
   const clearCart = useCartStore((state) => state.clearCart);
   const { itemsInCart, subTotal, tax, totalPrice } = useCartStore((state) =>
      state.getSummaryInformation()
   );

   const cart = useCartStore((state) => state.cart);
   useEffect(() => {
      setLoaded(true);
   }, []);

   async function onPlaceOrder() {
      setIsPlacingOrder(true);
      const productsToOrder = cart.map((product) => ({
         productId: product.id,
         size: product.size,
         quantity: product.quantity,
      }));

      const resp = await placeOrder(productsToOrder, address);
      if (!resp.ok) {
         setIsPlacingOrder(false);
         setErrorMessage(resp.message!);
         return;
      }
      clearCart();
      router.replace("/orders/" + resp.order?.id);
      setIsPlacingOrder(false);
   }

   if (!loaded) return <p>Cargando...</p>;

   return (
      <div className="bg-white rounded-lg shadow-lg p-7">
         <h2 className="text-2xl mb-2">Direccion de entrega</h2>
         <div className="mb-10">
            <p className="text-xl">
               {address.firstName} {address.lastName}
            </p>
            {/* <p className="text-xl"></p> */}
            <p className="font-bold">{address.address}</p>
            <p>{address.city}</p>
            <p>{address.country}</p>
            <p>{address.postalCode}</p>
         </div>

         <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

         <p className="mb-5">
            {/* Disclaimer */}
            <span className="text-xs">
               Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
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
            <span className="text-right">
               {itemsInCart === 1 ? `1 producto` : `${itemsInCart} productos`}
            </span>
            <span>Subtotal</span>
            <span className="text-right">{currencyFormatter(subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormatter(tax)}</span>

            <span className="text-2xl mt-5">Total</span>
            <span className="text-2xl mt-5 text-right">
               {currencyFormatter(totalPrice)}
            </span>
         </div>
         <p className="text-red-500 mb-4">{errorMessage}</p>
         <div className="mt-5 w-full">
            <button
               className={clsx({
                  "btn-primary": !isPlacingOrder,
                  "btn-disabled": isPlacingOrder,
               })}
               onClick={() => onPlaceOrder()}
               disabled={isPlacingOrder}
               //    href={`/orders/123`}
            >
               Colocar orden
            </button>
         </div>
      </div>
   );
};
