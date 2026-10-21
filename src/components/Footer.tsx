import React from 'react';
import { useBooking } from '../context/BookingContext';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setIsOwnerViewOpen, getWhatsAppUrl } = useBooking();

  return (
    <footer className="bg-[#2D2A29] text-[#EAD5D8] pt-16 pb-12 border-t border-[#3D3A38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#4D4846]">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo settings={settings} variant="light" size="lg" />
            <p className="text-sm text-[#B8A8A6] leading-relaxed">
              {settings.tagline}. {settings.subheading}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsOwnerViewOpen(true)}
                className="px-4 py-2 text-xs font-medium text-white bg-[#9E555A]/50 hover:bg-[#9E555A] rounded-full transition-colors flex items-center gap-2 border border-[#9E555A] cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-rose-200" />
                <span>Open Salon Owner Portal</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-white text-lg">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-[#B8A8A6]">
              <li><a href="#services" className="hover:text-white transition-colors">Services & Pricing</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a></li>
              <li><button onClick={() => setIsOwnerViewOpen(true)} className="hover:text-white transition-colors text-left cursor-pointer">Mobile App Previews</button></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Guest Reviews</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Location & Hours</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif font-bold text-white text-lg">Concierge & Location</h4>
            <ul className="space-y-3 text-sm text-[#B8A8A6]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9E555A] shrink-0 mt-1" />
                <span>{settings.address?.full || 'Beverly Hills, CA'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9E555A] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.displayPhone || settings.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9E555A] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
              </li>
              <li className="pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat with Concierge on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Demo Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E908E]">
          <p>© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
          <p className="text-[11px] bg-[#3D3A38] px-3 py-1.5 rounded-lg border border-[#4D4846]">
            Universal Customizable Salon & Spa Platform
          </p>
        </div>

      </div>
    </footer>
  );
};
