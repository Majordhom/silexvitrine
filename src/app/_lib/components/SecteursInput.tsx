import { useState } from "react";

type SecteursInputProps = {
    value?: string[];
    onChange?: (secteurs: string[]) => void;
};

export default function SecteursInput({ value = [], onChange }: SecteursInputProps) {
    const [input, setInput] = useState("");

    const secteurs = value;

    const addSecteur = () => {
        const cp = input.trim();
        if (/^\d{5}$/.test(cp) && !secteurs.includes(cp)) {
            const next = [...secteurs, cp];
            onChange?.(next);
        }
        setInput("");
    };

    const removeSecteur = (cp: string) => {
        const next = secteurs.filter(s => s !== cp);
        onChange?.(next);
    };

    return (
        <div>
            <label className="block mb-1 font-semibold">Secteurs</label>
            <div className="grid grid-cols-2 gap-6">
                <input
                    className="bg-white rounded-xl h-10 px-1 py-1"
                    type="text"
                    placeholder="Ex : 75001"
                    value={input}
                    onChange={e => setInput(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    onKeyDown={e => {
                        if (e.key === "Enter") addSecteur();
                    }}
                    maxLength={5}
                />
                <button
                    className="bg-primary text-white px-8 py-1 rounded-xl"
                    type="button"
                    disabled={input.length !== 5 || secteurs.includes(input)}
                    onClick={addSecteur}
                >
                    Ajouter
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {secteurs.map(cp => (
                    <span
                        key={cp}
                        className="bg-black text-white rounded-full px-3 py-1 flex items-center text-sm"
                    >
                        {cp}
                        <button
                            className="ml-2 text-white hover:text-red-400 focus:outline-none"
                            type="button"
                            onClick={() => removeSecteur(cp)}
                            aria-label="Supprimer"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}