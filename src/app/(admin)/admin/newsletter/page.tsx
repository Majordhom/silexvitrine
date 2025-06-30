"use client";

import {useState} from "react";
import {Button} from "@/app/_lib/ui-kit/components/button";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/_lib/ui-kit/components/modal";
import {Textarea} from "@/app/_lib/ui-kit/components/textarea";
import toast from "react-hot-toast";

type Abonne = {
    id: string;
    email: string;
    statutActif: boolean;
    dateInscription: string;
    dateDesinscription: string | null;
};

export default function AdminNewsletterPage() {
    const [abonnes, setAbonnes] = useState<Abonne[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadAbonnes = async () => {
        const res = await fetch("/api/admin/newsletter/list");
        const data = await res.json();
        setAbonnes(data);
    };

    const handleUnsubscribe = async (id: string) => {
        setIsSubmitting(true);
        await fetch(`/api/admin/newsletter/unsubscribe?id=${id}`, { method: "PATCH" });
        setIsSubmitting(false);
        loadAbonnes();
    };

    const handleDelete = async (id: string) => {
        setIsSubmitting(true);
        await fetch(`/api/admin/newsletter/delete?id=${id}`, { method: "DELETE" });
        setIsSubmitting(false);
        loadAbonnes();
    };

    const handleSendNewsletter = async (id: string, message:string) => {
        setIsSubmitting(true);
        const res = await fetch(`/api/admin/newsletter/send?id=${id}`, {
            method: "POST",
            body: JSON.stringify({message}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.ok) {
            toast.success("Newsletter envoyée avec succès.");
        } else {
            const errorData = await res.json();
            toast.error(`Échec de l’envoi : ${errorData.error || "Erreur inconnue"}`);
        }
        setIsSubmitting(false);
    };

    const handleSendAllNewsletter = async (message: string) => {
        setIsSubmitting(true);
        const res = await fetch("/api/admin/newsletter/send-all", {
            method: "POST",
            body: JSON.stringify({message}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            const data = await res.json();
            toast.success(`Newsletter envoyée à ${data.sent} abonnés.`);
        } else {
            const errorData = await res.json();
            toast.error(`Échec de l’envoi : ${errorData.error || "Erreur inconnue"}`);
        }
        setIsSubmitting(false);
    };


    const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const [isSendAllModalOpen, setIsSendAllModalOpen] = useState(false);

    const [selectedAbonne, setSelectedAbonne] = useState<Abonne | null>(null);
    const [customMessage, setCustomMessage] = useState("");
    const [collectiveMessage, setCollectiveMessage] = useState("");


    const openUnsubscribeModal = (abonne: Abonne) => {
        setSelectedAbonne(abonne);
        setIsUnsubscribeModalOpen(true);
    };

    const openDeleteModal = (abonne: Abonne) => {
        setSelectedAbonne(abonne);
        setIsDeleteModalOpen(true);
    };

    const openSendModal = (abonne: Abonne) => {
        setSelectedAbonne(abonne);
        setIsSendModalOpen(true);
    };





    return (
        <div className="min-h-screen max-w-6xl mx-auto bg-white rounded shadow p-8">
            <h1 className="text-2xl text-primary font-bold mb-4">Dashboard Newsletter</h1>
            <div className="flex gap-4">
                <Button onClick={loadAbonnes} className="mb-6" variant="chip-bordered">
                    Charger les abonnés
                </Button>

                <Button
                    onClick={() => setIsSendAllModalOpen(true)}
                    className="mb-6"
                    variant="chip-bordered"
                >
                    Envoyer à tous
                </Button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-300">
                <table className="table-auto w-full">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-2 whitespace-nowrap">Email</th>
                        <th className="text-left p-2 whitespace-nowrap">Actif</th>
                        <th className="text-left p-2 whitespace-nowrap">Inscrit le</th>
                        <th className="text-left p-2 whitespace-nowrap">Désinscrit le</th>
                        <th className="text-center p-2">Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {abonnes.map((abonne) => (
                        <tr key={abonne.id} className="border-t">
                            <td className="p-2 whitespace-nowrap">{abonne.email}</td>
                            <td className="p-2 whitespace-nowrap">{abonne.statutActif ? "Oui" : "Non"}</td>
                            <td className="p-2 whitespace-nowrap">{new Date(abonne.dateInscription).toLocaleString()}</td>
                            <td className="p-2 whitespace-nowrap">
                                {abonne.dateDesinscription
                                    ? new Date(abonne.dateDesinscription).toLocaleString()
                                    : "-"}
                            </td>
                            <td className="p-2 flex gap-2">
                                <Button
                                    variant="chip-bordered"
                                    className="text-red bg-white hover:bg-red hover:text-white transition-colors"
                                    isDisabled={!abonne.statutActif}
                                    onClick={() => openUnsubscribeModal(abonne)}
                                >
                                    Désinscrire
                                </Button>
                                <Button
                                    variant="chip-bordered"
                                    className="text-primary bg-white hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => openDeleteModal(abonne)}
                                >
                                    Supprimer
                                </Button>
                                <Button
                                    variant="chip-bordered"
                                    className="text-primary bg-white hover:bg-primary hover:text-white transition-colors"
                                    isDisabled={!abonne.statutActif}
                                    onClick={() => openSendModal(abonne)}
                                >
                                    Envoyer Newsletter
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

            {/*Modal pour désinscrire un abonné*/}
            <Modal isOpen={isUnsubscribeModalOpen} setIsOpen={setIsUnsubscribeModalOpen}>
                <ModalHeader className="text-primary">Désinscription</ModalHeader>
                <ModalBody>
                    Confirmer la désinscription de {selectedAbonne?.email} ?
                </ModalBody>
                <ModalFooter>
                    <Button variant="chip-bordered" onClick={() => setIsUnsubscribeModalOpen(false)}>Annuler</Button>
                    <Button
                        variant="chip-bordered"
                        onClick={async () => {
                            if (selectedAbonne) await handleUnsubscribe(selectedAbonne.id);
                            setIsUnsubscribeModalOpen(false);
                        }}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? "Traitement en cours..." : "Confirmer"}
                    </Button>
                </ModalFooter>
            </Modal>

            {/*Modal pour supprimer un abonné*/}
            <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}>
                <ModalHeader className="text-primary">Suppression</ModalHeader>
                <ModalBody>
                    Supprimer définitivement {selectedAbonne?.email} ?
                </ModalBody>
                <ModalFooter>
                    <Button variant="chip-bordered" onClick={() => setIsDeleteModalOpen(false)}>Annuler</Button>
                    <Button
                        variant="chip-bordered"
                        onClick={async () => {
                            if (selectedAbonne) await handleDelete(selectedAbonne.id);
                            setIsDeleteModalOpen(false);
                        }}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? "Suppression en cours..." : "Confirmer"}
                    </Button>
                </ModalFooter>
            </Modal>

            {/*Modal pour envoyer une newsletter*/}
            <Modal isOpen={isSendModalOpen} setIsOpen={setIsSendModalOpen}>
                <ModalHeader className="text-primary">Envoyer une newsletter</ModalHeader>
                <ModalBody>
                    <p className="mb-4">Contenu du message pour {selectedAbonne?.email} :</p>
                    <Textarea
                        className="w-full h-40 p-2 border border-gray-300 rounded"
                        value={customMessage}
                        onChange={(value) => setCustomMessage(value)}
                        placeholder="Écrivez votre contenu ici..."
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="chip-bordered" onClick={() => setIsSendModalOpen(false)}>Annuler</Button>
                    <Button
                        variant="chip-bordered"
                        onClick={async () => {
                            if (selectedAbonne) {
                                await handleSendNewsletter(selectedAbonne.id, customMessage);
                                setIsSendModalOpen(false);
                                setCustomMessage(""); // reset après envoi
                            }
                        }}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? "Envoi en cours..." : "Confirmer l’envoi"}
                    </Button>
                </ModalFooter>
            </Modal>

            {/*Modal pour envoyer une newsletter à tous*/}
            <Modal isOpen={isSendAllModalOpen} setIsOpen={setIsSendAllModalOpen}>
                <ModalHeader className="text-primary">Envoyer à tous les abonnés actifs</ModalHeader>
                <ModalBody>
                    <p className="mb-4">Message commun :</p>
                    <Textarea
                        className="w-full h-40 p-2 border border-gray-300 rounded"
                        value={collectiveMessage}
                        onChange={(value) => setCollectiveMessage(value)}
                        placeholder="Votre message ici..."
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="chip-bordered" onClick={() => setIsSendAllModalOpen(false)}>Annuler</Button>
                    <Button
                        variant="chip-bordered"
                        onClick={async () => {
                            await handleSendAllNewsletter(collectiveMessage);
                            setIsSendAllModalOpen(false);
                            setCollectiveMessage("");
                        }}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting? "Envoi en cours..." : "Confirmer l’envoi"}
                    </Button>
                </ModalFooter>
            </Modal>



        </div>
    );
}
