export default function TheoMentionsLegalesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Mentions Légales
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        Informations légales relatives à notre site
                    </p>
                </div>
            </section>

            {/* Legal Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                1. Informations sur l'éditeur
                            </h2>
                            <div className="prose text-gray-600">
                                <p><strong>Nom de la société :</strong> SilexVitrine</p>
                                <p><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
                                <p><strong>Capital social :</strong> 10 000 €</p>
                                <p><strong>Siège social :</strong> 123 Avenue de la République, 13001 Marseille, France</p>
                                <p><strong>RCS :</strong> Marseille B 123 456 789</p>
                                <p><strong>SIRET :</strong> 123 456 789 00012</p>
                                <p><strong>TVA Intracommunautaire :</strong> FR12 123456789</p>
                                <p><strong>Directeur de la publication :</strong> M. Jean Dupont</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                2. Activité réglementée
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    SilexVitrine est une agence immobilière titulaire de la carte professionnelle
                                    n° CPI 1301 2023 000 000 123 délivrée par la CCI de Marseille Provence.
                                </p>
                                <p><strong>Garantie financière :</strong> GALIAN Assurances - 89 rue de la Boétie, 75008 Paris</p>
                                <p><strong>Assurance responsabilité civile professionnelle :</strong> AXA Assurances</p>
                                <p><strong>Médiation :</strong> CECMC (Centre d'Expertise et de Consommation du Ministère de la Consommation)</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                3. Hébergement du site
                            </h2>
                            <div className="prose text-gray-600">
                                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                                <p><strong>Site web :</strong> <a href="https://vercel.com" className="text-blue-600 hover:underline">vercel.com</a></p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                4. Propriété intellectuelle
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé
                                    par le droit d'auteur et le droit des marques. Toute reproduction, même partielle,
                                    est interdite sans autorisation préalable écrite de SilexVitrine.
                                </p>
                                <p>
                                    Les marques et logos présents sur le site sont déposés par SilexVitrine ou
                                    par des tiers ayant autorisé leur utilisation.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                5. Données personnelles
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
                                    loi "Informatique et Libertés", vous disposez d'un droit d'accès, de rectification,
                                    de suppression et de portabilité de vos données personnelles.
                                </p>
                                <p>
                                    Pour exercer ces droits, contactez-nous à :
                                    <a href="mailto:dpo@silexvitrine.com" className="text-blue-600 hover:underline ml-1">
                                        dpo@silexvitrine.com
                                    </a>
                                </p>
                                <p>
                                    Pour plus d'informations, consultez notre
                                    <a href="/theo/politique-confidentialite" className="text-blue-600 hover:underline ml-1">
                                        politique de confidentialité
                                    </a>.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                6. Cookies
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    Ce site utilise des cookies pour améliorer votre expérience de navigation et
                                    réaliser des statistiques de visite. Vous pouvez accepter ou refuser l'utilisation
                                    des cookies via le bandeau présent lors de votre première visite.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                7. Responsabilité
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    SilexVitrine s'efforce de fournir des informations exactes et à jour sur ce site.
                                    Toutefois, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité
                                    des informations mises à disposition.
                                </p>
                                <p>
                                    L'utilisation des informations de ce site se fait sous votre entière responsabilité.
                                    SilexVitrine ne saurait être tenue responsable des dommages directs ou indirects
                                    résultant de l'utilisation de ce site.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                8. Droit applicable
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    Les présentes mentions légales sont régies par le droit français.
                                    En cas de litige, les tribunaux français seront seuls compétents.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <p className="text-sm text-blue-800">
                                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                            </p>
                            <p className="text-sm text-blue-800 mt-2">
                                Pour toute question concernant ces mentions légales, contactez-nous à :
                                <a href="mailto:contact@silexvitrine.com" className="font-medium hover:underline ml-1">
                                    contact@silexvitrine.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}