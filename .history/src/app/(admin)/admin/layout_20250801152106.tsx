import AuthProvider from "@/app/_lib/components/sessionProvider";
import AutoLogout from "@/app/_lib/components/AutoLogout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {/* composant de déconnexion automatique au bout de 1 min */}
            {/*<AutoLogout timeout={1 * 60 * 1000} />*/}
            <main>{children}</main>
        </AuthProvider>
    );
}