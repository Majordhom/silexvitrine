"use client";

import React, { useState } from "react";
import SearchForm from "@/app/_lib/components/searchForm";
import { Modal, ModalHeader, ModalBody} from "@/app/_lib/ui-kit/components/modal";
import { Buttonsearch } from "@/app/_lib/ui-kit/components/buttonsearch";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const ModalSearch: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialValues = useMemo(() => ({
        nb_pieces: searchParams.get("nb_pieces") || "",
        type_bien: searchParams.getAll("type_bien").length > 0 ? searchParams.getAll("type_bien") : (searchParams.get("type_bien") ? [searchParams.get("type_bien") as string] : []),
        prixMin: searchParams.get("prixMin") || "",
        prixMax: searchParams.get("prixMax") || "",
        secteurs: searchParams.getAll("secteurs") || [],
    }), [searchParams]);

    const handleSearch = async (filters: Record<string, any>) => {
        // Envoi à l'API data-search avec "secteurs"
        await fetch("/api/data-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters), // <-- "secteurs" inclus
        });
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v));
            } else if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        router.push(`/annonces?${params.toString()}`);
        setIsModalOpen(false);
    };

    return (
        <>
            <Buttonsearch className={"self-center w-full sm:w-auto rounded-full z-10"}
                          onClick={() => setIsModalOpen(true)}
                          color="primary">
                Filtrer
            </Buttonsearch>

            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} size="md">
                <ModalHeader>Recherche de biens immobiliers</ModalHeader>
                <ModalBody>
                    <SearchForm onSubmit={handleSearch} initialValues={initialValues} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalSearch;