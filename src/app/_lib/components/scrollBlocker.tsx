"use client";

import { ReactNode, useState } from "react";

type Props = {
    className?: string;
    children?: ReactNode;
};

export const ScrollBlocker = ({ className, children }: Props) => {
    const [isScrollBlocked, setIsScrollBlocked] = useState(true);

    return (
        <div className={"relative z-0 " + className}>
            <div className={"z-0 relative w-full h-full"}>{children}</div>
            {isScrollBlocked && (
                <div
                    onClick={() => setIsScrollBlocked(false)}
                    className="cursor-pointer text-center absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center transition text-transparent text-xl hover:text-black hover:bg-gray-200/50"
                >
                    Cliquez pour déverrouiller le défilement
                </div>
            )}
        </div>
    );
};
