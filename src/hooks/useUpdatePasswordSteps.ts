"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabaseServices/clients/browserClient";
import Routes from "@/comman/routes";

export type Step = "email" | "otp" | "password";

export function useUpdatePasswordSteps() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [userEmail, setUserEmail] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;

    const timeoutId = setTimeout(() => {
      if (active) {
        console.warn("Auth check timed out, falling back to email step.");
        setStep("email");
        setIsCheckingAuth(false);
      }
    }, 1500);

    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (!active) return;

        if (error) {
          console.error("Session check error:", error);
          setStep("email");
        } else if (session && !session.user.is_anonymous) {
          setStep("password");
        } else {
          setStep("email");
        }
      } catch (err) {
        console.error("Session check exception:", err);
        if (active) {
          setStep("email");
        }
      } finally {
        if (active) {
          clearTimeout(timeoutId);
          setIsCheckingAuth(false);
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const sendResetCode = async (email: string) => {
    setServerError("");
    setSuccessMessage("");
    setUserEmail(email);
    setIsPending(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setServerError(error.message);
      } else {
        setSuccessMessage("Code sent! Please check your email.");
        setStep("otp");
      }
    } finally {
      setIsPending(false);
    }
  };

  const verifyResetCode = async (token: string) => {
    setServerError("");
    setSuccessMessage("");
    setIsPending(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: userEmail,
        token,
        type: "recovery",
      });

      if (error) {
        setServerError(error.message);
      } else {
        setSuccessMessage("Code verified!");
        setTimeout(() => {
          setStep("password");
          setSuccessMessage("");
        }, 1000);
      }
    } finally {
      setIsPending(false);
    }
  };

  const updatePassword = async (password: string) => {
    setServerError("");
    setSuccessMessage("");
    setIsPending(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setServerError(error.message);
      } else {
        setSuccessMessage("Password successfully updated!");
        setTimeout(() => {
          router.push(Routes.lessons);
        }, 1500);
      }
    } catch (err: any) {
      console.error("Update password error:", err);
      setServerError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  const setStepEmail = () => {
    setStep("email");
    setServerError("");
    setSuccessMessage("");
  };

  return {
    step,
    userEmail,
    isCheckingAuth,
    serverError,
    successMessage,
    isPending,
    sendResetCode,
    verifyResetCode,
    updatePassword,
    setStepEmail,
  };
}
