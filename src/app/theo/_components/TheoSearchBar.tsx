"use client";
import { Search, Filter } from "lucide-react";

export default function TheoSearchBar() {
    return (
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
    );
} 