import Image from "next/image";
import {prisma} from "@/app/_lib/prisma";
import {revalidatePath} from "next/cache";
import ContactForm from "@/app/_lib/components/contactForm";

export default async function Contact() {

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8">
            <ContactForm/>
        </div>
    );
}