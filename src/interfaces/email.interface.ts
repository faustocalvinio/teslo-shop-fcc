import { Product } from "./product.interface";

interface finalProductsOrder {
   quantity: number;
   title: string;
}

export interface EmailConfirmationProps {
   id: string;
   clientName: string;
   emailDestination: string;
   finalProductsOrder?: finalProductsOrder[];
}
