import React from 'react'
import { Card } from "@/components/ui/card"

export default function Loading() {
    return (
        <main className="min-h-[100dvh] flex flex-col items-center pt-8 md:pt-16 pb-24 bg-slate-50 font-sans overflow-hidden">
            
            {/* Header Area Skeleton */}
            <div className="w-full max-w-5xl px-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-3 w-full max-w-xs animate-pulse">
                    <div className="h-9 md:h-10 bg-slate-200/80 rounded-lg w-3/4"></div>
                    <div className="h-4 md:h-5 bg-slate-200/80 rounded-md w-full"></div>
                </div>

                {/* Timer and Stats Panel Skeleton */}
                <Card className="px-6 py-3 border-slate-200/60 shadow-sm flex items-center gap-6 rounded-full bg-white/80 h-[52px] md:h-[56px] w-full md:w-[280px] animate-pulse">
                    <div className="h-5 bg-slate-100 rounded w-full"></div>
                    <div className="h-5 bg-slate-100 rounded w-full border-l border-slate-200"></div>
                </Card>
            </div>

            {/* Main Typing Area Skeleton */}
            <div className="w-full max-w-5xl px-4 md:px-6 relative">
                <Card className="w-full border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white overflow-hidden flex flex-col min-h-[385px] animate-pulse">
                    
                    {/* Placeholder characters */}
                    <div className="p-8 md:p-16 flex flex-wrap content-start gap-4 flex-1">
                        {Array.from({ length: 18 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="w-[3rem] h-[3.5rem] bg-slate-100/80 rounded-xl"
                                style={{
                                    opacity: 1 - (i * 0.04), // Fades out nicely to the right
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Input feedback banner Skeleton */}
                    <div className="bg-slate-50/50 border-t border-slate-100 py-4 px-8 flex items-center justify-between h-[61px]">
                        <div className="flex items-center gap-6">
                            <div className="h-6 w-24 bg-slate-200/50 rounded-md"></div>
                            <div className="h-6 w-24 bg-slate-200/50 rounded-md"></div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Keyboard visualization Skeleton */}
            <div className="mt-12 w-full max-w-4xl px-4 md:px-0">
                <div className="w-full h-[220px] md:h-[260px] bg-white rounded-[2rem] border border-slate-200 shadow-sm animate-pulse flex flex-col justify-between p-6">
                    {/* Fake keyboard rows */}
                    <div className="w-full h-10 md:h-12 bg-slate-50/80 rounded-xl"></div>
                    <div className="w-[95%] h-10 md:h-12 bg-slate-50/80 rounded-xl mx-auto"></div>
                    <div className="w-[90%] h-10 md:h-12 bg-slate-50/80 rounded-xl mx-auto"></div>
                    <div className="w-[85%] h-10 md:h-12 bg-slate-50/80 rounded-xl mx-auto"></div>
                </div>
            </div>
        </main>
    )
}
