import React, { useState } from 'react';
import { salonConfig, ServiceItem } from '../config/salonConfig';
import { useBooking } from '../context/BookingContext';
import { Clock, Tag, Sparkles, Check } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { setSelectedServiceForBooking, setIsBookingModalOpen } = useBooking();
  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'skin' | 'beauty' | 'bridal'>('all');

  const filteredServices = activeCategory === 'all' 
    ? salonConfig.services 
    : salonConfig.services.filter(s => s.category === activeCategory);

  const handleBookService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2A3A6]/10 text-[#9E555A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A29]">
            Services & Approved Pricing
          </h2>
          <p className="text-sm sm:text-base text-[#6A605E]">
            Each service is tailored with premium organic products and executed by master artisans to deliver immaculate results.
          </p>

          {/* Category Filter Tabs (Interactive Controls - Functional Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'hair', label: 'Hair Couture' },
              { id: 'skin', label: 'Skin & Facial' },
              { id: 'beauty', label: 'Beauty & Nails' },
              { id: 'bridal', label: 'Bridal Glamour' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#9E555A] text-white shadow-sm'
                    : 'bg-[#F9F3F0] text-[#595250] hover:bg-[#EAD5D8]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#FCF9F6] rounded-3xl overflow-hidden border border-[#EAD5D8]/60 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Service Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EAD5D8]/20">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {service.popular && (
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#9E555A] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                )}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-200" />
                  <span>{service.durationMinutes} mins</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-[#2D2A29]">
                      {service.name}
                    </h3>
                    <span className="text-lg font-serif font-bold text-[#9E555A]">
                      ${service.price}
                    </span>
                  </div>
                  <p className="text-sm text-[#6A605E] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAD5D8]/60 flex items-center justify-between">
                  <div className="text-xs text-[#736B69] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Includes consultation</span>
                  </div>
                  <button
                    onClick={() => handleBookService(service)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#9E555A] hover:bg-[#854549] rounded-full transition-colors"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
