import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { ShieldCheck, LogIn, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, settings } = useBooking();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await loginAdmin();
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#EAD5D8] space-y-6 text-center">
        
        <div className="w-16 h-16 rounded-full bg-[#E2A3A6]/20 text-[#9E555A] flex items-center justify-center mx-auto shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4EBE1] text-[#9E555A] text-xs font-semibold">
            Secure Authentication
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#2D2A29]">
            Salon Owner Portal
          </h3>
          <p className="text-xs text-[#6A605E]">
            Sign in to manage appointments, services, and salon settings for <span className="font-semibold text-[#2D2A29]">{settings.name}</span>.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-[#9E555A] hover:bg-[#854549] text-white rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-3 transition-all disabled:opacity-50"
          >
            <LogIn className="w-5 h-5" />
            <span>{loading ? 'Authenticating...' : 'Sign In with Google'}</span>
          </button>
          
          <p className="text-[10px] text-[#8C6D6F]">
            Requires authorized salon administrator email address.
          </p>
        </div>

        <div className="pt-6 border-t border-[#EAD5D8]/60 space-y-3">
          <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-4 rounded-xl border border-amber-200 text-left">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
            <div className="space-y-1">
              <strong className="block">Sales Demo Mode:</strong>
              <p className="leading-relaxed opacity-90">
                For evaluation, the first Google account that signs in will be automatically granted <strong>Administrator</strong> privileges. Subsequent logins must be authorized via the settings panel.
              </p>
            </div>
          </div>

          <div className="bg-[#FDF9F8] p-4 rounded-xl border border-[#EAD5D8] flex items-center gap-3 text-left">
            <Sparkles className="w-5 h-5 text-[#9E555A] shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-[#2D2A29]">Commercial Grade Security</div>
              <div className="text-[10px] text-[#6A605E]">Powered by Firebase Auth & Firestore rules</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
