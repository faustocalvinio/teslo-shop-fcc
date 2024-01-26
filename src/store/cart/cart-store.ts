import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
   cart: CartProduct[];

   addProductToCart: (product: CartProduct) => void;
   getTotalItems: () => number;
   removeProduct: (product: CartProduct) => void;
   clearCart: () => void;
   updateProductQuantity: (product: CartProduct, quantity: number) => void;
   getSummaryInformation: () => {
      subTotal: number;
      tax: number;
      itemsInCart: number;
      totalPrice: number;
   };
}

export const useCartStore = create<State>()(
   persist(
      (set, get) => ({
         cart: [],
         addProductToCart: (product: CartProduct) => {
            const { cart } = get();

            const productInCart = cart.some(
               (item) => item.id === product.id && item.size === product.size
            );

            if (!productInCart) {
               set({ cart: [...cart, product] });
               return;
            }

            const updatedCartProducts = cart.map((item) => {
               if (item.id === product.id && item.size === product.size) {
                  return {
                     ...item,
                     quantity: item.quantity + product.quantity,
                  };
               }
               return item;
            });

            set({ cart: updatedCartProducts });
         },
         removeProduct: (product: CartProduct) => {
            const { cart } = get();
            const updatedCartProducts = cart.filter(
               (item) => item.id !== product.id || item.size !== product.size
            );
            set({ cart: updatedCartProducts });
         },
         clearCart: () => {
            set({ cart: [] });
            // TODO LOCAL STORAGE?
         },
         getTotalItems: () => {
            const { cart } = get();

            return cart.reduce((total, item) => total + item.quantity, 0);
         },
         updateProductQuantity: (product: CartProduct, quantity: number) => {
            const { cart } = get();

            const updatedCartProducts = cart.map((item) => {
               if (item.id === product.id && item.size === product.size) {
                  return {
                     ...item,
                     quantity: quantity,
                  };
               }
               return item;
            });
            set({ cart: updatedCartProducts });
         },
         getSummaryInformation: () => {
            const { cart } = get();

            const subTotal = cart.reduce(
               (subTotal, product) =>
                  product.quantity * product.price + subTotal,
               0
            );

            const tax = subTotal * 0.15;
            const totalPrice = subTotal + tax;

            const itemsInCart = cart.reduce(
               (total, item) => total + item.quantity,
               0
            );

            return { subTotal, tax, itemsInCart, totalPrice };
         },
      }),
      {
         name: "shopping-cart",
      }
   )
);
