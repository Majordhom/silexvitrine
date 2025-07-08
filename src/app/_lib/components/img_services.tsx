import Image from "next/image";

type ImageServicesProps = {
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
};

export default function ImageServices({
                                       alt = "Image services",
                                       className = "",
                                       width = 400,
                                       height = 200,
                                   }: ImageServicesProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <Image
                src="/img/services.jpg"
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                sizes={`${width}px`}
                priority
            />
        </div>
    );
}