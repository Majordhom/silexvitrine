"use client";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ArrowRight, MapPin, Home, Users, Calendar } from "lucide-react";

export default function TheoAccueil() {
    const { data: annoncesRecentes = [] } = useQuery({
        queryKey: ['annoncesRecentes'],
        queryFn: async () => {
            const response = await fetch("/api/mandats/recent");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des annonces récentes");
            }
            return response.json();
        },
        staleTime: 24 * 60 * 60 * 1000,
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded"></div>
                            <span className="text-xl font-bold text-gray-900">Nom de l'agence</span>
                        </div>
                        
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-blue-600 font-medium">accueil</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Nos biens</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Blog</a>
                        </nav>
                        
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Nous contacter
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[600px] bg-gradient-to-r from-blue-50 to-indigo-100">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="text-center w-full">
                        <h1 className="text-5xl font-bold text-white mb-8">
                            Votre futur en un clique
                        </h1>
                        
                        <div className="max-w-2xl mx-auto">
                            <div className="flex bg-white rounded-full p-2 shadow-lg">
                                <div className="flex-1 flex items-center px-4">
                                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                                    <input 
                                        type="text" 
                                        placeholder="rechercher un bien" 
                                        className="flex-1 outline-none text-gray-700"
                                    />
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                                    <Filter className="w-4 h-4" />
                                    <span>filtrer</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Carousel Indicators */}
                        <div className="flex justify-center space-x-2 mt-8">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Properties Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-blue-600 mb-12 text-center">
                        Nos derniers biens
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {annoncesRecentes.slice(0, 3).map((annonce: any, index: number) => (
                            <div key={annonce.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200">
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">jardin</span>
                                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">piscine</span>
                                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">terrasse</span>
                                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">1 étage</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="font-semibold">Maison 230m²</div>
                                        <div className="text-sm opacity-90">13008 dzdzadz</div>
                                    </div>
                                    <button className="absolute bottom-4 right-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors">
                                        En decouvrir plus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Blog Articles Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-blue-600 mb-12 text-center">
                        Nos derniers articles de blogs
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2].map((index) => (
                            <article key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Marché de l'immobilier à Cabriès: Analyse et Tendances
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Découvrez les dernières tendances du marché immobilier à Cabriès. 
                                    Notre analyse complète vous donne les clés pour comprendre l'évolution 
                                    des prix et les opportunités d'investissement.
                                </p>
                                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                                    Lire la suites de l'articles 
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Home className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Propriétés Premium</h3>
                            <p className="text-gray-600">Sélection rigoureuse de biens d'exception</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Accompagnement Personnalisé</h3>
                            <p className="text-gray-600">Expertise et conseils sur mesure</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Disponibilité 24/7</h3>
                            <p className="text-gray-600">Service client réactif et disponible</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}