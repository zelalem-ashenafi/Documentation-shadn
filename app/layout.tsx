import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Data Analytics Operations Documentation",
  description: "Wegagen Bank SC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} ${geistMono.variable} h-screen overflow-hidden`}
      >
        <SidebarProvider>
          {/* Header */}
          <Header className="fixed top-0 left-0 right-0 h-8 z-50 border-b bg-white shadow-sm" />

          {/* Content below header */}
          <div className="flex pt-16 h-full">
            {/* Sidebar */}
            <AppSidebar />

            {/* Main content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 h-full">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
