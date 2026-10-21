export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'skin' | 'beauty' | 'bridal';
  description: string;
  price: number;
  durationMinutes: number;
  image: string;
  popular?: boolean;
}

export interface SalonConfig {
  name: string;
  tagline: string;
  subheading: string;
  heroEyebrow?: string;
  heroImage?: string;
  logoText: string;
  logoSubtitle?: string;
  logoImage?: string;
  logoIcon?: 'monogram' | 'sparkles' | 'scissors' | 'crown' | 'gem' | 'flower' | 'heart' | 'star';
  phone: string;
  displayPhone: string;
  whatsappNumber: string; // e.g. "15550198234" (numeric for whatsapp link)
  whatsappDefaultMessage: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  googleMapsUrl: string;
  googleBusinessProfileUrl: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  closedDays: string[];
  theme: {
    primaryColor: string;
    secondaryColor?: string;
    accentColor: string;
    backgroundColor: string;
    textColor?: string;
    fontHeading?: 'serif' | 'sans' | 'playfair' | 'editorial';
    borderRadius?: 'full' | '2xl' | 'lg' | 'sm';
    themePreset?: string;
  };
  services: ServiceItem[];
  gallery: {
    id: string;
    title: string;
    category: string;
    image: string;
  }[];
  testimonials: {
    id: string;
    name: string;
    service: string;
    comment: string;
    rating: number;
    date: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const salonConfig: SalonConfig = {
  name: "Bella Rose Luxury Salon & Spa",
  tagline: "Where Elegance Meets Artisanal Beauty",
  subheading: "Indulge in bespoke hair couture, rejuvenating skin treatments, and exquisite bridal styling crafted by master artisans.",
  heroEyebrow: "Beverly Hills Premier Beauty Destination",
  heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
  logoText: "Bella Rose",
  logoSubtitle: "Luxury Salon & Spa",
  logoImage: "",
  logoIcon: "monogram",
  phone: "+1 (555) 382-9400",
  displayPhone: "+1 (555) 382-9400",
  whatsappNumber: "15553829400",
  whatsappDefaultMessage: "Hello Bella Rose Salon, I would like to inquire about booking an appointment or check availability.",
  email: "concierge@bellarosesalon.com",
  address: {
    street: "482 Grand Avenue, Suite 100",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    full: "482 Grand Avenue, Suite 100, Beverly Hills, CA 90210"
  },
  googleMapsUrl: "https://maps.google.com/?q=482+Grand+Avenue+Beverly+Hills+CA",
  googleBusinessProfileUrl: "https://business.google.com",
  hours: {
    monday: "9:00 AM – 7:00 PM",
    tuesday: "9:00 AM – 7:00 PM",
    wednesday: "9:00 AM – 7:00 PM",
    thursday: "9:00 AM – 8:00 PM",
    friday: "9:00 AM – 8:00 PM",
    saturday: "8:30 AM – 6:30 PM",
    sunday: "10:00 AM – 5:00 PM"
  },
  closedDays: ["Major Holidays"],
  theme: {
    primaryColor: "#9E555A", // Elegant Rosewood Pink
    secondaryColor: "#854549", // Deep Rosewood
    accentColor: "#F4EBE1", // Soft Warm Ivory
    backgroundColor: "#FCF9F6", // Warm Cream
    textColor: "#2D2A29", // Espresso Charcoal
    fontHeading: "serif",
    borderRadius: "full",
    themePreset: "rose-gold"
  },
  services: [
    {
      id: "h1",
      name: "Signature Balayage & Gloss",
      category: "hair",
      description: "Custom hand-painted dimensional highlights paired with a gloss treatment and signature blowout for seamless radiance.",
      price: 240,
      durationMinutes: 180,
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "h2",
      name: "Precision Cut & Styling",
      category: "hair",
      description: "Consultation, precision haircut tailored to your bone structure, relaxing wash, and professional blow-dry finish.",
      price: 95,
      durationMinutes: 60,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "h3",
      name: "Keratin Smoothing Infusion",
      category: "hair",
      description: "Advanced frizz-free treatment that repairs damaged cuticles and infuses intense moisture and mirror-like shine.",
      price: 280,
      durationMinutes: 150,
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "s1",
      name: "24K Gold Radiance Facial",
      category: "skin",
      description: "Opulent anti-aging facial incorporating pure gold micro-particles, deep enzyme exfoliation, and lymphatic drainage massage.",
      price: 185,
      durationMinutes: 75,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "s2",
      name: "Hydra-Infusion Botanical Peel",
      category: "skin",
      description: "Deep cleansing hydro-dermabrasion paired with custom botanical serums to restore hydration, clarity, and dewy glow.",
      price: 150,
      durationMinutes: 60,
      image: "https://images.unsplash.com/photo-1512290900722-9a70f8a22105?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "b1",
      name: "Luxury Gel Manicure & Pedicure",
      category: "beauty",
      description: "Meticulous nail shaping, cuticle care, relaxing hand and foot massage, finished with long-wearing strengthening gel polish.",
      price: 110,
      durationMinutes: 90,
      image: "https://images.unsplash.com/photo-1632345031435-877ff6c2ae8d?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "b2",
      name: "Lash Lift & Keratin Tint",
      category: "beauty",
      description: "Semi-permanent lift and dark tint for natural eyelashes to create an open-eyed, mascara-free flutter lasting 6-8 weeks.",
      price: 125,
      durationMinutes: 60,
      image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "br1",
      name: "Bridal Hair & Makeup Preview",
      category: "bridal",
      description: "Comprehensive 2-hour trial consultation with our lead bridal artist to design your flawless wedding day look.",
      price: 250,
      durationMinutes: 120,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "br2",
      name: "Wedding Day VIP Bridal Glamour",
      category: "bridal",
      description: "Airbrush makeup application, premium faux mink lashes, veil securing, and long-lasting luxury bridal hairstyling on site or in-salon.",
      price: 450,
      durationMinutes: 180,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
    }
  ],
  gallery: [
    {
      id: "g1",
      title: "Main Styling Lounge",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g2",
      title: "Bridal Suite Elegance",
      category: "Bridal",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g3",
      title: "Balayage Masterpiece",
      category: "Hair",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g4",
      title: "Tranquil Spa Room",
      category: "Skin & Spa",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g5",
      title: "Precision Nail Care",
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1632345031435-877ff6c2ae8d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g6",
      title: "Reception & Boutique",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Victoria Sinclair",
      service: "Signature Balayage",
      comment: "Bella Rose is absolute perfection. The atmosphere is serene and luxurious, and my colorist understood exactly what I wanted. Best balayage in Beverly Hills!",
      rating: 5,
      date: "October 2026"
    },
    {
      id: "t2",
      name: "Sophia Kensington",
      service: "Bridal Hair & Makeup",
      comment: "They handled my wedding party of 7 flawlessly. Everyone looked breathtaking and our makeup lasted all through the night and dancing. Truly five-star service.",
      rating: 5,
      date: "September 2026"
    },
    {
      id: "t3",
      name: "Elena Rostova",
      service: "24K Gold Facial",
      comment: "My skin was glowing for days after. The facial massage was so relaxing I almost fell asleep. The team here is exceptionally professional.",
      rating: 5,
      date: "October 2026"
    }
  ],
  faqs: [
    {
      question: "How do I book an appointment?",
      answer: "You can easily select your desired service, date, and preferred time slot through our online booking form or message our concierge directly via WhatsApp. All requests receive a confirmation notification from our front desk."
    },
    {
      question: "What is your cancellation and rescheduling policy?",
      answer: "We kindly request at least 24 hours notice for any cancellations or rescheduling to avoid a 50% service fee. You can reschedule easily by contacting us via phone or WhatsApp."
    },
    {
      question: "Do you offer bridal party consultations and group bookings?",
      answer: "Yes! We specialize in bespoke bridal parties and full salon buyouts. Please contact our bridal coordinator directly via WhatsApp or phone to customize your wedding morning experience."
    },
    {
      question: "What parking options are available?",
      answer: "Complimentary valet parking is available directly in front of our salon on Grand Avenue for all scheduled guests."
    }
  ]
};
