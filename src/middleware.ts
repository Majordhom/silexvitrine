import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Clé secrète pour déchiffrer le token
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
    // Vérifie si on accède à une route admin
    if (request.nextUrl.pathname.startsWith("/admin")
        && request.nextUrl.pathname !== "/admin/login") { // on ajoute une exception pour la page de login afin de ne pas tomber dans une boucle infinie de redirection
        const token = await getToken({ req: request, secret });

        // Si pas de token → redirige vers la page de login admin
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Sinon laisse passer
    return NextResponse.next();
}

// Quelles routes observer ?
export const config = {
    matcher: ["/admin/:path*"],
};
