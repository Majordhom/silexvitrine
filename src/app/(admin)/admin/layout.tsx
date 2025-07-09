import AuthProvider from "@/app/_lib/components/sessionProvider";
import AutoLogout from "@/app/_lib/components/AutoLogout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AutoLogout />
            <main>{children}</main>
        </AuthProvider>
    );
}