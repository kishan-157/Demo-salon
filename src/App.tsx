/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { OwnerManagementModal } from './components/Admin/OwnerManagementModal';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#FCF9F6] text-[#2D2A29] flex flex-col font-sans">
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <ServicesSection />
          <GallerySection />
          <TestimonialsSection />
          <FaqSection />
          <LocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals */}
        <BookingModal />
        <OwnerManagementModal />
      </div>
    </BookingProvider>
  );
}
