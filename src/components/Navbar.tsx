import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { BrandLogo } from './BrandLogo';
import { Calendar, ShieldCheck, Menu, X, MessageCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, setIsBookingModalOpen, setIsOwnerViewOpen, getWhatsAppUrl } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F6]/95 backdrop-blur-md border-b border-[#EAD5D8]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark / Dynamic Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <BrandLogo settings={settings} size="md" />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#595250]">
          <a href="#services" className="hover:text-[#9E555A] transition-colors whitespace-nowrap shrink-0">Services</a>
          <a href="#gallery" className="hover:text-[#9E555A] transition-colors whitespace-nowrap shrink-0">Gallery</a>
          <button onClick={() => setIsOwnerViewOpen(true)} className="hover:text-[#9E555A] transition-colors whitespace-nowrap shrink-0 cursor-pointer">Mobile Apps</button>
          <a href="#testimonials" className="hover:text-[#9E555A] transition-colors whitespace-nowrap shrink-0">Reviews</a>
          <a href="#faq" className="hover:text-[#9E555A] transition-colors whitespace-nowrap shrink-0">FAQ</a>
          <a href="#location" className="hover:text-[#9E555A] transition-colors whitespace-nowrap shrink-0">Location & Hours</a>
        </nav>

        {/* Zone 3: Primary Action & Owner Portal */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsOwnerViewOpen(true)}
            className="px-3.5 py-2 text-xs font-medium text-[#735A5D] bg-[#F4EBE1] hover:bg-[#EAD5D8] rounded-full transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="Salon Owner Management & Admin Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#9E555A]" />
            <span>Owner Portal / Admin</span>
          </button>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-[#25D366] hover:bg-emerald-50 rounded-full transition-colors border border-emerald-200"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#9E555A] hover:bg-[#854549] rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#9E555A] rounded-full"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#595250] hover:text-[#2D2A29]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCF9F6] border-b border-[#EAD5D8] px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#595250]">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#9E555A] py-1"
            >
              Services
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#9E555A] py-1"
            >
              Gallery
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#9E555A] py-1"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#9E555A] py-1"
            >
              FAQ
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#9E555A] py-1"
            >
              Location & Hours
            </a>
          </nav>
          <div className="pt-3 border-t border-[#EAD5D8]/50 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOwnerViewOpen(true);
              }}
              className="w-full py-2.5 text-xs font-medium text-[#735A5D] bg-[#F4EBE1] rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#9E555A]" />
              <span>Owner Portal & Admin Panel</span>
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>Chat via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
