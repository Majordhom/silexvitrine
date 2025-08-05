import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Clé secrète pour déchiffrer le token
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Redirection de la racine vers la route principale
    if (pathname === "/") {

        const isDevelopment = process.env.NODE_ENV === 'development';
        const theme = { 
            chosen : process.env.NEXT_PUBLIC_MAIN_ROUTE,
            default : 'arthur',
            list : ['arthur', 'theo']
        } 
    
        // Determine the theme to use - if chosen is not in list, use default
        const defaultTheme = theme.chosen && theme.list.includes(theme.chosen) ? theme.chosen : theme.default;
            
        return NextResponse.redirect(new URL(`/${defaultTheme}`, request.url));
    }
    
    // Vérifie si on accède à une route admin
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") { 

        const token = await getToken({ req: request, secret });

        // Si pas de token redirige vers la page de login admin
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Sinon laisse passer
    return NextResponse.next();
}

// Quelles routes observer ?
export const config = {
    matcher: [
        "/",
        "/admin/:path*"
    ],
};
