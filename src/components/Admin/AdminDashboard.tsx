import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Sparkles, ArrowRight, DollarSign, Users, Scissors } from 'lucide-react';

export const AdminDashboard: React.FC<{ setActiveTab: (tab: 'dashboard' | 'bookings' | 'services' | 'settings' | 'mobile-apps') => void }> = ({ setActiveTab }) => {
  const { bookings, services, settings } = useBooking();

  const todayStr = new Date().toISOString().split('T')[0];

  const todayAppointments = bookings.filter(b => b.date === todayStr && b.status === 'confirmed');
  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const rejectedCount = bookings.filter(b => b.status === 'rejected' || b.status === 'cancelled').length;

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, b) => acc + b.price, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#F9F3F0] to-[#EAD5D8]/40 p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2A3A6]/20 text-[#9E555A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Overview // {settings.name}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2A29]">
            Welcome back, Salon Owner
          </h3>
          <p className="text-xs sm:text-sm text-[#6A605E]">
            Here is your daily performance summary, upcoming appointments, and quick management controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className="px-5 py-2.5 bg-[#9E555A] hover:bg-[#854549] text-white text-xs font-semibold rounded-full shadow-sm transition-all flex items-center gap-2"
          >
            <span>Manage Bookings ({pendingRequests.length} Pending)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#736B69] uppercase tracking-wider">Pending Requests</p>
            <h4 className="text-3xl font-serif font-bold text-amber-700">{pendingRequests.length}</h4>
            <p className="text-[11px] text-[#8C6D6F]">Requires confirmation</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-700">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#736B69] uppercase tracking-wider">Today's Schedule</p>
            <h4 className="text-3xl font-serif font-bold text-[#2D2A29]">{todayAppointments.length}</h4>
            <p className="text-[11px] text-[#8C6D6F]">Confirmed for today</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F9F3F0] text-[#9E555A]">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#736B69] uppercase tracking-wider">Confirmed Bookings</p>
            <h4 className="text-3xl font-serif font-bold text-emerald-700">{confirmedCount}</h4>
            <p className="text-[11px] text-[#8C6D6F]">Active in system</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#736B69] uppercase tracking-wider">Estimated Revenue</p>
            <h4 className="text-3xl font-serif font-bold text-[#2D2A29]">${totalRevenue}</h4>
            <p className="text-[11px] text-[#8C6D6F]">From confirmed bookings</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 text-[#9E555A]">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Column Split: Today's Appointments & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Today's Schedule */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-xl text-[#2D2A29]">Today's Confirmed Schedule</h4>
            <span className="text-xs font-semibold text-[#9E555A] bg-rose-50 px-3 py-1 rounded-full">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="text-center py-10 bg-[#FCF9F6] rounded-2xl border border-[#EAD5D8]/50 space-y-2">
              <Clock className="w-8 h-8 text-[#9E555A] mx-auto opacity-50" />
              <p className="font-serif font-bold text-[#2D2A29]">No confirmed appointments scheduled for today.</p>
              <p className="text-xs text-[#6A605E]">Check pending requests to confirm new bookings.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppointments.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-[#FCF9F6] border border-[#EAD5D8] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#9E555A]">{app.timeSlot}</span>
                      <span className="font-serif font-bold text-[#2D2A29]">{app.serviceName}</span>
                    </div>
                    <p className="text-xs text-[#6A605E] mt-0.5">Guest: {app.clientName} ({app.clientPhone})</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & Navigation */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6">
          <h4 className="font-serif font-bold text-xl text-[#2D2A29]">Quick Actions</h4>
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab('bookings')}
              className="w-full p-4 rounded-2xl bg-[#FCF9F6] hover:bg-[#F9F3F0] border border-[#EAD5D8] flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-[#2D2A29]">Review Pending Bookings</h5>
                  <p className="text-xs text-[#6A605E]">Accept or reject incoming requests</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9E555A] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className="w-full p-4 rounded-2xl bg-[#FCF9F6] hover:bg-[#F9F3F0] border border-[#EAD5D8] flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E2A3A6]/20 text-[#9E555A]">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-[#2D2A29]">Manage Services & Prices</h5>
                  <p className="text-xs text-[#6A605E]">Update pricing, durations, and offerings</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9E555A] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className="w-full p-4 rounded-2xl bg-[#FCF9F6] hover:bg-[#F9F3F0] border border-[#EAD5D8] flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-[#2D2A29]">Salon Profile & Hours</h5>
                  <p className="text-xs text-[#6A605E]">Edit address, phone, WhatsApp & hours</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9E555A] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
