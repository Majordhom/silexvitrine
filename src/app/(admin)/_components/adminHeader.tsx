"use client";

import { useSession, signOut } from "next-auth/react";
import {Button} from "@/app/_lib/ui-kit/components/button";

export default function AdminHeader() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="text-gray-800">Connecté : <strong>{session.user?.email}</strong></span>
            <Button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                variant="chip-bordered"
                className="text-red bg-white hover:bg-red hover:text-white transition-colors"
            >
                Se déconnecter
            </Button>
        </div>
    );
}
