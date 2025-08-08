"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { NavigationContextType } from '../../dto';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}

interface NavigationProviderProps {
    children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
    const [activeSection, setActiveSection] = useState('accueil');
    const [isScrolled, setIsScrolled] = useState(false);
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update active section based on pathname
    useEffect(() => {
        if (pathname === '/theo') {
            setActiveSection('accueil');
        } else if (pathname.startsWith('/theo/annonces')) {
            setActiveSection('annonces');
        } else if (pathname === '/theo/blog') {
            setActiveSection('blog');
        } else if (pathname === '/theo/contact') {
            setActiveSection('contact');
        } else if (pathname === '/theo/liked') {
            setActiveSection('liked');
        }
    }, [pathname]);

    // Close burger menu when route changes
    useEffect(() => {
        setBurgerMenuOpen(false);
    }, [pathname]);

    const value = {
        activeSection,
        setActiveSection,
        isScrolled,
        burgerMenuOpen,
        setBurgerMenuOpen,
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
} 