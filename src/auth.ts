import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {prisma} from "@/app/_lib/prisma";

export const auth: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "email@exemple.com"},
                password: {label: "Mot de passe", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const email = credentials.email.trim().toLowerCase();
                // Chercher l'utilisateur en base
                const user = await prisma.utilisateur.findUnique({
                    where: {email},
                });

                if (!user) {
                    console.log("Utilisateur non trouvé pour email:", credentials.email);
                    return null;
                }

                // Comparer le mot de passe
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    console.log("Mot de passe invalide pour l'email:", credentials.email);
                    return null;
                }

                // Retourner l'utilisateur (en adaptant les champs si besoin)
                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: `${user.prenom} ${user.nom}`,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt", // On utilise des tokens JWT pour gérer les sessions
    },
    pages: {
        signIn: "/admin/login", // Redirection personnalisée en cas de tentative d'accès non connecté
    },
}