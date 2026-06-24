import React, { Suspense } from "react";
import { Sidebar, SidebarProvider } from "@/components/sidebar/Sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex w-full min-h-[calc(100svh-4rem)] bg-background font-sans">
        <Suspense fallback={<div className="w-64 h-full bg-glass-bg/95 border-r hidden md:block" />}>
          <Sidebar />
        </Suspense>
        <div className="flex flex-col flex-1 w-full hide-scrollbar overflow-y-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
