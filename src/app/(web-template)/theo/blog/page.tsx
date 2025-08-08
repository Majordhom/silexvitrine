"use client";
import { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Clock, Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '../../dto';
import { blogPosts } from '../../data';

export default function TheoBlogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    // Get all unique categories from the imported blog posts
    const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

    // Filter posts based on search and category
    const filteredPosts = blogPosts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
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
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Immobilier</h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Découvrez nos derniers articles et conseils pour réussir vos projets immobiliers
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                                    }`}
                            >
                                {category === 'all' ? 'Tous les articles' : category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && searchTerm === '' && selectedCategory === 'all' && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                                Articles en vedette
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredPosts.slice(0, 3).map((post) => (
                                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="aspect-[16/9] bg-gray-200 overflow-hidden relative">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                Vedette
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-gray-500 text-sm">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                            <Link href={`/theo/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {/* Regular Posts */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {searchTerm || selectedCategory !== 'all' ? 'Résultats de recherche' : 'Tous les articles'}
                            <span className="text-gray-500 text-base font-normal ml-2">
                                ({filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''})
                            </span>
                        </h2>
                    </div>

                    {currentPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Search className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
                            <p className="text-gray-600">
                                Essayez de modifier vos critères de recherche ou parcourez tous nos articles.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentPosts.map((post) => (
                                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-gray-500 text-sm">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                                            <Link href={`/theo/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-3 h-3" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-3 h-3" />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
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
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
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

                {/* Newsletter Signup */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Recevez nos derniers articles et conseils immobiliers directement dans votre boîte mail.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                            />
                            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                S'abonner
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}