"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmPage() {
    const [message, setMessage] = useState("Validation en cours...");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const confirmSubscription = async () => {
            if (!token) {
                setMessage("Token manquant dans l'URL.");
                return;
            }

            const res = await fetch(`/api/newsletter/confirm?token=${token}`);
            const data = await res.json();

            setMessage(data.message);
        };

        confirmSubscription();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-2xl text-primary font-bold my-6">Confirmation d'inscription</h1>
            <p className="text-center text-success text-lg">{message}</p>
        </div>
    );
}
