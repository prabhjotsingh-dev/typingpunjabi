import React from 'react';
import { Globe, Target, Zap, Keyboard } from 'lucide-react';
export { metadata } from '@/metadata/about';

const AboutPage = () => {
    return (
        <main className="min-h-[100dvh] w-full bg-background text-foreground selection:bg-primary/30 pt-16 pb-16 md:pt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Hero Section - Asymmetric Left Aligned */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 w-fit text-sm font-medium tracking-tight text-muted-foreground">
                            <Globe className="w-4 h-4 stroke-[1.5]" />
                            <span>Our Mission</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-semibold tracking-tighter leading-[1.05] text-foreground">
                            Preserving linguistic heritage through <span className="text-primary">digital fluency.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[55ch] mt-4">
                            Punjabi Typing is a dedicated platform designed to build your muscle memory step-by-step. We believe technology should empower your linguistic roots, not erase them.
                        </p>
                    </div>
                    
                    {/* Abstract visual element instead of centered text */}
                    <div className="lg:col-span-4 hidden lg:flex justify-end items-start pt-12">
                        <div className="relative w-full aspect-square max-w-[300px]">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
                            <div className="absolute inset-10 rounded-full border border-primary/20" />
                        </div>
                    </div>
                </section>

                {/* Core Pillars - Anti-Card Overuse (Using Grid + Negative Space) */}
                <section className="border-t border-border pt-16 md:pt-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        
                        {/* Pillar 1 */}
                        <div className="flex flex-col gap-5 group cursor-default">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/20">
                                <Target className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                                Intentional Practice
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[45ch]">
                                We abandoned the generic typing test format. Our curriculum focuses on specific phonetic groups and common Punjabi keystroke patterns to optimize muscle memory retention.
                            </p>
                        </div>

                        {/* Pillar 2 */}
                        <div className="flex flex-col gap-5 group cursor-default">
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-accent/20">
                                <Zap className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
                                Real-time Feedback
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[45ch]">
                                Get immediate, granular insights into your accuracy and speed. We track your weakest characters and dynamically adjust exercises to fortify your typing confidence.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Footer / Outro */}
                <section className="mt-32 pb-16 flex flex-col items-center text-center">
                    <Keyboard className="w-8 h-8 text-muted-foreground/50 mb-8" />
                    <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground max-w-2xl leading-tight">
                        Connect with your roots through every keystroke.
                    </p>
                </section>

            </div>
        </main>
    );
};

export default AboutPage;
