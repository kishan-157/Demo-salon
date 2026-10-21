import React, { useState } from 'react';
import { useBooking, BookingRequest } from '../../context/BookingContext';
import { CheckCircle2, XCircle, Trash2, MessageCircle, Search, Filter, Calendar, Clock, Phone, Mail, Sparkles } from 'lucide-react';

export const AdminBookings: React.FC = () => {
  const { bookings, updateBookingStatus, deleteBooking, getWhatsAppUrl } = useBooking();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = 
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-[#2D2A29]">Booking Management</h3>
          <p className="text-xs text-[#6A605E]">Review, accept, reject, or manage all customer appointment requests.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8C6D6F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search client or service..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
            />
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: `All (${bookings.length})` },
          { id: 'pending', label: `Pending (${bookings.filter(b => b.status === 'pending').length})` },
          { id: 'confirmed', label: `Confirmed (${bookings.filter(b => b.status === 'confirmed').length})` },
          { id: 'rejected', label: `Rejected (${bookings.filter(b => b.status === 'rejected').length})` },
          { id: 'cancelled', label: `Cancelled (${bookings.filter(b => b.status === 'cancelled').length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
              filterStatus === tab.id
                ? 'bg-[#9E555A] text-white shadow-sm'
                : 'bg-white text-[#595250] border border-[#EAD5D8] hover:bg-rose-50/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EAD5D8] space-y-3">
          <Sparkles className="w-8 h-8 text-[#9E555A] mx-auto opacity-50" />
          <h4 className="font-serif font-bold text-lg text-[#2D2A29]">No appointments found</h4>
          <p className="text-xs text-[#6A605E]">No bookings match your current filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const statusStyles = {
              pending: 'bg-amber-100 text-amber-800 border-amber-200',
              confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
              rejected: 'bg-rose-100 text-rose-800 border-rose-200',
              cancelled: 'bg-gray-100 text-gray-700 border-gray-200'
            };

            return (
              <div
                key={b.id}
                className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#9E555A] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                      {b.id}
                    </span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusStyles[b.status]}`}>
                      {b.status}
                    </span>
                    <span className="text-xs text-[#736B69]">
                      Requested: {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-xl text-[#2D2A29]">
                      {b.serviceName} <span className="text-sm font-normal text-[#9E555A]">(${b.price})</span>
                    </h4>
                    <div className="text-xs text-[#6A605E] flex items-center gap-4 flex-wrap pt-1">
                      <span className="flex items-center gap-1 font-medium text-[#2D2A29]">
                        <Calendar className="w-3.5 h-3.5 text-[#9E555A]" /> {b.date} at {b.timeSlot}
                      </span>
                      <span className="font-semibold text-[#2D2A29]">
                        👤 {b.clientName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#9E555A]" /> {b.clientPhone}
                      </span>
                      {b.clientEmail && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-[#9E555A]" /> {b.clientEmail}
                        </span>
                      )}
                    </div>
                    {b.notes && (
                      <p className="text-xs text-[#736B69] italic bg-[#FCF9F6] p-2.5 rounded-xl mt-2 border border-[#EAD5D8]/50">
                        Client Notes: "{b.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap shrink-0 w-full lg:w-auto justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-[#EAD5D8]/60">
                  <a
                    href={getWhatsAppUrl({
                      serviceName: b.serviceName,
                      date: b.date,
                      timeSlot: b.timeSlot,
                      clientName: b.clientName
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                    title="Contact via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  {b.status !== 'confirmed' && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'confirmed')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>
                  )}

                  {b.status !== 'rejected' && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'rejected')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  {b.status !== 'cancelled' && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'cancelled')}
                      className="px-3.5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this booking record?')) {
                        deleteBooking(b.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-all"
                    title="Delete booking"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
