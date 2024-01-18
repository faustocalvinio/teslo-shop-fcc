"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {}

export const ProductsInCart = () => {
   const updateProductQuantity = useCartStore(
      (state) => state.updateProductQuantity
   );
   const removeProduct = useCartStore((state) => state.removeProduct);
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
                  <Link
                     className="hover:underline cursor-pointer"
                     href={`/product/${product.slug}`}
                  >
                     <p>{product.size} - {product.title}</p>
                  </Link>

                  <QuantitySelector
                     quantity={product.quantity}
                     onQuantityChanged={(qty) =>
                        updateProductQuantity(product, qty)
                     }
                  />
                  <button onClick={()=>removeProduct(product)} className="underline mt-3">
                     Remover
                  </button>
               </div>
            </div>
         ))}
      </>
   );
};
