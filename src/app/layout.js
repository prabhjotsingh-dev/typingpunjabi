import './globals.css'
import React from 'react'
import Navbar from '@/components/Navbar'
// import {Providers} from "./providers";



export default function RootLayout({children}) {
  return (
    <html lang="en" className='dark'>
      <body className='italic hide-scrollbar bg-gradient-to-tr from-sky-200 via-sky-400 to-sky-500'>
        
          <Navbar />
          {children}
        
      </body>
    </html>
  );
}