"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TheoAdvancedSearch from './TheoAdvancedSearch';
import TheoPropertyCard from './TheoPropertyCard';
import { SearchCriteria, SearchResponse } from '@/types/filters';
import { Loader2 } from 'lucide-react';

interface TheoAnnoncesWithFiltersProps {
  initialMandats: any[];
  initialTotal: number;
  initialPage: number;
}

export default function TheoAnnoncesWithFilters({ 
  initialMandats, 
  initialTotal, 
  initialPage 
}: TheoAnnoncesWithFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [mandats, setMandats] = useState(initialMandats);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});

  // Parse initial search params
  useEffect(() => {
    const criteria: SearchCriteria = {};
    
    const query = searchParams.get('q');
    const prixMin = searchParams.get('prixMin');
    const prixMax = searchParams.get('prixMax');
    const ville = searchParams.get('ville');
    const typeBien = searchParams.getAll('type_bien');
    const secteurs = searchParams.getAll('secteurs');
    const nbPieces = searchParams.get('nb_pieces');
    const surfaceMin = searchParams.get('surface_min');
    const surfaceMax = searchParams.get('surface_max');

    if (query) criteria.query = query;
    if (prixMin) criteria.prixMin = parseInt(prixMin);
    if (prixMax) criteria.prixMax = parseInt(prixMax);
    if (ville) criteria.ville = ville;
    if (typeBien.length > 0) criteria.type_bien = typeBien;
    if (secteurs.length > 0) criteria.secteurs = secteurs;
    if (nbPieces) criteria.nb_pieces = parseInt(nbPieces);
    if (surfaceMin) criteria.surface_min = parseInt(surfaceMin);
    if (surfaceMax) criteria.surface_max = parseInt(surfaceMax);

    setSearchCriteria(criteria);
  }, [searchParams]);

  const updateURL = (criteria: SearchCriteria, newPage: number = 1) => {
    const params = new URLSearchParams();
    
    if (criteria.query) params.set('q', criteria.query);
    if (criteria.prixMin) params.set('prixMin', criteria.prixMin.toString());
    if (criteria.prixMax) params.set('prixMax', criteria.prixMax.toString());
    if (criteria.ville) params.set('ville', criteria.ville);
    if (criteria.type_bien?.length) {
      criteria.type_bien.forEach(type => params.append('type_bien', type));
    }
    if (criteria.secteurs?.length) {
      criteria.secteurs.forEach(secteur => params.append('secteurs', secteur));
    }
    if (criteria.nb_pieces) params.set('nb_pieces', criteria.nb_pieces.toString());
    if (criteria.surface_min) params.set('surface_min', criteria.surface_min.toString());
    if (criteria.surface_max) params.set('surface_max', criteria.surface_max.toString());
    if (newPage > 1) params.set('page', newPage.toString());

    const newUrl = params.toString() ? `?${params.toString()}` : '/theo/annonces';
    router.push(newUrl, { scroll: false });
  };

  const handleSearch = async (criteria: SearchCriteria) => {
    setLoading(true);
    setSearchCriteria(criteria);
    
    try {
      // Update URL first
      updateURL(criteria, 1);
      
      // Search via API
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criteria, page: 1, pageSize: 50 }),
      });

      if (response.ok) {
        const data: SearchResponse = await response.json();
        setMandats(data.mandats || []);
        setTotal(data.total || 0);
        setPage(1);
      } else {
        console.error('Search error:', response.statusText);
        // Fallback to initial data
        setMandats(initialMandats);
        setTotal(initialTotal);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to initial data
      setMandats(initialMandats);
      setTotal(initialTotal);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    updateURL(searchCriteria, newPage);
    
    try {
      // Search with pagination
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criteria: searchCriteria, page: newPage, pageSize: 50 }),
      });

      if (response.ok) {
        const data: SearchResponse = await response.json();
        setMandats(data.mandats || []);
        setTotal(data.total || 0);
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Pagination error:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / 50); // PAGE_SIZE = 50

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Nos biens immobiliers</h1>
          <TheoAdvancedSearch 
            onSearch={handleSearch}
            initialCriteria={searchCriteria}
            showAdvanced={Object.keys(searchCriteria).length > 0}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Recherche en cours...</span>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {total > 0 ? (
                  <>
                    <span className="font-semibold">{total}</span> bien{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
                    {Object.keys(searchCriteria).length > 0 && ' correspondant à vos critères'}
                  </>
                ) : (
                  'Aucun bien trouvé correspondant à vos critères'
                )}
              </p>
            </div>

            {/* Properties Grid */}
            {mandats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {mandats.map((mandat) => {
                  const property = {
                    id: mandat.id,
                    slug: mandat.mandat_numero,
                    titre: `${mandat.type_bien} ${mandat.nb_pieces} pièces`,
                    prix: mandat.prix,
                    surface: mandat.surface_habitable || 0,
                    nb_pieces: mandat.nb_pieces || 0,
                    ville: mandat.ville,
                    cp: mandat.cp?.toString() || '',
                    photos: (mandat.photos || []).map((photo: any) => ({
                      id: photo.id,
                      url: photo.src || '/placeholder.jpg',
                      alt: photo.filename || ''
                    })),
                    tags: [mandat.type_bien].filter(Boolean)
                  };
                  
                  return (
                    <TheoPropertyCard
                      key={mandat.id}
                      property={property}
                    />
                  );
                })}
              </div>
            ) : !loading && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun bien trouvé</h3>
                <p className="text-gray-500 mb-4">
                  Essayez de modifier vos critères de recherche pour obtenir plus de résultats.
                </p>
                <button
                  onClick={() => handleSearch({})}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Voir tous les biens
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && mandats.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1 || loading}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`px-3 py-2 rounded-lg border ${
                          page === pageNum
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-gray-500">...</span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={loading}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages || loading}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}