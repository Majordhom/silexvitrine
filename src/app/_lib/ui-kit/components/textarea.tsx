import {ReactNode, RefObject} from "react";

type Props = {
    type?: string,
    placeholder?: string,
    className?: string,
    name?: string,
    isDisabled?: boolean,
    value?: string,
    defaultValue?: string,
    onChange?: (value: string) => void,
    id?: string,
    endContent?: string | ReactNode | ReactNode[],
    cols?: number,
    rows?: number,
    textareaRef?: RefObject<HTMLTextAreaElement | null>
}
export const Textarea = ({
                             className = '',
                             placeholder = '',
                             endContent,
                             name,
                             isDisabled,
                             value,
                             onChange,
                             defaultValue,
                             id,
                             cols,
                             rows = 6,
                             textareaRef
                         }: Props) => {
    return <>
        <div className={'group relative'}>
            <div className={'bg-gray-100 group-hover:bg-gray-200 text-sm transition-all duration-200 rounded-2xl p-2'}>
        <textarea
            ref={textareaRef}
            cols={cols}
            rows={rows}
            id={id}
            disabled={isDisabled}
            className={`bg-transparent w-full outline-none resize-none overflow-hidden min-h-[24px] ${className}`}
            defaultValue={defaultValue}
            value={value}
            onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                onChange && onChange(e.target.value);
            }}
            name={name}/>
            </div>
            {endContent && (
                <div className={'absolute bottom-0 right-0 w-full bg-transparent group-hover:bg-transparent z-10'}>
                    {endContent}
                </div>
            )}
        </div>
    </>
}