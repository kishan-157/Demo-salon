import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Calendar, Sparkles, Star, MapPin, Clock, Smartphone } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, setIsBookingModalOpen, setIsOwnerViewOpen } = useBooking();

  const eyebrow = settings.heroEyebrow || 'Beverly Hills Premier Beauty Destination';
  const tagline = settings.tagline || 'Where Elegance Meets Artisanal Beauty';
  const subheading = settings.subheading || 'Indulge in bespoke hair couture, rejuvenating skin treatments, and exquisite bridal styling crafted by master artisans.';
  const heroImage = settings.heroImage || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80';
  const primaryColor = settings.theme?.primaryColor || '#9E555A';
  const secondaryColor = settings.theme?.secondaryColor || '#854549';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F3F0] to-[#FCF9F6] py-16 lg:py-24 border-b border-[#EAD5D8]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2A3A6]/15 border border-[#E2A3A6]/30 text-[#854549] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2D2A29] leading-[1.15] text-balance">
              {tagline}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#6A605E] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {subheading}
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Appointment</span>
              </button>

              <button
                onClick={() => setIsOwnerViewOpen(true)}
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold bg-rose-50 hover:bg-rose-100 border border-[#EAD5D8] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ color: primaryColor }}
              >
                <Smartphone className="w-4 h-4" />
                <span>Experience Mobile Apps</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-8 border-t border-[#EAD5D8]/50 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 font-serif font-bold text-lg" style={{ color: primaryColor }}>
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-xs text-[#736B69]">Over 1,200+ Reviews</p>
              </div>

              <div>
                <div className="font-serif font-bold text-lg text-[#2D2A29]">
                  Master Artists
                </div>
                <p className="text-xs text-[#736B69]">Certified Specialists</p>
              </div>

              <div>
                <div className="font-serif font-bold text-lg text-[#2D2A29]">
                  Complimentary
                </div>
                <p className="text-xs text-[#736B69]">Valet & Refreshments</p>
              </div>
            </div>

          </div>

          {/* Right Image Grid / Featured Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container with elegant border & fallback */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#EAD5D8]/30 relative group">
                <img
                  src={heroImage}
                  alt={settings.name || 'Luxury Salon Interior'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold tracking-wider uppercase text-rose-200">
                    Bespoke Experience
                  </span>
                  <h3 className="text-xl font-serif font-bold mt-1">
                    The Art of Personal Renewal
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-rose-100/90">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {settings.address?.city || 'Beverly Hills'}, {settings.address?.state || 'CA'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Open Today till 8 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Accent Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#EAD5D8] hidden sm:flex items-center gap-4 max-w-xs">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-white shadow-sm" style={{ backgroundColor: primaryColor }}>
                  {settings.logoText ? settings.logoText.slice(0, 2).toUpperCase() : 'BR'}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2D2A29]">Complimentary Consultation</div>
                  <div className="text-[11px] text-[#6A605E]">Includes scalp & skin analysis</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
