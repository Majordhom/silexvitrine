import type { Metadata } from "next";
import { NavigationProvider } from "./_components/TheoNavigationContext";

export const metadata: Metadata = {
  title: "SilexVitrine - Thème Theo | Immobilier de Prestige à Marseille",
  description: "Découvrez notre sélection de biens immobiliers d'exception à Marseille. Maisons, appartements et villas de standing avec accompagnement personnalisé. Expertise immobilière depuis plus de 20 ans.",
  keywords: "immobilier marseille, maison marseille, appartement marseille, villa marseille, agence immobilière marseille, bien immobilier marseille",
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
    canonical: '/theo',
  },
  openGraph: {
    title: "SilexVitrine - Thème Theo | Immobilier de Prestige à Marseille",
    description: "Découvrez notre sélection de biens immobiliers d'exception à Marseille. Maisons, appartements et villas de standing avec accompagnement personnalisé.",
    url: 'https://silexvitrine.com/theo',
    siteName: 'SilexVitrine',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image-theo.jpg',
        width: 1200,
        height: 630,
        alt: 'SilexVitrine - Immobilier de Prestige à Marseille',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SilexVitrine - Thème Theo | Immobilier de Prestige à Marseille",
    description: "Découvrez notre sélection de biens immobiliers d'exception à Marseille.",
    images: ['/og-image-theo.jpg'],
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

export default function TheoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="theo-layout pt-16">
        {children}
      </div>
    </NavigationProvider>
  );
} 