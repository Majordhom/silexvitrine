import type { Metadata } from "next";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "Propriétés",
  description: "Application développée par Tremplin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-white pt-8 pb-8 font-[family-name:var(--font-geist-sans)]">
          <div className="row-start-2">{children}</div>
          <div className="row-start-3">{/*emplacement Footer*/}</div>
      </div>
  );
}
