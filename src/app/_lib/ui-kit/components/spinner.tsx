type Props = {
    color?: string,
    className?: string,
    size?: number,
}
export const Spinner = ({ color = 'black', className, size = 6 }: Props) => {
    return (
        <div className="flex items-center justify-center">
            <div className={`size-${size} border-4 border-${color} border-dotted border-t-transparent rounded-full animate-spin ${className}`}></div>
        </div>
    );
};