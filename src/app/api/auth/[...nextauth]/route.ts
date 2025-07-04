//ce fichier est le cœur du système d’authentification NextAuth :
// toutes les actions auth (login, logout, callback, session…) passeront par ce fichier.
// Il est important de le nommer `[...nextauth]` car NextAuth utilise cette convention
//  pour reconnaître les routes d'authentification.
// il va contenir la config  avec Credentials Provider.

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { AuthOptions } from "next-auth"
import bcrypt from "bcrypt";
import { prisma } from "@/app/_lib/prisma";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@exemple.com" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const email = credentials.email.trim().toLowerCase();
                // Chercher l'utilisateur en base
                const user = await prisma.utilisateur.findUnique({
                    where: { email },
                });

                // if (!user) return null;
                if (!user) {
                    console.log("Utilisateur non trouvé pour email:", credentials.email);
                    return null;
                }

                // Comparer le mot de passe
                const isValid = await bcrypt.compare(credentials.password, user.password);
                // if (!isValid) return null;
                if (!isValid) {
                    console.log("Mot de passe invalide pour l’email:", credentials.email);
                    return null;
                }

                // Retourner l’utilisateur (en adaptant les champs si besoin)
                return {
                    id: user.id,
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
