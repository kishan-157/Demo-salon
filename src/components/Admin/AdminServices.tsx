import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { ServiceItem } from '../../config/salonConfig';
import { Plus, Edit3, Trash2, Sparkles, Clock, Tag, X, Check } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const { services, addService, updateService, deleteService } = useBooking();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<'hair' | 'skin' | 'beauty' | 'bridal'>('hair');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(100);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [image, setImage] = useState('');
  const [popular, setPopular] = useState(false);

  const handleOpenAdd = () => {
    setEditingService(null);
    setName('');
    setCategory('hair');
    setDescription('');
    setPrice(120);
    setDurationMinutes(60);
    setImage('https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80');
    setPopular(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setName(service.name);
    setCategory(service.category);
    setDescription(service.description);
    setPrice(service.price);
    setDurationMinutes(service.durationMinutes);
    setImage(service.image);
    setPopular(!!service.popular);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || price <= 0) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingService) {
      updateService(editingService.id, {
        name,
        category,
        description,
        price,
        durationMinutes,
        image,
        popular
      });
    } else {
      addService({
        name,
        category,
        description,
        price,
        durationMinutes,
        image,
        popular
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#EAD5D8] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-[#2D2A29]">Services & Approved Pricing</h3>
          <p className="text-xs text-[#6A605E]">Add, edit, or update approved service offerings, pricing, and durations.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#9E555A] hover:bg-[#854549] text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-3xl border border-[#EAD5D8] shadow-sm overflow-hidden flex flex-col justify-between group">
            <div className="relative aspect-[16/10] bg-[#FCF9F6]">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {s.category}
              </span>
              {s.popular && (
                <span className="absolute top-3 right-3 bg-white/90 text-[#9E555A] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  Popular
                </span>
              )}
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-serif font-bold text-lg text-[#2D2A29]">{s.name}</h4>
                  <span className="font-serif font-bold text-lg text-[#9E555A]">${s.price}</span>
                </div>
                <p className="text-xs text-[#6A605E] line-clamp-2 leading-relaxed">{s.description}</p>
              </div>

              <div className="pt-4 border-t border-[#EAD5D8]/60 flex items-center justify-between">
                <span className="text-xs text-[#736B69] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#9E555A]" /> {s.durationMinutes} mins
                </span>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-2 text-gray-500 hover:text-[#9E555A] hover:bg-rose-50 rounded-xl transition-all"
                    title="Edit Service"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${s.name}"?`)) {
                        deleteService(s.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-lg w-full bg-[#FCF9F6] rounded-3xl shadow-2xl border border-[#EAD5D8] overflow-hidden my-8">
            <div className="bg-[#9E555A] text-white px-6 py-4 flex items-center justify-between">
              <h4 className="font-serif font-bold text-lg">
                {editingService ? 'Edit Service Offering' : 'Add New Service'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#595250] mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Signature Scalp Treatment"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30 capitalize"
                  >
                    <option value="hair">Hair Couture</option>
                    <option value="skin">Skin & Facial</option>
                    <option value="beauty">Beauty & Nails</option>
                    <option value="bridal">Bridal Glamour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">Duration (Minutes) *</label>
                  <input
                    type="number"
                    required
                    step={15}
                    min={15}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">Mark as Popular</label>
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={popular}
                      onChange={(e) => setPopular(e.target.checked)}
                      className="w-4 h-4 accent-[#9E555A]"
                    />
                    <span className="text-xs text-[#6A605E]">Show 'Most Popular' badge</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#595250] mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed service description..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#595250] mb-1">Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9E555A]/30"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EAD5D8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9E555A] hover:bg-[#854549] text-white text-xs font-semibold rounded-full shadow-sm"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
