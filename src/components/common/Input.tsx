"use client";

import * as React from "react";
import { Input as UiInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<
  React.ComponentProps<typeof UiInput>,
  "type"
> {
  label?: string;
  error?: string;
  variant?: "email" | "password" | "text";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Determine HTML input type based on variant
    let type = "text";
    if (variant === "email") type = "email";
    if (variant === "password") {
      type = showPassword ? "text" : "password";
    }

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm italic font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
          >
            {label}
          </label>
        )}
        <div className="flex relative items-center">
          <UiInput
            ref={ref}
            type={type}
            className={cn(
              error ? "border-error focus-visible:ring-error" : "",
              variant === "password" ? "pr-10" : "",
              className,
            )}
            {...props}
          />
          {variant === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 transition-colors cursor-pointer select-none text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm italic text-error">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
