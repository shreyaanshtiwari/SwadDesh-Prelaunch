'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                ? 'bg-[#1a0101]/90 backdrop-blur-md border-b border-[#d4af37]/30 py-1 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent pt-6 pb-2'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-10 flex items-center">
                    <Image
                        src="/Logo.png"
                        alt="SwadDesh Logo"
                        width={isScrolled ? 120 : 140}
                        height={isScrolled ? 35 : 45}
                        className="object-contain transition-all duration-500"
                        priority
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-6 bg-black/20 px-6 py-1.5 rounded-full border border-[#d4af37]/20 backdrop-blur-sm">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-[#fef5e7] hover:text-[#ffd700] text-sm font-medium tracking-wide uppercase transition-colors"
                    >
                        Our Story
                    </button>
                    <button
                        onClick={() => scrollToSection('products')}
                        className="text-[#fef5e7] hover:text-[#ffd700] text-sm font-medium tracking-wide uppercase transition-colors"
                    >
                        Delicacies
                    </button>
                    <button
                        onClick={() => scrollToSection('why-us')}
                        className="text-[#fef5e7] hover:text-[#ffd700] text-sm font-medium tracking-wide uppercase transition-colors"
                    >
                        Values
                    </button>
                </div>

                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => scrollToSection('early-access')}
                        size="sm"
                        className="hidden sm:flex relative overflow-hidden bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] border-none font-bold px-6 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">Join Waitlist</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#d4af37] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>

                </div>
            </div>
        </nav>
    );
};
