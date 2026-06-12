import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Your Account",
  description: "Securely log in to your Punjabi Typing account to track your typing speed, accuracy progress, and access your personalized typing lessons.",
  keywords: [
    "Punjabi typing login", 
    "sign in Punjabi typing", 
    "typing practice account", 
    "login typing tutor", 
    "Punjabi typing progress"
  ],
  alternates: {
    canonical: "https://typingpunjabi.vercel.app/login",
  },
  openGraph: {
    title: "Login | Punjabi Typing",
    description: "Log in to your Punjabi Typing account to track your progress, access your personalized lessons, and improve your typing skills.",
    url: "https://typingpunjabi.vercel.app/login",
    siteName: "Punjabi Typing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Punjabi Typing Login Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Punjabi Typing",
    description: "Access your Punjabi Typing dashboard. Sign in to continue improving your typing speed and accuracy.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
