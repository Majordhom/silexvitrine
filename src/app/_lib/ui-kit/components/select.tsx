import React, {ReactNode, useEffect, useRef, useState} from "react";
import {CheckIcon} from "@heroicons/react/24/outline";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SelectProps = {
    name?: string,
    label?: ReactNode | string,
    value?: string | null,
    onChange?: (key: string) => void
    options: Option[],
    emptyOption?: Option | false,
    isDisabled?: boolean,
    placeholder?: string,
    isInvalid?: boolean,
    errorMessage?: string,
    className?: string,
}


type SelectMultipleProps = {
    name?: string,
    label?: ReactNode | string,
    values?: string[]
    onChange?: (keys: string[]) => void
    options: Option[],
    emptyOption?: Option | false,
    isDisabled?: boolean,
    placeholder?: string,
    isInvalid?: boolean,
    errorMessage?: string,
    className?: string,
    multiple?: boolean,
}

type Option = {
    key: string,
    label: ReactNode,
}

export const Select = (props: SelectProps) => {
    return SelectMultiple({...props,
        multiple: false,
        values: props.value ? [props.value] : [],
        onChange: props.onChange ?
            ((keys) => {
                props.onChange && props.onChange(keys.length > 0 ? keys[0] : '')
            })
            : undefined
    });
}

export const SelectMultiple = ({values = [], isInvalid, placeholder, errorMessage, onChange, options, name, label, isDisabled, className, multiple = true}: SelectMultipleProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [search, setSearch] = useState('')
    const popupRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef]);

    const onClickOption = (option: Option) => {

        let newArray = [...values]
        if (multiple) {
            if (values.includes(option.key)) {
                newArray = values.filter(o => o !== option.key)
            } else {
                newArray.push(option.key)
            }
        } else {
            setIsPopupOpen(false)
            if (values.includes(option.key)) {
                newArray = []
            } else {
                newArray = [option.key]
            }
        }

        onChange && onChange(newArray)
    }

    // cette fonction est utilisée pour supprimer une valeurs selectionnée de la liste
    const removeValue = (keyToRemove: string) => {
        const newArray = values.filter((key) => key !== keyToRemove);
        onChange && onChange(newArray);
    };

    const filterFunction = (option: Option) => {
        if (typeof  option.label === 'string') {
            return option.label.toString().toLowerCase().includes(search.toLowerCase())
        } else {
            return (option.key && option.key.toString().toLowerCase().includes(search.toLowerCase()))
        }
    }

    const openPopup = () => {
        setIsPopupOpen(true)
        inputRef.current?.focus()
    }


    return (
        <div ref={popupRef} className={`text-textLight relative flex flex-col text-sm  ${isPopupOpen ? 'z-50' : ''} ${isDisabled ? 'opacity-50 pointer-events-none' : ''} ${label ? 'pt-6' : ''} ${className ?? ''}`}>
            {/* label */}
            {label && <span className={`absolute z-10 -mt-6 text-black text-sm`}>{label}</span>}

            <div className={'absolute h-10 w-full'}> {/* absolute because the size is based on the hidden options */}
                {/* button */}
                <button className={`${isInvalid ? '!border-danger bg-red-50' : ''} border-1 border-transparent bg-white flex flex-row gap-1 justify-between items-center w-full cursor-pointer hover:bg-gray-200 transition-all duration-300 rounded-2xl whitespace-nowrap truncate h-full px-2`}
                        onClick={openPopup} type="button">
                    <div className="flex flex-wrap gap-1">
                        {options
                            .filter((o) => values.includes(o.key))
                            .map((o) => (
                                <span
                                    key={o.key}
                                    className="flex items-center gap-1 bg-primary text-white rounded-full px-2 py-0.5 text-xs"
                                >
                                    {o.label}
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeValue(o.key);
                                        }}
                                        className="cursor-pointer text-white hover:text-gray-100 ml-1"
                                    >
                                        <XMarkIcon className={'size-3'} />
                                    </span>
                                </span>
                            ))}
                    </div>

                    <ChevronDownIcon className={`size-3 transition-all duration-300 ${isPopupOpen ? 'rotate-180' : 'rotate-0'}`}/>
                </button>
                {errorMessage && <span className={`${isInvalid ? '' : 'opacity-0'} text-danger text-xs`}>{errorMessage}</span>}

                {/* popup */}
                <div className={`${!isPopupOpen && 'opacity-0 pointer-events-none'} top-0 shadow-md absolute w-full bg-white rounded-2xl z-30 flex flex-col`}>
                    {/* search input */}
                    <div className={'flex flex-row items-center w-full'}>
                        <input type="text" ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} className="min-w-16 outline-0 w-full flex-auto px-2 py-2 rounded-l-2xl border-b-1"/>
                        <button type="button" onClick={() => setIsPopupOpen(false)} className="flex  py-2.5 px-2 text-white text-xs bg-secondary opacity-90 hover:opacity-100 transition-all rounded-br-md rounded-tr-xl">
                            Quitter
                        </button>
                    </div>

                    {/* options with scroll */}
                    <div className={'max-h-56 overflow-y-auto p-2'}>
                        {options.filter(filterFunction).map(option => (
                            <div key={option.key} className={'flex flex-row gap-1 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl h-10 items-center'} onClick={() => onClickOption(option)}>
                                <div className={'truncate'}>{option.label}</div>{values.includes(option.key) && <CheckIcon className={'size-4'}/>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* hidden options to calculate input width */}
            <div className={'opacity-0 pointer-events-none max-h-10 overflow-hidden'}>
                {
                    options.map(option => (
                        <div key={option.key} className={'flex flex-row gap-1 cursor-pointer hover:bg-gray-200 max-h-10 p-5 rounded-2xl items-center truncate'}>
                            <div className={'truncate'}>{option.label}</div><CheckIcon className={'size-4'}/>
                        </div>
                    ))
                }
            </div>

            {/*hidden input for html <form> */}
            {name && <input type="hidden" value={values.join(',')} name={name}/>}
        </div>
    );
};
