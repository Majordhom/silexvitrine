//ce fichier est le cœur du système d’authentification NextAuth :
// toutes les actions auth (login, logout, callback, session…) passeront par ce fichier.
// Il est important de le nommer `[...nextauth]` car NextAuth utilise cette convention
//  pour reconnaître les routes d'authentification.
// il va contenir la config  avec Credentials Provider.

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { AuthOptions } from "next-auth"


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@exemple.com" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                // Ici on ajoutera la vérification avec Prisma plus tard
                // Pour l'instant on renvoie un utilisateur fictif pour tester le fonctionnement
                const user = { id: "1", name: "Admin Test", email: credentials?.email }

                if (user) {
                    return user
                } else {
                    return null
                }
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
