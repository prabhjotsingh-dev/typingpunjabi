import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Sign up for a free Punjabi Typing account to track your progress, practice with customized lessons, and improve your typing speed and accuracy.",
  keywords: [
    "Punjabi typing signup", 
    "create typing account", 
    "register Punjabi typing", 
    "free typing practice account", 
    "learn Punjabi typing"
  ],
  alternates: {
    canonical: "https://typingpunjabi.vercel.app/signup",
  },
  openGraph: {
    title: "Sign Up | Punjabi Typing",
    description: "Create a new Punjabi Typing account to track your progress, access customized lessons, and improve your typing skills.",
    url: "https://typingpunjabi.vercel.app/signup",
    siteName: "Punjabi Typing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Punjabi Typing Signup Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Punjabi Typing",
    description: "Start your Punjabi typing journey. Register for a free account to track your speed and accuracy.",
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
