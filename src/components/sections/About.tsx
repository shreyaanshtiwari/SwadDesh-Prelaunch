import React from 'react';
import Image from 'next/image';
import { Home, Users, Ban, Crown, Leaf } from 'lucide-react';

export const About = () => {
    return (
        <section id="about" className="py-0 lg:py-16 relative overflow-hidden border-b-[4px] border-[#d4af37] bg-[#fffcf5]">
            {/* Soft decorative background elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(128,0,32,0.04)_0%,transparent_70%)] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-0 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

                    {/* Mobile Background Overlay */}
                    <div className="absolute inset-0 z-0 lg:hidden pointer-events-none">
                        <Image
                            src="/heritage_palace.png"
                            alt="Majestic Indian Heritage Architecture"
                            fill
                            className="object-cover opacity-15 grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7]/98 via-[#fef5e7]/90 to-[#fdfbf7]/98 mix-blend-overlay"></div>
                    </div>

                    {/* Left: Royal Typography & Content */}
                    <div className="space-y-4 sm:space-y-8 order-2 lg:order-1 relative z-10 flex flex-col py-8 px-4 lg:py-0 lg:px-0">
                        {/* Decorative watermark */}
                        <div className="absolute top-[-40px] left-0 text-[180px] text-[#d4af37] opacity-[0.06] font-heading select-none pointer-events-none leading-none hidden lg:block">
                            S
                        </div>

                        <div className="space-y-3 sm:space-y-5 relative z-10">
                            <span className="inline-block text-[#b8860b] font-bold tracking-[4px] uppercase text-[10px] sm:text-sm border-b border-[#d4af37]/40 pb-2 drop-shadow-none whitespace-nowrap">
                                Taste Your Roots
                            </span>
                            <h2 className="text-3xl md:text-[45px] lg:text-[52px] xl:text-[60px] font-black text-[#4a0404] font-heading leading-tight drop-shadow-sm">
                                <span className="block lg:whitespace-nowrap">Finding the Flavor</span>
                                <i className="block lg:whitespace-nowrap text-[#800020] font-light">You've Been Missing</i>
                            </h2>
                            <div className="royal-separator !ml-0 hidden lg:block"></div>
                        </div>

                        <div className="space-y-6 text-[#5d4037] text-lg leading-relaxed font-body relative z-10 drop-shadow-none">
                            <p className="text-[#4a0404] font-semibold text-lg sm:text-xl xl:text-2xl italic font-heading border-l-4 border-[#d4af37] pl-4">
                                "Hum sab ne kabhi na kabhi, kisi na kisi jagah ka swaad miss kiya hai. Ghar ka. Shehar ka. Ya bachpan ka."
                            </p>
                            <p className="text-base sm:text-lg">
                                The problem isn't the taste—it's that the world has replaced soul with shortcuts. At SwadDesh, we believe you shouldn't have to settle for factory-made imitations of the flavors that define you.
                            </p>
                        </div>

                        {/* Heritage Journey Timeline */}
                        <div className="py-2 sm:py-4 relative z-10">
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#d4af37]/40 before:to-transparent">

                                {/* Step 1: The Soul */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37] bg-white text-[#8f0f0d] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-[#fef5e7] transition-colors duration-300">
                                        <Home className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-[#ffffff] to-[#fffcf5] p-4 rounded-xl border border-[#d4af37]/20 shadow-[0_4px_15px_rgba(212,175,55,0.05)]">
                                        <h4 className="font-bold text-[#4a0404] font-heading">Beyond a Service</h4>
                                        <p className="text-sm text-[#5d4037] mt-1">SwadDesh isn't just about delivery; it's about that familiar feeling of belonging that comes with a bite of home.</p>
                                    </div>
                                </div>

                                {/* Step 2: The Hands */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37] bg-white text-[#8f0f0d] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-[#fef5e7] transition-colors duration-300">
                                        <Users className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-[#ffffff] to-[#fffcf5] p-4 rounded-xl border border-[#d4af37]/20 shadow-[0_4px_15px_rgba(212,175,55,0.05)]">
                                        <h4 className="font-bold text-[#4a0404] font-heading">Regional Hearts & Hands</h4>
                                        <p className="text-sm text-[#5d4037] mt-1">Every delicacy is prepared by people from the very region it belongs to—retaining the original touch.</p>
                                    </div>
                                </div>

                                {/* Step 3: The Promise */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37] bg-white text-[#8f0f0d] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-[#fef5e7] transition-colors duration-300">
                                        <Ban className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-[#ffffff] to-[#fffcf5] p-4 rounded-xl border border-[#d4af37]/20 shadow-[0_4px_15px_rgba(212,175,55,0.05)]">
                                        <h4 className="font-bold text-[#4a0404] font-heading">Zero Factory Shortcuts</h4>
                                        <p className="text-sm text-[#5d4037] mt-1">No mass-production machinery or artificial additives. Only local kitchens and traditional, honest recipes.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#d4af37] shadow-sm flex items-center justify-center backdrop-blur-none shrink-0 text-[#8f0f0d]">
                                    <Crown className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <span className="block font-heading font-bold text-[#4a0404] text-base sm:text-lg drop-shadow-none">True To Roots</span>
                                    <span className="text-[#8b6914] uppercase tracking-widest text-[9px] font-bold">Native Preparation</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#d4af37] shadow-sm flex items-center justify-center backdrop-blur-none shrink-0 text-[#8f0f0d]">
                                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <span className="block font-heading font-bold text-[#4a0404] text-base sm:text-lg drop-shadow-none">No Shortcuts</span>
                                    <span className="text-[#8b6914] uppercase tracking-widest text-[9px] font-bold">Authentic Recipes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Indian Arch Royal Visuals (Hidden on Mobile) */}
                    <div className="relative h-[400px] md:h-[650px] w-full flex justify-center items-center order-1 lg:order-2 mt-8 lg:mt-0 hidden lg:flex">
                        {/* The Royal Arch (Mehrab style) */}
                        <div className="relative w-[85%] h-[90%] bg-gradient-to-br from-[#ffffff] to-[#fff8eb] p-4 rounded-t-full shadow-[0_20px_60px_rgba(107,10,9,0.12)] border border-[#d4af37]/40 z-10 group">

                            {/* Inner Arch Image */}
                            <div className="relative w-full h-full rounded-t-full overflow-hidden border-[6px] border-[#fef5e7] border-b-0 shadow-inner">
                                <Image
                                    src="/heritage_palace.png"
                                    alt="Majestic Indian Heritage Architecture"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#4a0404]/10 via-transparent to-[#4a0404]/80 opacity-60"></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
