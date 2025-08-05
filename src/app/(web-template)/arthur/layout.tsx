import type { Metadata } from "next";
import Navbar from "../../_lib/ui-kit/components/navbar";

export const metadata: Metadata = {
  title: "SilexVitrine - Application Principale",
  description: "Application développée par Tremplin",
};

export default function ArthurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="arthur-layout">
      <Navbar/>
      {children}
    </div>
  );
} 