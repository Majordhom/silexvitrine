"use client";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

export type ModalProps = {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isDismissable?: boolean;
    backdrop?: "blur" | "transparent";
    size?: "sm" | "md" | "lg" | "xl" | "full";
    className?: string;
};

const modalMaxWidth: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full",
};

export const Modal = ({
                          children,
                          isOpen,
                          setIsOpen,
                          isDismissable = true,
                          backdrop = "blur",
                          size = "md",
                          className = "",
                      }: ModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isDismissable) setIsOpen(false);
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEsc);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, isDismissable, setIsOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 transition bg-black/50 ${backdrop === "blur" ? "backdrop-blur" : ""}`}
                onClick={() => isDismissable && setIsOpen(false)}
            />
            {/* Modal container */}
            <section
                className={`
          relative w-full max-h-dvh overflow-auto bg-white
          ${modalMaxWidth[size]}
          ${size !== "full" ? "rounded-2xl" : ""}
          sm:mx-4
          animate-appearance-unscale
          ${className}
          max-sm:rounded-b-none
          max-sm:min-h-dvh
          pt-16 pb-16 pl-8 pr-8
        `}
            >
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 z-10 p-1 group"
                    onClick={() => setIsOpen(false)}
                    aria-label="Fermer"
                >
                    <XMarkIcon className="size-7 group-hover:text-primary" />
                </button>
                {children}
            </section>
        </div>,
        document.body
    );
};

// Helpers pour structurer le contenu
export const ModalHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <div className={"font-medium text-2xl mb-4 " + className}>{children}</div>
);
export const ModalBody = ({ children }: { children: ReactNode }) => <div>{children}</div>;
export const ModalFooter = ({ children }: { children: ReactNode }) => (
    <div className="flex gap-2 justify-end mt-6">{children}</div>
);