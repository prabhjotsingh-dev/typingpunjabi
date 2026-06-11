import React from 'react';
export { metadata } from '@/metadata/contact';

const ContactPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] p-4">
            <div className="p-8 w-full max-w-2xl rounded-2xl border shadow-xl backdrop-blur-md bg-black/10 border-white/20 text-slate-800 dark:text-slate-100">
                <h1 className="mb-8 text-4xl font-bold text-center text-sky-900 drop-shadow-sm md:text-5xl dark:text-sky-100">
                    Contact Us
                </h1>
                
                <div className="space-y-8 text-lg leading-relaxed md:text-xl">
                    <p className="text-center">
                        Have a question, feedback, or just want to say hello? We would love to hear from you! 
                        Reach out to us through any of the platforms below.
                    </p>
                    
                    <div className="flex flex-col gap-6 mt-8">
                        {/* Email */}
                        <a 
                            href="mailto:prabhjotsing-dev@outlook.com"
                            className="flex gap-4 items-center p-5 rounded-xl border shadow-sm transition-all bg-white/20 hover:bg-white/30 border-white/10 group hover:-translate-y-1"
                        >
                            <div className="p-3 text-sky-700 rounded-full transition-colors bg-sky-500/20 dark:text-sky-300 group-hover:bg-sky-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-sky-800 dark:text-sky-200">Email</h2>
                                <p className="text-base text-slate-700 dark:text-slate-300">prabhjotsing-dev@outlook.com</p>
                            </div>
                        </a>
                        
                        {/* GitHub */}
                        <a 
                            href="https://github.com/prabhjotsingh-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 items-center p-5 rounded-xl border shadow-sm transition-all bg-white/20 hover:bg-white/30 border-white/10 group hover:-translate-y-1"
                        >
                            <div className="p-3 text-sky-700 rounded-full transition-colors bg-sky-500/20 dark:text-sky-300 group-hover:bg-sky-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-sky-800 dark:text-sky-200">GitHub</h2>
                                <p className="text-base text-slate-700 dark:text-slate-300">prabhjotsingh-dev</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
