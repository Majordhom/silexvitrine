"use client";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function TheoContact() {
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
                    <h1 className="text-5xl font-bold mb-6">Contactez-Nous</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Notre équipe est à votre disposition pour répondre à toutes vos questions 
                        et vous accompagner dans vos projets immobiliers.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
                            
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
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Téléphone
                                    </label>
                                    <input 
                                        type="tel" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="06 12 34 56 78"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sujet
                                    </label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>Choisissez un sujet</option>
                                        <option>Demande de visite</option>
                                        <option>Estimation de bien</option>
                                        <option>Renseignements</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea 
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Votre message..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Envoyer le message</span>
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Adresse</h4>
                                            <p className="text-gray-600">123 Avenue de la République<br />13008 Marseille, France</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Téléphone</h4>
                                            <p className="text-gray-600">04 91 23 45 67</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Email</h4>
                                            <p className="text-gray-600">contact@agence-immobiliere.fr</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Horaires</h4>
                                            <p className="text-gray-600">
                                                Lundi - Vendredi: 9h00 - 18h00<br />
                                                Samedi: 9h00 - 12h00<br />
                                                Dimanche: Fermé
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Notre Localisation</h3>
                                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                                    <p className="text-gray-500">Carte interactive</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}