"use client";
import { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Clock, Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: string;
    category: string;
    readTime: string;
    imageUrl: string;
    featured?: boolean;
}

export default function TheoBlogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    // Enhanced blog data with more posts and featured articles
    const blogPosts: BlogPost[] = [
        {
            id: '1',
            slug: 'marche-immobilier-cabries-analyse-tendances',
            title: "Marché de l'immobilier à Cabriès : Analyse et Tendances 2024",
            excerpt: "Découvrez les dernières tendances du marché immobilier à Cabriès. Notre analyse complète vous donne les clés pour comprendre l'évolution des prix et les opportunités d'investissement.",
            content: "Le marché immobilier de Cabriès connaît une dynamique exceptionnelle...",
            author: "Lino Reporter",
            publishedAt: "2025-04-23",
            category: "Analyse de marché",
            readTime: "5 min",
            imageUrl: "/placeholder.jpg",
            featured: true
        },
        {
            id: '2',
            slug: 'guide-investir-immobilier-2024',
            title: "Guide complet pour investir dans l'immobilier en 2024",
            excerpt: "Tout ce que vous devez savoir pour faire un investissement immobilier réussi en 2024. Conseils d'experts et stratégies éprouvées.",
            content: "L'investissement immobilier reste l'un des placements les plus sûrs...",
            author: "Marie Dubois",
            publishedAt: "2025-04-20",
            category: "Conseils",
            readTime: "8 min",
            imageUrl: "/placeholder.jpg",
            featured: true
        },
        {
            id: '3',
            slug: 'quartiers-marseille-investissement',
            title: "Les meilleurs quartiers de Marseille pour investir en 2024",
            excerpt: "Notre sélection des quartiers les plus prometteurs de Marseille pour votre investissement immobilier. Analyse détaillée et conseils pratiques.",
            content: "Marseille offre une diversité de quartiers aux profils très différents...",
            author: "Pierre Martin",
            publishedAt: "2025-04-18",
            category: "Investissement",
            readTime: "6 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '4',
            slug: 'renovation-maison-valeur-ajoutee',
            title: "Rénovation : Comment ajouter de la valeur à votre bien",
            excerpt: "Les travaux de rénovation qui rapportent le plus. Guide pratique pour maximiser la valeur de votre bien immobilier.",
            content: "La rénovation peut considérablement augmenter la valeur d'un bien...",
            author: "Sophie Laurent",
            publishedAt: "2025-04-15",
            category: "Rénovation",
            readTime: "7 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '5',
            slug: 'credit-immobilier-taux-2024',
            title: "Crédit immobilier : Les taux en 2024 et nos conseils",
            excerpt: "Tout savoir sur les taux de crédit immobilier en 2024. Conseils pour négocier et optimiser votre emprunt.",
            content: "Les taux de crédit immobilier évoluent constamment...",
            author: "Thomas Bernard",
            publishedAt: "2025-04-12",
            category: "Financement",
            readTime: "4 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '6',
            slug: 'achat-vente-immobilier-etapes',
            title: "Achat ou vente : Les étapes clés d'une transaction immobilière",
            excerpt: "Guide complet des étapes d'une transaction immobilière. De la recherche à la signature, tout ce qu'il faut savoir.",
            content: "Une transaction immobilière suit un processus bien défini...",
            author: "Julie Moreau",
            publishedAt: "2025-04-10",
            category: "Conseils",
            readTime: "9 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '7',
            slug: 'immobilier-neuf-marseille-avantages',
            title: "Immobilier neuf à Marseille : Avantages et opportunités",
            excerpt: "Découvrez les avantages de l'immobilier neuf à Marseille. Investissement sûr et rentable dans la cité phocéenne.",
            content: "L'immobilier neuf à Marseille présente de nombreux atouts...",
            author: "Alexandre Dupont",
            publishedAt: "2025-04-08",
            category: "Investissement",
            readTime: "5 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '8',
            slug: 'defiscalisation-immobilier-2024',
            title: "Défiscalisation immobilière : Les dispositifs en 2024",
            excerpt: "Guide complet de la défiscalisation immobilière en 2024. Pinel, Malraux, Denormandie : quel dispositif choisir ?",
            content: "La défiscalisation immobilière permet de réduire ses impôts...",
            author: "Caroline Moreau",
            publishedAt: "2025-04-05",
            category: "Financement",
            readTime: "6 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '9',
            slug: 'diagnostic-immobilier-obligatoire',
            title: "Diagnostics immobiliers : Ce qui est obligatoire en 2024",
            excerpt: "Tout savoir sur les diagnostics immobiliers obligatoires. DPE, amiante, plomb : quels diagnostics pour votre bien ?",
            content: "Les diagnostics immobiliers sont essentiels lors d'une transaction...",
            author: "Marc Dubois",
            publishedAt: "2025-04-02",
            category: "Conseils",
            readTime: "4 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '10',
            slug: 'immobilier-ancien-marseille',
            title: "Immobilier ancien à Marseille : Charme et investissement",
            excerpt: "L'immobilier ancien à Marseille allie charme et investissement. Guide complet pour acheter dans l'ancien.",
            content: "L'immobilier ancien à Marseille séduit de nombreux acheteurs...",
            author: "Isabelle Martin",
            publishedAt: "2025-03-30",
            category: "Investissement",
            readTime: "7 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '11',
            slug: 'assurance-emprunteur-negocier',
            title: "Assurance emprunteur : Comment négocier en 2024",
            excerpt: "Conseils pour négocier votre assurance emprunteur et faire des économies. Délégation d'assurance et comparatifs.",
            content: "L'assurance emprunteur représente un coût important...",
            author: "Laurent Petit",
            publishedAt: "2025-03-28",
            category: "Financement",
            readTime: "5 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '12',
            slug: 'immobilier-bureau-marseille',
            title: "Immobilier de bureau à Marseille : Marché et opportunités",
            excerpt: "Analyse du marché de l'immobilier de bureau à Marseille. Investissement locatif et opportunités commerciales.",
            content: "L'immobilier de bureau à Marseille connaît une évolution intéressante...",
            author: "Nathalie Rousseau",
            publishedAt: "2025-03-25",
            category: "Investissement",
            readTime: "6 min",
            imageUrl: "/placeholder.jpg"
        }
    ];

    const categories = [
        { id: 'all', name: 'Tous les articles', count: blogPosts.length },
        { id: 'analyse-de-marche', name: 'Analyse de marché', count: blogPosts.filter(p => p.category === 'Analyse de marché').length },
        { id: 'conseils', name: 'Conseils', count: blogPosts.filter(p => p.category === 'Conseils').length },
        { id: 'investissement', name: 'Investissement', count: blogPosts.filter(p => p.category === 'Investissement').length },
        { id: 'renovation', name: 'Rénovation', count: blogPosts.filter(p => p.category === 'Rénovation').length },
        { id: 'financement', name: 'Financement', count: blogPosts.filter(p => p.category === 'Financement').length }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || 
                               post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const featuredPosts = blogPosts.filter(post => post.featured);
    const regularPosts = currentPosts.filter(post => !post.featured);

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Enhanced Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un article, un auteur..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="lg:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} ({category.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-gray-600">
                        {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouvé{filteredPosts.length > 1 ? 's' : ''}
                    </div>
                </div>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && searchTerm === '' && selectedCategory === 'all' && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                            Articles à la une
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredPosts.map((post) => (
                                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Image */}
                                        <div className="lg:w-1/2 aspect-[4/3] bg-gray-200 overflow-hidden">
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                                            <div>
                                                {/* Category */}
                                                <div className="mb-3">
                                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                        {post.category}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                                    <Link href={`/theo/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                                                        {post.title}
                                                    </Link>
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            {/* Meta */}
                                            <div>
                                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex items-center space-x-1">
                                                            <User size={14} />
                                                            <span>{post.author}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar size={14} />
                                                            <span>{formatDate(post.publishedAt)}</span>
                                                        </div>
                                                    </div>
                                                    <span className="flex items-center space-x-1">
                                                        <Clock size={14} />
                                                        <span>{post.readTime}</span>
                                                    </span>
                                                </div>

                                                {/* Read More */}
                                                <Link 
                                                    href={`/theo/blog/${post.slug}`}
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                                >
                                                    Lire la suite
                                                    <ArrowRight size={16} className="ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {/* Regular Blog Posts Grid */}
                {regularPosts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {regularPosts.map((post) => (
                                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                    {/* Image */}
                                    <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Category */}
                                        <div className="mb-3">
                                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                            <Link href={`/theo/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                                                {post.title}
                                            </Link>
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-1">
                                                    <User size={14} />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar size={14} />
                                                    <span>{formatDate(post.publishedAt)}</span>
                                                </div>
                                            </div>
                                            <span className="flex items-center space-x-1">
                                                <Clock size={14} />
                                                <span>{post.readTime}</span>
                                            </span>
                                        </div>

                                        {/* Read More */}
                                        <Link 
                                            href={`/theo/blog/${post.slug}`}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                        >
                                            Lire la suite
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Précédent
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Suivant
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Aucun article trouvé
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Essayez de modifier vos critères de recherche
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 