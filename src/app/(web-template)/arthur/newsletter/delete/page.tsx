"use client";
// export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {Button} from "@/app/_lib/ui-kit/components/button";

export default function DeletePage() {
    const [message, setMessage] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleDelete = async () => {
        if (!token) {
            setMessage("Token manquant dans l'URL.");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/newsletter/delete?token=${token}`, {method: "DELETE"});
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            }else{
                setMessage(data.message || "Une erreur est survenue lors de la suppression de vos données.");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-2xl font-bold my-6">Suppression de vos données</h1>

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
                            isLoading={isSubmitting}
                        >
                            {isSubmitting ? "Suppression..." : "Oui, supprimer"}
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
                <p className="text-center text-textLight text-lg mt-6">{message}</p>
            )}
        </div>
    );
}
