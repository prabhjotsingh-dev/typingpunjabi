"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabaseServices/clients/browserClient";

export type Step = "email" | "otp" | "password";

export function useUpdatePasswordSteps() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [userEmail, setUserEmail] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && !session.user.is_anonymous) {
        setStep("password");
      } else {
        setStep("email");
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const sendResetCode = (email: string) => {
    setServerError("");
    setSuccessMessage("");
    setUserEmail(email);

    startTransition(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setServerError(error.message);
      } else {
        setSuccessMessage("Code sent! Please check your email.");
        setStep("otp");
      }
    });
  };

  const verifyResetCode = (token: string) => {
    setServerError("");
    setSuccessMessage("");

    startTransition(async () => {
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
    });
  };

  const updatePassword = (password: string) => {
    setServerError("");
    setSuccessMessage("");

    startTransition(async () => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setServerError(error.message);
      } else {
        setSuccessMessage("Password successfully updated!");
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        setTimeout(() => {
          router.push("/lesson");
        }, 2000);
      }
    });
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
