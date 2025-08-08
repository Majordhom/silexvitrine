"use client";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { heroSlides } from "../../data";
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';


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
                <div className="relative h-[480px] mt-1 bg-black rounded-4xl overflow-hidden">
                    {/* Background image with fade transition */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlideData.id}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={currentSlideData.image}
                                alt={currentSlideData.title}
                                fill
                                sizes="100vw"
                                priority={currentSlide === 0}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}




                    <div className="relative h-full flex items-center z-10">
                        <div className="text-center w-full px-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-500">
                                {currentSlideData.title}
                            </h1>
                            <p className="text-xl text-white/90 mb-8 transition-all duration-500">
                                {currentSlideData.subtitle}
                            </p>

                            <div className="max-w-2xl mx-auto">
                                <form
                                    onSubmit={handleSearch}
                                    role="search"
                                    className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/95 backdrop-blur rounded-2xl p-2 shadow-lg"
                                >
                                    <div className="flex-1 flex items-center px-4 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                                        <Search className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="search"
                                            placeholder="Rechercher un bien"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full py-2 outline-none text-gray-700 placeholder:text-gray-400"
                                            aria-label="Rechercher un bien"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
                                    >
                                        <Search className="w-4 h-4 mr-2" />
                                        <span>Rechercher</span>
                                    </button>
                                </form>
                            </div>

                            {/* Carousel Indicators */}
                            <div className="flex justify-center space-x-2 mt-8">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
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