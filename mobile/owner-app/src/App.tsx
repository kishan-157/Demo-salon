import React, { useState, useEffect } from 'react';
import { db, auth } from './FirebaseConfig';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, limit, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signInAnonymously, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Scissors, 
  User, 
  LogOut,
  Sparkles,
  Phone,
  MessageCircle,
  TrendingUp,
  Users,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

// --- TYPES ---
interface Booking {
  id: string;
  serviceName: string;
  clientName: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  price: number;
}

// --- COMPONENTS ---
export default function OwnerApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'requests' | 'confirmed'>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useLocalApi, setUseLocalApi] = useState(false);
  const [salonInfo, setSalonInfo] = useState<any>({
    name: 'Bella Rose Luxury Salon & Spa',
    logoText: 'Bella Rose',
    logoSubtitle: 'Owner Portal',
    theme: { primaryColor: '#9E555A' }
  });

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer demo-owner-token'
  });

  useEffect(() => {
    // Check saved demo session
    if (localStorage.getItem('salon_owner_app_session') === 'demo') {
      setUser({ displayName: 'Demo Owner', isAnonymous: true, email: 'owner@salon.app' });
      setIsAdmin(true);
      setUseLocalApi(true);
      setLoading(false);
    }

    // Fetch dynamic salon info
    fetch('/api/salon')
      .then(res => res.json())
      .then(data => {
        if (data && data.name) setSalonInfo(data);
      })
      .catch(() => {});

    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      if (localStorage.getItem('salon_owner_app_session') === 'demo') {
        setUser({ displayName: 'Demo Owner', isAnonymous: true, email: 'owner@salon.app' });
        setIsAdmin(true);
        setUseLocalApi(true);
        setLoading(false);
        return;
      }

      setUser(u);
      if (u) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', u.uid));
          if (adminDoc.exists() || u.email === 'ladanikishan8@gmail.com' || u.isAnonymous) {
            setIsAdmin(true);
          } else {
            const adminsSnap = await getDocs(query(collection(db, 'admins'), limit(1)));
            if (adminsSnap.empty) {
              await setDoc(doc(db, 'admins', u.uid), { 
                email: u.email, 
                name: u.displayName || 'Owner',
                isDemo: true,
                createdAt: new Date().toISOString()
              });
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          }
        } catch (err) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      setBookings([]);
      return;
    }

    if (useLocalApi) {
      fetch('/api/bookings', { headers: getHeaders() })
        .then(res => res.json())
        .then(setBookings)
        .catch(err => {
          console.error("Local API fetch failed:", err);
          setError("Failed to load demo data.");
        });
      return;
    }

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snap) => {
      setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking)));
      setError(null);
    }, (err) => {
      console.error("Bookings snapshot error:", err);
      if (err.code === 'permission-denied') {
        setError("Permission Denied: You are not authorized to view bookings.");
      } else {
        setError("An error occurred while loading bookings.");
      }
    });

    return () => unsubscribe();
  }, [isAdmin, useLocalApi]);

  const updateStatus = async (id: string, status: string) => {
    try {
      if (useLocalApi) {
        await fetch(`/api/bookings/${id}/status`, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({ status })
        });
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: status as any } : b));
        return;
      }
      await updateDoc(doc(db, 'bookings', id), { 
        status, 
        updatedAt: new Date().toISOString() 
      });
    } catch (err) {
      console.error("Update status failed:", err);
      alert("Failed to update status. Check your permissions.");
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') return;
      console.error("Login failed:", err);
      alert("Login failed: " + (err.message || "Unknown error"));
    }
  };

  const handleDemoLogin = () => {
    setUser({ displayName: 'Demo Owner', isAnonymous: true, email: 'owner@salon.app' });
    setIsAdmin(true);
    setUseLocalApi(true);
    localStorage.setItem('salon_owner_app_session', 'demo');
  };

  const handleLogout = async () => {
    localStorage.removeItem('salon_owner_app_session');
    setUseLocalApi(false);
    setIsAdmin(false);
    setUser(null);
    try {
      await signOut(auth);
    } catch (e) {}
  };

  if (loading) return (
    <div className="h-screen bg-[#FDF9F8] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Sparkles className="w-8 h-8 text-[#9E555A] animate-pulse" />
        <p className="text-xs text-[#9E555A] font-medium">Verifying Credentials...</p>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="h-screen bg-[#FDF9F8] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        {salonInfo.logoImage ? (
          <img src={salonInfo.logoImage} alt={salonInfo.name} className="h-16 max-w-[180px] object-contain mb-6 drop-shadow-sm" />
        ) : (
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 text-[#9E555A]">
            <ShieldCheck className="w-10 h-10" />
          </div>
        )}
        <h2 className="text-2xl font-serif font-bold text-[#2D2A29]">
          {salonInfo.logoText || salonInfo.name}
        </h2>
        <p className="text-xs text-[#6A605E] mt-1 mb-8">
          {salonInfo.logoSubtitle || 'Salon Owner Portal'}
        </p>
        
        <div className="w-full space-y-6">
          <div className="p-6 bg-white border border-[#EAD5D8] rounded-3xl text-left shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#9E555A] uppercase tracking-widest">Preset Demo Account</span>
              <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[9px] font-bold border border-green-100">READY</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#8C6D6F]">Login ID:</span>
                <span className="font-mono font-bold text-[#2D2A29]">demo_owner</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#8C6D6F]">Password:</span>
                <span className="font-mono font-bold text-[#2D2A29]">••••••••</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-4 bg-[#9E555A] hover:bg-[#854549] text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer text-xs"
            >
              <Sparkles className="w-4 h-4 text-rose-200" />
              <span>⚡ Direct 1-Click Login</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full px-4">
            <div className="flex-1 h-px bg-[#EAD5D8]/60"></div>
            <span className="text-[10px] font-bold text-[#8C6D6F] uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#EAD5D8]/60"></div>
          </div>

          <button 
            type="button"
            onClick={handleLogin}
            className="w-full py-3.5 bg-[#FDF9F8] hover:bg-rose-50 text-[#595250] border border-[#EAD5D8] rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <User className="w-4 h-4 text-[#9E555A]" />
            <span>Sign In with Google</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen bg-[#FDF9F8] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600">
          <XCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#2D2A29]">Access Restricted</h2>
        <p className="text-xs text-[#6A605E] mt-2 mb-8">
          Your account (<strong>{user.email}</strong>) is not registered as an admin for this salon.
        </p>
        <button 
          onClick={handleLogout}
          className="w-full py-3.5 bg-[#F4EBE1] text-[#9E555A] rounded-2xl font-bold border border-[#EAD5D8] text-xs"
        >
          Logout & Use Demo Account
        </button>
      </div>
    );
  }

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedToday = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="h-screen bg-[#FDF9F8] flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#EAD5D8] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {salonInfo.logoImage ? (
            <img src={salonInfo.logoImage} alt={salonInfo.name} className="w-10 h-10 rounded-xl object-contain border border-[#EAD5D8]" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#9E555A] text-white flex items-center justify-center font-serif font-bold text-sm">
              {salonInfo.logoText ? salonInfo.logoText.slice(0, 2).toUpperCase() : 'BR'}
            </div>
          )}
          <div>
            <h2 className="text-sm font-bold text-[#2D2A29] line-clamp-1">{salonInfo.logoText || salonInfo.name}</h2>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> Portal Online
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 text-[#6A605E] hover:bg-rose-50 rounded-full cursor-pointer" title="Log out">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="p-6 space-y-6 animate-fadeIn">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#9E555A] p-5 rounded-3xl text-white space-y-2 shadow-md">
                <TrendingUp className="w-5 h-5 opacity-60" />
                <div>
                  <p className="text-3xl font-serif font-bold">{confirmedToday}</p>
                  <p className="text-[10px] font-bold uppercase opacity-80">Booked Today</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-[#EAD5D8] space-y-2 shadow-sm">
                <Users className="w-5 h-5 text-[#9E555A] opacity-60" />
                <div>
                  <p className="text-3xl font-serif font-bold text-[#2D2A29]">{pendingCount}</p>
                  <p className="text-[10px] font-bold uppercase text-[#6A605E]">Pending Requests</p>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold text-[#2D2A29] px-2">Quick Access</h4>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => setActiveTab('requests')} className="bg-white p-5 rounded-3xl border border-[#EAD5D8] flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-[#2D2A29]">Review Requests</span>
                  </div>
                  {pendingCount > 0 && (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>
                <button onClick={() => setActiveTab('confirmed')} className="bg-white p-5 rounded-3xl border border-[#EAD5D8] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-[#2D2A29]">Today's Schedule</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#EAD5D8]" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#2D2A29] px-2">Recent Requests</h4>
              <div className="space-y-3">
                {bookings.filter(b => b.status === 'pending').slice(0, 3).map(b => (
                  <div key={b.id} className="bg-white p-4 rounded-3xl border border-[#EAD5D8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F4EBE1] flex items-center justify-center text-[#9E555A]">
                        <Scissors className="w-5 h-5" />
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-[#2D2A29]">{b.clientName}</h6>
                        <p className="text-[10px] text-[#6A605E]">{b.serviceName} • {b.timeSlot}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(b.id, 'confirmed')} className="p-2 bg-emerald-50 text-emerald-600 rounded-full shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(b.id, 'rejected')} className="p-2 bg-rose-50 text-rose-600 rounded-full shadow-sm">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-lg font-serif font-bold text-[#2D2A29]">Review Requests</h3>
              <span className="text-[10px] font-bold text-[#9E555A] uppercase tracking-widest">{pendingCount} Waiting</span>
            </div>
            {bookings.filter(b => b.status === 'pending').length === 0 ? (
              <div className="py-20 text-center text-[#6A605E]">
                <CheckCircle2 className="w-12 h-12 mx-auto opacity-20 mb-3" />
                <p className="text-sm">Inbox cleared! No pending requests.</p>
              </div>
            ) : (
              bookings.filter(b => b.status === 'pending').map(b => (
                <div key={b.id} className="bg-white p-5 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#F4EBE1] flex items-center justify-center text-[#9E555A]">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-[#2D2A29]">{b.clientName}</h5>
                        <p className="text-xs text-[#6A605E]">{b.clientPhone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#2D2A29]">{b.date}</div>
                      <div className="text-[10px] text-[#9E555A] font-bold uppercase">{b.timeSlot}</div>
                    </div>
                  </div>
                  
                  <div className="bg-[#FDF9F8] p-3 rounded-2xl border border-[#EAD5D8]/50 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6A605E]">{b.serviceName}</span>
                    <span className="text-xs font-bold text-[#2D2A29]">${b.price}</span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => updateStatus(b.id, 'rejected')}
                      className="flex-1 py-3 bg-rose-50 text-rose-700 rounded-2xl text-xs font-bold border border-rose-100 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button 
                      onClick={() => updateStatus(b.id, 'confirmed')}
                      className="flex-1 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Confirm
                    </button>
                  </div>
                  
                  <button className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-bold text-[#9E555A] uppercase tracking-widest border-t border-[#EAD5D8] pt-4">
                    <MessageCircle className="w-3.5 h-3.5" /> Contact via WhatsApp
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'confirmed' && (
          <div className="p-6 space-y-4 animate-fadeIn">
            <h3 className="text-lg font-serif font-bold text-[#2D2A29] px-2 mb-2">Confirmed Appointments</h3>
            {bookings.filter(b => b.status === 'confirmed').map(b => (
              <div key={b.id} className="bg-white p-4 rounded-3xl border border-[#EAD5D8] shadow-sm flex items-center justify-between border-l-4 border-l-emerald-500">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[50px] border-r border-[#EAD5D8] pr-4 mr-2">
                    <p className="text-sm font-bold text-[#2D2A29]">{b.timeSlot}</p>
                    <p className="text-[9px] text-[#9E555A] font-bold uppercase">TODAY</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-bold text-[#2D2A29]">{b.clientName}</h6>
                    <p className="text-[10px] text-[#6A605E]">{b.serviceName}</p>
                  </div>
                </div>
                <button className="p-2 bg-rose-50 text-rose-700 rounded-full">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="h-20 bg-white border-t border-[#EAD5D8] flex items-center justify-around px-8 shrink-0">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-[#9E555A]' : 'text-[#6A605E]'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Dashboard</span>
        </button>
        <button onClick={() => setActiveTab('requests')} className={`relative flex flex-col items-center gap-1 ${activeTab === 'requests' ? 'text-[#9E555A]' : 'text-[#6A605E]'}`}>
          <Clock className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Requests</span>
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {pendingCount}
            </span>
          )}
        </button>
        <button onClick={() => setActiveTab('confirmed')} className={`flex flex-col items-center gap-1 ${activeTab === 'confirmed' ? 'text-[#9E555A]' : 'text-[#6A605E]'}`}>
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Schedule</span>
        </button>
      </div>
    </div>
  );
}
