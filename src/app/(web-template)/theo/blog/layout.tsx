import type { Metadata } from "next";
import TheoHeader from "../_components/TheoHeader";

export const metadata: Metadata = {
  title: "Blog Immobilier - Conseils et Actualités | SilexVitrine",
  description: "Découvrez nos analyses, conseils et actualités du marché immobilier à Marseille et ses environs. Expertise immobilière et conseils d'experts.",
  keywords: "blog immobilier, conseils immobilier, marché immobilier marseille, actualités immobilier, expertise immobilière, investissement immobilier",
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
    canonical: '/theo/blog',
  },
  openGraph: {
    title: "Blog Immobilier - Conseils et Actualités | SilexVitrine",
    description: "Découvrez nos analyses, conseils et actualités du marché immobilier à Marseille et ses environs.",
    url: 'https://silexvitrine.com/theo/blog',
    siteName: 'SilexVitrine',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Immobilier - SilexVitrine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog Immobilier - Conseils et Actualités | SilexVitrine",
    description: "Découvrez nos analyses, conseils et actualités du marché immobilier à Marseille et ses environs.",
    images: ['/og-image-blog.jpg'],
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

export default function TheoBlogLayout({
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