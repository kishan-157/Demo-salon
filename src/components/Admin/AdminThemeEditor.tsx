import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BrandLogo } from '../BrandLogo';
import { SalonConfig } from '../../config/salonConfig';
import { 
  Palette, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Image as ImageIcon, 
  Smartphone, 
  Monitor, 
  Type, 
  Layers, 
  Sliders, 
  Scissors, 
  Crown, 
  Gem, 
  Flower2, 
  Heart, 
  Star,
  Check,
  ChevronRight,
  Eye,
  Calendar,
  ShieldCheck,
  Info
} from 'lucide-react';

// Preset Luxury Theme Palettes
interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: 'serif' | 'sans' | 'playfair' | 'editorial';
  borderRadius: 'full' | '2xl' | 'lg' | 'sm';
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'rose-gold',
    name: 'Rose Gold & Blush',
    description: 'Bespoke feminine couture with soft warm ivory and muted rosewood',
    primaryColor: '#9E555A',
    secondaryColor: '#854549',
    accentColor: '#F4EBE1',
    backgroundColor: '#FCF9F6',
    textColor: '#2D2A29',
    fontHeading: 'serif',
    borderRadius: 'full'
  },
  {
    id: 'royal-noir',
    name: '24K Gold & Royal Noir',
    description: 'High-end Beverly Hills VIP lounge aesthetic with gilded bronze accents',
    primaryColor: '#C5A059',
    secondaryColor: '#A8843E',
    accentColor: '#26221E',
    backgroundColor: '#161412',
    textColor: '#F5EFE6',
    fontHeading: 'serif',
    borderRadius: '2xl'
  },
  {
    id: 'emerald-botanic',
    name: 'Emerald Botanic Spa',
    description: 'Organic wellness, holistic hair care, and herbal rejuvenation',
    primaryColor: '#2D6A4F',
    secondaryColor: '#1B4332',
    accentColor: '#E8F5E9',
    backgroundColor: '#F7FCF9',
    textColor: '#1A2E24',
    fontHeading: 'serif',
    borderRadius: 'full'
  },
  {
    id: 'lavender-luxe',
    name: 'Lavender & Amethyst',
    description: 'Modern serene calm with delicate lilac, platinum, and violet hues',
    primaryColor: '#7B2CBF',
    secondaryColor: '#5A189A',
    accentColor: '#F3E8FF',
    backgroundColor: '#FAF7FF',
    textColor: '#241434',
    fontHeading: 'serif',
    borderRadius: 'full'
  },
  {
    id: 'ruby-velvet',
    name: 'Crimson Ruby Velvet',
    description: 'Dramatic romantic bridal glam with deep wine red and champagne',
    primaryColor: '#800E13',
    secondaryColor: '#640D14',
    accentColor: '#FDE8E9',
    backgroundColor: '#FFF7F7',
    textColor: '#2B1214',
    fontHeading: 'serif',
    borderRadius: '2xl'
  },
  {
    id: 'warm-caramel',
    name: 'Warm Caramel & Cashmere',
    description: 'Artisanal earth tones, warm latte, toffee, and toasted almond',
    primaryColor: '#8B5E3C',
    secondaryColor: '#6F452A',
    accentColor: '#F5EBE0',
    backgroundColor: '#FAF6F0',
    textColor: '#2C221A',
    fontHeading: 'serif',
    borderRadius: 'full'
  },
  {
    id: 'mediterranean-blue',
    name: 'Santorini Azure & Pearl',
    description: 'Clean coastal luxury, crisp white marble, and deep Aegean navy',
    primaryColor: '#1D3557',
    secondaryColor: '#132438',
    accentColor: '#E2EAF2',
    backgroundColor: '#F8FAFC',
    textColor: '#1A2530',
    fontHeading: 'sans',
    borderRadius: 'xl' as any
  }
];

// Sample Curated Logo Presets
const SAMPLE_LOGO_PRESETS = [
  {
    name: 'Minimal Crest Gold',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Botanical Emblem',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Artisan Scissors',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80'
  }
];

// Curated Hero Showcase Images
const HERO_IMAGE_PRESETS = [
  {
    label: 'Grand Salon Floor',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Luxury Styling Lounge',
    url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Balayage Station',
    url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Spa & Facial Suite',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
  }
];

