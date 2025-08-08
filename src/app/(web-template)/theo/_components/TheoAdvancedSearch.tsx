"use client";
import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { SearchCriteria, FilterOption } from '@/types/filters';
import { TheoAdvancedSearchProps } from '../../dto';
import TheoFiltersModal from './TheoFiltersModal';

export default function TheoAdvancedSearch({
  onSearch,
  initialCriteria = {},
  className = "",
  showAdvanced = false
}: TheoAdvancedSearchProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>(initialCriteria);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvanced);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter options
  const [typesBien, setTypesBien] = useState<FilterOption[]>([]);
  const [secteurs, setSecteurs] = useState<FilterOption[]>([]);

  // Load filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [typesBienResponse, secteursResponse] = await Promise.all([
          fetch('/api/filtres/type-bien'),
          fetch('/api/filtres/secteurs')
        ]);

        if (typesBienResponse.ok) {
          const typesBienData = await typesBienResponse.json();
          setTypesBien(typesBienData);
        }

        if (secteursResponse.ok) {
          const secteursData = await secteursResponse.json();
          setSecteurs(secteursData);
        }
      } catch (error) {
        console.error('Error loading filter options:', error);
      }
    };

    loadFilterOptions();
  }, []);

  const handleInputChange = (field: keyof SearchCriteria, value: any) => {
    setCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field: keyof SearchCriteria, value: string, checked: boolean) => {
    setCriteria(prev => {
      const currentArray = (prev[field] as string[]) || [];
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSearch(criteria);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setCriteria({});
  };

  const hasActiveFilters = Object.keys(criteria).some(key =>
    criteria[key as keyof SearchCriteria] !== undefined &&
    criteria[key as keyof SearchCriteria] !== "" &&
    (Array.isArray(criteria[key as keyof SearchCriteria]) ?
      (criteria[key as keyof SearchCriteria] as any[]).length > 0 : true)
  );

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search bar principale responsive */}
        <div className="bg-white rounded-2xl p-2 shadow-lg border flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <div className="flex-1 min-w-0 flex items-center px-3 sm:px-4 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
            <input
              type="search"
              placeholder="Rechercher une propriété..."
              value={criteria.query || ''}
              onChange={(e) => handleInputChange('query', e.target.value)}
              className="w-full py-2 outline-none text-gray-700 text-sm sm:text-base"
              aria-label="Rechercher une propriété"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto sm:flex-none">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className={`w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-3 rounded-xl transition-colors ${hasActiveFilters
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              aria-label="Filtrer"
            >
              <Filter className="w-4 h-4" />
              <span className="ml-2 hidden sm:inline">Filtrer</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-3 py-2 sm:px-5 sm:py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
              aria-label="Rechercher"
            >
              {loading ? (
                <span>Recherche...</span>
              ) : (
                <>
                  <Search className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Rechercher</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal 1:1 filters */}
        <TheoFiltersModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialCriteria={criteria}
          onApply={async (c) => {
            setCriteria(c);
            // trigger search immediately to mimic modal submit
            await onSearch(c);
          }}
          typesBien={typesBien}
          secteurs={secteurs}
        />
      </form>
    </div>
  );
}