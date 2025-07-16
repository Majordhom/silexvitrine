"use client";
import {ChevronDown} from "lucide-react";
import {Button} from "@/app/_lib/ui-kit/components/button";

export interface ScrollDownButtonProps {
    sectionId?: string; // ID de la section vers laquelle scroller
}

export default function ScrollDownButton({sectionId}: ScrollDownButtonProps) {


    const handleClick = () => {
        if (sectionId) {
            const section = document.getElementById(sectionId);
            section?.scrollIntoView({behavior: "smooth"});
        }
    };

    return (
        <Button
            onClick={handleClick}
            ariaLabel="Continuer vers le bas"
            className="p-2 border border-white bg-white/70 bg-transparent transition shadow-none"
            variant="no-shadow"
        >
            <ChevronDown className="w-8 h-8 text-primary animate-bounce"/>
        </Button>
    );
}
