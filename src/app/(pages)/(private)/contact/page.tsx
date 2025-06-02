import Image from "next/image";
import {prisma} from "@/app/_lib/prisma";
import {revalidatePath} from "next/cache";

export default async function Contact() {

    return (
        <div className="bg-gradient-to-tr from-fuchsia-50 from-5% via-white via-50% to-fuchsia-50 to-95% grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold text-center sm:text-left">Formulaire de Contact</h1>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}