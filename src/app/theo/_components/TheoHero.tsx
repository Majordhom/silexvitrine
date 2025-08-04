"use client";
import { Search, Filter } from "lucide-react";

export default function TheoHero() {
    return (
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
    );
} 