import { Input } from "@/app/_lib/ui-kit/components/input";
import { Select } from "@/app/_lib/ui-kit/components/select";

type FieldProps = {
    type: "input" | "select";
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: { key: string; label: string }[];
    placeholder?: string;
    inputType?: string;
    min?: string;
};

export default function SearchFormField(props: FieldProps) {
    if (props.type === "select") {
        return (
            <Select
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                options={props.options || []}
                placeholder={props.placeholder}
            />
        );
    }
    return (
        <Input
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            type={props.inputType || "text"}
            min={props.min}
        />
    );
}