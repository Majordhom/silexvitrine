import Image from "next/image";

type ImageHistoireProps = {
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
};

export default function ImageHistoire({
                                       alt = "Image engagement",
                                       className = "",
                                       width = 400,
                                       height = 200,
                                   }: ImageHistoireProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <Image
                src="/img/histoire.jpg"
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                sizes={`${width}px`}
                priority
            />
        </div>
    );
}