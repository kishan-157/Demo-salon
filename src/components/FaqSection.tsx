import React, { useState } from 'react';
import { salonConfig } from '../config/salonConfig';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#F9F3F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2A3A6]/10 text-[#9E555A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A29]">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-[#6A605E]">
            Find answers regarding our booking process, cancellation policies, and salon amenities.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {salonConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#EAD5D8]/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-lg text-[#2D2A29] hover:text-[#9E555A] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="p-1 rounded-full bg-[#F9F3F0] text-[#9E555A] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-[#6A605E] leading-relaxed border-t border-[#EAD5D8]/30 pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
