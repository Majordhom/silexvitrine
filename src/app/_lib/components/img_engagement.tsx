import Image from "next/image";

type ImageEngagementProps = {
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
};

export default function ImageEngagement({
                                       alt = "Image engagement",
                                       className = "",
                                       width = 400,
                                       height = 200,
                                   }: ImageEngagementProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <Image
                src="/img/engagement.jpg"
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                sizes={`${width}px`}
                priority
            />
        </div>
    );
}