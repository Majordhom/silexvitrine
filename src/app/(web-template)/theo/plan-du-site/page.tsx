"use client";
import { Home, Users, Phone, FileText, HelpCircle, Mail, Shield, Book, Building } from 'lucide-react';

const sitemapSections = [
    {
        title: "Pages principales",
        icon: Home,
        links: [
            { title: "Accueil", url: "/theo", description: "Page d'accueil avec nos derniers biens" },
            { title: "Nos biens", url: "/theo/annonces", description: "Catalogue complet de nos propriétés" },
            { title: "À propos", url: "/theo/apropos", description: "Notre histoire et nos valeurs" },
            { title: "Contact", url: "/theo/contact", description: "Nous contacter et nos coordonnées" }
        ]
    },
    {
        title: "Services",
        icon: Building,
        links: [
            { title: "Nos services", url: "/theo/services", description: "Découvrez tous nos services immobiliers" },
            { title: "Vente immobilière", url: "/theo/services#vente", description: "Accompagnement dans la vente" },
            { title: "Achat immobilier", url: "/theo/services#achat", description: "Conseil pour vos achats" },
            { title: "Gestion locative", url: "/theo/services#gestion", description: "Gestion de votre patrimoine locatif" }
        ]
    },
    {
        title: "Informations",
        icon: Book,
        links: [
            { title: "Blog", url: "/theo/blog", description: "Actualités et conseils immobiliers" },
            { title: "FAQ", url: "/theo/faq", description: "Questions fréquemment posées" },
            { title: "Newsletter", url: "/theo/newsletter", description: "Inscription à notre newsletter" }
        ]
    },
    {
        title: "Légal",
        icon: Shield,
        links: [
            { title: "Mentions légales", url: "/theo/mentions-legales", description: "Informations légales obligatoires" },
            { title: "Politique de confidentialité", url: "/theo/politique-confidentialite", description: "Protection de vos données personnelles" },
            { title: "Conditions de service", url: "/theo/conditions-service", description: "Conditions d'utilisation de nos services" }
        ]
    }
];

export default function TheoSitemapPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Plan du Site
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        Naviguez facilement dans toutes nos pages
                    </p>
                </div>
            </section>

            {/* Sitemap Content */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sitemapSections.map((section, sectionIndex) => {
                            const IconComponent = section.icon;
                            return (
                                <div key={sectionIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                <IconComponent className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-blue-900">
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {section.links.map((link, linkIndex) => (
                                                <a
                                                    key={linkIndex}
                                                    href={link.url}
                                                    className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                                                >
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                                                        {link.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {link.description}
                                                    </p>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick Links */}
                    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Liens rapides
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <a
                                href="/theo/annonces"
                                className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors text-center group"
                            >
                                <Home className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                    Nos biens
                                </span>
                            </a>
                            <a
                                href="/theo/contact"
                                className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors text-center group"
                            >
                                <Phone className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                    Contact
                                </span>
                            </a>
                            <a
                                href="/theo/services"
                                className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors text-center group"
                            >
                                <Users className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                    Services
                                </span>
                            </a>
                            <a
                                href="/theo/faq"
                                className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors text-center group"
                            >
                                <HelpCircle className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                    FAQ
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="bg-blue-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Besoin d'aide pour naviguer ?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Notre équipe est disponible pour vous orienter
                    </p>
                    <a
                        href="/theo/contact"
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                    >
                        <Mail className="w-5 h-5 mr-2" />
                        Nous contacter
                    </a>
                </div>
            </section>
        </div>
    );
}