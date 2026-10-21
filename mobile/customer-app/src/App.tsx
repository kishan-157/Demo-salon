import React, { useState, useEffect } from 'react';
import { db, auth } from './FirebaseConfig';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { 
  Smartphone, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Scissors, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  ShoppingBag,
  User,
  MessageCircle,
  Sparkles
} from 'lucide-react';

// --- TYPES ---
interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  durationMinutes: number;
  image: string;
  description: string;
}

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: string;
  createdAt: any;
}

// --- COMPONENTS ---
export default function CustomerApp() {
  const [screen, setScreen] = useState<'splash' | 'home' | 'services' | 'booking' | 'summary' | 'my-bookings'>('splash');
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState({ date: '', time: '', name: '', phone: '' });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Splash screen timer
    const timer = setTimeout(() => setScreen('home'), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auth & Data Sync
    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) signInAnonymously(auth);
    });

    const servicesUnsub = onSnapshot(collection(db, 'services'), (snap) => {
      setServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service)));
    });

    return () => servicesUnsub();
  }, []);

  useEffect(() => {
    if (user && screen === 'my-bookings') {
      const q = query(
        collection(db, 'bookings'), 
        where('customerPhone', '==', bookingData.phone || 'demo'), 
        orderBy('createdAt', 'desc')
      );
      return onSnapshot(q, (snap) => {
        setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking)));
      });
    }
  }, [user, screen, bookingData.phone]);

  const handleBooking = async () => {
    if (!selectedService) return;
    await addDoc(collection(db, 'bookings'), {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      customerName: bookingData.name,
      customerPhone: bookingData.phone,
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      price: selectedService.price
    });
    setScreen('summary');
  };

  // --- RENDER SCREENS ---

  if (screen === 'splash') {
    return (
      <div className="h-screen bg-[#9E555A] flex flex-col items-center justify-center text-white animate-fadeIn">
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
          <Sparkles className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-widest uppercase">Bella Rose</h1>
        <p className="text-rose-200 text-xs mt-2 font-medium tracking-widest">LUXURY SALON & SPA</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#FDF9F8] flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-[#EAD5D8] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {screen !== 'home' && (
            <button onClick={() => setScreen('home')} className="p-1 hover:bg-rose-50 rounded-full">
              <ArrowLeft className="w-5 h-5 text-[#9E555A]" />
            </button>
          )}
          <div>
            <h2 className="text-xl font-serif font-bold text-[#2D2A29]">
              {screen === 'home' ? 'Bella Rose' : screen.replace('-', ' ').toUpperCase()}
            </h2>
          </div>
        </div>
        <button onClick={() => setScreen('my-bookings')} className="relative p-2 bg-[#F4EBE1] rounded-full text-[#9E555A]">
          <ShoppingBag className="w-5 h-5" />
          {bookings.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-rose-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {bookings.length}
            </span>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        {screen === 'home' && (
          <div className="p-6 space-y-8 animate-fadeIn">
            {/* Hero Card */}
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" 
                className="w-full h-full object-cover" 
                alt="Salon" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                <span className="text-rose-200 text-[10px] font-bold uppercase tracking-widest mb-1">Welcome Back</span>
                <h3 className="text-white text-2xl font-serif font-bold">Ready for a makeover?</h3>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setScreen('services')} className="p-6 bg-white rounded-3xl border border-[#EAD5D8] shadow-sm flex flex-col items-center gap-3 text-[#9E555A]">
                <Scissors className="w-8 h-8" />
                <span className="text-sm font-bold text-[#2D2A29]">Services</span>
              </button>
              <button onClick={() => setScreen('my-bookings')} className="p-6 bg-white rounded-3xl border border-[#EAD5D8] shadow-sm flex flex-col items-center gap-3 text-[#9E555A]">
                <Calendar className="w-8 h-8" />
                <span className="text-sm font-bold text-[#2D2A29]">My Bookings</span>
              </button>
            </div>

            {/* Featured Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-serif font-bold text-[#2D2A29]">Popular Services</h4>
                <button onClick={() => setScreen('services')} className="text-[#9E555A] text-xs font-bold flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                {services.slice(0, 3).map(s => (
                  <div key={s.id} onClick={() => { setSelectedService(s); setScreen('booking'); }} className="min-w-[200px] bg-white rounded-2xl border border-[#EAD5D8] shadow-sm overflow-hidden shrink-0">
                    <img src={s.image} className="h-24 w-full object-cover" alt={s.name} />
                    <div className="p-3">
                      <p className="text-xs font-bold text-[#2D2A29] line-clamp-1">{s.name}</p>
                      <p className="text-[10px] text-[#9E555A] font-bold mt-1">${s.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-[#9E555A] rounded-3xl p-6 text-white flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Questions?</p>
                <h4 className="text-lg font-serif font-bold">Contact Concierge</h4>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {screen === 'services' && (
          <div className="p-6 space-y-4 animate-fadeIn">
            {services.map(s => (
              <div key={s.id} onClick={() => { setSelectedService(s); setScreen('booking'); }} className="bg-white p-4 rounded-3xl border border-[#EAD5D8] shadow-sm flex items-center gap-4">
                <img src={s.image} className="w-20 h-20 rounded-2xl object-cover shrink-0" alt={s.name} />
                <div className="flex-grow">
                  <span className="text-[9px] font-bold text-[#9E555A] uppercase tracking-tighter">{s.category}</span>
                  <h5 className="text-sm font-bold text-[#2D2A29]">{s.name}</h5>
                  <p className="text-[10px] text-[#6A605E] line-clamp-1 mt-0.5">{s.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-[#2D2A29]">${s.price}</span>
                    <span className="text-[10px] text-[#6A605E] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.durationMinutes}m
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {screen === 'booking' && selectedService && (
          <div className="p-6 space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F4EBE1] flex items-center justify-center text-[#9E555A]">
                  <Scissors className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-[#2D2A29]">{selectedService.name}</h4>
                  <p className="text-xs text-[#9E555A] font-bold">${selectedService.price} • {selectedService.durationMinutes} mins</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#2D2A29] px-2">Select Date & Time</h5>
              <div className="grid grid-cols-1 gap-4">
                <input 
                  type="date" 
                  className="w-full px-5 py-4 bg-white border border-[#EAD5D8] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                />
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setBookingData({...bookingData, time: t})}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all ${bookingData.time === t ? 'bg-[#9E555A] text-white border-[#9E555A]' : 'bg-white text-[#2D2A29] border-[#EAD5D8]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#2D2A29] px-2">Your Details</h5>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full px-5 py-4 bg-white border border-[#EAD5D8] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  className="w-full px-5 py-4 bg-white border border-[#EAD5D8] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                />
              </div>
            </div>

            <button 
              onClick={handleBooking}
              disabled={!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.phone}
              className="w-full py-4 bg-[#9E555A] text-white rounded-2xl font-bold shadow-lg disabled:opacity-50 transition-all"
            >
              Request Appointment
            </button>
          </div>
        )}

        {screen === 'summary' && (
          <div className="p-8 space-y-8 flex flex-col items-center text-center animate-fadeIn">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-[#2D2A29]">Booking Requested!</h3>
              <p className="text-sm text-[#6A605E]">
                We've received your request for <strong>{selectedService?.name}</strong>. Our team will review it and confirm shortly.
              </p>
            </div>
            <div className="w-full bg-white p-6 rounded-3xl border border-[#EAD5D8] space-y-3 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-[#6A605E]">Date</span>
                <span className="font-bold text-[#2D2A29]">{bookingData.date}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6A605E]">Time</span>
                <span className="font-bold text-[#2D2A29]">{bookingData.time}</span>
              </div>
              <div className="pt-3 border-t border-[#EAD5D8] flex justify-between text-xs">
                <span className="text-[#6A605E]">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold uppercase tracking-tighter">Pending</span>
              </div>
            </div>
            <button 
              onClick={() => setScreen('home')}
              className="w-full py-4 bg-[#F4EBE1] text-[#9E555A] rounded-2xl font-bold border border-[#EAD5D8]"
            >
              Back to Home
            </button>
          </div>
        )}

        {screen === 'my-bookings' && (
          <div className="p-6 space-y-4 animate-fadeIn">
            {bookings.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 bg-[#F4EBE1] rounded-full flex items-center justify-center mx-auto text-[#9E555A]/40">
                  <Calendar className="w-8 h-8" />
                </div>
                <p className="text-sm text-[#6A605E]">No bookings found for your number.</p>
                <button onClick={() => setScreen('services')} className="text-[#9E555A] text-xs font-bold underline">Book your first service</button>
              </div>
            ) : (
              bookings.map(b => (
                <div key={b.id} className="bg-white p-5 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F4EBE1] flex items-center justify-center text-[#9E555A]">
                        <Scissors className="w-5 h-5" />
                      </div>
                      <div>
                        <h6 className="text-sm font-bold text-[#2D2A29]">{b.serviceName}</h6>
                        <p className="text-[10px] text-[#6A605E]">{b.date} at {b.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                      b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      b.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav (Static) */}
      {screen === 'home' && (
        <div className="h-20 bg-white border-t border-[#EAD5D8] flex items-center justify-around px-8 shrink-0">
          <button className="flex flex-col items-center gap-1 text-[#9E555A]">
            <Smartphone className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
          </button>
          <button onClick={() => setScreen('services')} className="flex flex-col items-center gap-1 text-[#6A605E]">
            <Scissors className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Explore</span>
          </button>
          <button onClick={() => setScreen('my-bookings')} className="flex flex-col items-center gap-1 text-[#6A605E]">
            <Calendar className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Schedule</span>
          </button>
        </div>
      )}
    </div>
  );
}
