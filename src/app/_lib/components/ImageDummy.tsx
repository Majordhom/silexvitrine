import Image from "next/image";

type ImageDummyProps = {
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
};

export default function ImageDummy({
    alt = "Image fictive",
    className = "",
    width = 400,
    height = 200,
}: ImageDummyProps) {
    return (
        <Image
            src="/img/dummy_400x200.png"
            alt={alt}
            width={width}
            height={height}
            className={`rounded-xl shadow ${className}`}
            priority
        />
    );
}