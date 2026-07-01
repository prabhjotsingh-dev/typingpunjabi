"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/common/Input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUpdatePasswordSteps } from "@/hooks/useUpdatePasswordSteps";
import Routes from "@/comman/routes";
import { VALIDATION } from "@/comman/validation";

const EmailForm = ({
  onSubmit,
  isPending,
}: {
  onSubmit: (email: string) => void;
  isPending: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((data) => onSubmit(data.email))}
      noValidate
    >
      <Input
        id="email"
        variant="email"
        label="Email"
        placeholder="Enter your email"
        autoComplete="email"
        disabled={isPending}
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          ...VALIDATION.email,
        })}
      />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending code..." : "Send Reset Code"}
      </Button>
      <div className="pt-2 text-sm text-center">
        <span className="text-muted-foreground">Remember your password? </span>
        <Link href={Routes.login} className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

const OtpForm = ({
  onSubmit,
  isPending,
  successMessage,
  onUseDifferentEmail,
}: {
  onSubmit: (token: string) => void;
  isPending: boolean;
  successMessage: string;
  onUseDifferentEmail: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>();
  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((data) => onSubmit(data.token))}
      noValidate
    >
      <Input
        id="token"
        variant="text"
        label="6-Digit Code"
        placeholder="000000"
        autoComplete="off"
        disabled={isPending || successMessage.includes("verified")}
        error={errors.token?.message}
        {...register("token", {
          required: "Code is required",
          minLength: {
            value: 6,
            message: "Code must be at least 6 characters",
          },
        })}
      />
      <Button
        type="submit"
        className="w-full"
        disabled={isPending || successMessage.includes("verified")}
      >
        {isPending ? "Verifying..." : "Verify Code"}
      </Button>
      <div className="flex flex-col mt-2 space-y-2 text-center">
        <Button
          type="button"
          variant="link"
          onClick={onUseDifferentEmail}
          className="text-sm italic font-medium"
        >
          Use a different email
        </Button>
        <div className="text-sm">
          <span className="text-muted-foreground">
            Remember your password?{" "}
          </span>
          <Link href={Routes.login} className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

const PasswordForm = ({
  onSubmit,
  isPending,
  successMessage,
}: {
  onSubmit: (password: string) => void;
  isPending: boolean;
  successMessage: string;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>();
  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((data) => onSubmit(data.password))}
      noValidate
    >
      <Input
        id="password"
        variant="password"
        label="New Password"
        placeholder="••••••••"
        autoComplete="new-password"
        disabled={isPending || successMessage !== ""}
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          ...VALIDATION.password,
        })}
      />
      <Input
        id="confirmPassword"
        variant="password"
        label="Confirm Password"
        placeholder="••••••••"
        autoComplete="new-password"
        disabled={isPending || successMessage !== ""}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          ...VALIDATION.confirmPassword(watch("password")),
        })}
      />
      <Button
        type="submit"
        className="w-full"
        disabled={isPending || successMessage !== ""}
      >
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
};

const UpdatePassword = () => {
  const {
    step,
    isCheckingAuth,
    serverError,
    successMessage,
    isPending,
    sendResetCode,
    verifyResetCode,
    updatePassword,
    setStepEmail,
  } = useUpdatePasswordSteps();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen via-sky-50 to-indigo-100 bg-linear-to-br from-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <p className="italic animate-pulse text-muted-foreground">
          Verifying secure session...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen via-sky-50 to-indigo-100 bg-linear-to-br from-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-glass-bg backdrop-blur-md rounded-2xl border border-glass-border shadow-[0_8px_32px_rgba(3,105,161,0.10)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl italic font-bold tracking-tight">
            {step === "password" ? "Update Password" : "Reset Password"}
          </h1>
          <p className="italic text-muted-foreground">
            {step === "email" &&
              "Enter your email to receive a 6-digit reset code"}
            {step === "otp" && "Enter the 6-digit code sent to your email"}
            {step === "password" && "Enter your new password below"}
          </p>
        </div>

        {serverError && (
          <div className="p-3 text-sm italic text-center rounded-lg border bg-error/10 border-error/20 text-error">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="p-3 text-sm italic text-center rounded-lg border bg-success/10 border-success/20 text-success">
            {successMessage}
          </div>
        )}

        {step === "email" && (
          <EmailForm onSubmit={sendResetCode} isPending={isPending} />
        )}

        {step === "otp" && (
          <OtpForm
            onSubmit={verifyResetCode}
            isPending={isPending}
            successMessage={successMessage}
            onUseDifferentEmail={setStepEmail}
          />
        )}

        {step === "password" && (
          <PasswordForm
            onSubmit={updatePassword}
            isPending={isPending}
            successMessage={successMessage}
          />
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
