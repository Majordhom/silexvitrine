import Image from "next/image";

type ImageEquipeProps = {
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
};

export default function ImageEquipe({
    alt = "Image équipe",
    className = "",
    width = 400,
    height = 200,
}: ImageEquipeProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <Image
                src="/img/equipe.jpg"
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                sizes={`${width}px`}
                priority
            />
        </div>
    );
}