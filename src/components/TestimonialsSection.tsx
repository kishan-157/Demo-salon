import React from 'react';
import { salonConfig } from '../config/salonConfig';
import { Star, Sparkles, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2A3A6]/10 text-[#9E555A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A29]">
            Words From Our Beloved Guests
          </h2>
          <p className="text-sm sm:text-base text-[#6A605E]">
            Read authentic reviews from guests who trusted us with their hair, skin, and bridal artistry.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {salonConfig.testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#FCF9F6] p-8 rounded-3xl border border-[#EAD5D8]/60 shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-all"
            >
              <div className="absolute top-6 right-6 text-[#E2A3A6]/30">
                <Quote className="w-10 h-10" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#595250] italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EAD5D8]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-[#2D2A29]">{t.name}</h4>
                  <p className="text-xs text-[#9E555A]">{t.service}</p>
                </div>
                <span className="text-[11px] text-[#736B69]">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
