"use client";

import React from 'react';
import Link from 'next/link';
import FbIcon from "@/app/_lib/ui-kit/svg/icon_fb";
import InstaIcon from "@/app/_lib/ui-kit/svg/icon_insta";
import XIcon from "@/app/_lib/ui-kit/svg/icon_x";
import LinkedIcon from "@/app/_lib/ui-kit/svg/icon_linked";
import YoutubeIcon from "@/app/_lib/ui-kit/svg/icon_youtube";

const bottomLinks = [
    { label: 'Politique de confidentialité', url: '#' },
    { label: 'Conditions de Service', url: '#' },
    { label: 'Paramètres des cookies', url: '#' },
];

export default function Footer() {
    return (
        <footer style={{
            background: '#000',
            color: '#fff',
            padding: '0',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div style={{
                display: 'flex',
                flex: 1,
                padding: '48px 64px 32px 64px',
                justifyContent: 'space-between'
            }}>
                {/* Partie gauche */}
                <div style={{ maxWidth: 350 }}>
                    <h2 style={{ fontSize: 32, margin: 0, fontWeight: 700, letterSpacing: 1 }}>Logo</h2>
                    <div style={{ margin: '24px 0 8px 0', fontSize: 16 }}>
                        123 Avenue des pas perdus<br />
                        13000 Gotham City, France
                    </div>
                    <div style={{ marginBottom: 8, fontSize: 16 }}>
                        Tél : <a href="tel:+33123456789" style={{ color: '#fff', textDecoration: 'underline' }}>01 23 45 67 89</a><br />
                        Email : <a href="mailto:contact@pouet.com" style={{ color: '#fff', textDecoration: 'underline' }}>contact@pouet.com</a>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
                            <FbIcon width={24} height={24} />
                        </Link>
                        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
                            <InstaIcon width={24} height={24} />
                        </Link>
                        <Link href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
                            <XIcon width={24} height={24} />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
                            <LinkedIcon width={24} height={24} />
                        </Link>
                        <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
                            <YoutubeIcon width={24} height={24} />
                        </Link>
                    </div>
                </div>
                {/* Partie droite */}
                <div style={{ display: 'flex', gap: 64 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Accueil</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>À propos</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Services</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Blog</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Contact</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>FAQ</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Support</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Carrières</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Presse</Link>
                        <Link href="/" style={{ color: '#fff', fontSize: 16, textDecoration: 'none', opacity: 0.85 }}>Partenaires</Link>
                    </div>
                </div>
            </div>
            {/* Séparateur */}
            <hr style={{ border: 'none', borderTop: '1px solid #fff', margin: 0, opacity: 0.2 }} />
            {/* Bas du footer */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 64px',
                fontSize: 15
            }}>
                <div>© 2025 POUET. Tous droits réservés.</div>
                <div style={{ display: 'flex', gap: 32 }}>
                    {bottomLinks.map(link => (
                        <a key={link.label} href={link.url} style={{ color: '#fff', textDecoration: 'underline', opacity: 0.85 }}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}