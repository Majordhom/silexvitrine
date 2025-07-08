"use client"

import { useState, useRef } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {Button} from "@/app/_lib/ui-kit/components/button";
import {Input} from "@/app/_lib/ui-kit/components/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"


export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const password = passwordRef.current?.value;

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        if (res?.error) {
            setError("Identifiants invalides")
        } else {
            router.push("/admin/newsletter")
        }
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4">
            <h1 className="text-2xl text-primary font-bold mb-6">Connexion Admin</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                <Input
                    mode="controlled"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(value) => setEmail(value)}
                    required
                />
                <Input
                    mode="uncontrolled"
                    type={showPassword? "text" : "password"}
                    placeholder="Mot de passe"
                    ref={passwordRef}
                    required
                    endContent={
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Afficher / masquer le mot de passe"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5"/>
                            ) : (
                                <EyeIcon className="h-5 w-5"/>
                            )}
                        </button>
                    }
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                    <Button
                        type="submit"
                        variant="chip"
                        color="primary"
                        className="self-end"
                    >
                        Se connecter
                    </Button>
            </form>
        </div>
    )
}
