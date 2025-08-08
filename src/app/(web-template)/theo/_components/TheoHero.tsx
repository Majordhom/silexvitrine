"use client";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { heroSlides } from "../../data";


export default function TheoHero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const currentSlideData = heroSlides[currentSlide];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const params = new URLSearchParams({ q: searchQuery.trim() });
            router.push(`/theo/annonces?${params.toString()}`);
        } else {
            router.push('/theo/annonces');
        }
    };

    return (
        <section className="relative -mt-16 pt-32 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`relative h-[480px] mt-1 ${currentSlideData.background} rounded-4xl overflow-hidden transition-all duration-500`}>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-200"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-200"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="relative h-full flex items-center">
                        <div className="text-center w-full px-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-500">
                                {currentSlideData.title}
                            </h1>
                            <p className="text-xl text-white/90 mb-8 transition-all duration-500">
                                {currentSlideData.subtitle}
                            </p>
                            
                            <div className="max-w-2xl mx-auto">
                                <form onSubmit={handleSearch} className="flex bg-white rounded-full p-2 shadow-lg">
                                    <div className="flex-1 flex items-center px-4">
                                        <Search className="w-5 h-5 text-gray-400 mr-3" />
                                        <input 
                                            type="text" 
                                            placeholder="rechercher un bien" 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-1 outline-none text-gray-700"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                                    >
                                        <Filter className="w-4 h-4" />
                                        <span>rechercher</span>
                                    </button>
                                </form>
                            </div>
                            
                            {/* Carousel Indicators */}
                            <div className="flex justify-center space-x-2 mt-8">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentSlide 
                                                ? 'bg-white scale-110' 
                                                : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 