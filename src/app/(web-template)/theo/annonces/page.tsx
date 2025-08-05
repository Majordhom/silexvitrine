"use client";
import { useState } from 'react';
import { Search, Filter, MapPin, Home, Users } from 'lucide-react';
import TheoPropertyCard from '../_components/TheoPropertyCard';

interface Property {
    id: number;
    titre: string;
    prix: number;
    surface: number;
    nb_pieces: number;
    ville: string;
    cp: string;
    photos: Array<{
        id: number;
        url: string;
        alt?: string;
    }>;
    tags?: string[];
}

export default function TheoAnnoncesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [showFilters, setShowFilters] = useState(false);

    // Mock data - in real app this would come from API
    const properties: Property[] = [
        {
            id: 1,
            titre: "Maison moderne 4 pièces",
            prix: 450000,
            surface: 145,
            nb_pieces: 4,
            ville: "Marseille",
            cp: "13008",
            photos: [{ id: 1, url: "/placeholder.jpg", alt: "Maison moderne" }],
            tags: ["jardin", "piscine", "terrasse"]
        },
        {
            id: 2,
            titre: "Appartement lumineux 3 pièces",
            prix: 280000,
            surface: 85,
            nb_pieces: 3,
            ville: "Marseille",
            cp: "13006",
            photos: [{ id: 2, url: "/placeholder.jpg", alt: "Appartement lumineux" }],
            tags: ["balcon", "ascenseur", "parking"]
        },
        {
            id: 3,
            titre: "Villa avec jardin 5 pièces",
            prix: 650000,
            surface: 180,
            nb_pieces: 5,
            ville: "Marseille",
            cp: "13012",
            photos: [{ id: 3, url: "/placeholder.jpg", alt: "Villa avec jardin" }],
            tags: ["jardin", "garage", "terrasse"]
        },
        {
            id: 4,
            titre: "Studio rénové centre-ville",
            prix: 180000,
            surface: 35,
            nb_pieces: 1,
            ville: "Marseille",
            cp: "13001",
            photos: [{ id: 4, url: "/placeholder.jpg", alt: "Studio rénové" }],
            tags: ["rénové", "centre-ville", "ascenseur"]
        },
        {
            id: 5,
            titre: "Maison de ville 6 pièces",
            prix: 520000,
            surface: 160,
            nb_pieces: 6,
            ville: "Marseille",
            cp: "13005",
            photos: [{ id: 5, url: "/placeholder.jpg", alt: "Maison de ville" }],
            tags: ["jardin", "cave", "parking"]
        },
        {
            id: 6,
            titre: "Appartement vue mer 4 pièces",
            prix: 380000,
            surface: 95,
            nb_pieces: 4,
            ville: "Marseille",
            cp: "13007",
            photos: [{ id: 6, url: "/placeholder.jpg", alt: "Appartement vue mer" }],
            tags: ["vue mer", "balcon", "ascenseur"]
        }
    ];

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            property.ville.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = property.prix >= priceRange[0] && property.prix <= priceRange[1];
        const matchesType = selectedType === 'all' || 
                           (selectedType === 'maison' && property.titre.toLowerCase().includes('maison')) ||
                           (selectedType === 'appartement' && property.titre.toLowerCase().includes('appartement'));
        
        return matchesSearch && matchesPrice && matchesType;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Nos propriétés
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez notre sélection de biens immobiliers d'exception à Marseille et ses environs
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher par ville, type de bien..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <Filter size={20} />
                            <span>Filtres</span>
                        </button>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Property Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type de bien
                                    </label>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="all">Tous les types</option>
                                        <option value="maison">Maison</option>
                                        <option value="appartement">Appartement</option>
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fourchette de prix
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                        <span className="flex items-center text-gray-500">-</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000000])}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Results Count */}
                                <div className="flex items-end">
                                    <div className="text-sm text-gray-600">
                                        {filteredProperties.length} propriété{filteredProperties.length > 1 ? 's' : ''} trouvée{filteredProperties.length > 1 ? 's' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Properties Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map((property) => (
                            <TheoPropertyCard 
                                key={property.id} 
                                property={property}
                                showTags={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Home size={64} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Aucune propriété trouvée
                        </h3>
                        <p className="text-gray-600">
                            Essayez de modifier vos critères de recherche
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}