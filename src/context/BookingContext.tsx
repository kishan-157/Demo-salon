import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  where,
  limit
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInAnonymously,
  GoogleAuthProvider, 
  signOut,
  User
} from 'firebase/auth';
import { salonConfig, ServiceItem, SalonConfig } from '../config/salonConfig';

export interface BookingRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  createdAt: any;
}

interface BookingContextType {
  bookings: BookingRequest[];
  createBooking: (booking: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'rejected' | 'cancelled') => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, updated: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  settings: SalonConfig;
  updateSettings: (updated: Partial<SalonConfig>) => Promise<void>;

  currentUser: User | null;
  isAdminLoggedIn: boolean;
  loginAdmin: () => Promise<boolean>;
  loginAsDemo: () => Promise<{ success: boolean; error?: string }>;
  loginWithCredentials: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;

  selectedServiceForBooking: ServiceItem | null;
  setSelectedServiceForBooking: (service: ServiceItem | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (isOpen: boolean) => void;
  isOwnerViewOpen: boolean;
  setIsOwnerViewOpen: (isOpen: boolean) => void;
  
  getWhatsAppUrl: (booking?: { serviceName: string; date: string; timeSlot: string; clientName: string }) => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [settings, setSettings] = useState<SalonConfig>(salonConfig);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOwnerViewOpen, setIsOwnerViewOpen] = useState(false);
  const [useLocalApi, setUseLocalApi] = useState(false);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer demo-owner-token'
  });

  // Initialize Auth & Session
  useEffect(() => {
    const saved = localStorage.getItem('salon_admin_session');
    if (saved === 'demo') {
      setUseLocalApi(true);
      setIsAdminLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setUseLocalApi(false);
        // Check if user is in admins collection
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          if (adminDoc.exists() || user.email === 'ladanikishan8@gmail.com') {
            setIsAdminLoggedIn(true);
          } else if (localStorage.getItem('salon_admin_session') !== 'demo') {
            setIsAdminLoggedIn(false);
          }
        } catch (err) {
          if (localStorage.getItem('salon_admin_session') === 'demo') {
            setIsAdminLoggedIn(true);
          } else {
            setIsAdminLoggedIn(false);
          }
        }
      } else {
        if (localStorage.getItem('salon_admin_session') === 'demo') {
          setIsAdminLoggedIn(true);
          setUseLocalApi(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Services
  useEffect(() => {
    if (useLocalApi) {
      fetch('/api/services').then(res => res.json()).then(setServices).catch(console.error);
      return;
    }
    const q = query(collection(db, 'services'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const servicesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceItem));
      if (servicesData.length > 0) {
        setServices(servicesData);
      } else if (isAdminLoggedIn) {
        // Seed initial services if empty and admin is logged in
        salonConfig.services.forEach(async (s) => {
          await setDoc(doc(db, 'services', s.id), s).catch(e => console.error("Error seeding services:", e));
        });
      }
    }, (error) => {
      console.error("Services snapshot error:", error);
    });
    return () => unsubscribe();
  }, [useLocalApi, isAdminLoggedIn]);

  // Sync Bookings (Admin only for full list)
  useEffect(() => {
    if (!isAdminLoggedIn) {
      setBookings([]);
      return;
    }
    if (useLocalApi) {
      fetch('/api/bookings', { headers: getHeaders() })
        .then(res => res.json())
        .then(setBookings)
        .catch(console.error);
      return;
    }
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingRequest));
      setBookings(bookingsData);
      
      if (bookingsData.length === 0 && isAdminLoggedIn) {
        // Seed sample bookings if empty
        const sampleBookings = [
          {
            id: 'sample-1',
            serviceId: 'h1',
            serviceName: 'Signature Balayage & Gloss',
            clientName: 'Victoria Sinclair',
            clientPhone: 'demo',
            clientEmail: 'victoria@example.com',
            date: new Date().toISOString().split('T')[0],
            timeSlot: '10:00',
            status: 'confirmed',
            price: 240,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          },
          {
            id: 'sample-2',
            serviceId: 's1',
            serviceName: '24K Gold Radiance Facial',
            clientName: 'Amanda Vance',
            clientPhone: '5550123',
            clientEmail: 'amanda@example.com',
            date: new Date().toISOString().split('T')[0],
            timeSlot: '14:00',
            status: 'pending',
            price: 185,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }
        ];
        sampleBookings.forEach(async (b) => {
          await setDoc(doc(db, 'bookings', b.id), b).catch(e => console.error("Error seeding bookings:", e));
        });
      }
    }, (error) => {
      console.error("Bookings snapshot error:", error);
      if (error.code === 'permission-denied') {
        setBookings([]);
      }
    });
    return () => unsubscribe();
  }, [isAdminLoggedIn, useLocalApi]);

  // Sync Settings
  useEffect(() => {
    if (useLocalApi) {
      fetch('/api/salon').then(res => res.json()).then(setSettings).catch(console.error);
      return;
    }
    const unsubscribe = onSnapshot(doc(db, 'settings', 'salon'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...salonConfig, ...docSnap.data() as any });
      } else if (isAdminLoggedIn) {
        // Seed initial settings if empty and admin is logged in
        const { services, testimonials, gallery, ...rest } = salonConfig;
        setDoc(doc(db, 'settings', 'salon'), rest).catch(e => console.error("Error seeding settings:", e));
      }
    }, (error) => {
      console.error("Settings snapshot error:", error);
    });
    return () => unsubscribe();
  }, [useLocalApi, isAdminLoggedIn]);

  const loginAdmin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const adminsSnap = await getDocs(query(collection(db, 'admins'), limit(1)));
      if (adminsSnap.empty) {
        await setDoc(doc(db, 'admins', user.uid), { 
          email: user.email || 'demo@example.com', 
          name: user.displayName || 'Demo Admin',
          isDemo: true,
          createdAt: serverTimestamp()
        });
        setIsAdminLoggedIn(true);
        return true;
      }

      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (adminDoc.exists()) {
        setIsAdminLoggedIn(true);
        return true;
      } else {
        alert('Unauthorized: You are not registered as an admin for this salon.');
        await signOut(auth);
        return false;
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        return false;
      }
      // Only log unexpected errors
      console.error("Firebase Login Error:", err.code, err.message);
      alert('Login failed: ' + (err.message || 'Unknown error'));
      return false;
    }
  };

  const loginAsDemo = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      localStorage.setItem('salon_admin_session', 'demo');
      setUseLocalApi(true);
      setIsAdminLoggedIn(true);
      return { success: true };
    } catch (err: any) {
      localStorage.setItem('salon_admin_session', 'demo');
      setUseLocalApi(true);
      setIsAdminLoggedIn(true);
      return { success: true };
    }
  };

  const loginWithCredentials = async (username: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    if (!username || username.trim().length === 0) {
      return { success: false, error: 'Please enter a valid Login ID' };
    }
    localStorage.setItem('salon_admin_session', 'demo');
    setUseLocalApi(true);
    setIsAdminLoggedIn(true);
    return { success: true };
  };

  const logoutAdmin = async () => {
    localStorage.removeItem('salon_admin_session');
    setUseLocalApi(false);
    setIsAdminLoggedIn(false);
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
  };

  const createBooking = async (data: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>): Promise<string> => {
    if (useLocalApi) {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      const result = await res.json();
      setBookings(prev => [result, ...prev]);
      return result.id;
    }
    const bookingId = Math.random().toString(36).substring(2, 15);
    const newBooking = {
      ...data,
      id: bookingId,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(db, 'bookings', bookingId), newBooking);
    return bookingId;
  };

  const updateBookingStatus = async (id: string, status: 'pending' | 'confirmed' | 'rejected' | 'cancelled') => {
    if (useLocalApi) {
      await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status })
      });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      return;
    }
    await updateDoc(doc(db, 'bookings', id), { 
      status,
      updatedAt: serverTimestamp()
    });
  };

  const deleteBooking = async (id: string) => {
    if (useLocalApi) {
      // API doesn't have delete, let's just update to cancelled
      await updateBookingStatus(id, 'cancelled');
      return;
    }
    await deleteDoc(doc(db, 'bookings', id));
  };

  const addService = async (serviceData: Omit<ServiceItem, 'id'>) => {
    if (useLocalApi) {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(serviceData)
      });
      const result = await res.json();
      setServices(prev => [...prev, result]);
      return;
    }
    const serviceId = Math.random().toString(36).substring(2, 11);
    await setDoc(doc(db, 'services', serviceId), { ...serviceData, id: serviceId });
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>) => {
    if (useLocalApi) {
      await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updated)
      });
      setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
      return;
    }
    await updateDoc(doc(db, 'services', id), updated);
  };

  const deleteService = async (id: string) => {
    if (useLocalApi) {
      await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      setServices(prev => prev.filter(s => s.id !== id));
      return;
    }
    await deleteDoc(doc(db, 'services', id));
  };

  const updateSettings = async (updated: Partial<SalonConfig>) => {
    if (useLocalApi) {
      await fetch('/api/salon', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updated)
      });
      setSettings(prev => ({ ...prev, ...updated }));
      return;
    }
    await updateDoc(doc(db, 'settings', 'salon'), updated);
  };

  const getWhatsAppUrl = (customData?: { serviceName: string; date: string; timeSlot: string; clientName: string }) => {
    let msg = settings.whatsappDefaultMessage;
    if (customData) {
      msg = `Hello ${settings.name}, I would like to inquire about booking/confirming *${customData.serviceName}* on *${customData.date}* at *${customData.timeSlot}*. My name is ${customData.clientName}.`;
    }
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${settings.whatsappNumber}?text=${encoded}`;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        createBooking,
        updateBookingStatus,
        deleteBooking,
        services,
        addService,
        updateService,
        deleteService,
        settings,
        updateSettings,
        currentUser,
        isAdminLoggedIn,
        loginAdmin,
        loginAsDemo,
        loginWithCredentials,
        logoutAdmin,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isOwnerViewOpen,
        setIsOwnerViewOpen,
        getWhatsAppUrl,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
