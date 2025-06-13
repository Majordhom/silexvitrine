"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

interface INavbarProps {}

const navItems = [
    {
        id: "(accueil)",
        label: "Accueil",
        href: "/",
    },
    {
        id: "annonces",
        label: "Annonces",
        href: "/annonces",
    },
    {
        id: "contact",
        label: "Contact",
        href: "/contact",
    },
];

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
    const pathname = usePathname();
    const isActive = (path: Url) => pathname === path;

    return (
        <nav className="p-4 md:pb-8 flex justify-between items-center">
            <Link
                href="/"
                className="text-lg md:text-3xl font-bold text-spotify-green"
            >
                webapp
            </Link>
            <ul className="flex justify-end items-center gap-4">
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
        </nav>
    );
};

export default Navbar;



