import Navbar from "@/components/layout/navbar/navbar";
import "./globals.css";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/retroui/Sonner";

const neueMachina = localFont({
  src: "../public/fonts/NeueMachina-Ultrabold.otf",
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
      <body className={`${neueMachina.variable} ${space.variable} flex flex-col min-h-screen bg-secondary/10`}>
        <Navbar />
        <div className="max-w-7xl w-full pt-20 h-screen mx-auto ">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}

