import type { Metadata } from "next";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "À propos",
  description: "Application développée par Tremplin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-gradient-to-tr from-fuchsia-100 from-5% via-white via-50% to-fuchsia-100 to-95% min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="row-start-2">{children}</div>
          <div className="row-start-3">{/*emplacement Footer*/}</div>
      </div>
  );
}
