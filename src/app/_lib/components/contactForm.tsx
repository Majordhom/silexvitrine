"use client";
import { useState } from "react";
import { Button } from "@/app/_lib/ui-kit/components/button";
import { Input } from "@/app/_lib/ui-kit/components/input";
import { Select } from "@/app/_lib/ui-kit/components/select";
import { Textarea } from "@/app/_lib/ui-kit/components/textarea";
import toast from "react-hot-toast";

type ContactFormProps = {
    className?: string;
    subjectOptions: Array<{ key: string; label: string }>;
    defaultSubject?: string | null;
}

const ContactForm = ({className, subjectOptions, defaultSubject = null}: ContactFormProps) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: defaultSubject,
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.email) {
            // alert("L'email est obligatoire.");
            toast.error("L'email est obligatoire.");
            return;
        }
        setIsSubmitting(true);

        // Envoi à l'API
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erreur inconnue");
            }

            // console.log("Données enregistrées :", data);
            // alert("Merci pour votre message !");
            toast.success("Merci pour votre message !");
        } catch (error: any) {
            // alert("Erreur : " + error.message);
            toast.error("Erreur : " + error.message);
        } finally {
            setIsSubmitting(false);
        }

    };


    return (
        <div className={className}>
            <div className="text-center mb-4 p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    Contactez-nous
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Nous sommes là pour vous aider.
                </p>
            </div>

            <div className="rounded-2xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Prénom et Nom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Prénom"
                            value={formData.firstName}
                            onChange={(value) => handleChange("firstName", value)}
                            placeholder="Votre prénom"
                        />
                        <Input
                            label="Nom de famille"
                            value={formData.lastName}
                            onChange={(value) => handleChange("lastName", value)}
                            placeholder="Votre nom"
                        />
                    </div>

                    {/* Email et Téléphone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Email"
                            value={formData.email}
                            onChange={(value) => handleChange("email", value)}
                            placeholder="votre@email.com"
                            type="email"
                        />
                        <Input
                            label="Téléphone"
                            value={formData.phone}
                            onChange={(value) => handleChange("phone", value)}
                            placeholder="+33 1 23 45 67 89"
                            type="tel"
                        />
                    </div>

                    {/* Sujet */}
                    <div>
                        <Select
                            label="Choisissez un sujet"
                            value={formData.subject}
                            onChange={(key) => handleChange("subject", key || "")}
                            options={subjectOptions}
                            placeholder="Sélectionnez un..."
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <Textarea
                            value={formData.message}
                            onChange={(value) => handleChange("message", value)}
                            placeholder="Tapez votre message..."
                            rows={5}
                            aria-label="Message"
                        />
                    </div>

                    {/* Bouton d'envoi */}
                    <div className="pt-4 flex justify-center md:justify-end">
                        <Button
                            variant="chip"
                            color="primary"
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;