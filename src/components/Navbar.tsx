"use client";

import React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { useAuth } from "@/supabaseServices/AuthProvider";
import { createClient } from "@/supabaseServices/clients/browserClient";

const navItems = [
  { href: "/lesson", label: "Lessons" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isAnonymous =
    user?.is_anonymous || user?.app_metadata?.provider === "anonymous";
  const isLoggedInRegisteredUser = user && !isAnonymous;

  return (
    <header className="sticky top-0 z-50 w-full not-italic font-outfit border-b border-glass-border bg-glass-bg backdrop-blur-md py-2.5 px-2 sm:px-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition duration-200">
      <div className="flex gap-6 justify-between items-center mx-auto max-w-7xl">
        <Link
          href="/"
          className="flex gap-3 items-center rounded-2xl group cubic-transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark/40"
        >
          <span className="relative flex items-center justify-center h-9 w-9 rounded-tl-xl rounded-tr-xs rounded-br-xl rounded-bl-xs bg-gradient-to-br from-primary-light via-accent-light to-accent-dark border border-brand-white shadow-[0_2px_8px_rgba(3,105,161,0.12)] cubic-transition group-hover:scale-105 group-hover:rotate-[3deg] overflow-hidden">
            <span className="absolute inset-0 opacity-0 bg-brand-white/10 group-hover:opacity-100 cubic-transition"></span>
            <span className="text-lg font-bold select-none text-primary-dark">
              ਪ
            </span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-text group-hover:text-primary-dark cubic-transition">
              ਪੰਜਾਬੀ ਟਾਇਪਿੰਗ
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted/80 group-hover:text-text cubic-transition">
              Punjabi Typing
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 text-sm font-medium ml-auto">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`animate-nav-item px-4 py-1.5 rounded-full relative cubic-transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark/30 ${
                  isActive
                    ? "text-primary-dark font-semibold"
                    : "text-text-muted hover:text-text"
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-glass-active rounded-full border border-primary-light shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"></span>
                )}
                {!isActive && (
                  <span className="absolute inset-0 bg-transparent rounded-full opacity-0 hover:bg-glass-hover cubic-transition hover:opacity-100"></span>
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          <span className="h-4 w-[1px] bg-border mx-2"></span>

          {!loading && !isLoggedInRegisteredUser ? (
            <>
              <Link
                href="/signup"
                className="group relative overflow-hidden rounded-full bg-primary-dark px-5 py-1.5 text-brand-white font-bold text-xs tracking-wider shadow-[0_4px_15px_rgba(3,105,161,0.12)] cubic-transition hover:-translate-y-[1px] active:scale-[0.97] hover:bg-primary-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent duration-1000 -translate-x-full via-brand-white/10 group-hover:translate-x-full cubic-transition"></span>
                <span className="relative flex items-center gap-1.5">
                  Sign Up
                </span>
              </Link>
              <Link
                href="/login"
                className="group relative overflow-hidden rounded-full bg-primary-dark px-5 py-1.5 text-brand-white font-bold text-xs tracking-wider shadow-[0_4px_15px_rgba(3,105,161,0.12)] cubic-transition hover:-translate-y-[1px] active:scale-[0.97] hover:bg-primary-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent duration-1000 -translate-x-full via-brand-white/10 group-hover:translate-x-full cubic-transition"></span>
                <span className="relative flex items-center gap-1.5">
                  Log In
                </span>
              </Link>
            </>
          ) : !loading && isLoggedInRegisteredUser ? (
            
            <HoverCard>
              <HoverCardTrigger className="relative group pl-1.5 focus-visible:outline-none cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-light to-accent-light rounded-full blur-[2px] opacity-0 group-hover:opacity-100 cubic-transition"></div>
                <div
                  className="flex relative justify-center items-center w-8 h-8 text-sm font-bold rounded-full border shadow-sm bg-glass-bg text-primary-dark border-glass-border cubic-transition group-hover:scale-105 group-hover:rotate-6"
                >
                  {(user?.user_metadata?.username || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "U")[0].toUpperCase()}
                </div>
              </HoverCardTrigger>
              <HoverCardContent align="end" sideOffset={8} className="flex flex-col gap-3 p-3 w-56 rounded-xl border shadow-lg backdrop-blur-md border-glass-border bg-glass-bg">
                <div className="flex flex-col px-1 pb-3 space-y-1 border-b border-border">
                  <span className="text-sm font-bold truncate text-text">
                    {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.user_metadata?.username || "User"}
                  </span>
                  <span className="text-xs truncate text-text-muted">
                    {user?.email}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    router.push("/");
                    router.refresh();
                  }}
                  className="flex overflow-hidden relative gap-2 justify-center items-center px-4 py-2 w-full text-sm font-bold tracking-wide rounded-lg group bg-primary-dark/10 text-primary-dark cubic-transition hover:bg-primary-dark hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Log Out
                </button>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div className="w-40 h-8"></div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
