"use client";
import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

interface TheoBurgerMenuProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function TheoBurgerMenu({ isOpen, onToggle }: TheoBurgerMenuProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="md:hidden">
            {/* Burger Button */}
            <button
                onClick={onToggle}
                className="relative z-50 p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                aria-label="Toggle menu"
            >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span 
                        className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                        }`}
                    />
                    <span 
                        className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                            isOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <span 
                        className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                        }`}
                    />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onToggle}
            />

            {/* Mobile Menu */}
            <div 
                className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded"></div>
                            <span className="text-xl font-bold text-gray-900">Nom de l'agence</span>
                        </div>
                        <button
                            onClick={onToggle}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-6 py-8">
                        <div className="space-y-6">
                            <a 
                                href="/theo" 
                                className="block text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                onClick={onToggle}
                            >
                                Accueil
                            </a>
                            <a 
                                href="/theo/annonces" 
                                className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                onClick={onToggle}
                            >
                                Nos biens
                            </a>
                            <a 
                                href="#" 
                                className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                onClick={onToggle}
                            >
                                Blog
                            </a>
                        </div>
                    </nav>

                    {/* Contact Button */}
                    <div className="p-6 border-t">
                        <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                            Nous contacter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 