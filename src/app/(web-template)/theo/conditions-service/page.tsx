export default function TheoConditionsServicePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Conditions de Service
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        Conditions générales d'utilisation de nos services
                    </p>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">
                                Acceptation des conditions
                            </h2>
                            <p className="text-blue-800">
                                En utilisant les services de SilexVitrine, vous acceptez d'être lié par ces conditions
                                de service. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                1. Objet des conditions
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    Les présentes conditions générales de service définissent les termes et conditions
                                    d'utilisation des services proposés par SilexVitrine, agence immobilière située
                                    123 Avenue de la République, 13001 Marseille.
                                </p>
                                <p>
                                    Ces conditions s'appliquent à tous les services immobiliers : vente, achat,
                                    location, gestion locative, conseil et expertise.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                2. Services proposés
                            </h2>
                            <div className="prose text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Services de vente</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Estimation gratuite de votre bien immobilier</li>
                                    <li>Mise en marché et promotion du bien</li>
                                    <li>Organisation des visites</li>
                                    <li>Négociation et suivi jusqu'à la signature</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Services d'achat</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Recherche personnalisée selon vos critères</li>
                                    <li>Accompagnement dans les visites</li>
                                    <li>Conseil et négociation</li>
                                    <li>Suivi administratif et juridique</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Gestion locative</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Sélection et gestion des locataires</li>
                                    <li>Encaissement des loyers</li>
                                    <li>Gestion des travaux et entretien</li>
                                    <li>Suivi administratif et juridique</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                3. Obligations du client
                            </h2>
                            <div className="prose text-gray-600">
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Informations exactes</h3>
                                    <p>Le client s'engage à fournir des informations exactes et complètes concernant son projet immobilier.</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Collaboration</h3>
                                    <p>Le client s'engage à collaborer de bonne foi et à répondre aux demandes d'information dans les délais impartis.</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Exclusivité (le cas échéant)</h3>
                                    <p>En cas de mandat exclusif, le client s'interdit de confier la vente/location de son bien à un autre professionnel.</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Paiement des honoraires</h3>
                                    <p>Le client s'engage à régler les honoraires selon les modalités définies dans le mandat.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                4. Obligations de SilexVitrine
                            </h2>
                            <div className="prose text-gray-600">
                                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">Moyens et diligences</h3>
                                    <p>SilexVitrine s'engage à mettre en œuvre tous les moyens nécessaires pour mener à bien la mission confiée.</p>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">Conseil et expertise</h3>
                                    <p>Nous nous engageons à vous conseiller avec professionnalisme et à vous faire bénéficier de notre expertise du marché local.</p>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">Confidentialité</h3>
                                    <p>Respect de la confidentialité de vos informations personnelles et de votre projet immobilier.</p>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">Information et suivi</h3>
                                    <p>Information régulière sur l'avancement de votre dossier et transparence sur nos actions.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                5. Honoraires et conditions de paiement
                            </h2>
                            <div className="prose text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Vente immobilière</h3>
                                <p>
                                    Les honoraires de vente sont à la charge du vendeur et payables à la signature
                                    de l'acte authentique. Le taux est défini dans le mandat de vente.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Gestion locative</h3>
                                <p>
                                    Les honoraires de gestion sont prélevés mensuellement sur les loyers encaissés.
                                    Les honoraires de mise en location sont dus à la signature du bail.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Autres prestations</h3>
                                <p>
                                    Les honoraires pour les autres prestations (conseil, expertise, recherche)
                                    sont définis contractuellement selon la nature de la mission.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                6. Responsabilité et assurances
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    SilexVitrine est couverte par une assurance responsabilité civile professionnelle
                                    souscrite auprès d'AXA Assurances.
                                </p>
                                <p>
                                    Notre responsabilité est limitée aux fautes professionnelles dans l'exercice
                                    de notre mission. Nous ne saurions être tenus responsables des vices cachés
                                    ou des informations erronées fournies par les clients.
                                </p>
                                <p>
                                    Garantie financière souscrite auprès de GALIAN Assurances conformément à la
                                    réglementation en vigueur.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                7. Résiliation du contrat
                            </h2>
                            <div className="prose text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Résiliation par le client</h3>
                                <p>
                                    Le client peut résilier le mandat selon les conditions prévues dans celui-ci.
                                    En cas de mandat exclusif, un préavis peut être requis.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Résiliation par SilexVitrine</h3>
                                <p>
                                    SilexVitrine peut résilier le mandat en cas de manquement grave du client
                                    à ses obligations ou d'impossibilité d'exécuter la mission.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Effets de la résiliation</h3>
                                <p>
                                    En cas de résiliation, les honoraires dus pour les prestations déjà effectuées
                                    restent acquis à SilexVitrine.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                8. Protection des données personnelles
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    Le traitement de vos données personnelles est effectué conformément à notre
                                    <a href="/theo/politique-confidentialite" className="text-blue-600 hover:underline">
                                        politique de confidentialité
                                    </a> et à la réglementation en vigueur (RGPD).
                                </p>
                                <p>
                                    Vous disposez d'un droit d'accès, de rectification, de suppression et de
                                    portabilité de vos données personnelles.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                9. Médiation et litiges
                            </h2>
                            <div className="prose text-gray-600">
                                <p>
                                    En cas de litige, nous nous engageons à rechercher une solution amiable.
                                    Si aucun accord n'est trouvé, vous pouvez recourir à la médiation auprès du :
                                </p>
                                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                    <p><strong>Centre d'Expertise et de Consommation</strong></p>
                                    <p>CECMC - Médiation immobilier</p>
                                    <p>Email : mediation-immobilier@cecmc.fr</p>
                                    <p>Site : <a href="https://www.cecmc.fr" className="text-blue-600 hover:underline">www.cecmc.fr</a></p>
                                </div>
                                <p className="mt-4">
                                    À défaut de médiation ou en cas d'échec de celle-ci, les tribunaux de Marseille
                                    seront seuls compétents.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                10. Dispositions générales
                            </h2>
                            <div className="prose text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Droit applicable</h3>
                                <p>
                                    Les présentes conditions sont régies par le droit français.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Modification des conditions</h3>
                                <p>
                                    SilexVitrine se réserve le droit de modifier ces conditions. Les modifications
                                    entreront en vigueur dès leur publication sur notre site internet.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Nullité partielle</h3>
                                <p>
                                    Si une clause de ces conditions était déclarée nulle, les autres clauses
                                    resteraient en vigueur.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">
                                Contact
                            </h2>
                            <p className="text-blue-800">
                                Pour toute question sur ces conditions de service :
                            </p>
                            <p className="text-blue-800 mt-2">
                                <strong>SilexVitrine</strong><br />
                                123 Avenue de la République, 13001 Marseille<br />
                                Tél : 04 91 XX XX XX<br />
                                Email : <a href="mailto:contact@silexvitrine.com" className="font-medium hover:underline">contact@silexvitrine.com</a>
                            </p>
                        </div>

                        <div className="text-center bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">
                                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}