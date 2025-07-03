import type { Metadata } from "next";
import "@/app/globals.scss";


export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
            <div className="row-start-3">
                {/*emplacement Footer*/}
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
            </div>
        </div>
    );
}
