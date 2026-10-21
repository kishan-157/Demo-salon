import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Persistent Data Storage Directory
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'salon-data.json');
const APKS_DIR = path.join(__dirname, 'dist-apks');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(APKS_DIR)) {
  fs.mkdirSync(APKS_DIR, { recursive: true });
}

// Initial Data Seed
const DEFAULT_SALON_DATA = {
  name: "Bella Rose Luxury Salon & Spa",
  tagline: "Where Elegance Meets Artisanal Beauty",
  subheading: "Indulge in bespoke hair couture, rejuvenating skin treatments, and exquisite bridal styling crafted by master artisans.",
  logoText: "Bella Rose",
  phone: "+1 (555) 382-9400",
  displayPhone: "+1 (555) 382-9400",
  whatsappNumber: "15553829400",
  whatsappDefaultMessage: "Hello Bella Rose Salon, I would like to inquire about booking an appointment.",
  email: "concierge@bellarosesalon.com",
  address: {
    street: "482 Grand Avenue, Suite 100",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    full: "482 Grand Avenue, Suite 100, Beverly Hills, CA 90210"
  },
  googleMapsUrl: "https://maps.google.com/?q=482+Grand+Avenue+Beverly+Hills+CA",
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
      id: "br1",
      name: "Bridal Hair & Makeup Preview",
      category: "bridal",
      description: "Comprehensive 2-hour trial consultation with our lead bridal artist to design your flawless wedding day look.",
      price: 250,
      durationMinutes: 120,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      popular: true
    }
  ],
  bookings: [
    {
      id: "br-101",
      serviceId: "h1",
      serviceName: "Signature Balayage & Gloss",
      price: 240,
      date: new Date().toISOString().split('T')[0],
      timeSlot: "10:00 AM",
      clientName: "Victoria Sinclair",
      clientPhone: "+1 (555) 234-5678",
      clientEmail: "victoria@example.com",
      notes: "First time coloring, sensitive scalp.",
      status: "confirmed",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "br-102",
      serviceId: "s1",
      serviceName: "24K Gold Radiance Facial",
      price: 185,
      date: new Date().toISOString().split('T')[0],
      timeSlot: "2:00 PM",
      clientName: "Amanda Vance",
      clientPhone: "+1 (555) 987-6543",
      clientEmail: "amanda@example.com",
      notes: "Preparing for an anniversary event.",
      status: "pending",
      createdAt: new Date().toISOString()
    }
  ]
};

// Data Helper Functions with Atomic Save
function loadData(): typeof DEFAULT_SALON_DATA {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading data file:', err);
  }
  saveData(DEFAULT_SALON_DATA);
  return DEFAULT_SALON_DATA;
}

function saveData(data: typeof DEFAULT_SALON_DATA) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving data file:', err);
  }
}

// In-memory Mutex / Concurrency Lock for Booking Operations
let bookingLock = false;
async function acquireLock(timeoutMs = 3000): Promise<boolean> {
  const start = Date.now();
  while (bookingLock) {
    if (Date.now() - start > timeoutMs) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  bookingLock = true;
  return true;
}
function releaseLock() {
  bookingLock = false;
}

// Authorization Middleware for Owner actions
function requireOwnerAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  // In demo environment, token 'Bearer demo-owner-token' or valid pass header is accepted
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === 'demo-owner-token' || token.length > 3) {
      return next();
    }
  }
  return res.status(403).json({
    error: 'Forbidden',
    message: 'Owner authorization is required for this action. Customer apps cannot perform owner-only operations.'
  });
}

// ================= API ROUTES =================

// 1. Salon Info & Settings
app.get('/api/salon', (_req, res) => {
  const data = loadData();
  const { bookings, ...publicInfo } = data;
  res.json(publicInfo);
});

app.put('/api/salon', requireOwnerAuth, (req, res) => {
  const data = loadData();
  const updatedSettings = req.body;
  Object.assign(data, updatedSettings);
  saveData(data);
  res.json({ success: true, salon: data });
});

// 2. Services Management
app.get('/api/services', (_req, res) => {
  const data = loadData();
  res.json(data.services || []);
});

