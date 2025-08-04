"use client";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

export default function TheoNewsletter() {
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
                            <a href="/theo/theo-annonces" className="text-gray-600 hover:text-blue-600">Nos biens</a>
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
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-10 h-10" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6">Newsletter Immobilière</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Restez informé des dernières opportunités immobilières et des tendances du marché. 
                        Inscrivez-vous à notre newsletter pour recevoir nos meilleures offres en avant-première.
                    </p>
                </div>
            </section>

            {/* Newsletter Form */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            Inscrivez-vous à notre newsletter
                        </h2>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prénom
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Votre prénom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Votre nom"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Code postal
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="13008"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Types de biens recherchés
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Appartement</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Maison</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Villa</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Terrain</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    required
                                />
                                <div className="text-sm text-gray-600">
                                    J'accepte de recevoir la newsletter et j'accepte la 
                                    <a href="#" className="text-blue-600 hover:text-blue-700"> politique de confidentialité</a>.
                                </div>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
                            >
                                <span>S'inscrire à la newsletter</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Pourquoi s'inscrire à notre newsletter ?
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Offres en avant-première</h3>
                            <p className="text-gray-600">Soyez les premiers informés des nouvelles propriétés disponibles</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Conseils d'experts</h3>
                            <p className="text-gray-600">Recevez nos analyses du marché et conseils immobiliers</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Désabonnement facile</h3>
                            <p className="text-gray-600">Vous pouvez vous désabonner à tout moment en un clic</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
