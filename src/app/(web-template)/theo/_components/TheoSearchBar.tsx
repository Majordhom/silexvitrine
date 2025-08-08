"use client";
import { Search, Filter } from "lucide-react";

export default function TheoSearchBar() {
    return (
        <div className="max-w-2xl mx-auto w-full">
            <form 
                role="search"
                className="bg-white rounded-2xl p-2 shadow-lg border flex flex-col gap-2 sm:flex-row sm:items-stretch"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="flex-1 min-w-0 flex items-center px-3 sm:px-4 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                    <input 
                        type="search" 
                        placeholder="Rechercher une propriété..." 
                        className="w-full py-2 outline-none text-gray-700 text-sm sm:text-base"
                        aria-label="Rechercher une propriété"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto sm:flex-none">
                    <button 
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-3 py-2 sm:px-5 sm:py-3 rounded-xl hover:bg-blue-700 transition-colors"
                        aria-label="Rechercher"
                    >
                        <Search className="w-4 h-4" />
                        <span className="ml-2 hidden sm:inline">Rechercher</span>
                    </button>
                    <button 
                        type="button"
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-100 text-gray-800 px-3 py-2 sm:px-5 sm:py-3 rounded-xl hover:bg-gray-200 transition-colors"
                        aria-label="Filtrer"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="ml-2 hidden sm:inline">Filtrer</span>
                    </button>
                </div>
            </form>
        </div>
    );
} 