"use client";


import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {}

export const ProductsInCart = () => {
   const productsInCart = useCartStore((state) => state.cart);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      setLoaded(true);
   }, []);

   if (!loaded) return <p>Loading...</p>;

   return (
      <>
         {productsInCart.map((product) => (
            <div key={`${product.slug}-${product.size}`} className="flex mb-3">
               <Image
                  src={`/products/${product.image}`}
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
                  <span className="text-lg font-semibold">
                     {product.size} - {product.title} - ({product.quantity})
                  </span>
                  <p>{currencyFormatter(product.price * product.quantity)}</p>

               </div>
            </div>
         ))}
      </>
   );
};
