import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://typingpunjabi.vercel.app'),
  title: {
    default: 'Punjabi Typing | Practice & Improve Your Typing Skills',
    template: '%s | Punjabi Typing'
  },
  description: 'Practice and improve your Punjabi typing speed and accuracy. Free online typing tutor, tests, and exercises designed for beginners and advanced learners.',
  keywords: ['Punjabi typing', 'Raavi font typing','typing practice', 'typing test', 'typing speed', 'learn Punjabi typing', 'online typing tutor'],
  authors: [{ name: 'Punjabi Typing' }],
  creator: 'Punjabi Typing',
  publisher: 'Punjabi Typing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Punjabi Typing | Practice & Improve Your Typing Skills',
    description: 'Practice and improve your Punjabi typing speed and accuracy. Free online typing tutor, tests, and exercises.',
    url: 'https://typingpunjabi.vercel.app',
    siteName: 'Punjabi Typing',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Punjabi Typing Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punjabi Typing | Practice & Improve Your Typing Skills',
    description: 'Practice and improve your Punjabi typing speed and accuracy. Free online typing tutor, tests, and exercises.',
    images: ['/twitter-image.png'],
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