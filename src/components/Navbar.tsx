"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/lesson", label: "Lessons" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full not-italic font-outfit border-b border-glass-border bg-glass-bg backdrop-blur-md py-2.5 px-6 sm:px-12 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition duration-200">
      <div className="flex items-center justify-between gap-6 mx-auto max-w-7xl">
        <Link
          href="/"
          className="flex items-center gap-3 group rounded-2xl cubic-transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark/40"
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

          <Link
            href="/signup"
            className="group relative overflow-hidden rounded-full bg-primary-dark px-5 py-1.5 text-brand-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(3,105,161,0.12)] cubic-transition hover:-translate-y-[1px] active:scale-[0.97] hover:bg-primary-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark"
          >
            <span className="absolute inset-0 duration-1000 -translate-x-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent group-hover:translate-x-full cubic-transition"></span>
            <span className="relative flex items-center gap-1.5">Sign Up</span>
          </Link>
          <Link
            href="/login"
            className="group relative overflow-hidden rounded-full bg-primary-dark px-5 py-1.5 text-brand-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(3,105,161,0.12)] cubic-transition hover:-translate-y-[1px] active:scale-[0.97] hover:bg-primary-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark"
          >
            <span className="absolute inset-0 duration-1000 -translate-x-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent group-hover:translate-x-full cubic-transition"></span>
            <span className="relative flex items-center gap-1.5">Log In</span>
          </Link>
          <button
            onClick={() => {}}
            className="group relative overflow-hidden rounded-full bg-primary-dark px-5 py-1.5 text-brand-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(3,105,161,0.12)] cubic-transition hover:-translate-y-[1px] active:scale-[0.97] hover:bg-primary-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark"
          >
            <span className="absolute inset-0 duration-1000 -translate-x-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent group-hover:translate-x-full cubic-transition"></span>
            <span className="relative flex items-center gap-1.5">Log Out</span>
          </button>

          <div className="relative group pl-1.5">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-light to-accent-light rounded-full blur-[2px] opacity-0 group-hover:opacity-100 cubic-transition"></div>
            <Image
              src="/letter-1347416_960_720.jpg"
              alt="Punjabi Typing Logo"
              width={32}
              height={32}
              className="relative object-cover border rounded-full shadow-sm cursor-pointer border-glass-border cubic-transition group-hover:scale-105 group-hover:rotate-6"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
