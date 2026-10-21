import React, { useState, useEffect } from 'react';
import { salonConfig, ServiceItem } from '../config/salonConfig';
import { useBooking, BookingRequest } from '../context/BookingContext';
import { Calendar, Clock, X, CheckCircle2, MessageCircle, ArrowRight, ShieldAlert, Sparkles, User, Phone, Mail } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedServiceForBooking,
    setSelectedServiceForBooking,
    createBooking,
    getWhatsAppUrl
  } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(selectedServiceForBooking || salonConfig.services[0]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    if (selectedServiceForBooking) {
      setSelectedService(selectedServiceForBooking);
    }
  }, [selectedServiceForBooking]);

  // Generate next 7 days for booking
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dateString: d.toISOString().split('T')[0],
      display: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].dateString);
    }
  }, []);

  const timeSlots = [
    "9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"
  ];

  if (!isBookingModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const bookingId = await createBooking({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        price: selectedService.price,
        date: selectedDate,
        timeSlot: selectedTime,
        clientName,
        clientPhone,
        clientEmail,
        notes
      });

      setSubmittedBooking({
        id: bookingId,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        price: selectedService.price,
        date: selectedDate,
        timeSlot: selectedTime,
        clientName,
        clientPhone,
        clientEmail,
        notes,
        status: 'pending',
        createdAt: new Date()
      } as BookingRequest);
      setStep(4);
    } catch (err: any) {
      alert(err.message || 'Failed to submit booking request.');
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmittedBooking(null);
    setIsBookingModalOpen(false);
    setSelectedServiceForBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative max-w-2xl w-full bg-[#FCF9F6] rounded-3xl shadow-2xl border border-[#EAD5D8] overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#9E555A] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-200" />
            <h3 className="text-xl font-serif font-bold">Request Salon Appointment</h3>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Step Indicator */}
          {step < 4 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAD5D8]/60 text-xs font-semibold">
              <span className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#9E555A]' : 'text-[#8C6D6F]'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-[#9E555A] text-white' : 'bg-[#EAD5D8]'}`}>1</span>
                Service
              </span>
              <span className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#9E555A]' : 'text-[#8C6D6F]'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-[#9E555A] text-white' : 'bg-[#EAD5D8]'}`}>2</span>
                Date & Time
              </span>
              <span className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#9E555A]' : 'text-[#8C6D6F]'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-[#9E555A] text-white' : 'bg-[#EAD5D8]'}`}>3</span>
                Your Details
              </span>
            </div>
          )}

          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <h4 className="font-serif font-bold text-xl text-[#2D2A29]">Select Desired Service</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
                {salonConfig.services.map((s) => {
                  const isSelected = selectedService?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#9E555A] bg-rose-50/50 shadow-md ring-2 ring-[#9E555A]/20'
                          : 'border-[#EAD5D8] bg-white hover:border-[#9E555A]/50'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="font-serif font-bold text-[#2D2A29]">{s.name}</h5>
                          <span className="font-serif font-bold text-[#9E555A]">${s.price}</span>
                        </div>
                        <p className="text-xs text-[#6A605E] mt-1 line-clamp-2">{s.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#EAD5D8]/40 text-xs text-[#736B69]">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.durationMinutes}m</span>
                        <span className={`font-semibold ${isSelected ? 'text-[#9E555A]' : 'text-[#595250]'}`}>
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAD5D8]/60">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#9E555A] hover:bg-[#854549] text-white text-sm font-semibold rounded-full shadow-sm flex items-center gap-2"
                >
                  <span>Continue to Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <h4 className="font-serif font-bold text-xl text-[#2D2A29]">Select Date & Time Slot</h4>
              
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#595250] uppercase tracking-wider">Available Dates</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.dateString;
                    return (
                      <button
                        key={d.dateString}
                        type="button"
                        onClick={() => setSelectedDate(d.dateString)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#9E555A] text-white border-[#9E555A] shadow-sm'
                            : 'bg-white text-[#595250] border-[#EAD5D8] hover:bg-rose-50/30'
                        }`}
                      >
                        {d.display}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-[#595250] uppercase tracking-wider">Available Time Slots</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#9E555A] text-white border-[#9E555A] shadow-sm'
                            : 'bg-white text-[#595250] border-[#EAD5D8] hover:bg-rose-50/30'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#EAD5D8]/60">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-white border border-[#EAD5D8] text-[#595250] text-sm font-semibold rounded-full hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#9E555A] hover:bg-[#854549] text-white text-sm font-semibold rounded-full shadow-sm flex items-center gap-2"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h4 className="font-serif font-bold text-xl text-[#2D2A29]">Your Contact Information</h4>
              
              <div className="p-4 rounded-2xl bg-[#F9F3F0] border border-[#EAD5D8] text-xs space-y-1">
                <div className="font-semibold text-[#2D2A29] text-sm">{selectedService?.name} (${selectedService?.price})</div>
                <div className="text-[#6A605E] flex items-center gap-3">
                  <span>📅 {selectedDate}</span>
                  <span>⏰ {selectedTime}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-[#8C6D6F]" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#595250] mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#8C6D6F]" />
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#595250] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#8C6D6F]" />
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">Special Notes / Requests</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific styling preferences or allergies..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#EAD5D8]/60">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-white border border-[#EAD5D8] text-[#595250] text-sm font-semibold rounded-full hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#9E555A] hover:bg-[#854549] text-white text-sm font-semibold rounded-full shadow-md flex items-center gap-2"
                >
                  <span>Submit Booking Request</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation & Pending Status / WhatsApp Integration */}
          {step === 4 && submittedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Clock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                  Pending Salon Confirmation
                </span>
                <h4 className="font-serif font-bold text-2xl text-[#2D2A29]">
                  Booking Request Submitted Successfully!
                </h4>
                <p className="text-sm text-[#6A605E] max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#2D2A29]">{submittedBooking.clientName}</span>. Your request has been logged. Our front desk concierge will review and confirm shortly.
                </p>
              </div>

              {/* Request ID & Summary */}
              <div className="p-5 rounded-2xl bg-[#F9F3F0] border border-[#EAD5D8] text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-[#736B69]">Request ID:</span>
                  <span className="text-[#9E555A] font-mono">{submittedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B69]">Service:</span>
                  <span className="text-[#2D2A29] font-medium">{submittedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B69]">Date & Time:</span>
                  <span className="text-[#2D2A29] font-medium">{submittedBooking.date} at {submittedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B69]">Estimated Total:</span>
                  <span className="text-[#2D2A29] font-bold">${submittedBooking.price}</span>
                </div>
              </div>

              {/* WhatsApp Quick Request Integration */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-left max-w-md mx-auto space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                  <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
                  <span>Speed up confirmation via WhatsApp</span>
                </div>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  Tap below to open WhatsApp with your pre-filled booking details. You can tap Send to instantly notify the salon owner!
                </p>
                <a
                  href={getWhatsAppUrl({
                    serviceName: submittedBooking.serviceName,
                    date: submittedBooking.date,
                    timeSlot: submittedBooking.timeSlot,
                    clientName: submittedBooking.clientName
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Request to Salon WhatsApp</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#9E555A] hover:bg-[#854549] text-white text-sm font-semibold rounded-full shadow-md"
                >
                  Done / Return to Website
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
