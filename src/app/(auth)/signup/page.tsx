"use client";

import { Input } from "@/components/common/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { signupAction } from "@/supabaseServices/actions/signupService";
import { useAuth } from "@/supabaseServices/AuthProvider";
import FullPageLoader from "@/components/common/FullPageLoader";

import { SignUpForm } from "@/comman/types";
import Routes from "@/comman/routes";
import { VALIDATION } from "@/comman/validation";

const fields = [
  {
    id: "username",
    variant: "text",
    placeholder: "Choose a username",
    label: "Username",
    autoComplete: "username",
  },
  {
    id: "email",
    variant: "email",
    placeholder: "m@example.com",
    label: "Email",
    autoComplete: "user email",
  },
  {
    id: "password",
    variant: "password",
    placeholder: "Create a password",
    label: "Password",
    autoComplete: "user password",
  },
  {
    id: "confirmPassword",
    variant: "password",
    placeholder: "Confirm your password",
    label: "Confirm Password",
    autoComplete: "confirm user password",
  },
] as const;

export default function Signup() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();
  const password = watch("password");

  useEffect(() => {
    if (!loading && user && !user.is_anonymous) {
      router.replace(Routes.home);
    }
  }, [user, loading, router]);

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

  if (loading) {
    return <FullPageLoader message="Checking authentication…" />;
  }

  if (user && !user.is_anonymous) {
    return <FullPageLoader message="Redirecting to home page…" />;
  }

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
          method="post"
          action="#"
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {fields.map(({ id, variant, placeholder, label, autoComplete }) => (
            <Input
              key={id}
              id={id}
              variant={variant}
              label={label}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={isLoading}
              error={errors[id]?.message}
              {...register(id, {
                required: `${label} is required`,
                ...(id === "confirmPassword" &&
                  VALIDATION.confirmPassword(password)),
                ...(id === "email" && VALIDATION.email),
                ...(id === "password" && VALIDATION.password),
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
          <Link href={Routes.login} className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
