"use client";
import { ChevronDown } from "lucide-react";
import {Button} from "@/app/_lib/ui-kit/components/button";

export default function ScrollDownButton() {
    const handleClick = () => {
        const section = document.getElementById("biens-recents");
        section?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Button
            onClick={handleClick}
            ariaLabel="Scroll Down"
            className="p-2 border border-white bg-white/70 bg-transparent transition shadow-none"
            variant="no-shadow"
        >
            <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </Button>
    );
}
