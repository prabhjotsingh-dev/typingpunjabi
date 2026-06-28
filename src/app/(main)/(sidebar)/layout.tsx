import React, { Suspense } from "react";
import { Sidebar, SidebarProvider } from "@/components/sidebar/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <main className="flex w-full h-[calc(100svh-3.5rem)] bg-background font-sans">
        <Suspense
          fallback={
            <div className="w-64 h-full border-r bg-glass-bg/95 md:block" />
          }
        >
          <Sidebar />
        </Suspense>
        <div className="flex overflow-y-auto flex-col flex-1 w-full min-h-0 hide-scrollbar">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
