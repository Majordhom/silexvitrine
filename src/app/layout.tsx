import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import { Titillium_Web } from "next/font/google";
import "./globals.scss";
import Head from "next/head";
import Navbar from "@/app/_lib/ui-kit/components/navbar";
import Footer from "@/app/_lib/ui-kit/components/footer";
import { Toaster} from "react-hot-toast";
import ReactQueryProvider from "@/app/_lib/providers/ReactQueryProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
  title: "SilexVitrine",
  description: "Application développée par Tremplin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en" className={`${titillium_web.variable}`}>
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link
              href="https://fonts.googleapis.com/css2?family=Titillium-Web:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
          />
      </Head>

      <body className="font-titillium-web antialiased p-4 container md:mx-auto md:p-10 bg-spotify-black">
        <Navbar/>
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Footer/>
      </body>
      </html>
  );
}
