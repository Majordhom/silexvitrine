import type { Metadata } from "next";
import TheoHeader from "../_components/TheoHeader";

export const metadata: Metadata = {
  title: "Nous contacter - Immobilier de Prestige à Marseille | SilexVitrine",
  description: "Contactez notre équipe d'experts immobiliers à Marseille. Nous sommes à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet immobilier.",
  keywords: "contact immobilier marseille, agence immobilière marseille, expert immobilier marseille, conseil immobilier marseille, estimation bien marseille",
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
    canonical: '/theo/contact',
  },
  openGraph: {
    title: "Nous contacter - Immobilier de Prestige à Marseille | SilexVitrine",
    description: "Contactez notre équipe d'experts immobiliers à Marseille. Nous sommes à votre disposition pour répondre à toutes vos questions.",
    url: 'https://silexvitrine.com/theo/contact',
    siteName: 'SilexVitrine',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contactez-nous - SilexVitrine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nous contacter - Immobilier de Prestige à Marseille | SilexVitrine",
    description: "Contactez notre équipe d'experts immobiliers à Marseille.",
    images: ['/og-image-contact.jpg'],
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

export default function TheoContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TheoHeader />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
} 