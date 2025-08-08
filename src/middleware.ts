import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Redirection de la racine vers la route principale
    if (pathname === "/") {

        const theme = { 
            chosen : process.env.NEXT_PUBLIC_MAIN_ROUTE,
            default : 'arthur',
            list : ['arthur', 'theo']
        } 
    
        // Determine the theme to use - if chosen is not in list, use default
        const defaultTheme = theme.chosen && theme.list.includes(theme.chosen) ? theme.chosen : theme.default;
            
        return NextResponse.redirect(new URL(`/${defaultTheme}`, request.url));
    }
    
    
}

// Quelles routes observer ?
export const config = {
    matcher: [
        "/"
    ],
};
