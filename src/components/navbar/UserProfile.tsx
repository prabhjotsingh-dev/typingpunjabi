import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface UserProfileProps {
  userInitial: string;
  userDisplayName: string;
  email: string | undefined;
  handleLogout: () => void;
  variant?: "desktop" | "mobile";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userInitial,
  userDisplayName,
  email,
  handleLogout,
  variant = "desktop",
  open,
  onOpenChange,
}) => {
  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-3 items-center px-2">
          <div className="flex justify-center items-center w-10 h-10 text-lg font-bold rounded-xl bg-primary-dark/10 text-primary-dark">
            {userInitial}
          </div>
          <div className="flex overflow-hidden flex-col">
            <span className="text-base font-bold truncate text-text">{userDisplayName}</span>
            <span className="text-xs truncate text-text-muted">{email}</span>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex gap-2 justify-center items-center px-4 py-3 w-full text-sm font-bold tracking-wide rounded-xl bg-primary-dark/10 text-primary-dark transition-all hover:bg-primary-dark hover:text-brand-white active:scale-[0.98]"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger className="relative group pl-1.5 focus-visible:outline-none cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/10 to-accent-light/10 rounded-xl blur-[1px] opacity-0 group-hover:opacity-90 cubic-transition"></div>
        <div className="flex relative justify-center items-center w-8 h-8 text-sm font-bold rounded-xl border shadow-sm bg-primary-dark/10 text-primary-dark border-glass-border cubic-transition group-hover:scale-105 group-hover:rotate-6">
          {userInitial}
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="flex flex-col gap-3 p-3 w-56 rounded-xl border shadow-lg backdrop-blur-md border-glass-border bg-glass-bg">
        <div className="flex flex-col px-1 pb-3 space-y-1 border-b border-border">
          <span className="text-sm font-bold truncate text-text">{userDisplayName}</span>
          <span className="text-xs truncate text-text-muted">{email}</span>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex overflow-hidden relative gap-2 justify-center items-center px-4 py-2 w-full text-sm font-bold tracking-wide rounded-lg group bg-primary-dark/10 text-primary-dark cubic-transition hover:bg-primary-dark hover:text-brand-white"
        >
          Log Out
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
