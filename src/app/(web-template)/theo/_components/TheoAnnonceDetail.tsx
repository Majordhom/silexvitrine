"use client";
import { useState } from 'react';
import { Heart, Share2, MapPin, Home, Users, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AnnoncePhoto {
    id: number;
    url: string;
    alt?: string;
}

interface AnnonceDetailProps {
    annonce: {
        id: number;
        titre: string;
        prix: number;
        surface: number;
        nb_pieces: number;
        ville: string;
        cp: string;
        description?: string;
        photos: AnnoncePhoto[];
        caracteristiques?: {
            type: string;
            etage?: string;
            cuisine?: string;
            chauffage?: string;
            foncier?: number;
        };
    };
    similaires?: Array<{
        id: number;
        titre: string;
        prix: number;
        surface: number;
        ville: string;
        photos: AnnoncePhoto[];
    }>;
}

export default function TheoAnnonceDetail({ annonce, similaires = [] }: AnnonceDetailProps) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => 
            prev === annonce.photos.length - 1 ? 0 : prev + 1
        );
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => 
            prev === 0 ? annonce.photos.length - 1 : prev - 1
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with back button */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link 
                            href="/theo/annonces"
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                            <ArrowLeft size={20} />
                            <span>Retour aux annonces</span>
                        </Link>
                        
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`p-2 rounded-full transition-all duration-200 ${
                                    isFavorite 
                                        ? 'text-red-500 bg-red-50' 
                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                }`}
                            >
                                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Photo Gallery */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="relative aspect-[4/3] bg-gray-200">
                                {annonce.photos.length > 0 ? (
                                    <>
                                        <img
                                            src={annonce.photos[currentPhotoIndex]?.url || '/placeholder.jpg'}
                                            alt={annonce.photos[currentPhotoIndex]?.alt || annonce.titre}
                                            className="w-full h-full object-cover"
                                        />
                                        
                                        {/* Navigation arrows */}
                                        {annonce.photos.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevPhoto}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={nextPhoto}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                        
                                        {/* Photo indicators */}
                                        {annonce.photos.length > 1 && (
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                                {annonce.photos.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentPhotoIndex(index)}
                                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                                            index === currentPhotoIndex 
                                                                ? 'bg-white' 
                                                                : 'bg-white/50 hover:bg-white/75'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Home size={48} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {annonce.titre}
                                    </h1>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <MapPin size={16} />
                                        <span>{annonce.ville} {annonce.cp}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-3xl font-bold text-blue-600">
                                        {formatPrice(annonce.prix)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Référence: {annonce.id}
                                    </div>
                                </div>

                                {/* Key features */}
                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{annonce.nb_pieces}</div>
                                        <div className="text-sm text-gray-600">Pièces</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{annonce.surface}</div>
                                        <div className="text-sm text-gray-600">m²</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{annonce.caracteristiques?.type || 'N/A'}</div>
                                        <div className="text-sm text-gray-600">Type</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {annonce.description && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {annonce.description}
                                </p>
                            </div>
                        )}

                        {/* Characteristics */}
                        {annonce.caracteristiques && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Caractéristiques</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Ville</span>
                                        <span className="font-medium">{annonce.ville}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Code Postal</span>
                                        <span className="font-medium">{annonce.cp}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Type</span>
                                        <span className="font-medium">{annonce.caracteristiques.type}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Pièces</span>
                                        <span className="font-medium">{annonce.nb_pieces}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Surface</span>
                                        <span className="font-medium">{annonce.surface} m²</span>
                                    </div>
                                    {annonce.caracteristiques.etage && (
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Étage</span>
                                            <span className="font-medium">{annonce.caracteristiques.etage}</span>
                                        </div>
                                    )}
                                    {annonce.caracteristiques.cuisine && (
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Cuisine</span>
                                            <span className="font-medium">{annonce.caracteristiques.cuisine}</span>
                                        </div>
                                    )}
                                    {annonce.caracteristiques.chauffage && (
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Chauffage</span>
                                            <span className="font-medium">{annonce.caracteristiques.chauffage}</span>
                                        </div>
                                    )}
                                    {annonce.caracteristiques.foncier && (
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Foncier</span>
                                            <span className="font-medium">{formatPrice(annonce.caracteristiques.foncier)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Form Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Nous contacter</h3>
                            
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Civilité</label>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input type="radio" name="civilite" value="M" className="mr-2" />
                                            <span className="text-sm">M</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="civilite" value="Mme" className="mr-2" />
                                            <span className="text-sm">Mme</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Votre nom"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Votre prénom"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="votre@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Votre téléphone"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Votre message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 font-medium"
                                >
                                    Envoyer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Similar Properties */}
                {similaires.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Offres similaires</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {similaires.map((similaire) => (
                                <Link
                                    key={similaire.id}
                                    href={`/theo/annonces/${similaire.id}`}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="aspect-[4/3] bg-gray-200">
                                        {similaire.photos.length > 0 ? (
                                            <img
                                                src={similaire.photos[0]?.url || '/placeholder.jpg'}
                                                alt={similaire.titre}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Home size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1">{similaire.titre}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{similaire.ville}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-blue-600">
                                                {formatPrice(similaire.prix)}
                                            </span>
                                            <span className="text-sm text-gray-500">{similaire.surface} m²</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 