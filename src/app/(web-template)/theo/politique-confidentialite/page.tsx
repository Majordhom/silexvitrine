export default function TheoPolitiqueConfidentialitePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Politique de Confidentialité
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        Protection et traitement de vos données personnelles
                    </p>
                </div>
            </section>

            {/* Privacy Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                        
                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">
                                Engagement de SilexVitrine
                            </h2>
                            <p className="text-blue-800">
                                Nous nous engageons à protéger et respecter votre vie privée. Cette politique 
                                explique quand et pourquoi nous collectons vos données personnelles, comment 
                                nous les utilisons et les conditions dans lesquelles nous pouvons les divulguer.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                1. Responsable du traitement
                            </h2>
                            <div className="prose text-gray-600">
                                <p><strong>SilexVitrine</strong></p>
                                <p>123 Avenue de la République, 13001 Marseille, France</p>
                                <p>Email : <a href="mailto:dpo@silexvitrine.com" className="text-blue-600 hover:underline">dpo@silexvitrine.com</a></p>
                                <p>Téléphone : 04 91 XX XX XX</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                2. Données collectées
                            </h2>
                            <div className="prose text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Données d'identification</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Nom et prénom</li>
                                    <li>Adresse email</li>
                                    <li>Numéro de téléphone</li>
                                    <li>Adresse postale</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Données de navigation</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Adresse IP</li>
                                    <li>Type de navigateur</li>
                                    <li>Pages visitées</li>
                                    <li>Durée de visite</li>
                                    <li>Cookies et traceurs</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Données de projet immobilier</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Type de projet (achat, vente, location)</li>
                                    <li>Budget et critères de recherche</li>
                                    <li>Localisation souhaitée</li>
                                    <li>Historique des interactions</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                3. Finalités du traitement
                            </h2>
                            <div className="prose text-gray-600">
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Gestion de la relation client</h3>
                                    <p>Traitement de vos demandes, suivi de votre dossier, communication sur nos services.</p>
                                    <p className="text-sm text-gray-500 mt-1"><strong>Base légale :</strong> Exécution d'un contrat</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Prospection commerciale</h3>
                                    <p>Envoi d'offres personnalisées, newsletter, invitations à des événements.</p>
                                    <p className="text-sm text-gray-500 mt-1"><strong>Base légale :</strong> Intérêt légitime / Consentement</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Amélioration de nos services</h3>
                                    <p>Analyse statistique, amélioration de l'expérience utilisateur, développement de nouveaux services.</p>
                                    <p className="text-sm text-gray-500 mt-1"><strong>Base légale :</strong> Intérêt légitime</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Obligations légales</h3>
                                    <p>Respect des obligations comptables, fiscales et réglementaires.</p>
                                    <p className="text-sm text-gray-500 mt-1"><strong>Base légale :</strong> Obligation légale</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                4. Destinataires des données
                            </h2>
                            <div className="prose text-gray-600">
                                <p>Vos données peuvent être transmises à :</p>
                                <ul className="list-disc list-inside space-y-1 mt-2">
                                    <li>Nos collaborateurs habilités</li>
                                    <li>Nos partenaires bancaires et assureurs (avec votre accord)</li>
                                    <li>Nos prestataires techniques (hébergement, maintenance)</li>
                                    <li>Les autorités compétentes en cas d'obligation légale</li>
                                </ul>
                                <p className="mt-4">
                                    Nous ne vendons jamais vos données à des tiers à des fins commerciales.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                5. Durée de conservation
                            </h2>
                            <div className="prose text-gray-600">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-300 rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Type de données</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">Données clients actifs</td>
                                                <td className="border border-gray-300 px-4 py-2">Durée de la relation + 3 ans</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">Données prospects</td>
                                                <td className="border border-gray-300 px-4 py-2">3 ans sans contact</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">Cookies techniques</td>
                                                <td className="border border-gray-300 px-4 py-2">Session</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2">Cookies analytiques</td>
                                                <td className="border border-gray-300 px-4 py-2">13 mois</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                6. Vos droits
                            </h2>
                            <div className="prose text-gray-600">
                                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <h3 className="font-semibold text-blue-900 mb-1">Droit d'accès</h3>
                                        <p className="text-sm text-blue-800">Connaître les données que nous détenons sur vous</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <h3 className="font-semibold text-blue-900 mb-1">Droit de rectification</h3>
                                        <p className="text-sm text-blue-800">Corriger vos données inexactes</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <h3 className="font-semibold text-blue-900 mb-1">Droit d'effacement</h3>
                                        <p className="text-sm text-blue-800">Supprimer vos données sous conditions</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <h3 className="font-semibold text-blue-900 mb-1">Droit à la portabilité</h3>
                                        <p className="text-sm text-blue-800">Récupérer vos données dans un format structuré</p>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mt-6">
                                    <h3 className="font-semibold text-yellow-900 mb-2">Comment exercer vos droits ?</h3>
                                    <p className="text-yellow-800">
                                        Contactez notre DPO à : 
                                        <a href="mailto:dpo@silexvitrine.com" className="font-medium hover:underline ml-1">
                                            dpo@silexvitrine.com
                                        </a>
                                    </p>
                                    <p className="text-yellow-800 mt-1">
                                        Réponse garantie sous 1 mois. En cas de difficulté, vous pouvez saisir la CNIL.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                7. Sécurité des données
                            </h2>
                            <div className="prose text-gray-600">
                                <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :</p>
                                <ul className="list-disc list-inside space-y-1 mt-2">
                                    <li>Chiffrement des données sensibles (SSL/TLS)</li>
                                    <li>Accès limité aux données selon le principe du "besoin d'en connaître"</li>
                                    <li>Authentification forte pour nos systèmes</li>
                                    <li>Sauvegardes régulières et sécurisées</li>
                                    <li>Formation de nos équipes à la protection des données</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                8. Cookies et traceurs
                            </h2>
                            <div className="prose text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cookies essentiels</h3>
                                <p>Nécessaires au fonctionnement du site (navigation, sécurité, préférences).</p>
                                
                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cookies analytiques</h3>
                                <p>Mesure d'audience et amélioration du site (Google Analytics avec anonymisation IP).</p>
                                
                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Gestion des cookies</h3>
                                <p>
                                    Vous pouvez paramétrer vos cookies via le bandeau de consentement ou 
                                    les paramètres de votre navigateur.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">
                                Contact et réclamation
                            </h2>
                            <p className="text-blue-800 mb-2">
                                <strong>Délégué à la Protection des Données (DPO) :</strong>
                            </p>
                            <p className="text-blue-800">
                                Email : <a href="mailto:dpo@silexvitrine.com" className="font-medium hover:underline">dpo@silexvitrine.com</a><br/>
                                Courrier : SilexVitrine - DPO, 123 Avenue de la République, 13001 Marseille
                            </p>
                            <p className="text-blue-800 mt-4">
                                <strong>Autorité de contrôle :</strong> CNIL - 3 Place de Fontenoy, 75007 Paris<br/>
                                <a href="https://www.cnil.fr" className="hover:underline">www.cnil.fr</a>
                            </p>
                        </div>

                        <div className="text-center bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">
                                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Cette politique peut être modifiée. Les changements importants vous seront notifiés.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}