export const AdminThemeEditor: React.FC = () => {
  const { settings, updateSettings } = useBooking();

  // Local state for all editable elements
  const [name, setName] = useState(settings.name || 'Bella Rose Luxury Salon & Spa');
  const [logoText, setLogoText] = useState(settings.logoText || 'Bella Rose');
  const [logoSubtitle, setLogoSubtitle] = useState(settings.logoSubtitle || 'Luxury Salon & Spa');
  const [logoIcon, setLogoIcon] = useState(settings.logoIcon || 'monogram');
  const [logoImage, setLogoImage] = useState(settings.logoImage || '');
  const [logoType, setLogoType] = useState<'icon' | 'image'>(settings.logoImage ? 'image' : 'icon');

  // Colors
  const [primaryColor, setPrimaryColor] = useState(settings.theme?.primaryColor || '#9E555A');
  const [secondaryColor, setSecondaryColor] = useState(settings.theme?.secondaryColor || '#854549');
  const [accentColor, setAccentColor] = useState(settings.theme?.accentColor || '#F4EBE1');
  const [backgroundColor, setBackgroundColor] = useState(settings.theme?.backgroundColor || '#FCF9F6');
  const [textColor, setTextColor] = useState(settings.theme?.textColor || '#2D2A29');

  // Typography & Shape
  const [fontHeading, setFontHeading] = useState<'serif' | 'sans' | 'playfair' | 'editorial'>(settings.theme?.fontHeading || 'serif');
  const [borderRadius, setBorderRadius] = useState<'full' | '2xl' | 'lg' | 'sm'>(settings.theme?.borderRadius || 'full');

  // Hero Section
  const [heroEyebrow, setHeroEyebrow] = useState(settings.heroEyebrow || 'Beverly Hills Premier Beauty Destination');
  const [tagline, setTagline] = useState(settings.tagline || 'Where Elegance Meets Artisanal Beauty');
  const [subheading, setSubheading] = useState(settings.subheading || 'Indulge in bespoke hair couture, rejuvenating skin treatments, and exquisite bridal styling crafted by master artisans.');
  const [heroImage, setHeroImage] = useState(settings.heroImage || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80');

  // UI State
  const [activeTab, setActiveTab] = useState<'presets' | 'branding' | 'colors' | 'typography' | 'hero'>('presets');
  const [previewDevice, setPreviewDevice] = useState<'web' | 'customer-app' | 'owner-app'>('web');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Live draft settings object for immediate preview
  const draftSettings: SalonConfig = {
    ...settings,
    name,
    tagline,
    subheading,
    heroEyebrow,
    heroImage,
    logoText,
    logoSubtitle,
    logoIcon: logoIcon as any,
    logoImage: logoType === 'image' ? logoImage : '',
    theme: {
      primaryColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      textColor,
      fontHeading,
      borderRadius
    }
  };

  // Apply a Theme Preset in 1-Click
  const applyPreset = (preset: ThemePreset) => {
    setPrimaryColor(preset.primaryColor);
    setSecondaryColor(preset.secondaryColor);
    setAccentColor(preset.accentColor);
    setBackgroundColor(preset.backgroundColor);
    setTextColor(preset.textColor);
    setFontHeading(preset.fontHeading);
    setBorderRadius(preset.borderRadius);
  };

  // Save changes to Firestore and server
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        name,
        tagline,
        subheading,
        heroEyebrow,
        heroImage,
        logoText,
        logoSubtitle,
        logoIcon: logoIcon as any,
        logoImage: logoType === 'image' ? logoImage : '',
        theme: {
          primaryColor,
          secondaryColor,
          accentColor,
          backgroundColor,
          textColor,
          fontHeading,
          borderRadius
        }
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to save theme settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default Bella Rose configuration
  const handleReset = () => {
    if (!window.confirm('Reset all theme, logo, and branding settings to default Bella Rose style?')) return;
    setName('Bella Rose Luxury Salon & Spa');
    setLogoText('Bella Rose');
    setLogoSubtitle('Luxury Salon & Spa');
    setLogoIcon('monogram');
    setLogoImage('');
    setLogoType('icon');
    setPrimaryColor('#9E555A');
    setSecondaryColor('#854549');
    setAccentColor('#F4EBE1');
    setBackgroundColor('#FCF9F6');
    setTextColor('#2D2A29');
    setFontHeading('serif');
    setBorderRadius('full');
    setHeroEyebrow('Beverly Hills Premier Beauty Destination');
    setTagline('Where Elegance Meets Artisanal Beauty');
    setSubheading('Indulge in bespoke hair couture, rejuvenating skin treatments, and exquisite bridal styling crafted by master artisans.');
    setHeroImage('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80');
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      
      {/* Top Banner Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-[#EAD5D8] text-[#9E555A] text-xs font-semibold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Universal Theme & Brand Studio</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2A29]">
            Theme & Brand Customizer
          </h3>
          <p className="text-xs text-[#6A605E] mt-1 max-w-xl">
            Everything is editable here! Customize the logo, colors, typography, hero banner, and styling. Changes synchronize across the <strong>Website</strong> and both <strong>Mobile Apps</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 bg-[#F9F3F0] hover:bg-[#EAD5D8]/50 text-[#6A605E] rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            title="Reset to factory settings"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-none px-6 py-3 bg-[#9E555A] hover:bg-[#854549] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Theme & Brand updated successfully! Your website and mobile apps are now styled with your custom branding.
          </span>
        </div>
      )}

      {/* Main Layout Grid: Controls on Left, Live Multi-Device Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Sub Navigation Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-[#EAD5D8] flex items-center gap-1.5 overflow-x-auto shadow-sm">
            {[
              { id: 'presets', label: '1-Click Presets', icon: Sparkles },
              { id: 'branding', label: 'Logo & Brand', icon: ImageIcon },
              { id: 'colors', label: 'Colors & Palette', icon: Palette },
              { id: 'typography', label: 'Fonts & Shapes', icon: Type },
              { id: 'hero', label: 'Hero Banner', icon: Layers }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2D2A29] text-white shadow-sm'
                      : 'text-[#6A605E] hover:bg-[#F9F3F0]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-200' : 'text-[#9E555A]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: 1-Click Luxury Theme Presets */}
          {activeTab === 'presets' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-base font-serif font-bold text-[#2D2A29]">Signature Luxury Theme Presets</h4>
                <p className="text-xs text-[#6A605E]">
                  Select any designer-crafted color & typography theme to re-skin your entire digital presence in one click.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {THEME_PRESETS.map(preset => {
                  const isCurrent = primaryColor.toLowerCase() === preset.primaryColor.toLowerCase();
                  return (
                    <div
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
                        isCurrent 
                          ? 'border-[#9E555A] bg-rose-50/40 shadow-sm' 
                          : 'border-[#EAD5D8]/80 hover:border-[#9E555A]/50 bg-[#FCF9F6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#2D2A29]">
                          {preset.name}
                        </span>
                        {isCurrent && (
                          <span className="w-5 h-5 rounded-full bg-[#9E555A] text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#6A605E] leading-relaxed">
                        {preset.description}
                      </p>

                      {/* Swatch palette preview */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div 
                          className="w-6 h-6 rounded-lg shadow-inner border border-black/10" 
                          style={{ backgroundColor: preset.primaryColor }}
                          title="Primary Color"
                        />
                        <div 
                          className="w-6 h-6 rounded-lg shadow-inner border border-black/10" 
                          style={{ backgroundColor: preset.secondaryColor }}
                          title="Hover Shade"
                        />
                        <div 
                          className="w-6 h-6 rounded-lg shadow-inner border border-black/10" 
                          style={{ backgroundColor: preset.accentColor }}
                          title="Accent Background"
                        />
                        <div 
                          className="w-6 h-6 rounded-lg shadow-inner border border-black/10" 
                          style={{ backgroundColor: preset.backgroundColor }}
                          title="Body Canvas"
                        />
                        <div 
                          className="w-6 h-6 rounded-lg shadow-inner border border-black/10" 
                          style={{ backgroundColor: preset.textColor }}
                          title="Heading Text"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Brand Identity & Logo */}
          {activeTab === 'branding' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-base font-serif font-bold text-[#2D2A29]">Logo & Salon Identity</h4>
                <p className="text-xs text-[#6A605E]">
                  This logo and business name are shared automatically with the <strong>Customer App</strong> and <strong>Owner App</strong>.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">
                    Salon Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Bella Rose Luxury Salon & Spa"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#595250] mb-1">
                      Logo Wordmark Text *
                    </label>
                    <input
                      type="text"
                      value={logoText}
                      onChange={e => setLogoText(e.target.value)}
                      placeholder="e.g. Bella Rose"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#595250] mb-1">
                      Logo Subtitle / Tagline *
                    </label>
                    <input
                      type="text"
                      value={logoSubtitle}
                      onChange={e => setLogoSubtitle(e.target.value)}
                      placeholder="e.g. Luxury Salon & Spa"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Logo Presentation Mode */}
                <div className="pt-4 border-t border-[#EAD5D8]/60 space-y-3">
                  <label className="block text-xs font-semibold text-[#595250]">
                    Logo Presentation Type
                  </label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLogoType('icon')}
                      className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        logoType === 'icon'
                          ? 'border-[#9E555A] bg-rose-50 text-[#9E555A]'
                          : 'border-[#EAD5D8] text-[#6A605E] hover:bg-[#F9F3F0]'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Monogram / Icon Badge</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLogoType('image')}
                      className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        logoType === 'image'
                          ? 'border-[#9E555A] bg-rose-50 text-[#9E555A]'
                          : 'border-[#EAD5D8] text-[#6A605E] hover:bg-[#F9F3F0]'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Custom Image URL</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Option A: Custom Image URL */}
                {logoType === 'image' && (
                  <div className="p-4 bg-[#FCF9F6] border border-[#EAD5D8] rounded-2xl space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-xs font-semibold text-[#595250] mb-1">
                        Logo Image Direct URL (PNG / SVG / JPEG)
                      </label>
                      <input
                        type="url"
                        value={logoImage}
                        onChange={e => setLogoImage(e.target.value)}
                        placeholder="https://example.com/salon-logo.png"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-white text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="block text-[11px] font-semibold text-[#736B69] mb-2">
                        Quick Preset Logos (click to test):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {SAMPLE_LOGO_PRESETS.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setLogoImage(p.url)}
                            className="px-3 py-1.5 bg-white border border-[#EAD5D8] hover:border-[#9E555A] rounded-lg text-[10px] font-medium text-[#595250] transition-colors cursor-pointer"
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Option B: Icon / Monogram Selection */}
                {logoType === 'icon' && (
                  <div className="p-4 bg-[#FCF9F6] border border-[#EAD5D8] rounded-2xl space-y-3 animate-fadeIn">
                    <label className="block text-xs font-semibold text-[#595250]">
                      Choose Logo Badge Icon
                    </label>

                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                      {[
                        { id: 'monogram', label: 'Initials', icon: null },
                        { id: 'sparkles', label: 'Sparkles', icon: Sparkles },
                        { id: 'scissors', label: 'Scissors', icon: Scissors },
                        { id: 'crown', label: 'Crown', icon: Crown },
                        { id: 'gem', label: 'Diamond', icon: Gem },
                        { id: 'flower', label: 'Floral', icon: Flower2 },
                        { id: 'heart', label: 'Heart', icon: Heart },
                        { id: 'star', label: 'Star', icon: Star }
                      ].map(item => {
                        const IconComp = item.icon;
                        const isSelected = logoIcon === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setLogoIcon(item.id as any)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#9E555A] bg-[#9E555A] text-white shadow-sm'
                                : 'border-[#EAD5D8] bg-white text-[#595250] hover:bg-rose-50/50'
                            }`}
                          >
                            {IconComp ? (
                              <IconComp className="w-4 h-4" />
                            ) : (
                              <span className="font-serif font-bold text-xs">
                                {logoText.slice(0, 2).toUpperCase() || 'BR'}
                              </span>
                            )}
                            <span className="text-[9px] font-medium truncate max-w-full">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 3: Colors & Palette */}
          {activeTab === 'colors' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-base font-serif font-bold text-[#2D2A29]">Colors & Chromatic Palette</h4>
                <p className="text-xs text-[#6A605E]">
                  Fine-tune each color with precision. Inputs accept both color picker and manual HEX codes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Brand Color */}
                <div className="p-4 rounded-2xl border border-[#EAD5D8] bg-[#FCF9F6] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2D2A29]">Primary Brand Color</label>
                    <span className="text-[10px] text-[#736B69]">Buttons, Brand Icons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-[#EAD5D8] p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#EAD5D8] bg-white uppercase font-bold"
                    />
                  </div>
                </div>

                {/* Secondary / Hover Shade */}
                <div className="p-4 rounded-2xl border border-[#EAD5D8] bg-[#FCF9F6] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2D2A29]">Secondary / Hover Color</label>
                    <span className="text-[10px] text-[#736B69]">Interactive hover states</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={e => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-[#EAD5D8] p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={e => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#EAD5D8] bg-white uppercase font-bold"
                    />
                  </div>
                </div>

                {/* Accent Background */}
                <div className="p-4 rounded-2xl border border-[#EAD5D8] bg-[#FCF9F6] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2D2A29]">Accent / Pill Color</label>
                    <span className="text-[10px] text-[#736B69]">Badges, soft cards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-[#EAD5D8] p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#EAD5D8] bg-white uppercase font-bold"
                    />
                  </div>
                </div>

                {/* Canvas Background Color */}
                <div className="p-4 rounded-2xl border border-[#EAD5D8] bg-[#FCF9F6] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2D2A29]">Page Canvas Background</label>
                    <span className="text-[10px] text-[#736B69]">Background atmosphere</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={e => setBackgroundColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-[#EAD5D8] p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={e => setBackgroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#EAD5D8] bg-white uppercase font-bold"
                    />
                  </div>
                </div>

                {/* Dark Text Color */}
                <div className="p-4 rounded-2xl border border-[#EAD5D8] bg-[#FCF9F6] space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2D2A29]">Headings & High-Contrast Text Color</label>
                    <span className="text-[10px] text-[#736B69]">Main typography</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={textColor}
                      onChange={e => setTextColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-[#EAD5D8] p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={e => setTextColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#EAD5D8] bg-white uppercase font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Typography & Button Shapes */}
          {activeTab === 'typography' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-base font-serif font-bold text-[#2D2A29]">Typography & Aesthetic Geometry</h4>
                <p className="text-xs text-[#6A605E]">
                  Choose heading font families and button corner curvature to match your salon's personality.
                </p>
              </div>

              {/* Heading Font Style */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#595250]">
                  Heading & Title Typography Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'serif', title: 'Classic Luxury', sample: 'Bella Rose', fontClass: 'font-serif' },
                    { id: 'sans', title: 'Clean Modern', sample: 'Bella Rose', fontClass: 'font-sans' },
                    { id: 'editorial', title: 'Editorial Chic', sample: 'Bella Rose', fontClass: 'font-serif italic' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFontHeading(f.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        fontHeading === f.id
                          ? 'border-[#9E555A] bg-rose-50/50 shadow-sm'
                          : 'border-[#EAD5D8] hover:border-[#9E555A]/50 bg-[#FCF9F6]'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold text-[#736B69] mb-1">{f.title}</div>
                      <div className={`text-xl font-bold text-[#2D2A29] ${f.fontClass}`}>{f.sample}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Corner Radius */}
              <div className="space-y-3 pt-4 border-t border-[#EAD5D8]/60">
                <label className="block text-xs font-semibold text-[#595250]">
                  Button & Card Corner Curvature
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'full', label: 'Full Pill', radiusClass: 'rounded-full' },
                    { id: '2xl', label: 'Soft Luxury', radiusClass: 'rounded-2xl' },
                    { id: 'lg', label: 'Modern Box', radiusClass: 'rounded-lg' },
                    { id: 'sm', label: 'Crisp Editorial', radiusClass: 'rounded-sm' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setBorderRadius(r.id as any)}
                      className={`p-3 border text-center transition-all cursor-pointer ${r.radiusClass} ${
                        borderRadius === r.id
                          ? 'border-[#9E555A] bg-[#9E555A] text-white font-bold shadow-sm'
                          : 'border-[#EAD5D8] bg-[#FCF9F6] text-[#595250] hover:bg-rose-50/50 text-xs'
                      }`}
                    >
                      <span className="text-xs">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Hero Section Banner */}
          {activeTab === 'hero' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD5D8] shadow-sm space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-base font-serif font-bold text-[#2D2A29]">Website Hero Showcase</h4>
                <p className="text-xs text-[#6A605E]">
                  Customize the front-and-center headline, introductory story, and luxury photography on the website.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">
                    Eyebrow Pill Badge Text
                  </label>
                  <input
                    type="text"
                    value={heroEyebrow}
                    onChange={e => setHeroEyebrow(e.target.value)}
                    placeholder="e.g. Beverly Hills Premier Beauty Destination"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">
                    Hero Main Headline Tagline *
                  </label>
                  <textarea
                    rows={2}
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    placeholder="e.g. Where Elegance Meets Artisanal Beauty"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">
                    Hero Subheading Narrative *
                  </label>
                  <textarea
                    rows={3}
                    value={subheading}
                    onChange={e => setSubheading(e.target.value)}
                    placeholder="e.g. Indulge in bespoke hair couture, rejuvenating skin treatments..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#595250] mb-1">
                    Showcase Feature Image URL
                  </label>
                  <input
                    type="url"
                    value={heroImage}
                    onChange={e => setHeroImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAD5D8] bg-[#FCF9F6] text-xs font-medium focus:ring-2 focus:ring-[#9E555A]/30 focus:outline-none"
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-[#736B69] mb-2">
                    Quick Pick Curated Salon Interiors:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {HERO_IMAGE_PRESETS.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setHeroImage(img.url)}
                        className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          heroImage === img.url ? 'border-[#9E555A] ring-2 ring-rose-200' : 'border-[#EAD5D8]'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] font-bold p-1 truncate text-center">
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Live Multi-Device Preview Column (5 Cols) */}
        <div className="lg:col-span-5 sticky top-6 space-y-4">
          
          {/* Device Toggle Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-[#EAD5D8] shadow-sm flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-[#2D2A29] px-2 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#9E555A]" />
              <span>Live Multi-Device Preview</span>
            </span>

            <div className="flex items-center gap-1 bg-[#F9F3F0] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewDevice('web')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  previewDevice === 'web' ? 'bg-white text-[#2D2A29] shadow-sm' : 'text-[#6A605E]'
                }`}
                title="Website View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">Web</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewDevice('customer-app')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  previewDevice === 'customer-app' ? 'bg-white text-[#2D2A29] shadow-sm' : 'text-[#6A605E]'
                }`}
                title="Customer Mobile App"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">Client App</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewDevice('owner-app')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  previewDevice === 'owner-app' ? 'bg-white text-[#2D2A29] shadow-sm' : 'text-[#6A605E]'
                }`}
                title="Salon Owner Mobile App"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">Owner App</span>
              </button>
            </div>
          </div>

          {/* PREVIEW 1: Website Header & Hero Snippet */}
          {previewDevice === 'web' && (
            <div 
              className="rounded-3xl border border-[#EAD5D8] shadow-xl overflow-hidden animate-fadeIn"
              style={{ backgroundColor }}
            >
              {/* Mock Browser Titlebar */}
              <div className="bg-[#2D2A29] px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <span className="text-[10px] text-white/50 font-mono truncate ml-2">
                  https://{logoText.toLowerCase().replace(/\s+/g, '')}.com
                </span>
              </div>

              {/* Mock Web Navbar */}
              <div className="px-5 py-4 border-b border-[#EAD5D8]/60 bg-white/90 backdrop-blur flex items-center justify-between">
                <BrandLogo settings={draftSettings} size="sm" />
                <div className="flex items-center gap-2">
                  <span 
                    className="px-3 py-1.5 text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5"
                    style={{ 
                      backgroundColor: primaryColor,
                      borderRadius: borderRadius === 'sm' ? '0.25rem' : borderRadius === 'lg' ? '0.5rem' : borderRadius === '2xl' ? '0.75rem' : '9999px'
                    }}
                  >
                    <Calendar className="w-3 h-3" /> Book
                  </span>
                </div>
              </div>

              {/* Mock Web Hero */}
              <div className="p-6 space-y-4">
                <div 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{heroEyebrow}</span>
                </div>

                <h1 
                  className="text-2xl font-bold leading-tight"
                  style={{ color: textColor }}
                >
                  {tagline}
                </h1>

                <p className="text-xs text-[#6A605E] leading-relaxed line-clamp-3">
                  {subheading}
                </p>

                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-[#EAD5D8] shadow-sm relative">
                  <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-bold drop-shadow">Artisanal Sanctuary</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW 2: Mobile Customer App */}
          {previewDevice === 'customer-app' && (
            <div className="max-w-[320px] mx-auto rounded-[38px] border-[6px] border-[#2D2A29] shadow-2xl overflow-hidden bg-white animate-fadeIn">
              {/* Phone Notch */}
              <div className="bg-[#2D2A29] h-5 flex items-center justify-center">
                <div className="w-20 h-3 bg-black rounded-b-xl" />
              </div>

              {/* Customer App Splash / Header */}
              <div className="px-4 py-3 border-b border-[#EAD5D8] flex items-center justify-between bg-white">
                <BrandLogo settings={draftSettings} size="sm" />
                <span 
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Body Showcase */}
              <div className="p-4 space-y-4 bg-[#FDF9F8] min-h-[380px]">
                <div className="relative h-28 rounded-2xl overflow-hidden shadow-sm">
                  <img src={heroImage} className="w-full h-full object-cover" alt="Phone hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-col justify-end text-white">
                    <span className="text-[9px] uppercase tracking-wider text-rose-200">Welcome to</span>
                    <h5 className="font-serif font-bold text-sm">{logoText}</h5>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-white rounded-2xl border border-[#EAD5D8] shadow-xs">
                    <div 
                      className="w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                    >
                      <Scissors className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#2D2A29]">Services</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#EAD5D8] shadow-xs">
                    <div 
                      className="w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#2D2A29]">Bookings</span>
                  </div>
                </div>

                <div 
                  className="p-3 rounded-2xl text-white text-center font-bold text-xs shadow-md"
                  style={{ 
                    backgroundColor: primaryColor,
                    borderRadius: borderRadius === 'sm' ? '0.375rem' : borderRadius === 'lg' ? '0.5rem' : borderRadius === '2xl' ? '0.75rem' : '9999px'
                  }}
                >
                  Book Appointment
                </div>
              </div>

              {/* Phone home indicator */}
              <div className="bg-white py-2 flex justify-center">
                <div className="w-24 h-1 bg-black/20 rounded-full" />
              </div>
            </div>
          )}

          {/* PREVIEW 3: Mobile Owner App */}
          {previewDevice === 'owner-app' && (
            <div className="max-w-[320px] mx-auto rounded-[38px] border-[6px] border-[#2D2A29] shadow-2xl overflow-hidden bg-white animate-fadeIn">
              {/* Phone Notch */}
              <div className="bg-[#2D2A29] h-5 flex items-center justify-center">
                <div className="w-20 h-3 bg-black rounded-b-xl" />
              </div>

              {/* Owner App Header */}
              <div className="px-4 py-3 border-b border-[#EAD5D8] flex items-center justify-between bg-white">
                <BrandLogo settings={draftSettings} size="sm" />
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Owner
                </span>
              </div>

              {/* Owner Metrics Preview */}
              <div className="p-4 space-y-3 bg-[#FDF9F8] min-h-[380px]">
                <div 
                  className="p-4 rounded-2xl text-white space-y-1 shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">Confirmed Appointments</span>
                  <div className="text-2xl font-serif font-bold">14 Today</div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-[#EAD5D8] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2D2A29]">
                    <span>Victoria Sinclair</span>
                    <span className="text-[10px]" style={{ color: primaryColor }}>10:00 AM</span>
                  </div>
                  <div className="text-[11px] text-[#6A605E]">Signature Balayage & Gloss • $240</div>
                  <div className="flex gap-2 pt-1">
                    <span 
                      className="flex-1 py-1 text-center text-white text-[10px] font-bold shadow-xs"
                      style={{ 
                        backgroundColor: primaryColor,
                        borderRadius: borderRadius === 'sm' ? '0.25rem' : borderRadius === 'lg' ? '0.375rem' : '9999px'
                      }}
                    >
                      Confirm
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone home indicator */}
              <div className="bg-white py-2 flex justify-center">
                <div className="w-24 h-1 bg-black/20 rounded-full" />
              </div>
            </div>
          )}

          {/* Quick Info Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAD5D8] flex items-start gap-3 text-xs text-[#6A605E]">
            <Info className="w-4 h-4 text-[#9E555A] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Website + App Parity Guarantee:</strong> When you hit <strong>Save & Publish</strong>, your logo, wordmark, and theme colors sync to Firestore and the local Express storage so your website and mobile apps match seamlessly.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
