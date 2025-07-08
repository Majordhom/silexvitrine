import Image from "next/image";

type ImageValeursProps = {
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
};

export default function ImageValeurs({
                                       alt = "Image valeurs",
                                       className = "",
                                       width = 400,
                                       height = 200,
                                   }: ImageValeursProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <Image
                src="/img/valeurs.jpg"
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                sizes={`${width}px`}
                priority
            />
        </div>
    );
}