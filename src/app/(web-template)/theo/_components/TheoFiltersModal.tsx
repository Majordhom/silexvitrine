"use client";
import { useEffect, useMemo, useState } from "react";
import { Modal, ModalBody } from "@/app/_lib/ui-kit/components/modal";
import { Button } from "@/app/_lib/ui-kit/components/button";
import SecteursInput from "@/app/_lib/components/SecteursInput";
import { FilterOption, SearchCriteria } from "@/types/filters";

type TheoFiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialCriteria: SearchCriteria;
  onApply: (criteria: SearchCriteria) => void;
  typesBien: FilterOption[];
  secteurs: FilterOption[];
};

export default function TheoFiltersModal({
  isOpen,
  onClose,
  initialCriteria,
  onApply,
  typesBien,
  secteurs,
}: TheoFiltersModalProps) {
  const [local, setLocal] = useState<SearchCriteria>(initialCriteria || {});

  useEffect(() => {
    setLocal(initialCriteria || {});
  }, [initialCriteria, isOpen]);

  const updateField = (field: keyof SearchCriteria, value: any) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
  };

  const toggleItemInArray = (
    field: keyof SearchCriteria,
    value: string,
    singleSelect = false
  ) => {
    setLocal((prev) => {
      const current = (prev[field] as string[]) || [];
      if (singleSelect) {
        return { ...prev, [field]: current.includes(value) ? [] : [value] };
      }
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const nbPiecesOptions = useMemo(
    () => [
      { key: "", label: "Tout" },
      { key: "1", label: "1 pièce" },
      { key: "2", label: "2 pièces" },
      { key: "3", label: "3 pièces" },
      { key: "4", label: "4 pièces" },
      { key: "5", label: "+4 pièces" },
    ],
    []
  );

  const prixMin = local.prixMin ?? undefined;
  const prixMax = local.prixMax ?? undefined;

  // Dual range slider helpers
  const [minPrice, setMinPrice] = useState<number>(prixMin ?? 0);
  const [maxPrice, setMaxPrice] = useState<number>(prixMax ?? 1000000);
  const minGap = 1000;

  useEffect(() => {
    setMinPrice(prixMin ?? 0);
    setMaxPrice(prixMax ?? 1000000);
  }, [prixMin, prixMax, isOpen]);

  const applyPrices = () => {
    updateField("prixMin", minPrice || undefined);
    updateField("prixMax", maxPrice || undefined);
  };

  const applyAndClose = () => {
    applyPrices();
    onApply(local);
    onClose();
  };

  const chipBase =
    "px-4 py-2 rounded-full border text-sm transition-colors select-none";
  const chipActive = "bg-blue-600 text-white border-blue-600";
  const chipInactive = "bg-white text-gray-700 border-gray-300";

  return (
    <Modal isOpen={isOpen} setIsOpen={() => onClose()} size="full">
      <ModalBody>
        <div className="space-y-6">
          {/* Tranche de prix */}
          <div>
            <h3 className="text-xl font-semibold">Tranche de prix</h3>
            <div className="mt-6">
              {/* Slider track */}
              <div className="relative w-full max-w-xl">
                <div className="h-2 bg-gray-300 rounded-full" />
                <div className="absolute inset-x-0 -top-3 flex items-center justify-between">
                  <div className="relative w-full">
                    {/* min range */}
                    <input
                      type="range"
                      min={0}
                      max={2000000}
                      step={1000}
                      value={minPrice}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (maxPrice - v < minGap) return;
                        setMinPrice(v);
                      }}
                      className="absolute w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                      aria-label="Prix minimum"
                    />
                    {/* max range */}
                    <input
                      type="range"
                      min={0}
                      max={2000000}
                      step={1000}
                      value={maxPrice}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v - minPrice < minGap) return;
                        setMaxPrice(v);
                      }}
                      className="absolute w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                      aria-label="Prix maximum"
                    />
                  </div>
                </div>
                <div className="mt-8 text-blue-700 font-semibold">
                  {maxPrice.toLocaleString("fr-FR")} €
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6 max-w-xl">
                <input
                  type="number"
                  placeholder="prix minimum"
                  value={minPrice || ""}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="border border-gray-300 rounded-full h-12 px-4"
                />
                <input
                  type="number"
                  placeholder="prix maximum"
                  value={maxPrice || ""}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="border border-gray-300 rounded-full h-12 px-4"
                />
              </div>
            </div>
          </div>

          {/* Nombre de pièces */}
          <div>
            <h3 className="text-xl font-semibold">Nombre de pièces</h3>
            <div className="flex flex-wrap gap-3 mt-4">
              {nbPiecesOptions.map((opt) => {
                const selected = String(local.nb_pieces ?? "") === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() =>
                      updateField(
                        "nb_pieces",
                        opt.key === "" ? undefined : parseInt(opt.key, 10)
                      )
                    }
                    className={`${chipBase} ${
                      selected ? chipActive : chipInactive
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type de bien */}
          {!!typesBien.length && (
            <div>
              <h3 className="text-xl font-semibold">Type de bien</h3>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => updateField("type_bien", [])}
                  className={`${chipBase} ${
                    (local.type_bien || []).length === 0 ? chipActive : chipInactive
                  }`}
                >
                  Tout
                </button>
                {typesBien.slice(0, 8).map((t) => {
                  const selected = (local.type_bien || []).includes(t.key);
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => toggleItemInArray("type_bien", t.key)}
                      className={`${chipBase} ${
                        selected ? chipActive : chipInactive
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Secteur & Surface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold">Secteur</h3>
              <div className="mt-4 max-w-md">
                <SecteursInput
                  value={local.secteurs || []}
                  onChange={(s) => updateField("secteurs", s)}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Surface</h3>
              <div className="mt-4 max-w-md">
                <input
                  type="number"
                  placeholder="surface minimum"
                  value={local.surface_min || ""}
                  onChange={(e) =>
                    updateField(
                      "surface_min",
                      e.target.value ? parseInt(e.target.value, 10) : undefined
                    )
                  }
                  className="border border-gray-300 rounded-full h-12 px-4 w-full"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-8">
            <a className="text-blue-700 underline" href="/theo/annonces">
              rechercher un bien
            </a>
            <div className="flex gap-3">
              <Button
                variant="shadow"
                onClick={() => {
                  setLocal({});
                }}
              >
                Réinitialiser
              </Button>
              <Button color="primary" variant="solid" onClick={applyAndClose}>
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

