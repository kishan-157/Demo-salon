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

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Check if user is in admins collection
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists() || user.email === 'ladanikishan8@gmail.com') {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      } else {
        setIsAdminLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Services
  useEffect(() => {
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
  }, []);

  // Sync Bookings (Admin only for full list)
  useEffect(() => {
    if (!isAdminLoggedIn) {
      setBookings([]);
      return;
    }
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingRequest));
      setBookings(bookingsData);
    }, (error) => {
      console.error("Bookings snapshot error:", error);
      if (error.code === 'permission-denied') {
        setBookings([]);
      }
    });
    return () => unsubscribe();
  }, [isAdminLoggedIn]);

  // Sync Settings
  useEffect(() => {
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
  }, []);

  const loginAdmin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // FOR DEMO: Automatically add the first user as an admin if the collection is empty
      const adminsSnap = await getDocs(query(collection(db, 'admins'), limit(1)));
      if (adminsSnap.empty) {
        await setDoc(doc(db, 'admins', user.uid), { email: user.email, name: user.displayName });
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
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logoutAdmin = async () => {
    await signOut(auth);
  };

  const createBooking = async (data: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>): Promise<string> => {
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
    await updateDoc(doc(db, 'bookings', id), { 
      status,
      updatedAt: serverTimestamp()
    });
  };

  const deleteBooking = async (id: string) => {
    await deleteDoc(doc(db, 'bookings', id));
  };

  const addService = async (serviceData: Omit<ServiceItem, 'id'>) => {
    const serviceId = Math.random().toString(36).substring(2, 11);
    await setDoc(doc(db, 'services', serviceId), { ...serviceData, id: serviceId });
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>) => {
    await updateDoc(doc(db, 'services', id), updated);
  };

  const deleteService = async (id: string) => {
    await deleteDoc(doc(db, 'services', id));
  };

  const updateSettings = async (updated: Partial<SalonConfig>) => {
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
