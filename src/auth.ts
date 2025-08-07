import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/app/_lib/prisma";

// Not needed rn don't touch

type DbUser = {
    id: number;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    role: string;
    telephone: string | null;
    createdAt: Date;
    updatedAt: Date;
};

type User = {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    telephone: string | null;
    createdAt: Date;
    updatedAt: Date;
    password: string;
};

const debug = (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
        console.log(...args);
    }
};

export const auth: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@exemple.com" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    console.error("No credentials provided");
                    throw new Error("No credentials provided");
                }

                try {
                    const email = credentials.email.trim().toLowerCase();
                    console.log("Attempting login for:", email);
                    
                    // Get the full user record
                    const user = await prisma.utilisateur.findUnique({
                        where: { email }
                    }) as User | null;

                    console.log("Database query result:", user ? { 
                        ...user, 
                        id: user.id,
                        email: user.email,
                        nom: user.nom,
                        prenom: user.prenom,
                        role: user.role,
                        password: '[HIDDEN]' 
                    } : 'User not found');

                    if (!user) {
                        console.error("User not found:", email);
                        return null;
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    console.log("Password validation result:", { email, isValid });

                    if (!isValid) {
                        console.error("Invalid password for:", email);
                        return null;
                    }

                    if (!user.role) {
                        console.error("User role is undefined:", email);
                        return null;
                    }

                    if (user.role !== 'admin') {
                        console.error("User is not an admin:", email);
                        return null;
                    }

                    const result = {
                        id: user.id.toString(),
                        email: user.email,
                        name: `${user.prenom} ${user.nom}`,
                        role: user.role,
                    };

                    console.log("Authentication successful:", { 
                        id: result.id,
                        email: result.email,
                        name: result.name,
                        role: result.role
                    });
                    
                    return result;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                debug("JWT callback - token created:", {
                    id: token.id,
                    role: token.role
                });
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                debug("Session callback - session updated:", {
                    id: session.user.id,
                    role: session.user.role
                });
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};