import { prisma } from "@/app/_lib/prisma";
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://silexvitrine.com';

  // Get all annonces for dynamic sitemap
  const annonces = await prisma.mandat.findMany({
    select: { 
      id: true,
      updatedAt: true,
      dateMaj: true
    },
    where: {
      publishedInWebSite: true,
      isNotAvailable: false
    }
  });

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/theo`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/theo/annonces`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/theo/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/theo/apropos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic annonce pages
  const annoncePages = annonces.map((annonce) => ({
    url: `${baseUrl}/theo/annonces/${annonce.id}`,
    lastModified: annonce.dateMaj || annonce.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...annoncePages];
} 