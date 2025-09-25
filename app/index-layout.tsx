'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";

export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Header className="fixed top-0 left-0 right-0 h-8 z-50 border-b bg-white shadow-sm" />
      <div className="w-full flex pt-16 h-full justify-center">
        <AppSidebar />
        <main className="flex-1 pt-4 h-full p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
