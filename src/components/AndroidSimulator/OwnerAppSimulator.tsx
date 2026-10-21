import React, { useState } from 'react';
import { useBooking, BookingRequest } from '../../context/BookingContext';
import { Smartphone, LayoutDashboard, Clock, CheckCircle2, XCircle, Phone, MessageCircle, X, ArrowLeft, Shield, DollarSign, Calendar, Scissors, AlertCircle } from 'lucide-react';

export const OwnerAppSimulator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { bookings, services, updateBookingStatus, settings } = useBooking();

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for immediate demo usability
  const [screen, setScreen] = useState<'dashboard' | 'pending' | 'confirmed' | 'details' | 'services'>('dashboard');
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.price, 0);

  const handleAccept = async (id: string) => {
    await updateBookingStatus(id, 'confirmed');
  };

  const handleReject = async (id: string) => {
    await updateBookingStatus(id, 'rejected');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
      <div className="relative flex flex-col items-center max-h-[96vh]">
        
        {/* Top Control Bar */}
        <div className="w-full max-w-sm mb-3 flex items-center justify-between text-white px-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <span className="text-xs font-semibold tracking-wide">Salon Owner Android App Simulation</span>
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
        <div className="w-[320px] sm:w-[350px] h-[640px] bg-[#1F1D1C] rounded-[44px] p-3 shadow-2xl border-4 border-[#3A3837] relative flex flex-col select-none">
          
          {/* Hardware Camera Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1F1D1C] rounded-b-xl z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-black/70"></div>
          </div>

          {/* Inner Screen Display */}
          <div className="w-full h-full bg-[#FCF9F6] rounded-[34px] overflow-hidden flex flex-col relative shadow-inner">
            
            {/* Android Status Bar */}
            <div className="h-6 bg-transparent px-5 flex items-center justify-between text-[10px] font-semibold text-gray-400 z-20 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <span>98%</span>
              </div>
            </div>

            {/* SCREEN: Login if not logged in */}
            {!isLoggedIn ? (
              <div className="flex-1 bg-[#2D2A29] p-6 flex flex-col justify-center items-center text-center space-y-4 text-white">
                <div className="w-16 h-16 rounded-full bg-[#9E555A] flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg">Salon Owner Portal</h4>
                  <p className="text-xs text-gray-400 mt-1">Authenticate to manage {settings.name}</p>
                </div>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full py-2.5 bg-[#9E555A] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Quick Sign In (One Tap)
                </button>
              </div>
            ) : (
              <>
                {/* SCREEN: Dashboard */}
                {screen === 'dashboard' && (
                  <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider">Owner Console</span>
                        <h4 className="font-serif font-bold text-base text-[#2D2A29]">{settings.name}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#2D2A29] text-rose-200 flex items-center justify-center font-bold text-xs">
                        VIP
                      </div>
                    </div>

                    {/* KPI Metrics */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div
                        onClick={() => setScreen('pending')}
                        className="p-3 bg-amber-50 border border-amber-200 rounded-2xl cursor-pointer hover:bg-amber-100/70 transition-all"
                      >
                        <div className="text-[10px] font-bold text-amber-800 uppercase">Pending Requests</div>
                        <div className="text-2xl font-serif font-bold text-amber-800 mt-1">{pendingBookings.length}</div>
                        <div className="text-[9px] text-amber-700">Tap to review →</div>
                      </div>

                      <div
                        onClick={() => setScreen('confirmed')}
                        className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl cursor-pointer hover:bg-emerald-100/70 transition-all"
                      >
                        <div className="text-[10px] font-bold text-emerald-800 uppercase">Confirmed</div>
                        <div className="text-2xl font-serif font-bold text-emerald-800 mt-1">{confirmedBookings.length}</div>
                        <div className="text-[9px] text-emerald-700">Active schedule →</div>
                      </div>
                    </div>

                    {/* Today Revenue Card */}
                    <div className="p-3.5 bg-[#2D2A29] text-white rounded-2xl space-y-1">
                      <div className="text-[10px] font-semibold text-rose-200 uppercase tracking-wider">Estimated Revenue</div>
                      <div className="text-xl font-serif font-bold">${totalRevenue}</div>
                      <p className="text-[10px] text-gray-400">Synchronized across Android & Web</p>
                    </div>

                    {/* Urgent Action Requests */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif font-bold text-[#2D2A29]">Incoming Booking Queue</span>
                        <span className="text-[10px] text-gray-500">{bookings.length} Total</span>
                      </div>

                      {pendingBookings.length === 0 ? (
                        <div className="p-4 bg-white rounded-xl border border-gray-200 text-center text-xs text-gray-500">
                          No pending requests right now.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {pendingBookings.slice(0, 2).map((b) => (
                            <div key={b.id} className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-serif font-bold text-xs text-[#2D2A29]">{b.serviceName}</div>
                                  <div className="text-[10px] text-gray-500">Guest: {b.clientName} ({b.clientPhone})</div>
                                  <div className="text-[10px] text-gray-500">📅 {b.date} at {b.timeSlot}</div>
                                </div>
                                <span className="font-serif font-bold text-xs text-[#9E555A]">${b.price}</span>
                              </div>
                              <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                                <button
                                  onClick={() => handleAccept(b.id)}
                                  className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleReject(b.id)}
                                  className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SCREEN: Pending List */}
                {screen === 'pending' && (
                  <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setScreen('dashboard')} className="p-1 text-gray-600">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h4 className="font-serif font-bold text-base text-[#2D2A29]">Pending Queue ({pendingBookings.length})</h4>
                    </div>

                    <div className="space-y-2.5 flex-1 overflow-y-auto">
                      {pendingBookings.length === 0 ? (
                        <div className="p-6 text-center text-xs text-gray-500 bg-white rounded-2xl border border-gray-200">
                          All requests have been handled!
                        </div>
                      ) : (
                        pendingBookings.map((b) => (
                          <div key={b.id} className="p-3 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="font-serif font-bold text-xs text-[#2D2A29]">{b.serviceName}</span>
                              <span className="font-bold text-xs text-[#9E555A]">${b.price}</span>
                            </div>
                            <div className="text-[10px] text-gray-600">Client: <strong>{b.clientName}</strong></div>
                            <div className="text-[10px] text-gray-500">Requested: {b.date} at {b.timeSlot}</div>
                            {b.notes && <div className="text-[9px] text-gray-500 italic">Notes: "{b.notes}"</div>}
                            
                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                              <button
                                onClick={() => handleAccept(b.id)}
                                className="flex-1 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                              >
                                Accept & Confirm
                              </button>
                              <button
                                onClick={() => handleReject(b.id)}
                                className="flex-1 py-1.5 bg-rose-600 text-white rounded-lg text-[10px] font-bold"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* SCREEN: Confirmed List */}
                {screen === 'confirmed' && (
                  <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setScreen('dashboard')} className="p-1 text-gray-600">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h4 className="font-serif font-bold text-base text-[#2D2A29]">Confirmed Bookings ({confirmedBookings.length})</h4>
                    </div>

                    <div className="space-y-2.5 flex-1 overflow-y-auto">
                      {confirmedBookings.map((b) => (
                        <div key={b.id} className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="font-serif font-bold text-xs text-[#2D2A29]">{b.serviceName}</span>
                            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">CONFIRMED</span>
                          </div>
                          <div className="text-[10px] text-gray-600">{b.clientName} · {b.clientPhone}</div>
                          <div className="text-[10px] text-gray-500">📅 {b.date} at {b.timeSlot} (${b.price})</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCREEN: Services List */}
                {screen === 'services' && (
                  <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setScreen('dashboard')} className="p-1 text-gray-600">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h4 className="font-serif font-bold text-base text-[#2D2A29]">Services & Pricing</h4>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto">
                      {services.map((s) => (
                        <div key={s.id} className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
                          <div className="flex justify-between font-serif font-bold text-xs text-[#2D2A29]">
                            <span>{s.name}</span>
                            <span className="text-[#9E555A]">${s.price}</span>
                          </div>
                          <div className="text-[10px] text-gray-500">{s.durationMinutes} mins · Category: {s.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Android App Navigation Bar */}
                <div className="h-12 bg-white border-t border-gray-200 px-4 flex items-center justify-around text-gray-400 shrink-0">
                  <button
                    onClick={() => setScreen('dashboard')}
                    className={`flex flex-col items-center gap-0.5 ${screen === 'dashboard' ? 'text-[#9E555A]' : ''}`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="text-[9px]">Dashboard</span>
                  </button>
                  <button
                    onClick={() => setScreen('pending')}
                    className={`flex flex-col items-center gap-0.5 ${screen === 'pending' ? 'text-[#9E555A]' : ''}`}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-[9px]">Requests ({pendingBookings.length})</span>
                  </button>
                  <button
                    onClick={() => setScreen('confirmed')}
                    className={`flex flex-col items-center gap-0.5 ${screen === 'confirmed' ? 'text-[#9E555A]' : ''}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-[9px]">Schedule</span>
                  </button>
                  <button
                    onClick={() => setScreen('services')}
                    className={`flex flex-col items-center gap-0.5 ${screen === 'services' ? 'text-[#9E555A]' : ''}`}
                  >
                    <Scissors className="w-4 h-4" />
                    <span className="text-[9px]">Services</span>
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
