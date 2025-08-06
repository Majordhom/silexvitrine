import AutoLogout from "@/app/_lib/components/AutoLogout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {/* composant de déconnexion automatique au bout de 1 min */}
            {/*<AutoLogout timeout={1 * 60 * 1000} />*/}
            {children}
        </main>
    );
}