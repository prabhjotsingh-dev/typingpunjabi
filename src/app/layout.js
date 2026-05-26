import './globals.css'
import React from 'react'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/supabaseServices/AuthProvider'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className='italic hide-scrollbar bg-gradient-to-tr from-sky-200 via-sky-400 to-sky-500'>
        <AuthProvider />
        <Navbar />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}