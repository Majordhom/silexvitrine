import { prisma } from '@/app/_lib/prisma';
import TheoAnnoncesWithFilters from '../_components/TheoAnnoncesWithFilters';
import { redirect } from 'next/navigation';

const PAGE_SIZE = 50;

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TheoAnnoncesPage({ searchParams }: Props) {
  try {
    // First, let's check what's in the database
    const dbStats = await Promise.all([
      prisma.mandat.count(),
      prisma.mandat.count({ where: { publishedInWebSite: true } }),
      prisma.mandat.count({ where: { isNotAvailable: false } }),
      prisma.mandat.count({ where: { publishedInWebSite: true, isNotAvailable: false } }),
      prisma.mandat.findMany({
        take: 1,
        select: {
          id: true,
          mandat_numero: true,
          publishedInWebSite: true,
          isNotAvailable: true,
          type_bien: true,
          prix: true
        }
      })
    ]);

    console.log('Database statistics:', {
      totalMandats: dbStats[0],
      publishedCount: dbStats[1],
      availableCount: dbStats[2],
      publishedAndAvailable: dbStats[3],
      sampleRecord: dbStats[4][0]
    });

    const resolvedSearchParams = await searchParams;
    const { page: pageQueryParam } = resolvedSearchParams;
    const page = Math.max(1, parseInt(typeof pageQueryParam === 'string' ? pageQueryParam : '1', 10));
    const skip = (page - 1) * PAGE_SIZE; console.log('Starting query with params:', { page, skip, PAGE_SIZE });

    // Récupération des mandats paginés
    const [mandats, total] = await Promise.all([
      prisma.mandat.findMany({
        where: {
          OR: [
            // Case 1: Explicitly published and available
            {
              publishedInWebSite: true,
              isNotAvailable: false,
            },
            // Case 2: Published and availability not set (null)
            {
              publishedInWebSite: true,
              isNotAvailable: null,
            }
          ]
        },
        include: { photos: true },
        orderBy: { dateMaj: 'desc' },
        skip,
        take: PAGE_SIZE,
      }).then(results => {
        console.log('Unfiltered mandats:', {
          count: results.length,
          sampleData: results.slice(0, 2).map(m => ({
            id: m.id,
            numero: m.mandat_numero,
            published: m.publishedInWebSite,
            available: !m.isNotAvailable
          }))
        });
        console.log('Found mandats:', {
          count: results.length,
          sampleData: results.slice(0, 2).map(m => ({
            id: m.id,
            numero: m.mandat_numero,
            published: m.publishedInWebSite,
            available: !m.isNotAvailable
          }))
        });
        return results;
      }),
      prisma.mandat.count({
        where: {
          OR: [
            // Case 1: Explicitly published and available
            {
              publishedInWebSite: true,
              isNotAvailable: false,
            },
            // Case 2: Published and availability not set (null)
            {
              publishedInWebSite: true,
              isNotAvailable: null,
            }
          ]
        }
      }).then((total) => {
        console.log('Database counts:', {
          total,
          PAGE_SIZE,
          expectedPages: Math.ceil(total / PAGE_SIZE)
        });
        return total;
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (page > totalPages && totalPages > 0) redirect(`?page=${totalPages}`);

    console.log('Raw mandats data:', {
      count: mandats.length,
      first2: mandats.slice(0, 2),
      hasData: mandats.length > 0,
      firstItemSample: mandats[0] ? {
        id: mandats[0].id,
        mandat_numero: mandats[0].mandat_numero,
        publishedInWebSite: mandats[0].publishedInWebSite,
        isNotAvailable: mandats[0].isNotAvailable
      } : null
    });

    return (
      <TheoAnnoncesWithFilters
        initialMandats={mandats}
        initialTotal={total}
        initialPage={page}
      />
    );
  } catch (error) {
    console.error('Error in TheoAnnoncesPage:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Une erreur est survenue
          </h3>
          <p className="text-gray-600">
            Veuillez réessayer plus tard
          </p>
        </div>
      </div>
    );
  }
}