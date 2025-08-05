import { prisma } from "@/app/_lib/prisma";
import { MetadataRoute } from 'next';

// Mock blog data - in real app this would come from CMS or API
const blogPosts = [
    {
        slug: 'marche-immobilier-cabries-analyse-tendances',
        publishedAt: '2025-04-23'
    },
    {
        slug: 'guide-investir-immobilier-2024',
        publishedAt: '2025-04-20'
    },
    {
        slug: 'quartiers-marseille-investissement',
        publishedAt: '2025-04-18'
    },
    {
        slug: 'renovation-maison-valeur-ajoutee',
        publishedAt: '2025-04-15'
    },
    {
        slug: 'credit-immobilier-taux-2024',
        publishedAt: '2025-04-12'
    },
    {
        slug: 'achat-vente-immobilier-etapes',
        publishedAt: '2025-04-10'
    }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://silexvitrine.com';

  // Get all annonces for dynamic sitemap
  const annonces = await prisma.mandat.findMany({
    select: { 
      id: true,
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
      url: `${baseUrl}/theo/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
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
    lastModified: annonce.dateMaj || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/theo/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...annoncePages, ...blogPages];
} 