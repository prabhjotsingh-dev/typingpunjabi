import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
        authLink:
          "group relative overflow-hidden rounded-xl bg-primary-dark px-5 py-1.5 text-brand-white font-bold text-xs tracking-wider shadow-[0_4px_15px_rgba(3,105,161,0.12)] cubic-transition hover:-translate-y-[1px] active:scale-[0.97] hover:bg-primary-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark",
        navLink:
          "animate-nav-item px-4 py-1.5 rounded-xl relative cubic-transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark/30 active:scale-95",
        navLinkMobile:
          "px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98]",
      },
      isActive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "navLink",
        isActive: true,
        className: "text-primary-dark font-semibold",
      },
      {
        variant: "navLink",
        isActive: false,
        className: "text-text-muted hover:text-text",
      },
      {
        variant: "navLinkMobile",
        isActive: true,
        className: "font-bold bg-primary-dark/10 text-primary-dark motion-preset-fade motion-duration-200",
      },
      {
        variant: "navLinkMobile",
        isActive: false,
        className: "text-text-muted hover:bg-glass-hover hover:text-text",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CustomLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps,
    VariantProps<typeof linkVariants> {
  isActive?: boolean;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ className, variant, isActive, children, ...props }, ref) => {
    
    // Internal rendering for navLink desktop to keep the spans intact
    if (variant === "navLink") {
      return (
        <NextLink
          ref={ref}
          className={cn(linkVariants({ variant, isActive, className }))}
          {...props}
        >
          {!isActive && (
            <span className="absolute inset-0 bg-transparent rounded-xl opacity-0 hover:bg-glass-hover cubic-transition hover:opacity-100"></span>
          )}
          <span className="relative z-10">{children}</span>
        </NextLink>
      );
    }

    return (
      <NextLink
        ref={ref}
        className={cn(linkVariants({ variant, isActive, className }))}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);
CustomLink.displayName = "CustomLink";

export { CustomLink, linkVariants };
