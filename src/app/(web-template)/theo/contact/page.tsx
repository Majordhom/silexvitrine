"use client";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function TheoContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                subject: '',
                message: ''
            });
        } catch (error: any) {
            console.error('Error submitting form:', error);
            alert("Erreur lors de l'envoi : " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Nous contacter
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
                        et vous accompagner dans votre projet immobilier.
                    </p>
                </div>

                {/* Contact Form - Maintenant en haut */}
                <div className="mb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                        Message envoyé !
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                        Envoyez-nous un message
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom *
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Votre nom"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Prénom *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Votre prénom"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Votre adresse mail *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="votre@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Votre téléphone"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Sujet *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Objet de votre message"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Commentaire / Questions *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Décrivez votre projet ou posez-nous vos questions..."
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Envoi en cours...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    <span>Envoyer</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 text-center">
                                        * Champs obligatoires. Vos données personnelles sont protégées et ne seront utilisées que pour répondre à votre demande.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Information - Maintenant en bas et plus large */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-12">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                            Nos coordonnées
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Phone className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Téléphone</h3>
                                <p className="text-lg text-gray-600 mb-1">+33 4 91 XX XX XX</p>
                                <p className="text-sm text-gray-500">Lun-Ven: 9h-18h</p>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Mail className="w-8 h-8 text-purple-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Email</h3>
                                <p className="text-lg text-gray-600 mb-1">contact@silexvitrine.com</p>
                                <p className="text-sm text-gray-500">Réponse sous 24h</p>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Adresse</h3>
                                <p className="text-lg text-gray-600 mb-1">123 Avenue de la République</p>
                                <p className="text-lg text-gray-600">13001 Marseille, France</p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                            <h3 className="text-xl font-medium text-gray-900 mb-6">Horaires d'ouverture</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 max-w-2xl mx-auto">
                                <div className="text-center">
                                    <p className="font-medium">Lundi - Vendredi</p>
                                    <p>9h00 - 18h00</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium">Samedi</p>
                                    <p>9h00 - 12h00</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium">Dimanche</p>
                                    <p>Fermé</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}