import {KeyboardEventHandler, MouseEventHandler, ReactNode, Ref} from "react";

type Props = {
    value?: string | null,
    onChange?: (value: string) => void,
    type?: string,
    className?: string,
    classNames?: any,
    name?: string,
    isDisabled?: boolean,
    isInvalid?: boolean,
    label?: string | ReactNode,
    startContent?: string | ReactNode | ReactNode[],
    endContent?: string | ReactNode | ReactNode[],
    placeholder?: string,
    onKeyDown?: KeyboardEventHandler
    onClick?: MouseEventHandler,
    onBlur?: () => void,
    min?: number | string,
    max?: number | string,
    description?: string | ReactNode | ReactNode[],
    ref?: Ref<HTMLInputElement>
    errorMessage?: string,
    status?: 'error' | 'success' | 'default',
    required?: boolean,
}

export const Input = ({ref, classNames, description, onKeyDown, onClick, onBlur, value, onChange, type = 'text', className = '', name, isDisabled, isInvalid, label, startContent, endContent, placeholder, errorMessage, min, max, status = 'default', required}: Props) => {
    const minValue = type === 'number' ? (min !== undefined ? min : 0) : min;

    const handleChange = (newValue: string) => {
        if (onChange) {
            if (type === 'number') {
                const numValue = Number(newValue);

                if (newValue === '' || isNaN(numValue)) {
                    onChange(newValue);
                    return;
                }

                if (numValue < Number(minValue)) {
                    onChange(String(minValue));
                    return;
                }

                if (max !== undefined && numValue > Number(max)) {
                    onChange(String(max));
                    return;
                }
            }

            onChange(newValue);
        }
    };

    const handleKeyDown: KeyboardEventHandler = (e) => {
        if (type === 'number' && e.key === '-') {
            e.preventDefault();
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    const messageClass = status === 'error'? 'text-danger' : status === 'success' ? 'text-success' : 'text-textLight';

    return <label className={`flex flex-col ${className ?? ''} ${classNames?.base ?? ''}`}>
        {label && <span className={`text-sm ${classNames?.label ?? ''}`}>{label}</span>}
        <div className={`relative flex gap-1 border-1 border-transparent ${isDisabled ? ' !border-gray-100 ' : 'bg-white hover:bg-gray-200'} ${isInvalid ? '!border-danger bg-red-50' : ''}  transition-all duration-200 rounded-xl p-2 ${classNames?.input ?? ''}`}>
            {startContent && <div className={'flex-0 flex flex-row'}>{startContent}</div>}
            <input disabled={isDisabled}
                   ref={ref}
                   onKeyDown={handleKeyDown}
                   onClick={onClick}
                   onBlur={onBlur}
                   value={value ?? ''}
                   onChange={(event) => handleChange((event.target as HTMLInputElement).value)}
                   className={`bg-transparent text-sm flex-auto min-w-0 active:outline-none ${isDisabled ? 'text-textLight' : ''} ${classNames?.inputField ?? ''}}`}
                   type={type}
                   name={name}
                   min={minValue}
                   max={max}
                   placeholder={placeholder}
                   required={required}
            />
            {endContent && <div className={'flex-0 flex flex-row'}>{endContent}</div>}
        </div>
        {description && <span className="text-xs text-textLight">{description}</span>}
        {errorMessage && (
            <span className={`text-xs mt-1 p-2 ${messageClass}`}>
                    {errorMessage}
            </span>
        )}
    </label>
}
