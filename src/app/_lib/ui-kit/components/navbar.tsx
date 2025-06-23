"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

const navItems = [
    { id: "(accueil)", label: "Accueil", href: "/" },
    { id: "annonces", label: "Propriétés", href: "/annonces" },
    { id: "about", label: "À propos", href: "/apropos" }, // À propos ajouté
];

const Navbar: React.FunctionComponent = () => {
    const pathname = usePathname();
    const isActive = (path: Url) => pathname === path;
    const [open, setOpen] = useState(false);

    return (
        <nav className="p-4 md:pb-8 flex items-center relative">
            {/* Groupe gauche : logo + liens */}
            <div className="flex items-center gap-8 flex-1">
                <Link href="/" className="text-lg md:text-3xl font-bold text-black hover:text-gray-500">
                    Logo
                </Link>
                <ul className="hidden md:flex items-center gap-4">
                    {navItems.map((eachItem) => (
                        <li key={eachItem.id}>
                            <Link
                                href={eachItem.href}
                                className={`${isActive(eachItem.href) ? "text-black" : ""}`}
                            >
                                {eachItem.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Bouton Contact à droite en desktop */}
            <div className="hidden md:block">
                <Link
                    href="/contact"
                    className="bg-gray-300 text-black px-5 py-2 rounded-full shadow hover:bg-gray-400/80 transition"
                >
                    Contact
                </Link>
            </div>
            {/* Hamburger mobile à droite */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 ml-auto"
                onClick={() => setOpen((v) => !v)}
                aria-label="Ouvrir le menu"
            >
                <span className="block w-6 h-0.5 bg-black mb-1"></span>
                <span className="block w-6 h-0.5 bg-black mb-1"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
            </button>
            {/* Menu mobile déroulant à droite */}
            {open && (
                <ul className="absolute top-full right-4 bg-white shadow-lg rounded flex flex-col gap-2 p-4 md:hidden z-50">
                    {navItems.map((eachItem) => (
                        <li key={eachItem.id}>
                            <Link
                                href={eachItem.href}
                                className={`${isActive(eachItem.href) ? "text-black" : ""}`}
                                onClick={() => setOpen(false)}
                            >
                                {eachItem.label}
                            </Link>
                        </li>
                    ))}
                    {/* Contact en mobile */}
                    <li>
                        <Link
                            href="/contact"
                            className={`${isActive("/contact") ? "text-black" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;