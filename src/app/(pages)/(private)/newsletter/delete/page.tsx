"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {Button} from "@/app/_lib/ui-kit/components/button";

export default function DeletePage() {
    const [message, setMessage] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleDelete = async () => {
        if (!token) {
            setMessage("Token manquant dans l'URL.");
            return;
        }

        const res = await fetch(`/api/newsletter/delete?token=${token}`, { method: "DELETE" });
        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-2xl font-bold mb-4">Suppression de vos données</h1>

            {!message && !confirmed && (
                <>
                    <p className="text-center text-lg max-w-md mb-6">
                        En supprimant vos données, vous perdrez définitivement toutes les informations associées à notre newsletter et ne recevrez plus aucun message de notre part.
                    </p>
                    <Button
                        onClick={() => setConfirmed(true)}
                        className="bg-red-600 hover:bg-red-700"
                        variant="chip"
                    >
                        Supprimer mes données
                    </Button>
                </>
            )}

            {confirmed && !message && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg font-medium">Confirmez-vous la suppression définitive de vos données ?</p>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                            variant="chip"
                        >
                            Oui, supprimer
                        </Button>
                        <a
                            href="/"
                            className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-full"
                        >
                            Annuler
                        </a>
                    </div>
                </div>
            )}

            {message && (
                <p className="text-center text-green-600 text-lg mt-6">{message}</p>
            )}
        </div>
    );
}
