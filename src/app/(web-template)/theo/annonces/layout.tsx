import type { Metadata } from "next";
import TheoHeader from "../_components/TheoHeader";

export const metadata: Metadata = {
  title: "Nos propriétés - Immobilier de Prestige à Marseille | SilexVitrine",
  description: "Découvrez notre sélection de biens immobiliers d'exception à Marseille et ses environs. Maisons, appartements, villas de standing avec accompagnement personnalisé. Plus de 500 biens disponibles.",
  keywords: "immobilier marseille, propriétés marseille, maisons marseille, appartements marseille, villas marseille, agence immobilière marseille, biens immobiliers marseille, achat immobilier marseille, vente immobilier marseille",
  authors: [{ name: "SilexVitrine" }],
  creator: "SilexVitrine",
  publisher: "SilexVitrine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://silexvitrine.com'),
  alternates: {
    canonical: '/theo/annonces',
  },
  openGraph: {
    title: "Nos propriétés - Immobilier de Prestige à Marseille | SilexVitrine",
    description: "Découvrez notre sélection de biens immobiliers d'exception à Marseille et ses environs. Maisons, appartements, villas de standing avec accompagnement personnalisé.",
    url: 'https://silexvitrine.com/theo/annonces',
    siteName: 'SilexVitrine',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image-proprietes.jpg',
        width: 1200,
        height: 630,
        alt: 'Nos propriétés - SilexVitrine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nos propriétés - Immobilier de Prestige à Marseille | SilexVitrine",
    description: "Découvrez notre sélection de biens immobiliers d'exception à Marseille et ses environs.",
    images: ['/og-image-proprietes.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function TheoAnnoncesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TheoHeader />
      <div className="pt-4">
        {children}
      </div>
    </div>
  );
}
