import Navbar from "@/components/layout/navbar/navbar";
import "./globals.css";
import localFont from "next/font/local";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/retroui/Sonner";

const neueMachina = localFont({
  src: "../public/fonts/NeueMachina-Ultrabold.otf",
  variable: "--font-head",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${space.variable} flex flex-col min-h-screen bg-secondary/10`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

