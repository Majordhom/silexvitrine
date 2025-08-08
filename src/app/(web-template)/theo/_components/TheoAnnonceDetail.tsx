"use client";
import { useState } from 'react';
import { Heart, Share2, MapPin, Home, Users, Calendar, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

import { AnnonceDetailProps } from '../../dto';

// Contact Form Widget Component
function ContactFormWidget({ propertyId, propertyTitle }: { propertyId: number; propertyTitle: string }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: `Demande d'information pour: ${propertyTitle}`,
        message: `Bonjour,\n\nJe souhaite obtenir plus d'informations concernant cette propriété (Réf: ${propertyId}).\n\nMerci de me recontacter.`
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) {
            alert("L'email est obligatoire.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erreur inconnue");
            }

            setIsSubmitted(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: `Demande d'information pour: ${propertyTitle}`,
                message: `Bonjour,\n\nJe souhaite obtenir plus d'informations concernant cette propriété (Réf: ${propertyId}).\n\nMerci de me recontacter.`
            });
        } catch (error: any) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Erreur : " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Message envoyé !</h4>
                <p className="text-gray-600 text-sm mb-4">Nous vous répondrons dans les plus brefs délais.</p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    Envoyer un autre message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre nom"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre prénom"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="votre@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre téléphone"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Votre message..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center space-x-2"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Envoi...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer</span>
                    </>
                )}
            </button>
        </form>
    );
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
                                className={`p-2 rounded-full transition-all duration-200 ${isFavorite
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
                                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentPhotoIndex
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
                                <div className="text-gray-700 leading-relaxed space-y-3">
                                    {annonce.description.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                            <p key={index} className="text-gray-700">
                                                {paragraph.trim()}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Characteristics */}
                        {annonce.caracteristiques && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Caractéristiques</h2>

                                {/* Informations générales */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Informations générales</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-600">Ville</span>
                                            <span className="font-medium">{annonce.ville}</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-600">Code Postal</span>
                                            <span className="font-medium">{annonce.cp}</span>
                                        </div>
                                        {annonce.caracteristiques.type && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Type de bien</span>
                                                <span className="font-medium">{annonce.caracteristiques.type}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.type_offre && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Type d'offre</span>
                                                <span className="font-medium">{annonce.caracteristiques.type_offre}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.statut && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Statut</span>
                                                <span className="font-medium">{annonce.caracteristiques.statut}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.annee_construction && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Année de construction</span>
                                                <span className="font-medium">{annonce.caracteristiques.annee_construction}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.meuble !== undefined && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Meublé</span>
                                                <span className="font-medium">{annonce.caracteristiques.meuble ? 'Oui' : 'Non'}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.visite_immediat !== undefined && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Visite immédiate</span>
                                                <span className="font-medium">{annonce.caracteristiques.visite_immediat ? 'Possible' : 'Sur rendez-vous'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Surfaces et pièces */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Surfaces et pièces</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-600">Surface habitable</span>
                                            <span className="font-medium">{annonce.surface} m²</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-600">Nombre de pièces</span>
                                            <span className="font-medium">{annonce.nb_pieces}</span>
                                        </div>
                                        {annonce.caracteristiques.chambres && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Chambres</span>
                                                <span className="font-medium">{annonce.caracteristiques.chambres}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.sdb && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Salles de bain</span>
                                                <span className="font-medium">{annonce.caracteristiques.sdb}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.wc && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">WC séparés</span>
                                                <span className="font-medium">{annonce.caracteristiques.wc}</span>
                                            </div>
                                        )}
                                        {annonce.caracteristiques.cuisine && (
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Cuisine</span>
                                                <span className="font-medium">{annonce.caracteristiques.cuisine === 1 ? 'Oui' : annonce.caracteristiques.cuisine}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Extérieurs et équipements */}
                                {(annonce.caracteristiques.balcon || annonce.caracteristiques.terrasse ||
                                    annonce.caracteristiques.piscine !== undefined || annonce.caracteristiques.parking) && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Extérieurs et équipements</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {annonce.caracteristiques.balcon && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Balcon</span>
                                                        <span className="font-medium">{annonce.caracteristiques.balcon} m²</span>
                                                    </div>
                                                )}
                                                {annonce.caracteristiques.terrasse && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Terrasse</span>
                                                        <span className="font-medium">{annonce.caracteristiques.terrasse} m²</span>
                                                    </div>
                                                )}
                                                {annonce.caracteristiques.piscine !== undefined && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Piscine</span>
                                                        <span className="font-medium">{annonce.caracteristiques.piscine ? 'Oui' : 'Non'}</span>
                                                    </div>
                                                )}
                                                {annonce.caracteristiques.parking && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Parking</span>
                                                        <span className="font-medium">{annonce.caracteristiques.parking} place(s)</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {/* Bâtiment */}
                                {(annonce.caracteristiques.etage || annonce.caracteristiques.nb_etages ||
                                    annonce.caracteristiques.ascenseur !== undefined || annonce.caracteristiques.exposition) && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Bâtiment</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {annonce.caracteristiques.etage && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Étage</span>
                                                        <span className="font-medium">{annonce.caracteristiques.etage}</span>
                                                    </div>
                                                )}
                                                {annonce.caracteristiques.nb_etages && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Nombre d'étages</span>
                                                        <span className="font-medium">{annonce.caracteristiques.nb_etages}</span>
                                                    </div>
                                                )}
                                                {annonce.caracteristiques.ascenseur !== undefined && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Ascenseur</span>
                                                        <span className="font-medium">{annonce.caracteristiques.ascenseur ? 'Oui' : 'Non'}</span>
                                                    </div>
                                                )}
                                                {annonce.caracteristiques.exposition && (
                                                    <div className="flex justify-between py-2">
                                                        <span className="text-gray-600">Exposition</span>
                                                        <span className="font-medium">{annonce.caracteristiques.exposition}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {/* Confort et chauffage */}
                                {(annonce.caracteristiques.chauffage || annonce.caracteristiques.format_chauffage) && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Confort et chauffage</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {annonce.caracteristiques.chauffage && (
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-600">Chauffage</span>
                                                    <span className="font-medium">{annonce.caracteristiques.chauffage}</span>
                                                </div>
                                            )}
                                            {annonce.caracteristiques.format_chauffage && (
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-600">Format chauffage</span>
                                                    <span className="font-medium">{annonce.caracteristiques.format_chauffage}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Informations financières */}
                                {(annonce.caracteristiques.charges || annonce.caracteristiques.foncier) && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Informations financières</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {annonce.caracteristiques.charges && (
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-600">Charges</span>
                                                    <span className="font-medium">{annonce.caracteristiques.charges}</span>
                                                </div>
                                            )}
                                            {annonce.caracteristiques.foncier && (
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-600">Foncier</span>
                                                    <span className="font-medium">{formatPrice(annonce.caracteristiques.foncier)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Vidéo */}
                                {annonce.caracteristiques.video_link && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Médias</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Visite virtuelle</span>
                                                <a
                                                    href={annonce.caracteristiques.video_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    Voir la vidéo
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Contact Form Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Nous contacter</h3>

                            <ContactFormWidget propertyId={annonce.id} propertyTitle={annonce.titre} />
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
                                    href={`/theo/annonces/${similaire.slug || similaire.id}`}
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