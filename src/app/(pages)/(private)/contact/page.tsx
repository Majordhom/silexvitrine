import Image from "next/image";
import {prisma} from "@/app/_lib/prisma";
import {revalidatePath} from "next/cache";
import ContactForm from "@/app/_lib/components/contactForm";

export default async function Contact() {

    return (
        <div className="bg-gray-100 rounded-2xl px-4 py-8 p-6 md:p-8 max-w-4xl mx-auto">
            <ContactForm/>
        </div>
    );
}