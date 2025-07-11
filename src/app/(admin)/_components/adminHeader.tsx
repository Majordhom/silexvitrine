"use client";

import { useSession, signOut } from "next-auth/react";
import {Button} from "@/app/_lib/ui-kit/components/button";
import Link from "next/link";

export default function AdminHeader() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className="flex flex-wrap items-center mb-8 gap-4 text-sm md:text-base">
            <span className="text-gray-800 whitespace-nowrap">
                Connecté : <strong>{session.user?.email}</strong>
            </span>
            <Button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                variant="chip-bordered"
                className="text-red bg-white hover:bg-red hover:text-white transition-colors"
            >
                Se déconnecter
            </Button>
            <Link
                href="/admin/search-stats"
                className="text-blue bg-white hover:bg-blue hover:text-white transition-colors px-4 py-1 rounded-full border border-blue"
            >
                Statistiques de recherche
            </Link>
            <Link
                href="/admin/newsletter"
                className="text-green bg-white hover:bg-green hover:text-white transition-colors px-4 py-1 rounded-full border border-green"
            >
                Inscriptions à la Newsletter
            </Link>
        </div>
    );
}
