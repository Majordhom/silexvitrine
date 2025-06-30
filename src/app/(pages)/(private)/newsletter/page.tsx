"use client";

import {useState, useEffect} from "react";
import {Input} from "@/app/_lib/ui-kit/components/input";
import {Button} from "@/app/_lib/ui-kit/components/button";

export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState<'success' | 'error' | 'default'>('default');
    const [isSubmitting, setIsSubmitting] = useState(false);

    //timer pour effacer le message
    const [messageTimer, setMessageTimer] = useState<NodeJS.Timeout | null>(null);

    const showMessage = (newMessage: string, status: 'error' | 'success' | 'default') => {
        // Annuler le timer précédent s'il existe
        if (messageTimer) {
            clearTimeout(messageTimer);
        }

        setMessage(newMessage);
        setMessageStatus(status);

        // Configurer un nouveau timer pour effacer le message après 5 secondes
        const timer = setTimeout(() => {
            setMessage("");
            setMessageStatus('default');
        }, 5000);

        setMessageTimer(timer);
    };


    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true); // Désactive le bouton pour éviter les soumissions multiples
        setMessageStatus('default');
        setMessage("");
        try {
            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: email.trim().toLowerCase()}),
            });

            const data = await res.json();
            showMessage(data.message, res.ok ? 'success' : 'error');
            setEmail("");
        } catch (error) {
            setMessage("Erreur lors de l'inscription. Réessaie.");
            setMessageStatus('error');
        }finally{
            setIsSubmitting(false); // Réactive le bouton dans tous les cas
        }
    };

    // Nettoyer le timer quand le composant est démonté
    useEffect(() => {
        return () => {
            if (messageTimer) {
                clearTimeout(messageTimer);
            }
        };
    }, [messageTimer]);

    return (
        <div
            className="flex flex-col items-center justify-start min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-3xl text-primary font-bold my-6">Inscription à la Newsletter</h1>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4 w-full max-w-md">
                <Input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    value={email}
                    onChange={value => setEmail(value)}
                    required
                    errorMessage={message}
                    status={messageStatus}
                />
                <Button
                    type="submit"
                    variant="chip"
                    color="primary"
                    className="self-end"
                    isLoading={isSubmitting}
                >
                    {isSubmitting ? "Envoi en cours..." : "S'inscrire"}
                </Button>
            </form>
        </div>
    );
}
