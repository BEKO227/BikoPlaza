import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Navbar } from './_components/Navbar/Navbar';
import Footer from "./_components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from './UserProvider';
import CountProvider from "./CountProvider";

const Encode_Sans_Font = Encode_Sans({
  subsets: ["latin"],
  variable: "--font-encode-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biko Plaza",
  description: "Created by Biko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Encode_Sans_Font.className}`}
      >
        <UserProvider>
          <CountProvider>
          <Navbar />
          <main className="p-5">
          {children}
          </main>
          <Toaster/>
          <Footer/>
          </CountProvider>
        </UserProvider>
      </body>
    </html>
  );
}
