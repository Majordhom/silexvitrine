"use client";

import React, { useState } from "react";
import SearchForm from "@/app/_lib/components/searchForm";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/app/_lib/ui-kit/components/modal";
import { Button } from "@/app/_lib/ui-kit/components/button";

const ModalSearch: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Button className={"self-center"}
                    onClick={() => setIsModalOpen(true)}
                    color="primary">
                Filtrer
            </Button>

            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} size="md">
                <ModalHeader>Recherche de biens immobiliers</ModalHeader>
                <ModalBody>
                    <SearchForm />
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalSearch;