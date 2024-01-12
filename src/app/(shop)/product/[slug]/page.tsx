import {
   ProductMobileSlideshow,
   ProductSlideshow,
   QuantitySelector,
   SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
   params: {
      slug: string;
   };
}

export default function ProductPage({ params }: Props) {
   const { slug } = params;

   const product = initialData.products.find(
      (product) => product.slug === slug
   );
   if (!product) notFound();
   return (
      <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
         {/* <h1>Hello Product slug Page</h1> */}
         <div className="col-span-1 md:col-span-2 ">
            {/* escritorio */}
            <ProductSlideshow
               images={product.images}
               title={product.title}
               className="hidden md:block"
            />

            {/* movil */}
            <ProductMobileSlideshow
               images={product.images}
               title={product.title}
               className="block md:hidden"
            />
         </div>
         <div className="col-span-1 px-5 ">
            <h1
               className={`${titleFont.className} antialiased font-bold text-xl`}
            >
               {product.title}
            </h1>
            <p className="text-lg mb-5">${product.price}</p>

            {/* TODO: SELECTOR TALLAS */}
            <SizeSelector
               selectedSize={product.sizes[0]}
               availableSizes={product.sizes}
            />
            {/* TODO: SELECTOR CANTIDAD */}
            <QuantitySelector quantity={1} />
            <button className="btn-primary my-5">Agregar al carrito</button>
            <h3 className="font-bold text-sm">Descripcion</h3>
            <p className="font-light">{product.description}</p>
         </div>
      </div>
   );
}
