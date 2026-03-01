'use client';

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';

const faqs = [
    {
        question: 'What is SwaadDesh?',
        answer: 'SwaadDesh is a premium brand dedicated to bringing you the most authentic, traditionally prepared foods and delicacies sourced directly from their roots in India, preserving original recipes and techniques.',
    },
    {
        question: 'When will the store officially launch?',
        answer: 'We are currently adding finishes to our initial product line. By joining the waiting list today, you will receive an exclusive early access link before our public launch and an assured discount.',
    },
    {
        question: 'Where do you source your ingredients?',
        answer: 'We source locally directly from artisan farmers and traditional cooperatives across various Indian regions known for their native specialties, ensuring fair trade and highest quality without compromises.',
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <Section className="py-28 relative border-b-[4px] border-[#d4af37]">
            <div className="max-w-3xl mx-auto z-10 relative">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-[#4a0404] font-heading drop-shadow-sm">Frequently Asked <i className="text-[#8f0f0d] font-light">Questions</i></h2>
                    <p className="text-[#8b6914] text-lg font-heading italic">Got questions? We've got answers.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-border-color rounded-xl bg-white overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-gold' : 'hover:border-gold-light'
                                }`}
                        >
                            <button
                                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-bold text-xl text-[#4a0404] font-heading">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === index ? 'rotate-180 text-[#d4af37]' : 'text-[#8b6914]'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-[#5d4037] leading-relaxed pt-3 border-t border-[#e0c080]/30 font-body">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
