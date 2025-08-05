import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/test-db/',
        ],
      },
    ],
    sitemap: 'https://silexvitrine.com/theo/sitemap.xml',
  };
} 