"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

const navItems = [
    { id: "(accueil)", label: "Accueil", href: "/" },
    { id: "annonces", label: "Propriétés", href: "/annonces" },
    { id: "contact", label: "Contact", href: "/contact" },
];

const Navbar: React.FunctionComponent = () => {
    const pathname = usePathname();
    const isActive = (path: Url) => pathname === path;
    const [open, setOpen] = useState(false);

    return (
        <nav className="p-4 md:pb-8 flex sm:justify-between md:justify-start items-center relative">
            {/* Logo toujours à gauche */}
            <Link href="/" className="text-lg md:text-3xl font-bold text-black hover:text-gray-500">
                Logo
            </Link>
            {/* Liens desktop à gauche du menu */}
            <ul className="hidden md:flex items-center gap-4 ml-8">
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
                </ul>
            )}
        </nav>
    );
};

export default Navbar;