"use client";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { TheoBurgerMenuProps } from '../../dto';
import Link from 'next/link';

export default function TheoBurgerMenu({ isOpen, onToggle }: TheoBurgerMenuProps) {
    // Prevent background scroll when the menu is open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Close on ESC key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onToggle();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onToggle]);

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0.35 },
        exit: { opacity: 0 },
    };

    const panelVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
        exit: { x: '100%' },
    };

    const listVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.05, delayChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            {/* Toggle button - only on mobile */}
            <button
                type="button"
                aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isOpen}
                onClick={onToggle}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-700 border border-gray-200 hover:text-gray-900 hover:bg-gray-100 transition-colors shadow-sm"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Animated mobile menu in a portal to avoid clipping/stacking issues */}
            {typeof window !== 'undefined' && isOpen && createPortal(
                (
                    <AnimatePresence>
                        {/* Backdrop */}
                        <motion.div
                            key="overlay"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={overlayVariants}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black z-[100] md:hidden"
                            onClick={onToggle}
                        />

                        {/* Slide-in panel */}
                        <motion.aside
                            key="panel"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={panelVariants}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="fixed top-0 right-0 h-screen w-4/5 max-w-xs bg-white z-[100] shadow-xl md:hidden flex flex-col border-l border-gray-200 rounded-l-2xl overflow-hidden"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="pt-6 pb-4 px-6 border-b relative bg-white/80 backdrop-blur">
                                <p className="text-lg font-semibold text-gray-900 text-center">Menu</p>
                                <button
                                    type="button"
                                    aria-label="Fermer"
                                    onClick={onToggle}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-md border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <nav className="flex-1 overflow-y-auto px-6 py-4">
                                <motion.ul
                                    className="space-y-3"
                                    variants={listVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.li variants={itemVariants}>
                                        <Link
                                            href="/theo"
                                            onClick={onToggle}
                                            className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-base font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                                        >
                                            Accueil
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        <Link
                                            href="/theo/annonces"
                                            onClick={onToggle}
                                            className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-base font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                                        >
                                            Nos biens
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        <Link
                                            href="/theo/blog"
                                            onClick={onToggle}
                                            className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-base font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                                        >
                                            Blog
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        <Link
                                            href="/theo/liked"
                                            onClick={onToggle}
                                            className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 text-base font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                                        >
                                            Favoris
                                        </Link>
                                    </motion.li>
                                </motion.ul>
                            </nav>
                            <div className="px-6 pb-8">
                                <Link
                                    href="/theo/contact"
                                    onClick={onToggle}
                                    className="inline-flex w-full items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-sm border border-blue-600/70"
                                >
                                    Nous contacter
                                </Link>
                            </div>
                        </motion.aside>
                    </AnimatePresence>
                ),
                document.body
            )}
        </>
    );
} 