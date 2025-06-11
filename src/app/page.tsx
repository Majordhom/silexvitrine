"use client";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/app/_lib/ui-kit/components/modal";
import { Button } from "@/app/_lib/ui-kit/components/button";
import SearchForm from "@/app/_lib/components/searchForm";
import Image from "next/image";

export default function Accueil() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-gradient-to-tr from-fuchsia-50 from-5% via-white via-50% to-fuchsia-50 to-95% grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold text-center sm:text-left">Bienvenue sur Silex</h1>
                {/* Bouton modale */}
                <Button className={"self-center"} onClick={() => setIsModalOpen(true)}>
                    Rechercher
                </Button>

                {/* Modale */}
                <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} size="md">
                    <ModalHeader>Recherche de biens immobiliers</ModalHeader>
                    <ModalBody>
                        <SearchForm />
                    </ModalBody>
                    {/*<ModalFooter>*/}
                    {/*    <Button variant="shadow" onClick={() => setIsModalOpen(false)}>*/}
                    {/*        Fermer*/}
                    {/*    </Button>*/}
                    {/*</ModalFooter>*/}
                </Modal>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}