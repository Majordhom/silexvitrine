"use client";

import React from 'react';
import Link from 'next/link';
import FbIcon from "@/app/_lib/ui-kit/svg/icon_fb";
import InstaIcon from "@/app/_lib/ui-kit/svg/icon_insta";
import XIcon from "@/app/_lib/ui-kit/svg/icon_x";
import LinkedIcon from "@/app/_lib/ui-kit/svg/icon_linked";
import YoutubeIcon from "@/app/_lib/ui-kit/svg/icon_youtube";

const bottomLinks = [
    { label: 'Politique de confidentialité', url: '/theo/politique-confidentialite' },
    { label: 'Conditions de Service', url: '/theo/conditions-service' },
    { label: 'Mentions légales', url: '/theo/mentions-legales' },
];

export default function Footer() {
    return (
        <footer className="bg-black text-white p-0 min-h-[500px] flex flex-col justify-between">
            <style>
                {`
                @media (max-width: 900px) {
                    .footer-main {
                        flex-direction: column !important;
                        padding: 32px 16px 16px 16px !important;
                        gap: 32px;
                    }
                    .footer-right {
                        /* flex-direction: column !important; */
                        gap: 32px !important;
                        margin-top: 32px;
                    }
                    .footer-bottom {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 16px;
                        padding: 16px !important;
                    }
                    .footer-bottom-links {
                        flex-wrap: wrap !important;
                        gap: 16px !important;
                        margin-bottom: 0 !important;
                    }
                    .footer-copyright {
                        order: 2;
                        width: 100%;
                        margin-top: 16px;
                    }
                }
                `}
            </style>
            <div
                className="footer-main flex flex-1 px-16 pt-12 pb-8 justify-between max-[900px]:flex-col max-[900px]:px-4 max-[900px]:pt-8 max-[900px]:pb-4 max-[900px]:gap-8">
                {/* Partie gauche */}
                <div className="max-w-[350px]">
                    <h2 className="text-[32px] m-0 font-bold tracking-wider">{process.env.NEXT_PUBLIC_CONFIG_NAME}</h2>
                    <div className="my-6 mb-2 text-base">
                        {process.env.NEXT_PUBLIC_CONFIG_ADRESSE}<br/>
                        {process.env.NEXT_PUBLIC_CONFIG_VILLE}
                    </div>
                    <div className="mb-2 text-base">
                        Tél : <a href={process.env.NEXT_PUBLIC_CONFIG_TELEPHONE} className="text-white underline">{process.env.NEXT_PUBLIC_CONFIG_TELEPHONE}</a><br/>
                        Email : <a href={process.env.NEXT_PUBLIC_CONFIG_EMAIL}
                                   className="text-white underline">{process.env.NEXT_PUBLIC_CONFIG_EMAIL}</a>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                              className="text-white"
                              aria-label="Facebook">
                            <FbIcon width={24} height={24}/>
                        </Link>
                        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                              className="text-white"
                              aria-label="Instagram">
                            <InstaIcon width={24} height={24}/>
                        </Link>
                        <Link href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white" aria-label="X.com">
                            <XIcon width={24} height={24}/>
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                              className="text-white"
                              aria-label="LinkedIn">
                            <LinkedIcon width={24} height={24}/>
                        </Link>
                        <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                              className="text-white"
                              aria-label="YouTube">
                            <YoutubeIcon width={24} height={24}/>
                        </Link>
                    </div>
                </div>
                {/* Partie droite */}
                <div className="footer-right flex gap-16 max-[900px]:flex-row max-[900px]:gap-8 max-[900px]:mt-8">
                    <div className="flex flex-col gap-3">
                        <Link href="/theo" className="text-white text-base no-underline opacity-85">Accueil</Link>
                        <Link href="/theo/apropos" className="text-white text-base no-underline opacity-85">À propos</Link>
                        <Link href="/theo/annonces" className="text-white text-base no-underline opacity-85">Nos biens</Link>
                        <Link href="/theo/blog" className="text-white text-base no-underline opacity-85">Blog</Link>
                        <Link href="/theo/contact" className="text-white text-base no-underline opacity-85">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href="/theo/services" className="text-white text-base no-underline opacity-85">Nos services</Link>
                        <Link href="/theo/faq" className="text-white text-base no-underline opacity-85">FAQ</Link>
                        <Link href="/theo/newsletter" className="text-white text-base no-underline opacity-85">Newsletter</Link>
                        <Link href="/theo/plan-du-site" className="text-white text-base no-underline opacity-85">Plan du site</Link>
                    </div>
                </div>
            </div>
            {/* Séparateur */}
            <hr className="border-none border-t border-white m-0 opacity-20"/>
            {/* Bas du footer */}
            <div
                className="footer-bottom flex justify-between items-center px-16 py-6 text-[15px] max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4 max-[900px]:px-4 max-[900px]:py-4">
                {/* Copyright à gauche (desktop), en bas (mobile) */}
                <div className="footer-copyright order-1 max-[900px]:order-2 max-[900px]:w-full max-[900px]:mt-4">
                    © 2025 POUET. Tous droits réservés.
                </div>
                {/* Liens à droite (desktop), en haut (mobile) */}
                <div
                    className="footer-bottom-links flex gap-8 flex-nowrap mb-0 order-2 max-[900px]:order-1 max-[900px]:flex-wrap max-[900px]:gap-4">
                    {bottomLinks.map(link => (
                        <a key={link.label} href={link.url} className="text-white underline opacity-85">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}