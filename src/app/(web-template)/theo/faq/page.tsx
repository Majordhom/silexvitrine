"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

const faqData = [
    {
        category: "Vente",
        questions: [
            {
                question: "Combien de temps faut-il pour vendre un bien ?",
                answer: "Le délai de vente dépend de nombreux facteurs : localisation, prix, état du bien, marché local. En moyenne, il faut compter entre 2 et 6 mois. Notre expertise nous permet d'optimiser ce délai grâce à une stratégie marketing adaptée."
            },
            {
                question: "Quels sont vos honoraires de vente ?",
                answer: "Nos honoraires sont transparents et compétitifs. Ils sont exclusivement à la charge du vendeur et varient selon la valeur du bien. Nous vous proposons un devis détaillé lors de notre première rencontre, sans engagement."
            },
            {
                question: "Comment estimez-vous la valeur de mon bien ?",
                answer: "Notre estimation repose sur une analyse comparative du marché local, l'état du bien, sa localisation, et les transactions récentes dans le secteur. Nous utilisons également des outils d'évaluation professionnels pour garantir une estimation juste et réaliste."
            }
        ]
    },
    {
        category: "Achat",
        questions: [
            {
                question: "Comment fonctionne l'accompagnement acheteur ?",
                answer: "Nous définissons ensemble vos critères de recherche, votre budget et vos priorités. Nous présélectionnons les biens correspondant à vos attentes et vous accompagnons dans les visites, la négociation et toutes les démarches jusqu'à la signature chez le notaire."
            },
            {
                question: "Quels frais dois-je prévoir pour un achat ?",
                answer: "Au prix de vente s'ajoutent les frais de notaire (environ 7-8% dans l'ancien, 2-3% dans le neuf), les frais de dossier bancaire, l'assurance emprunteur, et éventuellement les frais d'agence selon le mandat."
            },
            {
                question: "Puis-je visiter un bien le weekend ?",
                answer: "Absolument ! Nous organisons des visites 7j/7 pour s'adapter à vos disponibilités. Nous proposons également des créneaux en soirée et des visites virtuelles pour un premier aperçu."
            }
        ]
    },
    {
        category: "Financement",
        questions: [
            {
                question: "Quel apport personnel est nécessaire ?",
                answer: "Traditionnellement, les banques demandent 10% d'apport personnel, mais il est possible d'emprunter à 110% dans certains cas. L'apport couvre généralement les frais de notaire et garantit un meilleur taux d'emprunt."
            },
            {
                question: "Comment optimiser mon dossier de prêt ?",
                answer: "Un dossier solide comprend : situation professionnelle stable, gestion saine des comptes, apport personnel, absence d'incidents bancaires. Nous vous accompagnons dans la constitution du dossier et négocions avec nos partenaires bancaires."
            },
            {
                question: "Quels dispositifs d'aide à l'achat existent ?",
                answer: "Plusieurs aides sont disponibles : PTZ (Prêt à Taux Zéro), PAS (Prêt d'Accession Sociale), prêts régionaux, dispositifs Pinel pour l'investissement. Nous vous orientons selon votre situation et votre projet."
            }
        ]
    },
    {
        category: "Gestion locative",
        questions: [
            {
                question: "Que comprend la gestion locative complète ?",
                answer: "La gestion complète inclut : recherche et sélection des locataires, états des lieux, encaissement des loyers, gestion des impayés, suivi des travaux d'entretien, relations avec les locataires, et toute la gestion administrative."
            },
            {
                question: "Comment sélectionnez-vous les locataires ?",
                answer: "Nous vérifions systématiquement : revenus (3x le loyer minimum), situation professionnelle, références d'anciens bailleurs, absence de fichage bancaire. Nous privilégions la qualité du dossier pour sécuriser votre investissement."
            },
            {
                question: "Que faire en cas d'impayés ?",
                answer: "Nous avons une procédure d'urgence : relance immédiate, recherche de solutions amiables, puis procédure judiciaire si nécessaire. Nous vous recommandons également la souscription d'une garantie loyers impayés."
            }
        ]
    }
];

export default function TheoFAQPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggleItem = (key: string) => {
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const filteredFAQ = faqData.map(category => ({
        ...category,
        questions: category.questions.filter(
            item =>
                item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Questions Fréquentes
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Trouvez rapidement les réponses à vos questions
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher une question..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredFAQ.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Aucune question trouvée
                            </h3>
                            <p className="text-gray-600">
                                Essayez avec d'autres termes de recherche ou{' '}
                                <a href="/theo/contact" className="text-blue-600 hover:underline">
                                    contactez-nous directement
                                </a>
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {filteredFAQ.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                                        <h2 className="text-2xl font-bold text-blue-900">
                                            {category.category}
                                        </h2>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {category.questions.map((item, itemIndex) => {
                                            const key = `${categoryIndex}-${itemIndex}`;
                                            const isOpen = openItems[key];
                                            
                                            return (
                                                <div key={itemIndex}>
                                                    <button
                                                        onClick={() => toggleItem(key)}
                                                        className="w-full px-6 py-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                                                    >
                                                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                                            {item.question}
                                                        </h3>
                                                        {isOpen ? (
                                                            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                        ) : (
                                                            <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                        )}
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-6 pb-6">
                                                            <p className="text-gray-600 leading-relaxed">
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="bg-blue-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Vous ne trouvez pas votre réponse ?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Notre équipe d'experts est là pour vous aider
                    </p>
                    <a
                        href="/theo/contact"
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                    >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Nous contacter
                    </a>
                </div>
            </section>
        </div>
    );
}