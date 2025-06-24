import type { Metadata } from "next";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "Page d'Accueil",
  description: "Application développée par Tremplin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="page-gradient items-center mx-auto py-8 px-8 sm:px-8 lg:px-40">
          {children}
          <div className="row-start-3">{/*emplacement Footer*/}</div>
      </div>
  );
}
