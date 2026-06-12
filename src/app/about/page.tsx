import React from 'react';

const AboutPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] p-4">
            <div className="w-full max-w-4xl p-8 rounded-2xl bg-black/10 backdrop-blur-md shadow-xl border border-white/20 text-slate-800 dark:text-slate-100">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-sky-900 dark:text-sky-100 drop-shadow-sm">
                    About Punjabi Typing
                </h1>
                
                <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                    <p>
                        Welcome to <strong>Punjabi Typing</strong>, your premier destination for learning and mastering the art of typing in Punjabi. Whether you are a complete beginner or looking to improve your typing speed and accuracy, our platform is tailored to meet your needs.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="p-6 rounded-xl bg-white/20 hover:bg-white/30 transition-colors border border-white/10 shadow-sm">
                            <h2 className="text-2xl font-semibold mb-3 text-sky-800 dark:text-sky-200">Our Mission</h2>
                            <p className="text-base md:text-lg">
                                We aim to preserve and promote the Punjabi language in the digital era by making it accessible and easy to type for everyone. We believe that technology should empower linguistic heritage.
                            </p>
                        </div>
                        
                        <div className="p-6 rounded-xl bg-white/20 hover:bg-white/30 transition-colors border border-white/10 shadow-sm">
                            <h2 className="text-2xl font-semibold mb-3 text-sky-800 dark:text-sky-200">Interactive Learning</h2>
                            <p className="text-base md:text-lg">
                                Our interactive lessons are designed to build your muscle memory step-by-step. With real-time feedback and engaging exercises, you'll be typing fluently in no time.
                            </p>
                        </div>
                    </div>

                    <p className="pt-6 text-center font-medium italic text-sky-900 dark:text-sky-100">
                        Start your typing journey today and connect with your roots through every keystroke!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