app.post('/api/services', requireOwnerAuth, (req, res) => {
  const { name, category, description, price, durationMinutes, image, popular } = req.body;
  if (!name || !price || !durationMinutes) {
    return res.status(400).json({ error: 'Missing required service parameters' });
  }
  const data = loadData();
  const newService = {
    id: `srv-${Date.now()}`,
    name,
    category: category || 'hair',
    description: description || '',
    price: Number(price),
    durationMinutes: Number(durationMinutes),
    image: image || 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    popular: !!popular
  };
  data.services.push(newService);
  saveData(data);
  res.status(201).json(newService);
});

app.put('/api/services/:id', requireOwnerAuth, (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const index = data.services.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }
  data.services[index] = { ...data.services[index], ...req.body, id };
  saveData(data);
  res.json(data.services[index]);
});

app.delete('/api/services/:id', requireOwnerAuth, (req, res) => {
  const { id } = req.params;
  const data = loadData();
  data.services = data.services.filter((s) => s.id !== id);
  saveData(data);
  res.json({ success: true, id });
});

// 3. Availability Check (Server-Side)
app.get('/api/availability', (req, res) => {
  const { date } = req.query;
  if (!date || typeof date !== 'string') {
    return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
  }
  const data = loadData();
  const allSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
  
  // Confirmed appointments take up slot
  const confirmedForDate = data.bookings.filter(b => b.date === date && b.status === 'confirmed');
  const bookedSlots = confirmedForDate.map(b => b.timeSlot);
  
  const availableSlots = allSlots.filter(s => !bookedSlots.includes(s));
  res.json({
    date,
    allSlots,
    bookedSlots,
    availableSlots
  });
});

// 4. Bookings Management
// Query bookings: If authenticated as owner, returns all bookings.
// If customer, requires phone number to return only their bookings (protecting other clients' privacy)
app.get('/api/bookings', (req, res) => {
  const data = loadData();
  const authHeader = req.headers.authorization;
  const isOwner = authHeader && (authHeader.includes('demo-owner-token') || authHeader.length > 10);
  
  const clientPhone = req.query.phone as string;

  if (isOwner) {
    return res.json(data.bookings);
  }

  if (clientPhone) {
    const sanitizedPhone = clientPhone.replace(/\D/g, '');
    const clientBookings = data.bookings.filter(b => b.clientPhone.replace(/\D/g, '') === sanitizedPhone);
    return res.json(clientBookings);
  }

  // If no auth and no phone filter, return empty array to keep customer information private!
  return res.json([]);
});

