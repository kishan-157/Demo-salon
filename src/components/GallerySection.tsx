import React, { useState } from 'react';
import { salonConfig } from '../config/salonConfig';
import { Sparkles, X, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-[#F9F3F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2A3A6]/10 text-[#9E555A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A29]">
            Inside Bella Rose Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-[#6A605E]">
            Take a visual tour of our luxurious styling stations, tranquil spa suites, and immaculate artisanal results.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {salonConfig.gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.image)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-white border border-[#EAD5D8]/50 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold tracking-wider uppercase text-rose-200">
                  {item.category}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="text-lg font-serif font-bold">{item.title}</h3>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImage}
              alt="Enlarged gallery view"
              className="w-full h-auto max-h-[85vh] object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
};
