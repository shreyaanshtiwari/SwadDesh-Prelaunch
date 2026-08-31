import React from 'react';
import Image from 'next/image';
import { Crown, Compass, Sparkles, Linkedin, Mail, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FounderProps {
    name: string;
    role: string;
    roleTag: string;
    image: string;
    bio: string;
    quote: string;
    focusAreas: string[];
    socials: {
        linkedin?: string;
        email?: string;
        portfolio?: string;
    };
    icon: React.ReactNode;
    badgeColor: string;
}

const founders: FounderProps[] = [
    {
        name: "Shreyansh Kumar Tiwari",
        role: "Founder & CEO",
        roleTag: "Vision & Technology",
        image: "/team/shreyansh-tiwari.png",
        bio: "Leading the vision and technological architecture of SwadDesh. Driven by a deep commitment to preserve traditional Indian culinary heritage and connect families back to their native roots with uncompromised royal purity.",
        quote: "SwadDesh isn't just a platform; it's a heartfelt mission to revive the authentic tastes lost to factory shortcuts.",
        focusAreas: ["Brand Vision", "Ecosystem Architecture", "Heritage Revival"],
        socials: {
            linkedin: "https://www.linkedin.com/in/shreyansh-tiwari-",
            email: "mailto:shreyanshtiwari2412@gmail.com",
            portfolio: "https://shreyanshtiwari.swaddesh.in",
        },
        icon: <Crown className="w-4 h-4" strokeWidth={1.75} />,
        badgeColor: "bg-[#800020] text-[#ffd700] border-[#d4af37]/40",
    },
    {
        name: "Prasoon Sharma",
        role: "Co-founder & COO",
        roleTag: "Operations & Strategy",
        image: "/team/prasoon-sharma.png",
        bio: "Spearheading on-ground operations, pan-India supply chain frameworks, and artisan partnerships. Ensuring every traditional delicacy reaches your doorstep with strict freshness, safety, and authentic regional taste.",
        quote: "We work directly with traditional artisans and regional kitchens to ensure every bite delivers the true soul of its origin.",
        focusAreas: ["Operations & Logistics", "Artisan Network", "Quality Assurance"],
        socials: {
            linkedin: "https://www.linkedin.com/in/prasoon-sharma-operations",
            email: "mailto:swaddesh111077@gmail.com",
            portfolio: "https://prasoonsharma.swaddesh.in",
        },
        icon: <Compass className="w-4 h-4" strokeWidth={1.75} />,
        badgeColor: "bg-[#4a0404] text-[#ffd700] border-[#d4af37]/40",
    },
];

export const Founders = () => {
    return (
        <section id="founders" className="py-12 lg:py-20 relative overflow-hidden border-b-[4px] border-[#d4af37] bg-gradient-to-b from-[#fdfbf7] via-[#fffcf5] to-[#f7eedc]">
            {/* Ambient Royal Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(128,0,32,0.04)_0%,transparent_70%)] rounded-full pointer-events-none translate-y-1/2"></div>

            {/* Decorative Heritage Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[240px] md:text-[340px] text-[#d4af37] opacity-[0.03] font-heading select-none pointer-events-none leading-none">
                SWADDESH
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12 lg:mb-16 space-y-4">
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-2 font-bold text-[#b8860b] uppercase tracking-[2px] sm:tracking-[4px] text-[10px] sm:text-xs px-4 py-1.5 border border-[#d4af37]/40 rounded-full bg-white/70 backdrop-blur-sm shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                            The Visionaries Behind SwadDesh
                            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#4a0404] font-heading leading-tight drop-shadow-sm">
                        Founders & <i className="text-[#800020] font-light">Leadership</i>
                    </h2>

                    {/* Royal Ornament Separator */}
                    <div className="flex items-center justify-center gap-4 py-2">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <div className="w-2.5 h-2.5 rotate-45 border border-[#d4af37] bg-[#ffd700]"></div>
                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>

                    <p className="text-[#5d4037] text-base sm:text-lg max-w-2xl mx-auto font-body font-light">
                        United by passion and driven by purpose — restoring traditional flavors with authentic craftsmanship and modern excellence.
                    </p>
                </div>

                {/* Founders Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {founders.map((founder, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col bg-gradient-to-br from-[#ffffff] via-[#fffdfa] to-[#fff8eb] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#d4af37]/30 shadow-[0_15px_35px_rgba(107,10,9,0.06)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.18)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                        >
                            {/* Royal Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/50 m-4 pointer-events-none transition-all duration-300 group-hover:border-[#b8860b]"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/50 m-4 pointer-events-none transition-all duration-300 group-hover:border-[#b8860b]"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/50 m-4 pointer-events-none transition-all duration-300 group-hover:border-[#b8860b]"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/50 m-4 pointer-events-none transition-all duration-300 group-hover:border-[#b8860b]"></div>

                            {/* Top Section: Avatar & Header */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                                {/* Portrait with Royal Mehrab / Arched Frame */}
                                <div className="relative shrink-0">
                                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl md:rounded-3xl p-1.5 bg-gradient-to-b from-[#d4af37] via-[#f1e5ac] to-[#b8860b] shadow-[0_8px_20px_rgba(212,175,55,0.25)] group-hover:shadow-[0_12px_28px_rgba(212,175,55,0.4)] transition-all duration-500">
                                        <div className="relative w-full h-full rounded-[14px] md:rounded-[20px] overflow-hidden bg-[#2b0202]">
                                            <Image
                                                src={founder.image}
                                                alt={`${founder.name} - ${founder.role}`}
                                                fill
                                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                                                sizes="(max-width: 640px) 128px, 144px"
                                                priority={true}
                                            />
                                        </div>
                                    </div>
                                    {/* Icon Badge Overlay */}
                                    <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#800020] border-2 border-[#ffd700] text-[#ffd700] flex items-center justify-center shadow-md">
                                        {founder.icon}
                                    </div>
                                </div>

                                {/* Title & Name */}
                                <div className="text-center sm:text-left flex-1 flex flex-col justify-center">
                                    <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider mb-2 self-center sm:self-start bg-[#800020]/10 text-[#800020] border-[#800020]/20">
                                        {founder.role}
                                    </div>

                                    <h3 className="text-2xl sm:text-[26px] font-black text-[#4a0404] font-heading leading-snug">
                                        {founder.name}
                                    </h3>

                                    <p className="text-[#b8860b] text-xs sm:text-sm font-semibold tracking-wide mt-0.5">
                                        {founder.roleTag}
                                    </p>

                                    {/* Social & Contact links */}
                                    <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-3">
                                        {founder.socials.linkedin && (
                                            <a
                                                href={founder.socials.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-full bg-white border border-[#d4af37]/40 text-[#4a0404] hover:bg-[#800020] hover:text-[#ffd700] hover:border-[#800020] flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                                                aria-label={`${founder.name} LinkedIn`}
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                        {founder.socials.email && (
                                            <a
                                                href={founder.socials.email}
                                                className="w-8 h-8 rounded-full bg-white border border-[#d4af37]/40 text-[#4a0404] hover:bg-[#800020] hover:text-[#ffd700] hover:border-[#800020] flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                                                aria-label={`Email ${founder.name}`}
                                            >
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        )}
                                        {founder.socials.portfolio && (
                                            <a
                                                href={founder.socials.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-full bg-white border border-[#d4af37]/40 text-[#4a0404] hover:bg-[#800020] hover:text-[#ffd700] hover:border-[#800020] flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
                                                aria-label={`${founder.name} Portfolio`}
                                                title="View Portfolio"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent my-5 relative z-10"></div>

                            {/* Quote Box */}
                            <div className="bg-[#fff8eb]/80 border-l-3 border-[#d4af37] p-3.5 rounded-r-xl mb-4 relative z-10">
                                <p className="text-[#4a0404] italic text-xs sm:text-sm font-heading font-medium leading-relaxed">
                                    "{founder.quote}"
                                </p>
                            </div>

                            {/* Bio Description */}
                            <p className="text-[#5d4037] text-sm leading-relaxed font-body font-light mb-5 flex-1 relative z-10">
                                {founder.bio}
                            </p>

                            {/* Key Focus Tags */}
                            <div className="pt-2 border-t border-[#d4af37]/20 flex flex-wrap gap-2 relative z-10">
                                {founder.focusAreas.map((tag, tagIdx) => (
                                    <span
                                        key={tagIdx}
                                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white border border-[#d4af37]/30 text-[#8b6914] shadow-xs"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Trust Note */}
                <div className="mt-12 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#d4af37]/30 bg-white/60 backdrop-blur-sm text-xs sm:text-sm text-[#8b6914] font-medium shadow-xs">
                        <ShieldCheck className="w-4 h-4 text-[#800020]" />
                        <span>Crafted with integrity • Rooted in heritage • Delivered with honor</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
