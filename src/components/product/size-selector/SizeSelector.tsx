import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
   selectedSize?: Size;
   availableSizes: Size[];

   onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({
   selectedSize,
   availableSizes,
   onSizeChanged,
}: Props) => {
   return (
      <div className="my-5">
         <h3 className="font-bold mb-4">Tallas Disponibles</h3>
         <div className="flex">
            {availableSizes.map((size) => (
               <button
                  onClick={() => onSizeChanged(size)}
                  className={clsx(
                     "font-semibold mx-2 hover:underline text-lg",
                     {
                        underline: selectedSize === size,
                     }
                  )}
                  key={size}
               >
                  {size}
               </button>
            ))}
         </div>
      </div>
   );
};
