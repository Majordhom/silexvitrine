"use client";
import {useRef} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {AnnonceCardHeader} from "@/app/(pages)/(private)/annonces/_component/annonceCardHeader";
import {Annonce} from "@/app/(pages)/(private)/annonces/_component/annonceTableRow";

export type AnnonceScrollerProps = {
    children: React.ReactNode;
    className?: string;
};

export default function AnnoncesScroller({children, className}: AnnonceScrollerProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={scrollLeft}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full md:hidden z-10"
                aria-label='Scroll Left'
            >
                <ChevronLeft className="h-6 w-6"/>
            </button>
            <div ref={scrollRef} className={className}>
                {children}
            </div>
            <button
                onClick={scrollRight}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full md:hidden z-10"
                aria-label='Scroll Right'
            >
                <ChevronRight className="h-6 w-6"/>
            </button>
        </div>
    );
}
