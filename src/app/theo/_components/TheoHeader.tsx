"use client";

export default function TheoHeader() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded"></div>
                        <span className="text-xl font-bold text-gray-900">Nom de l'agence</span>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8">
                        <a href="/theo" className="text-blue-600 font-medium">accueil</a>
                        <a href="/theo/annonces" className="text-gray-600 hover:text-blue-600">Nos biens</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600">Blog</a>
                    </nav>
                    
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Nous contacter
                    </button>
                </div>
            </div>
        </header>
    );
} 