import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Smartphone, Download, ExternalLink, CheckCircle2, Clock, AlertCircle, Sparkles, Eye, Play, Shield } from 'lucide-react';

export const AdminMobileApps: React.FC = () => {
  const [activePreview, setActivePreview] = useState<'customer' | 'owner' | null>(null);

  // In a real app, these would come from Firebase
  const appBuilds = {
    customer: {
      version: '1.0.4',
      status: 'ready',
      lastUpdated: '2026-10-20T14:30:00Z',
      apkUrl: '/downloads/bella-rose-customer-v1.0.4.apk',
    },
    owner: {
      version: '1.0.2',
      status: 'ready',
      lastUpdated: '2026-10-21T09:15:00Z',
      apkUrl: '/downloads/bella-rose-owner-v1.0.2.apk',
    }
  };

  const customerScreens = [
    { title: 'Home', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80' },
    { title: 'Services', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
    { title: 'Booking', img: 'https://images.unsplash.com/photo-1595475243692-3b2d1d9ec714?auto=format&fit=crop&w=300&q=80' }
  ];

  const ownerScreens = [
    { title: 'Dashboard', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80' },
    { title: 'Appointments', img: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=300&q=80' },
    { title: 'Settings', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm">
        <h3 className="text-2xl font-serif font-bold text-[#2D2A29]">Mobile Application Management</h3>
        <p className="text-xs text-[#6A605E]">Manage and preview the branded Android applications for your salon.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Customer App Card */}
        <div className="bg-white rounded-3xl border border-[#EAD5D8] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-[#FDF9F8] border-b border-[#EAD5D8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#EAD5D8] flex items-center justify-center text-[#9E555A]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold text-[#2D2A29]">Customer App</h4>
                <p className="text-[10px] text-[#6A605E] uppercase tracking-wider font-semibold">Branded Booking Experience</p>
              </div>
            </div>
            {appBuilds.customer.status === 'ready' ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Pending
              </span>
            )}
          </div>

          <div className="p-6 space-y-6 flex-grow">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#9E555A] font-semibold block">Version</span>
                <span className="text-[#2D2A29] font-medium">{appBuilds.customer.version || 'N/A'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#9E555A] font-semibold block">Last Build</span>
                <span className="text-[#2D2A29] font-medium">
                  {appBuilds.customer.lastUpdated ? new Date(appBuilds.customer.lastUpdated).toLocaleDateString() : 'Never'}
                </span>
              </div>
            </div>

            <div className="bg-[#F9F3F0] rounded-2xl p-4 border border-[#EAD5D8]/50">
              <p className="text-[11px] text-[#6A605E] leading-relaxed">
                The Customer App allows your clients to browse services, select artists, and book appointments directly from their home screen. Includes push notifications and loyalty tracking.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => setActivePreview('customer')}
                className="flex-1 min-w-[140px] px-4 py-2.5 bg-white border border-[#EAD5D8] text-[#9E555A] rounded-xl text-xs font-semibold hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview App
              </button>
              <button 
                disabled={!appBuilds.customer.apkUrl}
                onClick={() => appBuilds.customer.apkUrl && window.open(appBuilds.customer.apkUrl, '_blank')}
                className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  appBuilds.customer.apkUrl 
                    ? 'bg-[#9E555A] text-white hover:bg-[#854549] shadow-sm' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                <Download className="w-4 h-4" />
                {appBuilds.customer.apkUrl ? 'Download APK' : 'APK Not Generated'}
              </button>
            </div>
          </div>
        </div>

        {/* Owner App Card */}
        <div className="bg-white rounded-3xl border border-[#EAD5D8] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-[#FDF9F8] border-b border-[#EAD5D8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#EAD5D8] flex items-center justify-center text-[#9E555A]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold text-[#2D2A29]">Salon Owner App</h4>
                <p className="text-[10px] text-[#6A605E] uppercase tracking-wider font-semibold">Business Management</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center gap-1">
              <Clock className="w-3 h-3" /> {appBuilds.owner.status === 'not_generated' ? 'Not Generated' : 'Building'}
            </span>
          </div>

          <div className="p-6 space-y-6 flex-grow">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#9E555A] font-semibold block">Version</span>
                <span className="text-[#2D2A29] font-medium">{appBuilds.owner.version || 'N/A'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#9E555A] font-semibold block">Last Build</span>
                <span className="text-[#2D2A29] font-medium">Never</span>
              </div>
            </div>

            <div className="bg-[#F9F3F0] rounded-2xl p-4 border border-[#EAD5D8]/50">
              <p className="text-[11px] text-[#6A605E] leading-relaxed">
                The Owner App provides a real-time dashboard for appointment approvals, schedule management, and client communication on the go.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => setActivePreview('owner')}
                className="flex-1 min-w-[140px] px-4 py-2.5 bg-white border border-[#EAD5D8] text-[#9E555A] rounded-xl text-xs font-semibold hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview App
              </button>
              <button 
                disabled={!appBuilds.owner.apkUrl}
                onClick={() => appBuilds.owner.apkUrl && window.open(appBuilds.owner.apkUrl, '_blank')}
                className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  appBuilds.owner.apkUrl 
                    ? 'bg-[#9E555A] text-white hover:bg-[#854549] shadow-sm' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                <Download className="w-4 h-4" />
                {appBuilds.owner.apkUrl ? 'Download APK' : 'APK Not Generated Yet'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* App Previews (Interactive Modal Style) */}
      {activePreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Phone Frame Simulator */}
            <div className="bg-[#2D2A29] p-4 md:p-8 flex items-center justify-center">
              <div className="relative w-[280px] h-[560px] bg-white rounded-[40px] border-[8px] border-[#1a1a1a] shadow-inner overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20"></div>
                
                {/* App Content Simulator */}
                <div className="flex-grow bg-[#FDF9F8] overflow-y-auto">
                  <div className="p-6 pt-10 space-y-4">
                    <div className="h-6 w-32 bg-[#EAD5D8] rounded-full"></div>
                    <div className="aspect-video bg-[#F4EBE1] rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-[#9E555A]/40" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-[#EAD5D8]/40 rounded-full"></div>
                      <div className="h-4 w-3/4 bg-[#EAD5D8]/40 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-20 bg-white border border-[#EAD5D8] rounded-2xl"></div>
                      <div className="h-20 bg-white border border-[#EAD5D8] rounded-2xl"></div>
                    </div>
                    <div className="h-12 w-full bg-[#9E555A] rounded-full"></div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-14 bg-white border-t border-[#EAD5D8] flex items-center justify-around px-4">
                  <div className="w-6 h-6 rounded-full bg-[#EAD5D8]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#EAD5D8]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#EAD5D8]"></div>
                </div>
              </div>
            </div>

            {/* Preview Details */}
            <div className="flex-grow p-8 space-y-6 overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-3xl font-serif font-bold text-[#2D2A29]">
                    {activePreview === 'customer' ? 'Customer App Preview' : 'Owner App Preview'}
                  </h4>
                  <p className="text-sm text-[#6A605E]">Interactive workflow demonstration</p>
                </div>
                <button 
                  onClick={() => setActivePreview(null)}
                  className="p-2 hover:bg-rose-50 rounded-full transition-all"
                >
                  <Eye className="w-6 h-6 text-[#9E555A]" />
                </button>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-[#2D2A29]">Key Workflow Screens</h5>
                <div className="grid grid-cols-3 gap-3">
                  {(activePreview === 'customer' ? customerScreens : ownerScreens).map((screen, i) => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-[3/4] rounded-xl overflow-hidden border border-[#EAD5D8] bg-[#F9F3F0]">
                        <img src={screen.img} alt={screen.title} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <p className="text-[10px] font-bold text-center uppercase tracking-tighter text-[#6A605E]">{screen.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FDF9F8] p-5 rounded-2xl border border-[#EAD5D8] space-y-3">
                <h5 className="font-serif font-bold text-sm text-[#2D2A29] flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#9E555A]" />
                  <span>Demonstration Guide</span>
                </h5>
                <ul className="text-xs text-[#6A605E] space-y-2 list-disc pl-4">
                  {activePreview === 'customer' ? (
                    <>
                      <li>Show the premium splash screen with salon branding.</li>
                      <li>Demonstrate the service catalog with real-time pricing.</li>
                      <li>Walk through the date and time selection flow.</li>
                      <li>Complete a booking request and show the pending status.</li>
                    </>
                  ) : (
                    <>
                      <li>View the unified owner dashboard with today's schedule.</li>
                      <li>Process a pending booking request (Accept/Reject).</li>
                      <li>Show real-time updates reflected in the client's view.</li>
                      <li>Manage service availability and salon settings on the fly.</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setActivePreview(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#9E555A] border border-[#EAD5D8] hover:bg-rose-50 transition-all"
                >
                  Close Preview
                </button>
                <button className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#9E555A] text-white hover:bg-[#854549] shadow-md transition-all flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Launch Interactive Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Notice */}
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-amber-600" />
        </div>
        <div className="space-y-2">
          <h5 className="font-serif font-bold text-amber-900 text-lg">Sales Demo Note</h5>
          <p className="text-xs text-amber-800 leading-relaxed">
            The APK files shown above are generated using our standard CI/CD pipeline. For the purpose of this demonstration, the "Preview App" button provides a high-fidelity browser-based simulation of the mobile experience. To install the actual application on a physical device, use the "Download APK" button when the status is "Ready".
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Download className="w-3 h-3" /> Verified APK Source
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3 h-3" /> Android 10+ Compatible
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
