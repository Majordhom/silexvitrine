"use client";
// export const dynamic = "force-dynamic"; //ça sert à forcer le rendu côté serveur pour cette page

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Button} from "@/app/_lib/ui-kit/components/button";

export default function UnsubscribePage() {
    const [message, setMessage] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleUnsubscribe = async () => {
        if (!token) {
            setMessage("Token manquant dans l'URL.");
            return;
        }

        setIsSubmitting(true); // Désactive le bouton pour éviter les soumissions multiples
        try {
            const res = await fetch(`/api/newsletter/unsubscribe?token=${token}`);
            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.message || "Une erreur est survenue lors de la désinscription.");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
        }finally {
            setIsSubmitting(true) // Réactive le bouton dans tous les cas
        }
    }

    return (
        <div
            className="flex flex-col items-center justify-start min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-2xl text-primary font-bold my-6">Désinscription</h1>

            {!message && !confirmed && (
                <>
                    <p className="text-center text-lg max-w-md mb-6">
                        En cliquant sur « Se désabonner », vous ne recevrez plus aucun email marketing de la part de
                        SilexVitrine.
                        Vous conserverez cependant vos données de manière sécurisée, sauf demande explicite de
                        suppression.
                    </p>
                    <Button
                        onClick={() => setConfirmed(true)}
                        className="bg-red"
                        variant="chip"
                    >
                        Se désabonner
                    </Button>
                </>
            )}

            {confirmed && !message && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg font-medium">Confirmez-vous votre désinscription ?</p>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleUnsubscribe}
                            className="bg-red"
                            variant="chip"
                            isLoading={isSubmitting}
                        >
                            {isSubmitting ? "Traitement..." : "Oui, me désinscrire"}
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
