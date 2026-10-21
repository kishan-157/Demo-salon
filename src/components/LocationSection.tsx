import React from 'react';
import { salonConfig } from '../config/salonConfig';
import { useBooking } from '../context/BookingContext';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { getWhatsAppUrl } = useBooking();

  return (
    <section id="location" className="py-20 bg-white border-t border-[#EAD5D8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E555A] px-3 py-1 bg-[#E2A3A6]/10 rounded-full">
                Visit Our Sanctuary
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A29]">
                Location & Hours
              </h2>
              <p className="text-sm sm:text-base text-[#6A605E]">
                Conveniently situated in the heart of Beverly Hills with complimentary valet parking for all scheduled guests.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FCF9F6] border border-[#EAD5D8]/60">
                <div className="p-3 rounded-full bg-[#E2A3A6]/20 text-[#9E555A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-serif font-bold text-[#2D2A29]">Address</h4>
                  <p className="text-sm text-[#6A605E]">{salonConfig.address.full}</p>
                  <a
                    href={salonConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#9E555A] hover:underline pt-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Contact Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#FCF9F6] border border-[#EAD5D8]/60">
                  <div className="p-3 rounded-full bg-[#E2A3A6]/20 text-[#9E555A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#2D2A29]">Phone</h4>
                    <a href={`tel:${salonConfig.phone}`} className="text-sm text-[#6A605E] hover:text-[#9E555A]">
                      {salonConfig.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#FCF9F6] border border-[#EAD5D8]/60">
                  <div className="p-3 rounded-full bg-emerald-100 text-emerald-700">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#2D2A29]">WhatsApp</h4>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-700 font-semibold hover:underline"
                    >
                      Chat with Concierge
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Box */}
            <div className="p-6 rounded-2xl bg-[#F9F3F0] border border-[#EAD5D8] space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2D2A29]">
                <Clock className="w-5 h-5 text-[#9E555A]" />
                <span>Business Hours</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-[#595250]">
                <div className="flex justify-between py-1 border-b border-[#EAD5D8]/40">
                  <span>Monday – Wednesday</span>
                  <span className="font-semibold">{salonConfig.hours.monday}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAD5D8]/40">
                  <span>Thursday – Friday</span>
                  <span className="font-semibold">{salonConfig.hours.thursday}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAD5D8]/40">
                  <span>Saturday</span>
                  <span className="font-semibold">{salonConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAD5D8]/40">
                  <span>Sunday</span>
                  <span className="font-semibold">{salonConfig.hours.sunday}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Map Embed / Visual representation */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#EAD5D8]/20 relative group">
              {/* Simulated high fidelity map representation / iframe */}
              <iframe
                title="Salon Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.748729221503!2d-118.4003569234857!3d34.06990391745492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d1d4f7%3A0x123456789abcdef!2sBeverly%2C%20Los%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#EAD5D8] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-[#2D2A29]">Bella Rose Luxury Salon</h4>
                  <p className="text-xs text-[#6A605E]">Complimentary Valet Parking Available</p>
                </div>
                <a
                  href={salonConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#9E555A] rounded-full hover:bg-[#854549] transition-colors whitespace-nowrap"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
