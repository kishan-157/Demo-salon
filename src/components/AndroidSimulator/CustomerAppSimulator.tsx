import React, { useState, useEffect } from 'react';
import { useBooking, BookingRequest } from '../../context/BookingContext';
import { ServiceItem } from '../../config/salonConfig';
import { Smartphone, Home, Sparkles, Calendar, Clock, MapPin, Phone, ArrowLeft, CheckCircle2, MessageCircle, AlertCircle, X, Check } from 'lucide-react';

export const CustomerAppSimulator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { services, bookings, createBooking, updateBookingStatus, settings, getWhatsAppUrl } = useBooking();

  const [screen, setScreen] = useState<'splash' | 'home' | 'services' | 'service_detail' | 'booking' | 'confirmation' | 'my_bookings' | 'booking_detail' | 'location'>('splash');
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0] || {} as ServiceItem);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

  // Form State
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [clientName, setClientName] = useState('Sophia Reed');
  const [clientPhone, setClientPhone] = useState('+1 (555) 789-0123');
  const [clientEmail, setClientEmail] = useState('sophia.reed@example.com');
  const [notes, setNotes] = useState('');
  const [lastSubmittedId, setLastSubmittedId] = useState<string>('');

  // Auto advance splash screen after 1.4s
  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => setScreen('home'), 1400);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bookingId = await createBooking({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        price: selectedService.price,
        date: selectedDate,
        timeSlot: selectedSlot,
        clientName: clientName || 'Guest User',
        clientPhone: clientPhone || '+1 (555) 000-0000',
        clientEmail,
        notes
      });
      setLastSubmittedId(bookingId);
      setSelectedBooking({
        id: bookingId,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        price: selectedService.price,
        date: selectedDate,
        timeSlot: selectedSlot,
        clientName: clientName || 'Guest User',
        clientPhone: clientPhone || '+1 (555) 000-0000',
        clientEmail,
        notes,
        status: 'pending',
        createdAt: new Date()
      } as BookingRequest);
      setScreen('confirmation');
    } catch (err: any) {
      alert(err.message || 'Failed to submit booking');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="relative flex flex-col items-center max-h-[96vh]">
        
        {/* Top Control Bar */}
        <div className="w-full max-w-sm mb-3 flex items-center justify-between text-white px-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold tracking-wide">Customer Android App Simulation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all text-xs flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>

        {/* Physical Phone Frame */}
        <div className="w-[320px] sm:w-[350px] h-[640px] bg-[#2D2A29] rounded-[44px] p-3 shadow-2xl border-4 border-[#444] relative flex flex-col select-none">
          
          {/* Hardware Camera Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#2D2A29] rounded-b-xl z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-black/70"></div>
          </div>

          {/* Inner Screen Display */}
          <div className="w-full h-full bg-[#FCF9F6] rounded-[34px] overflow-hidden flex flex-col relative shadow-inner">
            
            {/* Android Status Bar */}
            <div className="h-6 bg-transparent px-5 flex items-center justify-between text-[10px] font-semibold text-gray-500 z-20 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* SCREEN: Splash */}
            {screen === 'splash' && (
              <div className="flex-1 bg-[#9E555A] flex flex-col items-center justify-center p-6 text-white text-center animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-3xl font-serif font-bold mb-4">
                  {settings.logoText.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="text-2xl font-serif font-bold">{settings.name}</h3>
                <p className="text-xs text-rose-200 mt-1 uppercase tracking-widest">Customer Android App</p>
                <div className="mt-8 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce delay-200"></span>
                </div>
              </div>
            )}

            {/* SCREEN: Home */}
            {screen === 'home' && (
              <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
                {/* Greeting */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C6D6F] tracking-wider">Welcome Guest</span>
                    <h4 className="text-lg font-serif font-bold text-[#2D2A29]">{settings.name}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#E2A3A6]/30 text-[#9E555A] flex items-center justify-center font-bold text-xs">
                    BR
                  </div>
                </div>

                {/* Hero Promotion Card */}
                <div className="bg-gradient-to-br from-[#9E555A] to-[#803E43] rounded-2xl p-4 text-white space-y-2 shadow-sm">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                    Artisanal Beauty
                  </span>
                  <h5 className="font-serif font-bold text-base leading-tight">Where Elegance Meets Master Styling</h5>
                  <p className="text-[11px] text-rose-100">Browse approved treatments and request your appointment instantly.</p>
                  <button
                    onClick={() => {
                      setSelectedService(services[0]);
                      setScreen('booking');
                    }}
                    className="mt-2 w-full py-2 bg-white text-[#9E555A] rounded-xl text-xs font-bold shadow-sm hover:bg-rose-50"
                  >
                    Book Signature Service
                  </button>
                </div>

                {/* Services Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-[#2D2A29]">Approved Treatments</span>
                    <button onClick={() => setScreen('services')} className="text-[11px] text-[#9E555A] font-semibold">
                      View All ({services.length})
                    </button>
                  </div>

                  <div className="space-y-2">
                    {services.slice(0, 3).map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setSelectedService(s);
                          setScreen('service_detail');
                        }}
                        className="p-3 bg-white rounded-xl border border-[#EAD5D8] shadow-2xs flex items-center justify-between cursor-pointer hover:border-[#9E555A]"
                      >
                        <div className="space-y-0.5">
                          <div className="font-serif font-bold text-xs text-[#2D2A29]">{s.name}</div>
                          <div className="text-[10px] text-gray-500">{s.durationMinutes} mins · {s.category}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-serif font-bold text-xs text-[#9E555A]">${s.price}</span>
                          <span className="block text-[9px] text-[#8C6D6F]">Tap to view</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct WhatsApp Concierge Card */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span className="text-[11px] font-semibold text-emerald-900">Concierge WhatsApp</span>
                  </div>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                  >
                    Chat
                  </a>
                </div>
              </div>
            )}

            {/* SCREEN: Services List */}
            {screen === 'services' && (
              <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
                <div className="flex items-center gap-2">
                  <button onClick={() => setScreen('home')} className="p-1 text-gray-600 hover:text-black">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h4 className="font-serif font-bold text-base text-[#2D2A29]">Salon Service Menu</h4>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5">
                  {services.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSelectedService(s);
                        setScreen('service_detail');
                      }}
                      className="p-3 bg-white rounded-2xl border border-[#EAD5D8] shadow-xs cursor-pointer hover:border-[#9E555A] transition-all space-y-1.5"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-serif font-bold text-xs text-[#2D2A29]">{s.name}</span>
                        <span className="font-serif font-bold text-xs text-[#9E555A]">${s.price}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 line-clamp-2">{s.description}</p>
                      <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1 border-t border-gray-100">
                        <span>{s.durationMinutes} mins</span>
                        <span className="text-[#9E555A] font-semibold">Select →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCREEN: Service Details */}
            {screen === 'service_detail' && (
              <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                <div className="flex items-center gap-2">
                  <button onClick={() => setScreen('services')} className="p-1 text-gray-600 hover:text-black">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h4 className="font-serif font-bold text-base text-[#2D2A29]">Treatment Details</h4>
                </div>

                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
                  <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-serif font-bold text-lg text-[#2D2A29]">{selectedService.name}</h5>
                    <span className="font-serif font-bold text-lg text-[#9E555A]">${selectedService.price}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedService.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                    <Clock className="w-3.5 h-3.5 text-[#9E555A]" />
                    <span>Duration: {selectedService.durationMinutes} minutes</span>
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                  <button
                    onClick={() => setScreen('booking')}
                    className="w-full py-3 bg-[#9E555A] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#854549]"
                  >
                    Select Date & Time Slot
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN: Booking Form */}
            {screen === 'booking' && (
              <form onSubmit={handleSubmitBooking} className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setScreen('service_detail')} className="p-1 text-gray-600 hover:text-black">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h4 className="font-serif font-bold text-base text-[#2D2A29]">Schedule Booking</h4>
                </div>

                <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-200 text-xs">
                  <div className="font-serif font-bold text-[#2D2A29]">{selectedService.name}</div>
                  <div className="text-[10px] text-[#9E555A]">${selectedService.price} · {selectedService.durationMinutes} mins</div>
                </div>

                {/* Date Picker */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Select Date</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['2026-10-25', '2026-10-26', '2026-10-27'].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold border ${
                          selectedDate === d ? 'bg-[#9E555A] text-white border-[#9E555A]' : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        {d.slice(5)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Available Time</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['10:00 AM', '1:30 PM', '4:00 PM'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setSelectedSlot(t)}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold border ${
                          selectedSlot === t ? 'bg-[#9E555A] text-white border-[#9E555A]' : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-2 pt-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Your Contact</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                  />
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                  />
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special requests or allergies..."
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                  />
                </div>

                <div className="pt-2 mt-auto">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#9E555A] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#854549]"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </form>
            )}

            {/* SCREEN: Confirmation */}
            {screen === 'confirmation' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Pending Salon Confirmation
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#2D2A29]">Request Submitted</h4>
                  <p className="text-xs text-gray-500">Ref: #{lastSubmittedId}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 text-left text-xs w-full space-y-1">
                  <div><strong>Service:</strong> {selectedService.name}</div>
                  <div><strong>Date:</strong> {selectedDate} at {selectedSlot}</div>
                  <div><strong>Guest:</strong> {clientName}</div>
                </div>

                <div className="w-full space-y-2 pt-2">
                  <button
                    onClick={() => setScreen('my_bookings')}
                    className="w-full py-2.5 bg-[#9E555A] text-white rounded-xl text-xs font-bold"
                  >
                    View Status in My Bookings
                  </button>
                  <a
                    href={getWhatsAppUrl({ serviceName: selectedService.name, date: selectedDate, timeSlot: selectedSlot, clientName })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* SCREEN: My Bookings */}
            {screen === 'my_bookings' && (
              <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-[#2D2A29]">My Appointments</h4>
                  <button onClick={() => setScreen('home')} className="text-xs text-[#9E555A] font-semibold">Home</button>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        setSelectedBooking(b);
                        setScreen('booking_detail');
                      }}
                      className="p-3 bg-white rounded-xl border border-[#EAD5D8] shadow-xs cursor-pointer space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-xs text-[#2D2A29]">{b.serviceName}</span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : b.status === 'cancelled'
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500">📅 {b.date} at {b.timeSlot}</div>
                      <div className="text-[10px] text-gray-400 flex justify-between">
                        <span>Ref: {b.id}</span>
                        <span className="text-[#9E555A]">Details →</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setScreen('services')}
                  className="w-full py-2 bg-rose-50 text-[#9E555A] border border-rose-200 rounded-xl text-xs font-bold"
                >
                  Book New Appointment
                </button>
              </div>
            )}

            {/* SCREEN: Booking Detail & Cancellation */}
            {screen === 'booking_detail' && selectedBooking && (
              <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                <div className="flex items-center gap-2">
                  <button onClick={() => setScreen('my_bookings')} className="p-1 text-gray-600 hover:text-black">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h4 className="font-serif font-bold text-base text-[#2D2A29]">Booking Details</h4>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="text-gray-400 text-[10px]">Reference: #{selectedBooking.id}</div>
                  <h5 className="font-serif font-bold text-sm text-[#2D2A29]">{selectedBooking.serviceName}</h5>
                  <div className="text-gray-600">Date & Time: {selectedBooking.date} at {selectedBooking.timeSlot}</div>
                  <div className="text-gray-600">Guest: {selectedBooking.clientName} ({selectedBooking.clientPhone})</div>
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-bold">Status:</span>
                    <span className="font-bold uppercase text-[#9E555A]">{selectedBooking.status}</span>
                  </div>
                </div>

                {selectedBooking.status !== 'cancelled' && (
                  <button
                    onClick={async () => {
                      await updateBookingStatus(selectedBooking.id, 'cancelled');
                      setScreen('my_bookings');
                    }}
                    className="w-full py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold hover:bg-rose-100"
                  >
                    Cancel Appointment Request
                  </button>
                )}
              </div>
            )}

            {/* Bottom Android App Navigation Bar */}
            <div className="h-12 bg-white border-t border-gray-200 px-4 flex items-center justify-around text-gray-400 shrink-0">
              <button
                onClick={() => setScreen('home')}
                className={`flex flex-col items-center gap-0.5 ${screen === 'home' ? 'text-[#9E555A]' : ''}`}
              >
                <Home className="w-4 h-4" />
                <span className="text-[9px]">Home</span>
              </button>
              <button
                onClick={() => setScreen('services')}
                className={`flex flex-col items-center gap-0.5 ${screen === 'services' ? 'text-[#9E555A]' : ''}`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-[9px]">Services</span>
              </button>
              <button
                onClick={() => setScreen('my_bookings')}
                className={`flex flex-col items-center gap-0.5 ${screen === 'my_bookings' ? 'text-[#9E555A]' : ''}`}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-[9px]">Bookings</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
