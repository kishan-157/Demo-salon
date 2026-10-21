import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { ShieldCheck, LogIn, Sparkles, KeyRound, UserCheck, Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, loginAsDemo, loginWithCredentials, settings } = useBooking();
  const [loading, setLoading] = useState(false);
  const [loginId, setLoginId] = useState('demo_admin');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDirectDemoLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await loginAsDemo();
      if (!res.success && res.error) {
        setErrorMsg(res.error);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await loginWithCredentials(loginId, password);
      if (!res.success && res.error) {
        setErrorMsg(res.error);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginAdmin();
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(err?.message || 'Google sign in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#EAD5D8] space-y-6 text-center">
        
        {/* Portal Icon */}
        <div className="w-16 h-16 rounded-full bg-[#E2A3A6]/20 text-[#9E555A] flex items-center justify-center mx-auto shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>

        {/* Portal Header */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4EBE1] text-[#9E555A] text-xs font-semibold">
            Universal Owner Portal
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#2D2A29]">
            Salon Management Login
          </h3>
          <p className="text-xs text-[#6A605E]">
            Sign in to manage appointments, customize theme & logo, and update services for <span className="font-semibold text-[#2D2A29]">{settings.name}</span>.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium animate-fadeIn">
            {errorMsg}
          </div>
        )}

        {/* Direct Preset Credentials Card */}
        <div className="p-5 bg-gradient-to-b from-[#FDF9F8] to-[#F9F3F0] border-2 border-[#EAD5D8] rounded-3xl text-left space-y-4 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-bold text-[#9E555A] uppercase tracking-wider">
                Preset Demo Account
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              ONE-CLICK READY
            </span>
          </div>

          <form onSubmit={handleCredentialSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#6A605E] mb-1">
                Preset Login ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EAD5D8] rounded-xl text-xs font-mono font-bold text-[#2D2A29] focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  placeholder="demo_admin"
                  required
                />
                <UserCheck className="w-4 h-4 text-[#8C6D6F] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#6A605E] mb-1">
                Preset Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EAD5D8] rounded-xl text-xs font-mono font-bold text-[#2D2A29] focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  placeholder="••••••••"
                  required
                />
                <Lock className="w-4 h-4 text-[#8C6D6F] absolute left-3 top-3" />
              </div>
            </div>

            {/* Direct 1-Click Login Button */}
            <button
              type="button"
              onClick={handleDirectDemoLogin}
              disabled={loading}
              className="w-full py-4 bg-[#9E555A] hover:bg-[#854549] text-white rounded-2xl text-xs font-bold shadow-lg flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-200" />
              <span>{loading ? 'Logging In...' : '⚡ 1-Click Direct Demo Login'}</span>
            </button>
          </form>

          <p className="text-[10px] text-[#8C6D6F] text-center italic">
            Instant administrator access without external authentication barriers.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-px bg-[#EAD5D8]"></div>
          <span className="text-[10px] font-bold text-[#8C6D6F] uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-[#EAD5D8]"></div>
        </div>

        {/* Google Login Option */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3.5 bg-white hover:bg-[#F9F3F0] text-[#595250] border border-[#EAD5D8] rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 cursor-pointer"
        >
          <LogIn className="w-4 h-4 text-[#9E555A]" />
          <span>Sign In with Google Account</span>
        </button>

        {/* Info Footer */}
        <div className="pt-4 border-t border-[#EAD5D8]/60 flex items-center justify-center gap-2 text-[11px] text-[#736B69]">
          <KeyRound className="w-3.5 h-3.5 text-[#9E555A]" />
          <span>Universal demo access enabled for live testing</span>
        </div>

      </div>
    </div>
  );
};
