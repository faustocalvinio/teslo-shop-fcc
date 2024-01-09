import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
   params: {
      id: Category;
   };
}

export default function CategoryPage({ params }: Props) {
   const { id } = params;

   const products = seedProducts.filter((product) => product.gender === id);

   const labels: Record<Category, string> = {
      men: "para Hombres",
      women: "para Mujeres",
      kid: "para Niños",
      unisex: "para Todos",
   };

   if (id === "men" || id === "women" || id === "kid") {
      return (
         <>
            <Title title={`Articulos ${labels[id]}`} />
            <ProductGrid products={products} />
         </>
      );
   }

   notFound();
}
