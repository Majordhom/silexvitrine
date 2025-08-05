import type { Metadata } from "next";
import TheoHeader from "../_components/TheoHeader";

export const metadata: Metadata = {
  title: "Nos propriétés - SilexVitrine",
  description: "Découvrez notre sélection de biens immobiliers d'exception à Marseille et ses environs",
};

export default function TheoAnnoncesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TheoHeader />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
}
