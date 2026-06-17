"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/common/Input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUpdatePasswordSteps } from "@/hooks/useUpdatePasswordSteps";

type ForgetPasswordForm = {
  email: string;
};

type OtpForm = {
  token: string;
};

type UpdatePasswordForm = {
  password: string;
  confirmPassword: string;
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

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<ForgetPasswordForm>();

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpForm>();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch: watchPassword,
    formState: { errors: passwordErrors },
  } = useForm<UpdatePasswordForm>();

  const onEmailSubmit = (data: ForgetPasswordForm) => {
    sendResetCode(data.email);
  };

  const onOtpSubmit = (data: OtpForm) => {
    verifyResetCode(data.token);
  };

  const onPasswordSubmit = (data: UpdatePasswordForm) => {
    updatePassword(data.password);
  };

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
          <form
            className="space-y-4"
            onSubmit={handleEmailSubmit(onEmailSubmit)}
            noValidate
          >
            <Input
              id="email"
              variant="email"
              label="Email"
              placeholder="Enter your email"
              autoComplete="email"
              error={emailErrors.email?.message}
              {...registerEmail("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email",
                },
              })}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending code..." : "Send Reset Code"}
            </Button>

            <div className="pt-2 text-sm text-center">
              <span className="text-muted-foreground">
                Remember your password?{" "}
              </span>
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        )}

        {step === "otp" && (
          <form
            className="space-y-4"
            onSubmit={handleOtpSubmit(onOtpSubmit)}
            noValidate
          >
            <Input
              id="token"
              variant="text"
              label="6-Digit Code"
              placeholder="000000"
              autoComplete="off"
              error={otpErrors.token?.message}
              {...registerOtp("token", {
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
              <button
                type="button"
                onClick={setStepEmail}
                className="text-sm italic font-medium text-primary hover:underline"
              >
                Use a different email
              </button>
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Remember your password?{" "}
                </span>
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        )}

        {step === "password" && (
          <form
            className="space-y-4"
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            noValidate
          >
            <Input
              id="password"
              variant="password"
              label="New Password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={passwordErrors.password?.message}
              {...registerPassword("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <Input
              id="confirmPassword"
              variant="password"
              label="Confirm Password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={passwordErrors.confirmPassword?.message}
              {...registerPassword("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watchPassword("password") ||
                  "Passwords do not match",
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
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
