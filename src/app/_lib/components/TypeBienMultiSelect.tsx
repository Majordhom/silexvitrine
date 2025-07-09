// src/app/_lib/components/TypeBienMultiSelect.tsx
import { SelectMultiple } from "@/app/_lib/ui-kit/components/select";

type TypeBienMultiSelectProps = {
    value?: string[];
    onChange?: (types: string[]) => void;
    options: { key: string; label: string }[];
};

export default function TypeBienMultiSelect({ value = [], onChange, options }: TypeBienMultiSelectProps) {
    return (
        <div>
            <label className="block mb-1 font-semibold">Type de bien</label>
            <SelectMultiple
                values={value}
                onChange={onChange}
                options={options}
                placeholder="Sélectionnez..."
            />
        </div>
    );
}