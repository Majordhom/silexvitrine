"use client";
import { useNavigation } from './TheoNavigationContext';
import TheoBurgerMenu from './TheoBurgerMenu';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function TheoHeader() {
    const { activeSection, isScrolled, burgerMenuOpen, setBurgerMenuOpen } = useNavigation();

    const getNavLinkClass = (section: string) => {
        const baseClass = "font-medium transition-all duration-300 hover:text-blue-600";    
        const activeClass = "text-blue-600";
        const inactiveClass = "text-gray-600";
        return `${baseClass} ${activeSection === section ? activeClass : inactiveClass}`;
    };

    const isLikedActive = activeSection === 'liked';

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
                    : 'bg-white shadow-sm border-b'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <Image height={90} width={90} src={process.env.NEXT_PUBLIC_CONFIG_IMAGE_URL} alt="Logo"/>
                        <Link href={'/theo'}>
                            <span className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                {process.env.NEXT_PUBLIC_CONFIG_NAME}
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link 
                            href="/theo" 
                            className={getNavLinkClass('accueil')}
                            onClick={() => setBurgerMenuOpen(false)}
                        >
                            Accueil
                        </Link>
                        <Link 
                            href="/theo/annonces" 
                            className={getNavLinkClass('annonces')}
                            onClick={() => setBurgerMenuOpen(false)}
                        >
                            Nos biens
                        </Link>
                        {/* <Link 
                            href="/theo/blog" 
                            className={getNavLinkClass('blog')}
                            onClick={() => setBurgerMenuOpen(false)}
                        >
                            Blog
                        </Link> */}
                    </nav>
                    
                    {/* Contact Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/theo/contact">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                Nous contacter
                            </button>
                        </Link>
                        <Link href="/theo/liked" className="relative flex items-center justify-center group">
                            {/* Outline heart */}
                            <Heart
                                className={`w-6 h-6 transition-colors ${isLikedActive ? 'text-red-600' : 'text-gray-600 group-hover:text-red-600'}`}
                                fill="none"
                            />
                            {/* Filled heart for active/hover */}
                            <Heart
                                className={`w-6 h-6 absolute transition-opacity ${isLikedActive ? 'opacity-100 text-red-600' : 'opacity-0 group-hover:opacity-100 text-red-600'}`}
                                fill="currentColor"
                                strokeWidth={0}
                            />
                        </Link>
                    </div>
                    

                    {/* Burger Menu */}
                    <TheoBurgerMenu 
                        isOpen={burgerMenuOpen} 
                        onToggle={() => setBurgerMenuOpen(!burgerMenuOpen)} 
                    />
                </div>
            </div>
        </header>
    );
} 