"use client";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, MapPin, Home, Bed, Bath, Square, Heart } from "lucide-react";

export default function TheoAnnonces() {
    const { data: annonces = [] } = useQuery({
        queryKey: ['annonces'],
        queryFn: async () => {
            const response = await fetch("/api/mandats/recent");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des annonces");
            }
            return response.json();
        },
        staleTime: 24 * 60 * 60 * 1000,
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded"></div>
                            <span className="text-xl font-bold text-gray-900">Nom de l'agence</span>
                        </div>
                        
                        <nav className="hidden md:flex space-x-8">
                            <a href="/theo" className="text-gray-600 hover:text-blue-600">accueil</a>
                            <a href="/theo/theo-annonces" className="text-blue-600 font-medium">Nos biens</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Blog</a>
                        </nav>
                        
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Nous contacter
                        </button>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <section className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Nos Propriétés
                    </h1>
                    
                    <div className="max-w-2xl mx-auto">
                        <div className="flex bg-white rounded-full p-2 shadow-lg border">
                            <div className="flex-1 flex items-center px-4">
                                <Search className="w-5 h-5 text-gray-400 mr-3" />
                                <input 
                                    type="text" 
                                    placeholder="Rechercher une propriété..." 
                                    className="flex-1 outline-none text-gray-700"
                                />
                            </div>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                                <Filter className="w-4 h-4" />
                                <span>Filtrer</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {annonces.map((annonce: any, index: number) => (
                            <div key={annonce.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200">
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">Nouveau</span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all">
                                            <Heart className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span>13008 Marseille</span>
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        Maison moderne avec jardin
                                    </h3>
                                    
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Bed className="w-4 h-4 mr-1" />
                                                <span>4</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Bath className="w-4 h-4 mr-1" />
                                                <span>2</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Square className="w-4 h-4 mr-1" />
                                                <span>230m²</span>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            450 000 €
                                        </div>
                                    </div>
                                    
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                        Voir les détails
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}