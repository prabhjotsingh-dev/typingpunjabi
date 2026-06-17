"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { getProfileTheme } from "@/supabaseFunctions/getData";
import { updateProfileFields } from "@/supabaseFunctions/addOrUpdateData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemePreference } from "@/comman/types";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = async (newTheme: ThemePreference) => {
    if (theme === newTheme) return;
    setTheme(newTheme);
    try {
      await updateProfileFields({ theme_preference: newTheme });
    } catch (error: any) {
      if (error.message !== "No fields were updated") {
        console.error("Failed to update theme preference:", error);
      }
    }
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const dbTheme = (await getProfileTheme()) as ThemePreference | null;
        if (dbTheme) setTheme(dbTheme);
      } catch (error) {
        console.error("Failed to fetch theme from db:", error);
        setTheme("system");
      }
    };
    fetchTheme();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex relative justify-center items-center w-9 h-9 rounded-xl cursor-pointer outline-none group text-text-muted hover:text-text hover:bg-transparent cubic-transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark/30">
        <span className="absolute inset-0 bg-transparent rounded-xl opacity-0 group-hover:bg-glass-hover cubic-transition group-hover:opacity-100"></span>
        <span className="flex relative z-10 justify-center items-center">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </span>
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(["light", "dark", "system"] as ThemePreference[]).map((t) => (
          <DropdownMenuItem
            key={t}
            onClick={() => handleThemeChange(t)}
            className={theme === t ? "text-primary-dark font-semibold" : ""}
          >
            {theme === t && (
              <span className="absolute inset-0 bg-glass-active rounded-xl border border-primary-light shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] pointer-events-none"></span>
            )}
            <span className="relative z-10 capitalize">{t}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
