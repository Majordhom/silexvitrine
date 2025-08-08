"use client";
import { useEffect, useState } from 'react';
import { Heart, MapPin, Home, Eye } from 'lucide-react';
import Link from 'next/link';
import { PropertyCardProps } from '../../dto';

export default function TheoPropertyCard({ property, showTags = true }: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const FAVORITES_STORAGE_KEY = 'theo:favorites:v1';

    const readFavorites = (): number[] => {
        if (typeof window === 'undefined') return [];
        try {
            const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw) as unknown;
            if (Array.isArray(parsed)) {
                return parsed
                    .map((value) => (typeof value === 'number' ? value : Number(value)))
                    .filter((value) => Number.isFinite(value));
            }
            return [];
        } catch {
            return [];
        }
    };

    const writeFavorites = (ids: number[]) => {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
        } catch {
            // ignore quota or serialization errors
        }
    };

    const toggleFavorite = () => {
        const current = readFavorites();
        const exists = current.includes(property.id);
        const next = exists ? current.filter((id) => id !== property.id) : [...current, property.id];
        writeFavorites(next);
        setIsFavorite(!exists);
    };

    // Initialize favorite state from localStorage
    useEffect(() => {
        const favorites = readFavorites();
        setIsFavorite(favorites.includes(property.id));
        // Sync when favorites change in other tabs
        const handleStorage = (e: StorageEvent) => {
            if (e.key === FAVORITES_STORAGE_KEY) {
                const updated = readFavorites();
                setIsFavorite(updated.includes(property.id));
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [property.id]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const detailUrl = property.slug ? `/theo/annonces/${property.slug}` : `/theo/annonces/${property.id}`;
    return (
        <div
            className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                {property.photos.length > 0 ? (
                    <img
                        src={property.photos[0]?.url || '/placeholder.jpg'}
                        alt={property.photos[0]?.alt || property.titre}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                            isHovered ? 'scale-110' : 'scale-100'
                        }`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Home size={48} />
                    </div>
                )}

                {/* Overlay with actions */}
                <div className={`absolute inset-0 bg-black/0 transition-all duration-300 ${
                    isHovered ? 'bg-black/20' : ''
                }`}>
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite();
                            }}
                            className={`p-2 rounded-full transition-all duration-200 ${
                                isFavorite 
                                    ? 'text-red-500 bg-white/90' 
                                    : 'text-white bg-black/50 hover:bg-white/90 hover:text-red-500'
                            }`}
                        >
                            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                        </button>
                    </div>

                    {/* View details button */}
                    <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                        isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}>
                        <Link
                            href={detailUrl}
                            className="block w-full bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-lg text-center font-medium hover:bg-white transition-colors duration-200"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Eye size={16} />
                                <span>Voir les détails</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Price badge */}
                <div className="absolute top-4 left-4">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        {formatPrice(property.prix)}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="space-y-3">
                    {/* Title and location */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                            {property.titre}
                        </h3>
                        <div className="flex items-center space-x-1 text-gray-600 text-sm">
                            <MapPin size={14} />
                            <span>{property.ville} {property.cp}</span>
                        </div>
                    </div>

                    {/* Key features */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                            <span>{property.nb_pieces} pièces</span>
                            <span>{property.surface} m²</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {showTags && property.tags && property.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {property.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Action button */}
                    <Link
                        href={detailUrl}
                        className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                    >
                        En savoir plus
                    </Link>
                </div>
            </div>
        </div>
    );
} 