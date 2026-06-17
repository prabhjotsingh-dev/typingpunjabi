"use client";

import { Input } from "@/components/common/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { signupAction } from "@/supabaseServices/actions/signupService";

type SignUpForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const fields = [
  {
    id: "username",
    variant: "text",
    placeholder: "Choose a username",
    label: "Username",
  },
  {
    id: "email",
    variant: "email",
    placeholder: "m@example.com",
    label: "Email",
  },
  {
    id: "password",
    variant: "password",
    placeholder: "Create a password",
    label: "Password",
  },
  {
    id: "confirmPassword",
    variant: "password",
    placeholder: "Confirm your password",
    label: "Confirm Password",
  },
] as const;

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();
  const password = watch("password");

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await signupAction(
        data.email,
        data.password,
        data.username,
      );

      if (result?.error) {
        setServerError(result.error);
        return;
      }

      toast.success("Account created!", {
        description: "You can now sign in with your credentials.",
      });
    } catch {
      setServerError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-surface-muted via-primary-light to-accent-light dark:from-secondary-dark dark:via-primary-dark dark:to-secondary-dark">
      <div className="w-full max-w-md p-8 space-y-6 bg-glass-bg backdrop-blur-md rounded-2xl border border-glass-border shadow-[0_8px_32px_rgba(3,105,161,0.10)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl italic font-bold tracking-tight">
            Create an account
          </h1>
          <p className="italic text-muted-foreground">
            Enter your details to get started
          </p>
        </div>

        {serverError && (
          <div className="flex gap-2 items-start px-4 py-3 text-sm italic text-red-700 bg-red-50 rounded-lg border border-red-300 dark:border-red-700/50 dark:bg-red-900/20 dark:text-red-400">
            <span className="mt-0.5 shrink-0">⚠</span>
            <span>{serverError}</span>
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {fields.map(({ id, variant, placeholder, label }) => (
            <Input
              key={id}
              id={id}
              variant={variant}
              label={label}
              placeholder={placeholder}
              autoComplete={id}
              disabled={isLoading}
              error={errors[id]?.message}
              {...register(id, {
                required: `${label} is required`,
                ...(id === "confirmPassword" && {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }),
                ...(id === "email" && {
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email",
                  },
                }),
                ...(id === "password" && {
                  pattern: {
                    value: /^.{8,}$/,
                    message: "Password must be at least 8 characters",
                  },
                }),
              })}
            />
          ))}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Creating account…
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>

        <div className="text-sm text-center">
          <span className="text-muted-foreground">
            Already have an account?
          </span>{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
