import AuthProvider from "@/app/_lib/components/sessionProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <main>{children}</main>
        </AuthProvider>
    );
}