import ModalSearch from "@/app/_lib/components/modalSearch";

export default function Accueil() {
    return (
        <div>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold text-center sm:text-left">Bienvenue sur Silex</h1>
                <ModalSearch />
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}