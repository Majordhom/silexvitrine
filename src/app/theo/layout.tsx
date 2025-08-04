import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SilexVitrine - Thème Theo",
  description: "Application développée par Tremplin - Design moderne et épuré",
};

export default function TheoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theo-layout">
      {children}
    </div>
  );
} 