"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function LayoutHelper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOn = ["/login", "/register"];
  const isHidden = hideOn.includes(pathname);

  return (
    <>
      {!isHidden && <Navbar />}
      <main className={!isHidden ? "pt-16 min-h-screen" : "min-h-screen"}>{children}</main>
      {!isHidden && <Footer />}
    </>
  );
}