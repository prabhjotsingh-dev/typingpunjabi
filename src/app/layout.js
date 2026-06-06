import './globals.css'
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import AuthProvider from '@/supabaseServices/AuthProvider'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className='italic hide-scrollbar'>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}