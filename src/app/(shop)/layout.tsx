import { Sidebar, TopMenu } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Teslo Shop",
};

export default function ShopLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <main className="min-h-screen">
         <TopMenu />
         <Sidebar />
         <div className="px-0 sm:px-10">{children}</div>
      </main>
   );
}
