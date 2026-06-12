import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
export { metadata } from '@/metadata/contact';

const GithubIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
);

const ContactPage = () => {
    return (
        <main className="flex max-h-[calc(100svh-3.5rem)] w-full bg-background text-foreground selection:bg-primary/30 py-auto">
            <div className="px-6 mx-auto max-w-7xl md:px-12">
                
                <section className="grid grid-cols-1 gap-16 items-start mt-12 lg:grid-cols-12 lg:gap-8">
                    
                    {/* Left Side - Typography & Messaging */}
                    <div className="flex flex-col gap-6 lg:col-span-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 w-fit text-sm font-medium tracking-tight text-muted-foreground">
                            <MessageSquare className="w-4 h-4 stroke-[1.5]" />
                            <span>Contact Us</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-semibold tracking-tighter leading-[1.05] text-foreground">
                            Let's start a <span className="text-primary">conversation.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[45ch] mt-4">
                            Have a question, feedback, or just want to say hello? We would love to hear from you. Reach out through any of the platforms below and we'll get back to you as soon as possible.
                        </p>
                    </div>
                    
                    {/* Right Side - Interactive Links */}
                    <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
                        {/* Email */}
                        <a 
                            href="mailto:prabhjotsing-dev@outlook.com"
                            className="group relative flex flex-col items-start gap-4 p-8 rounded-[2rem] bg-secondary/20 border border-border/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-secondary/40 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-0 transition-all duration-300 translate-x-4 -translate-y-4 group-hover:opacity-10 group-hover:translate-y-0 group-hover:translate-x-0">
                                <Mail className="w-24 h-24 text-primary" />
                            </div>
                            <div className="p-3 rounded-2xl border transition-colors bg-background border-border/50 text-foreground group-hover:text-primary group-hover:border-primary/30">
                                <Mail className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <div>
                                <h2 className="mb-1 text-2xl font-medium tracking-tight text-foreground">Email</h2>
                                <p className="text-base transition-colors text-muted-foreground group-hover:text-foreground">prabhjotsing-dev@outlook.com</p>
                            </div>
                        </a>
                        
                        {/* GitHub */}
                        <a 
                            href="https://github.com/prabhjotsingh-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col items-start gap-4 p-8 rounded-[2rem] bg-secondary/20 border border-border/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-secondary/40 hover:shadow-xl hover:shadow-foreground/5 hover:border-foreground/20 overflow-hidden mb-4"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-0 transition-all duration-300 translate-x-4 -translate-y-4 group-hover:opacity-5 group-hover:translate-y-0 group-hover:translate-x-0">
                                <GithubIcon className="w-24 h-24 text-foreground" />
                            </div>
                            <div className="p-3 rounded-2xl border transition-colors bg-background border-border/50 text-foreground group-hover:border-foreground/30">
                                <GithubIcon className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <div>
                                <h2 className="mb-1 text-2xl font-medium tracking-tight text-foreground">GitHub</h2>
                                <p className="text-base transition-colors text-muted-foreground group-hover:text-foreground">prabhjotsingh-dev</p>
                            </div>
                        </a>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default ContactPage;
