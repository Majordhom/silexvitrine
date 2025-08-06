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
        setError("");
        
        try {
            const password = passwordRef.current?.value;

            console.log("Login attempt:", { email });

            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
                callbackUrl: "/admin/newsletter"
            });

            console.log("SignIn response:", res);

            if (res?.error) {
                console.error("Auth error:", res.error);
                setError("Identifiants invalides");
            } else if (res?.url) {
                router.push(res.url);
            } else {
                router.push("/admin/newsletter");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Une erreur s'est produite lors de la connexion");
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">Administration</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            mode="controlled"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(value) => setEmail(value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Input
                            mode="uncontrolled"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            ref={passwordRef}
                            required
                            className="w-full"
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
                    </div>
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
                            {error}
                        </div>
                    )}
                    <Button
                        type="submit"
                        variant="chip"
                        color="primary"
                        className="w-full"
                    >
                        Se connecter
                    </Button>
                </form>
            </div>
        </main>
    )
}
