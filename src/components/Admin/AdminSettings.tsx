import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Settings, Save, RotateCcw, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useBooking();

  const [name, setName] = useState(settings.name);
  const [logoText, setLogoText] = useState(settings.logoText);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [email, setEmail] = useState(settings.email);
  const [street, setStreet] = useState(settings.address.street);
  const [city, setCity] = useState(settings.address.city);
  const [state, setState] = useState(settings.address.state);
  const [zip, setZip] = useState(settings.address.zip);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(settings.googleMapsUrl);

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name,
      logoText,
      phone,
      displayPhone: phone,
      whatsappNumber,
      email,
      address: {
        street,
        city,
        state,
        zip,
        full: `${street}, ${city}, ${state} ${zip}`
      },
      googleMapsUrl
    });

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };


  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-[#2D2A29]">Salon Profile & Settings</h3>
          <p className="text-xs text-[#6A605E]">Customize business information, address, WhatsApp contact, and configuration.</p>
        </div>

      </div>

      {/* Production vs Demo Limitation Notice */}
      <div className="bg-[#F4EBE1] border border-[#EAD5D8] p-5 rounded-2xl flex items-start gap-3 text-xs text-[#595250]">
        <AlertCircle className="w-5 h-5 text-[#9E555A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-[#2D2A29] block">Single-Salon Demo & Persistence Notice:</strong>
          <p className="leading-relaxed">
            This project manages <strong>one salon only</strong>. Settings and bookings updated here are saved persistently in your browser's local session storage for seamless demo evaluation. In a production deployment, these settings would be persisted in a secure backend database with multi-role access control.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Salon profile settings updated successfully! Changes are immediately reflected across the website.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#595250] mb-1">Salon Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#595250] mb-1">Brand Logo Text *</label>
            <input
              type="text"
              required
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#595250] mb-1">Phone Number *</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#595250] mb-1">WhatsApp Number (Numeric) *</label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="15553829400"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#595250] mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#EAD5D8]/60">
          <h4 className="font-serif font-bold text-base text-[#2D2A29]">Address & Location</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#595250] mb-1">Street Address *</label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#595250] mb-1">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#595250] mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#595250] mb-1">ZIP *</label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#595250] mb-1">Google Maps URL</label>
              <input
                type="url"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-[#EAD5D8]">
          <button
            type="submit"
            className="px-8 py-3 bg-[#9E555A] hover:bg-[#854549] text-white text-xs font-semibold rounded-full shadow-md flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Salon Profile Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
