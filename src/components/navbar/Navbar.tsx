"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/supabaseServices/AuthProvider";
import { createClient } from "@/supabaseServices/clients/browserClient";

import { CustomLink } from "../common/Link";
import UserProfile from "./UserProfile";
import { Button } from "../ui/button";

const navItems = [
  { href: "/lesson", label: "Lessons" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAnonymous =
    user?.is_anonymous || user?.app_metadata?.provider === "anonymous";
  const isLoggedInRegisteredUser = user && !isAnonymous;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const userInitial = (user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "U")[0].toUpperCase();
  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.username ||
    "User";

  return (
    <header className="sticky top-0 z-50 w-full not-italic border-b-1 backdrop-blur-md transition duration-200 h-[calc(3.5rem-1px)] font-outfit border-b-glass-border bg-glass-bg">
      <div className="relative z-20 flex justify-between items-center py-2.5 px-4 mx-auto bg-glass-bg">
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
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

        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium ml-auto">
          {navItems.map((item, index) => (
            <CustomLink
              key={item.href}
              href={item.href}
              variant="navLink"
              isActive={pathname === item.href}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {item.label}
            </CustomLink>
          ))}
          <span className="h-4 w-[1px] bg-border mx-2"></span>
        </nav>

        <div className="hidden gap-2 items-center ml-auto sm:flex md:ml-0">
          {!loading && !isLoggedInRegisteredUser ? (
            <>
              <CustomLink href="/signup" variant="authLink">
                Sign Up
              </CustomLink>
              <CustomLink href="/login" variant="authLink">
                Log In
              </CustomLink>
            </>
          ) : !loading && isLoggedInRegisteredUser ? (
            <UserProfile
              userInitial={userInitial}
              userDisplayName={userDisplayName}
              email={user?.email}
              handleLogout={handleLogout}
              variant="desktop"
            />
          ) : (
            <div className="w-24 h-8"></div>
          )}
        </div>

        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          variant="outline"
          size="icon-sm"
          aria-label="Toggle menu"
          className="flex p-1 ml-4 rounded-xl md:hidden text-primary-dark focus:outline-none hover:bg-glass-hover cubic-transition"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      <div
        className={`absolute top-full rounded-b-xl right-4 w-64 bg-glass-bg/95 backdrop-blur-xl border-b border-glass-border shadow-lg md:hidden flex flex-col overflow-hidden transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? "opacity-100 scale-y-100 max-h-[500px]"
            : "max-h-0 opacity-0 scale-y-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <CustomLink
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                variant="navLinkMobile"
                isActive={pathname === item.href}
              >
                {item.label}
              </CustomLink>
            ))}
          </nav>

          <div className="flex flex-row gap-3 pt-4 border-t sm:hidden border-glass-border/50">
            {!loading && !isLoggedInRegisteredUser ? (
              <>
                <CustomLink
                  href="/signup"
                  variant="authLink"
                  className="flex-1 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </CustomLink>
                <CustomLink
                  href="/login"
                  variant="authLink"
                  className="flex-1 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </CustomLink>
              </>
            ) : !loading && isLoggedInRegisteredUser ? (
              <UserProfile
                userInitial={userInitial}
                userDisplayName={userDisplayName}
                email={user?.email}
                handleLogout={handleLogout}
                variant="mobile"
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;