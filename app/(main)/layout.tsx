import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import "../globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning - ULACIT",
  description: "Plataforma para estudiantes y profesores LEARNING LRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-white">
          <div className="flex-col flex w-[12.5rem]">
            <div className="flex flex-col flex-1 overflow-y-auto">
              <SideNav />
            </div>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto bg-slate-100">
            <div className="flex flex-col flex-1">
            {children}
            </div>
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
