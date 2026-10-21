import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminBookings } from './AdminBookings';
import { AdminServices } from './AdminServices';
import { AdminSettings } from './AdminSettings';
import { AdminMobileApps } from './AdminMobileApps';
import { ShieldCheck, X, LayoutDashboard, Calendar, Scissors, Settings, Smartphone, LogOut, Sparkles } from 'lucide-react';

export const OwnerManagementModal: React.FC = () => {
  const { isOwnerViewOpen, setIsOwnerViewOpen, isAdminLoggedIn, logoutAdmin, settings } = useBooking();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'services' | 'settings' | 'mobile-apps'>('dashboard');

  if (!isOwnerViewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative max-w-6xl w-full bg-[#FCF9F6] rounded-3xl shadow-2xl border border-[#EAD5D8] overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="bg-[#2D2A29] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9E555A] text-white flex items-center justify-center font-serif font-bold text-lg">
              {settings.logoText.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-serif font-bold">{settings.name} — Admin Portal</h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-200 text-[10px] font-semibold tracking-wider uppercase border border-rose-700/50">
                  Demo Mode
                </span>
              </div>
              <p className="text-xs text-[#B8A8A6]">Single-Salon Commercial Demonstration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-[#3D3A38] hover:bg-[#4D4846] text-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={() => setIsOwnerViewOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / View */}
        <div className="flex-1 overflow-y-auto">
          {!isAdminLoggedIn ? (
            <AdminLogin />
          ) : (
            <div className="flex flex-col md:flex-row min-h-full">
              
              {/* Sidebar Navigation */}
              <div className="w-full md:w-64 bg-white border-r border-[#EAD5D8] p-4 sm:p-6 shrink-0 flex md:flex-col justify-between gap-4">
                <div className="space-y-2 w-full">
                  <div className="hidden md:block pb-4 mb-2 border-b border-[#EAD5D8]/60">
                    <span className="text-[11px] font-semibold text-[#8C6D6F] uppercase tracking-wider">
                      Management Navigation
                    </span>
                  </div>

                  <div className="flex md:flex-col gap-2 overflow-x-auto">
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                      { id: 'bookings', label: 'Bookings', icon: Calendar },
                      { id: 'services', label: 'Services & Prices', icon: Scissors },
                      { id: 'mobile-apps', label: 'Mobile Apps', icon: Smartphone },
                      { id: 'settings', label: 'Salon Settings', icon: Settings }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`w-full px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-all whitespace-nowrap ${
                            isActive
                              ? 'bg-[#9E555A] text-white shadow-sm'
                              : 'text-[#595250] hover:bg-[#F9F3F0]'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#9E555A]'}`} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="hidden md:block p-4 rounded-2xl bg-[#FCF9F6] border border-[#EAD5D8] text-xs space-y-2">
                  <div className="font-serif font-bold text-[#2D2A29]">Single-Salon Demo</div>
                  <p className="text-[#6A605E] text-[11px] leading-relaxed">
                    All changes update the customer-facing website instantly in demo memory.
                  </p>
                </div>
              </div>

              {/* Main Tab Content */}
              <div className="flex-1 p-6 sm:p-8 bg-[#FCF9F6]">
                {activeTab === 'dashboard' && <AdminDashboard setActiveTab={setActiveTab} />}
                {activeTab === 'bookings' && <AdminBookings />}
                {activeTab === 'services' && <AdminServices />}
                {activeTab === 'mobile-apps' && <AdminMobileApps />}
                {activeTab === 'settings' && <AdminSettings />}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
