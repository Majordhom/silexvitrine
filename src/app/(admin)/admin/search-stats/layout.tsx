import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import { Titillium_Web } from "next/font/google";
import "@/app/globals.scss";
import Head from "next/head";
import Navbar from "@/app/_lib/ui-kit/components/navbar";
import Footer from "@/app/_lib/ui-kit/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "600", "700", "900"],
    display: "swap",
    variable: "--font-roboto",
});

const titillium_web = Titillium_Web({
    subsets: ["latin"],
    weight: ["400", "600", "700", "900"],
    display: "swap",
    variable: "--font-titillium-web",
});


export const metadata: Metadata = {
  title: "Statistiques de recherches",
  description: "Application développée par Tremplin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-white pt-8 grid grid-rows-[20px_1fr_20px] font-[family-name:var(--font-geist-sans)]">
          <div className="row-start-2">{children}</div>
          <div className="row-start-3">{/*emplacement Footer*/}</div>
      </div>
  );
}
