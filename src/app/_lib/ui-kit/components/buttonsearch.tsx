import { MouseEventHandler } from "react";
import { Spinner } from "@/app/_lib/ui-kit/components/spinner";

export type ButtonProps = {
    color?: string,
    type?: 'button' | 'submit' | 'reset',
    textColor?: string,
    onClick?: MouseEventHandler,
    children?: React.ReactNode,
    className?: string,
    variant?: 'solid' | 'shadow' | 'shadow-bordered' | 'chip' | 'chip-bordered' | 'sm-chip' | 'sm-chip-bordered' | 'underline',
    isDisabled?: boolean,
    isLoading?: boolean,
    startContent?: React.ReactNode,
}

const buttonCommonClasses = `flex min-h-10 text-sm flex-wrap justify-center gap-2 items-center border-1 rounded-full py-1 px-4`
export const buttonSolidClasses = (textColor?: string, color?: string) => (
    buttonCommonClasses +
    ` text-${textColor ? textColor : (color ? 'white' : 'black')}` +
    ` border-${color ? color : 'default'}` +
    ` hover:bg-white` +
    ` bg-${color ? color : 'default'}` +
    ` hover:text-${color ? color : 'black'}`
)

export const buttonShadowClasses = (textColor?: string, color?: string) => (
    buttonCommonClasses +
    ` text-${textColor ? textColor : (color ? 'white' : 'black')}` +
    ` bg-${color ? color : 'white'}` +
    ` shadow-sm` +
    ` hover:shadow-md` +
    ` border-${color ? 'white' : 'gray-300'}` +
    ` hover:border-${color ? color : 'default'}`
)


export const buttonShadowBorderedClasses = (textColor?: string, color?: string) => (
    buttonCommonClasses +
    ` text-${textColor ? textColor : (color ? color : 'black')}` +
    ` hover:bg-${color ? color : 'black'}/15` +
    ` bg-white` +
    ` shadow-sm` +
    ` hover:shadow-md` +
    ` border-${color ? color : 'default'}`
)

export const buttonChipClasses = (textColor?: string, color?: string) => (
    ` flex min-h-8 text-sm flex-wrap justify-center gap-2 items-center py-1 px-4` +
    ` text-${textColor ? textColor : 'white'}` +
    ` bg-${color ? color : 'default'}` +
    ` hover:brightness-[0.9]` +
    ` rounded-full` +
    ` border-1` +
    ` border-${color ? color : 'default'}`
)

export const buttonChipBorderedClasses = (textColor?: string, color?: string) => (
    ` flex min-h-8 text-sm flex-wrap justify-center gap-2 items-center py-1 px-4 border-1` +
    ` border-${color ? color : 'default'}` +
    ` text-${color ? color : 'black'}` +
    ` hover:text-${textColor ? textColor : 'white'}` +
    ` bg-white` +
    ` hover:bg-${color ? color : 'default'}` +
    ` rounded-full`
)

export const buttonUnderlineClasses = (color?: string) => (
    ` hover:border-b-1 border-${color} flex gap-1 items-center h-7 ${color ? `text-${color}` : ''}`
)

export const Buttonsearch = ({ startContent, isDisabled, isLoading, color, textColor, onClick, children, type, className = '', variant = 'shadow' }: ButtonProps) => {
    let normalizedVariant: string = variant
    let sizeClasses = ''

    if (variant?.startsWith('sm-')) {
        normalizedVariant = variant?.slice(3)
        sizeClasses = 'text-sm !min-h-7 !max-h-7'
    }

    let twClasses
    if (normalizedVariant === 'solid') {
        twClasses = buttonSolidClasses(textColor, color)
    } else if (normalizedVariant === 'solid') {
        twClasses = buttonSolidClasses(textColor, color)
    } else if (normalizedVariant === 'shadow') {
        twClasses = buttonShadowClasses(textColor, color)
    } else if (normalizedVariant === 'shadow-bordered') {
        twClasses = buttonShadowBorderedClasses(textColor, color)
    } else if (normalizedVariant === 'chip') {
        twClasses = buttonChipClasses(textColor, color)
    } else if (normalizedVariant === 'chip-bordered') {
        twClasses = buttonChipBorderedClasses(textColor, color)
    } else if (normalizedVariant === 'underline') {
        twClasses = buttonUnderlineClasses(color)
    }

    twClasses += ` ${className}`

    if (isDisabled || isLoading) {
        twClasses += ` opacity-70 !cursor-not-allowed`
    }

    return <button disabled={isDisabled || isLoading} onClick={onClick} className={`${twClasses} ${sizeClasses}`}>{isLoading ? <Spinner /> : startContent}{children}</button>
}
