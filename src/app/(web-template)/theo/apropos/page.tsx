"use client";
import { Users, Award, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function TheoAPropos() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded"></div>
                            <span className="text-xl font-bold text-gray-900">Nom de l'agence</span>
                        </div>
                        
                        <nav className="hidden md:flex space-x-8">
                            <a href="/theo" className="text-gray-600 hover:text-blue-600">accueil</a>
                            <a href="/theo/annonces" className="text-gray-600 hover:text-blue-600">Nos biens</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Blog</a>
                        </nav>
                        
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Nous contacter
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-6">À Propos de Notre Agence</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Plus de 15 ans d'expertise dans l'immobilier de prestige. 
                        Notre équipe dédiée vous accompagne dans tous vos projets immobiliers.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                            <div className="text-gray-600">Propriétés vendues</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                            <div className="text-gray-600">Années d'expérience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                            <div className="text-gray-600">Clients satisfaits</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                            <div className="text-gray-600">Support client</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Notre Équipe</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Users className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Marie Dubois</h3>
                            <p className="text-gray-600 mb-4">Directrice Commerciale</p>
                            <p className="text-sm text-gray-500">
                                Spécialiste du marché immobilier depuis plus de 10 ans, 
                                Marie accompagne nos clients dans leurs projets d'achat et de vente.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Award className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Pierre Martin</h3>
                            <p className="text-gray-600 mb-4">Expert Immobilier</p>
                            <p className="text-sm text-gray-500">
                                Expert en évaluation immobilière, Pierre garantit 
                                des estimations précises et des conseils avisés.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <MapPin className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Sophie Bernard</h3>
                            <p className="text-gray-600 mb-4">Chargée de Clientèle</p>
                            <p className="text-sm text-gray-500">
                                Sophie assure un suivi personnalisé et un accompagnement 
                                de qualité pour tous nos clients.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nos Coordonnées</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                            <p className="text-gray-600">123 Avenue de la République<br />13008 Marseille</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Phone className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                            <p className="text-gray-600">04 91 23 45 67</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Mail className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Email</h3>
                            <p className="text-gray-600">contact@agence-immobiliere.fr</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}