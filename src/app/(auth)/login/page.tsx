"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/common/Input";
import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabaseServices/clients/browserClient";
import { useAuth } from "@/supabaseServices/AuthProvider";
import FullPageLoader from "@/components/common/FullPageLoader";
import Routes from "@/comman/routes";

import { LoginForm } from "@/comman/types";
import { VALIDATION } from "@/comman/validation";

const LS_KEY = "typingpunjabi.auth.rememberedEmail";

const Login = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { remember: true },
  });
  const remember = watch("remember");

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!loading && user && !user.is_anonymous) {
      router.replace(Routes.home);
    }
  }, [user, loading, router]);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      setValue("email", saved);
      setValue("remember", true);
    }
  }, [setValue]);

  const onSubmit = (data: LoginForm) => {
    if (data.remember) {
      localStorage.setItem(LS_KEY, data.email);
    } else {
      localStorage.removeItem(LS_KEY);
    }

    setServerError("");
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setServerError(error.message);
      } else {
        router.push(Routes.home);
        router.refresh();
      }
    });
  };

  if (loading) {
    return <FullPageLoader message="Checking authentication…" />;
  }

  if (user && !user.is_anonymous) {
    return <FullPageLoader message="Redirecting…" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen via-sky-50 to-indigo-100 bg-linear-to-br from-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-glass-bg backdrop-blur-md rounded-2xl border border-glass-border shadow-[0_8px_32px_rgba(3,105,161,0.10)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl italic font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="italic text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        {serverError && (
          <div className="p-3 text-sm italic text-center rounded-lg border text-error bg-error/10 border-error/20">
            {serverError}
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          {...(remember ? { method: "post", action: "#" } : {})}
        >
          <Input
            id="email"
            variant="email"
            label="Email"
            placeholder="Enter your email"
            autoComplete={remember ? "user email" : "off"}
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              ...VALIDATION.email,
            })}
          />

          <Input
            id="password"
            variant="password"
            label="Password"
            placeholder="••••••••"
            autoComplete={remember ? "user password" : "off"}
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              ...VALIDATION.password,
            })}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register("remember")}
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                Remember me
              </label>
            </div>
            <Link
              href={`${Routes.forgotPassword}`}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="text-sm text-center">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link href={Routes.signup} className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
