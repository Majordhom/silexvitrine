"use client";
import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { SearchCriteria, FilterOption } from '@/types/filters';


interface TheoAdvancedSearchProps {
  onSearch: (criteria: SearchCriteria) => void;
  initialCriteria?: SearchCriteria;
  className?: string;
  showAdvanced?: boolean;
}

export default function TheoAdvancedSearch({ 
  onSearch, 
  initialCriteria = {}, 
  className = "",
  showAdvanced = false 
}: TheoAdvancedSearchProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>(initialCriteria);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvanced);
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
        {/* Search bar principale */}
        <div className="flex bg-white rounded-full p-2 shadow-lg border">
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Rechercher une propriété..." 
              value={criteria.query || ''}
              onChange={(e) => handleInputChange('query', e.target.value)}
              className="flex-1 outline-none text-gray-700"
            />
          </div>
          <button 
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-colors ${
              isAdvancedOpen || hasActiveFilters 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filtrer</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-full ml-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>

        {/* Filtres avancés */}
        {isAdvancedOpen && (
          <div className="bg-white rounded-xl p-6 shadow-lg border space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Filtres avancés</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-red-600 flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Effacer les filtres</span>
                </button>
              )}
            </div>

            {/* Prix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix minimum</label>
                <input
                  type="number"
                  placeholder="Ex: 200000"
                  value={criteria.prixMin || ''}
                  onChange={(e) => handleInputChange('prixMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix maximum</label>
                <input
                  type="number"
                  placeholder="Ex: 500000"
                  value={criteria.prixMax || ''}
                  onChange={(e) => handleInputChange('prixMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Surface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surface minimum (m²)</label>
                <input
                  type="number"
                  placeholder="Ex: 50"
                  value={criteria.surface_min || ''}
                  onChange={(e) => handleInputChange('surface_min', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surface maximum (m²)</label>
                <input
                  type="number"
                  placeholder="Ex: 150"
                  value={criteria.surface_max || ''}
                  onChange={(e) => handleInputChange('surface_max', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Nombre de pièces */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de pièces minimum</label>
              <select
                value={criteria.nb_pieces || ''}
                onChange={(e) => handleInputChange('nb_pieces', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Peu importe</option>
                <option value="1">1 pièce minimum</option>
                <option value="2">2 pièces minimum</option>
                <option value="3">3 pièces minimum</option>
                <option value="4">4 pièces minimum</option>
                <option value="5">5 pièces minimum</option>
              </select>
            </div>

            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
              <input
                type="text"
                placeholder="Ex: Marseille"
                value={criteria.ville || ''}
                onChange={(e) => handleInputChange('ville', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type de bien */}
            {typesBien.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de bien</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {typesBien.map((type) => (
                    <label key={type.key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(criteria.type_bien || []).includes(type.key)}
                        onChange={(e) => handleMultiSelectChange('type_bien', type.key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Secteurs */}
            {secteurs.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secteurs</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {secteurs.slice(0, 20).map((secteur) => (
                    <label key={secteur.key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(criteria.secteurs || []).includes(secteur.key)}
                        onChange={(e) => handleMultiSelectChange('secteurs', secteur.key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{secteur.label}</span>
                    </label>
                  ))}
                  {secteurs.length > 20 && (
                    <span className="text-sm text-gray-500 col-span-full">
                      ... et {secteurs.length - 20} autres secteurs
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}