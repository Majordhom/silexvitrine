"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

const navItems = [
    { id: "(accueil)", label: "Accueil", href: "/" },
    { id: "annonces", label: "Annonces", href: "/annonces" },
    { id: "contact", label: "Contact", href: "/contact" },
];

const Navbar: React.FunctionComponent = () => {
    const pathname = usePathname();
    const isActive = (path: Url) => pathname === path;
    const [open, setOpen] = useState(false);

    return (
        <nav className="p-4 md:pb-8 flex justify-between items-center relative">
            <Link
                href="/"
                className="text-lg md:text-3xl font-bold text-black hover:text-gray"
            >
                webapp
            </Link>
            {/* Bouton menu hamburger visible sur mobile */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8"
                onClick={() => setOpen((v) => !v)}
                aria-label="Ouvrir le menu"
            >
                <span className="block w-6 h-0.5 bg-black mb-1"></span>
                <span className="block w-6 h-0.5 bg-black mb-1"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
            </button>
            {/* Liens de navigation desktop */}
            <ul className="hidden md:flex justify-end items-center gap-4">
                {navItems.map((eachItem) => (
                    <li key={eachItem.id}>
                        <Link
                            href={eachItem.href}
                            className={`${isActive(eachItem.href) ? "text-spotify-green" : ""}`}
                        >
                            {eachItem.label}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Menu mobile */}
            {open && (
                <ul className="absolute top-full right-4 bg-white shadow-lg rounded flex flex-col gap-2 p-4 md:hidden z-50">
                    {navItems.map((eachItem) => (
                        <li key={eachItem.id}>
                            <Link
                                href={eachItem.href}
                                className={`${isActive(eachItem.href) ? "text-spotify-green" : ""}`}
                                onClick={() => setOpen(false)}
                            >
                                {eachItem.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;