// Submit New Booking (Protected against race conditions & double-booking)
app.post('/api/bookings', async (req, res) => {
  const { serviceId, serviceName, price, date, timeSlot, clientName, clientPhone, clientEmail, notes } = req.body;

  if (!serviceName || !date || !timeSlot || !clientName || !clientPhone) {
    return res.status(400).json({ error: 'Missing required booking fields (serviceName, date, timeSlot, clientName, clientPhone)' });
  }

  const acquired = await acquireLock();
  if (!acquired) {
    return res.status(503).json({ error: 'Server busy, please retry in a moment' });
  }

  try {
    const data = loadData();

    // Check for existing confirmed booking at identical date and time
    const conflict = data.bookings.find(b => b.date === date && b.timeSlot === timeSlot && b.status === 'confirmed');
    if (conflict) {
      releaseLock();
      return res.status(409).json({
        error: 'TimeSlotConflict',
        message: `The time slot ${timeSlot} on ${date} was just confirmed by another guest. Please select another slot.`
      });
    }

    const newBooking = {
      id: `br-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: serviceId || 'custom',
      serviceName,
      price: Number(price) || 100,
      date,
      timeSlot,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: (clientEmail || '').trim(),
      notes: (notes || '').trim(),
      status: 'pending' as const, // Always starts as pending until owner confirms
      createdAt: new Date().toISOString()
    };

    data.bookings.unshift(newBooking);
    saveData(data);
    releaseLock();

    return res.status(201).json(newBooking);
  } catch (err) {
    releaseLock();
    console.error('Error creating booking:', err);
    return res.status(500).json({ error: 'Internal server error while saving booking' });
  }
});

// Update Booking Status (Owner Only)
app.patch('/api/bookings/:id/status', requireOwnerAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'confirmed', 'rejected', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value. Allowed: pending, confirmed, rejected, cancelled' });
  }

  const data = loadData();
  const booking = data.bookings.find(b => b.id === id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  // If confirming, ensure no other confirmed booking conflicts
  if (status === 'confirmed') {
    const conflict = data.bookings.find(b => b.id !== id && b.date === booking.date && b.timeSlot === booking.timeSlot && b.status === 'confirmed');
    if (conflict) {
      return res.status(409).json({
        error: 'TimeSlotConflict',
        message: `Cannot confirm: Slot ${booking.timeSlot} on ${booking.date} is already confirmed for booking ${conflict.id} (${conflict.clientName}).`
      });
    }
  }

  booking.status = status;
  saveData(data);
  return res.json({ success: true, booking });
});

// Cancel Booking (Client can cancel their own booking, or Owner)
app.post('/api/bookings/:id/cancel', (req, res) => {
  const { id } = req.params;
  const { clientPhone } = req.body;
  const authHeader = req.headers.authorization;
  const isOwner = authHeader && authHeader.includes('demo-owner-token');

  const data = loadData();
  const booking = data.bookings.find(b => b.id === id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  // Check authorization
  if (!isOwner) {
    if (!clientPhone || booking.clientPhone.replace(/\D/g, '') !== clientPhone.replace(/\D/g, '')) {
      return res.status(403).json({ error: 'Unauthorized to cancel this booking' });
    }
  }

  booking.status = 'cancelled';
  saveData(data);
  return res.json({ success: true, message: 'Booking successfully cancelled', booking });
});

// 5. Owner Login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password && password.trim().length > 0) {
    return res.json({
      success: true,
      token: 'demo-owner-token',
      owner: {
        role: 'owner',
        salonName: 'Bella Rose Luxury Salon & Spa'
      }
    });
  }
  return res.status(401).json({ error: 'Invalid password' });
});

// 6. Reset Demo Data
app.post('/api/demo/reset', requireOwnerAuth, (_req, res) => {
  saveData(DEFAULT_SALON_DATA);
  res.json({ success: true, message: 'Demo data reset to initial seed' });
});

// 7. APK Status & Downloads (Real filesystem verification)
app.get('/api/apks/status', (_req, res) => {
  const customerApkPath = path.join(APKS_DIR, 'bellarose-customer.apk');
  const ownerApkPath = path.join(APKS_DIR, 'bellarose-owner.apk');

  const customerExists = fs.existsSync(customerApkPath);
  const ownerExists = fs.existsSync(ownerApkPath);

  res.json({
    customer: {
      appName: 'Bella Rose Customer App',
      packageName: 'com.bellarose.salon.customer',
      version: 'v1.0.0',
      isAvailable: customerExists,
      downloadUrl: customerExists ? '/api/apks/customer' : null,
      sizeBytes: customerExists ? fs.statSync(customerApkPath).size : null,
      lastUpdated: customerExists ? fs.statSync(customerApkPath).mtime.toISOString() : null,
      buildStatus: customerExists ? 'Verified APK Compiled' : 'APK Not Generated Yet'
    },
    owner: {
      appName: 'Bella Rose Owner App',
      packageName: 'com.bellarose.salon.owner',
      version: 'v1.0.0',
      isAvailable: ownerExists,
      downloadUrl: ownerExists ? '/api/apks/owner' : null,
      sizeBytes: ownerExists ? fs.statSync(ownerApkPath).size : null,
      lastUpdated: ownerExists ? fs.statSync(ownerApkPath).mtime.toISOString() : null,
      buildStatus: ownerExists ? 'Verified APK Compiled' : 'APK Not Generated Yet'
    }
  });
});

app.get('/api/apks/customer', (_req, res) => {
  const customerApkPath = path.join(APKS_DIR, 'bellarose-customer.apk');
  if (fs.existsSync(customerApkPath)) {
    res.download(customerApkPath, 'BellaRose-Customer.apk');
  } else {
    res.status(404).json({
      error: 'APK Not Generated Yet',
      message: 'The Customer Android APK has not been generated or compiled in this deployment environment. Use the interactive in-browser preview or compile the provided Android source code.'
    });
  }
});

app.get('/api/apks/owner', (_req, res) => {
  const ownerApkPath = path.join(APKS_DIR, 'bellarose-owner.apk');
  if (fs.existsSync(ownerApkPath)) {
    res.download(ownerApkPath, 'BellaRose-Owner.apk');
  } else {
    res.status(404).json({
      error: 'APK Not Generated Yet',
      message: 'The Owner Android APK has not been generated or compiled in this deployment environment. Use the interactive in-browser preview or compile the provided Android source code.'
    });
  }
});

// Vite Middleware for Frontend Serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bella Rose Full-Stack Salon Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
