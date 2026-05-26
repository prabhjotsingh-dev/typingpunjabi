import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar: React.FC = () => {
    return <header className="flex items-center justify-between w-screen italic border-b-2 border-black sm:flex-row sm:justify-between bg-gradient-to-tr from-sky-300 via-sky-400 to-sky-600 text-slate-200 sm:font-semibold h-14 sm:items-center lg:items-center">
        <p className="[text-shadow:1px_1px_1px_green] sm:[text-shadow:1.5px_1.5px_1.5px_green] text-lg sm:ml-5 ml-2 sm:text-2xl" ><Link href="/">ਪੰਜਾਬੀ ਟਾਇਪਿੰਗ</Link></p>
        <div className="flex mb-3 items-center gap-1 sm:gap-3 border-2 border-r-0 border-sky-800 w-fit rounded-full h-[1.2lh] text-xs sm:text-md sm:my-5 lg:text-lg lg:m-0 lg:gap-10 ">
            <nav className="flex lg:gap-5 lg:ml-5 ">
                <Link href="/lesson" className="ml-1" >Lesson</Link>
                <Link href="/contact" className="ml-1" >Contact</Link>
                <Link href="/about" className="ml-1 " >About</Link>
            </nav>
            <Image className="w-[2.5lh] h-[2.5lh] rounded-full" height={2} width={2} src="/letter-1347416_960_720.jpg" alt="Punjabi Typing Logo" />
        </div>
    </header>
}
export default Navbar