"use client";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormatter } from '../../../../utils/currencyFormatter';

export const OrderSummary = () => {
   const [loaded, setLoaded] = useState(false);
   const { itemsInCart, subTotal, tax, totalPrice } = useCartStore((state) =>
      state.getSummaryInformation()
   );
   useEffect(() => {
      setLoaded(true);
   }, []);

   if (!loaded) return <p>Loading...</p>;
   return (
      <>
         <span>No. Productos</span>
         <span className="text-right">
            {itemsInCart === 1 ? `1 producto` : `${itemsInCart} productos`}
         </span>
         <span>Subtotal</span>
         <span className="text-right">{currencyFormatter(subTotal)}</span>

         <span>Impuestos (15%)</span>
         <span className="text-right">{currencyFormatter(tax)}</span>

         <span className="text-2xl mt-5">Total</span>
         <span className="text-2xl mt-5 text-right">{currencyFormatter(totalPrice)}</span>
      </>
   );
};
