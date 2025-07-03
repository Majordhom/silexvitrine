import type { Metadata } from "next";
import ContactForm from "@/app/_lib/components/contactForm";

export const metadata: Metadata = {
    title: "Contactez-nous",
    description: "Application développée par Tremplin",
};
export default async function Contact() {

    const subjetOptions = [
        {key: "Demande d'information", label: "Demande d'information"},
        {key: "Proposition de partenariat", label: "Proposition de partenariat"},
        {key: "autre", label: "Autre"}
    ]
    return (
        <div className="bg-gray-100 rounded-2xl px-4 py-8 p-6 md:p-8 max-w-4xl mx-auto">
            <ContactForm
                subjectOptions={ subjetOptions }
                defaultSubject={subjetOptions[0].key}
            />
        </div>
    );
}