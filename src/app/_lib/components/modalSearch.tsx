"use client";

import React, { useState } from "react";
import SearchForm from "@/app/_lib/components/searchForm";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/app/_lib/ui-kit/components/modal";
import { Buttonsearch } from "@/app/_lib/ui-kit/components/buttonsearch";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const ModalSearch: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialValues = useMemo(() => ({
        nb_pieces: searchParams.get("nb_pieces") || "",
        type_bien: searchParams.get("type_bien") || "",
        //energie_chauffage: searchParams.get("energie_chauffage") || "",
        prixMin: searchParams.get("prixMin") || "",
        prixMax: searchParams.get("prixMax") || "",
        secteur: searchParams.get("secteur") || "",
    }), [searchParams]);
    const handleSearch = async (filters: Record<string, string>) => {
        await fetch("/api/data-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
        });
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });
        router.push(`/annonces?${params.toString()}`);
        setIsModalOpen(false);
    };

    return (
        <>
            <Buttonsearch className={"self-center w-full sm:w-auto rounded-full"}
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