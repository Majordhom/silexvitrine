import type { Metadata } from "next";
import { NavigationProvider } from "./_components/TheoNavigationContext";

export const metadata: Metadata = {
  title: "SilexVitrine - Thème Theo",
  description: "Application développée par Tremplin - Design moderne et épuré",
};

export default function TheoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="theo-layout pt-16">
        {children}
      </div>
    </NavigationProvider>
  );
} 