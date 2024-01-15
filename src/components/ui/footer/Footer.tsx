import { titleFont } from "@/config/fonts";
import Link from "next/link";
export const Footer = () => {
   return (
      <div className="flex w-full justify-center text-xs mb-10 gap-8">
         <Link href="/">
            <span className={`${titleFont.className} antialiased font-bold`}>
               Teslo
            </span>
            <span> | shop</span>
            <span> © {new Date().getFullYear()}</span>
         </Link>
         <Link href={`/`}>Politica de privacidad</Link>
         <Link href={`/`}>Ubicaciones</Link>
      </div>
   );
};
