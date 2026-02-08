import { create } from 'zustand';
import type { 
  User, App, Testimonial, PremiumRequest, PremiumPackage, 
  PremiumVoucher, ActivityLog, ServerStats, SiteConfig, WhatsAppTemplate 
} from '@/types';

interface AdminState {
  // Data
  users: User[];
  apps: App[];
  testimonials: Testimonial[];
  premiumRequests: PremiumRequest[];
  premiumPackages: PremiumPackage[];
  vouchers: PremiumVoucher[];
  activityLogs: ActivityLog[];
  whatsappTemplates: WhatsAppTemplate[];
  serverStats: ServerStats | null;
  siteConfig: SiteConfig;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Actions - Users
  setUsers: (users: User[]) => void;
  banUser: (userId: string) => void;
  unbanUser: (userId: string) => void;
  upgradeUserToPremium: (userId: string, expiryDate: Date) => void;
  downgradeUser: (userId: string) => void;
  resetUserPassword: (userId: string, newPassword: string) => void;
  
  // Actions - Apps
  setApps: (apps: App[]) => void;
  verifyApp: (appId: string) => void;
  rejectApp: (appId: string, reason: string) => void;
  deleteApp: (appId: string) => void;
  
  // Actions - Testimonials
  approveTestimonial: (id: string) => void;
  rejectTestimonial: (id: string) => void;
  featureTestimonial: (id: string) => void;
  replyToTestimonial: (id: string, reply: string) => void;
  deleteTestimonial: (id: string) => void;
  
  // Actions - Premium
  approvePremiumRequest: (requestId: string) => void;
  rejectPremiumRequest: (requestId: string, reason: string) => void;
  createVoucher: (packageId: string) => string;
  revokeVoucher: (voucherId: string) => void;
  
  // Actions - Server
  refreshServerStats: () => Promise<void>;
  clearCache: () => void;
  
  // Actions - Config
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  
  // Actions - Logs
  clearLogs: () => void;
  
  clearError: () => void;
}

import { 
  mockUsers, mockApps, mockTestimonials, mockPremiumRequests, 
  mockPremiumPackages, mockVouchers, mockActivityLogs, mockWhatsAppTemplates 
} from '@/data/mockData';

const initialSiteConfig: SiteConfig = {
  siteName: 'AxeLux',
  siteDescription: 'Premium Android App Repository with GitHub Integration',
  maintenanceMode: false,
  allowRegistration: true,
  maxUploadSize: 500 * 1024 * 1024, // 500MB
  defaultTheme: 'system',
  cacheDuration: 3600,
  whatsappNumber: '0881010065137'
};

export const useAdminStore = create<AdminState>((set) => ({
  users: mockUsers,
  apps: mockApps,
  testimonials: mockTestimonials,
  premiumRequests: mockPremiumRequests,
  premiumPackages: mockPremiumPackages,
  vouchers: mockVouchers,
  activityLogs: mockActivityLogs,
  whatsappTemplates: mockWhatsAppTemplates,
  serverStats: null,
  siteConfig: initialSiteConfig,
  isLoading: false,
  error: null,

  // Users
  setUsers: (users: User[]) => set({ users }),
  
  banUser: (userId: string) => {
    set(state => ({
      users: state.users.map(u => 
        u.id === userId ? { ...u, isBanned: true } : u
      )
    }));
  },
  
  unbanUser: (userId: string) => {
    set(state => ({
      users: state.users.map(u => 
        u.id === userId ? { ...u, isBanned: false } : u
      )
    }));
  },
  
  upgradeUserToPremium: (userId: string, expiryDate: Date) => {
    set(state => ({
      users: state.users.map(u => 
        u.id === userId ? { ...u, isPremium: true, premiumExpiry: expiryDate } : u
      )
    }));
  },
  
  downgradeUser: (userId: string) => {
    set(state => ({
      users: state.users.map(u => 
        u.id === userId ? { ...u, isPremium: false, premiumExpiry: undefined } : u
      )
    }));
  },
  
  resetUserPassword: (userId: string, newPassword: string) => {
    console.log(`Reset password for user ${userId} to ${newPassword}`);
  },

  // Apps
  setApps: (apps: App[]) => set({ apps }),
  
  verifyApp: (appId: string) => {
    set(state => ({
      apps: state.apps.map(a => 
        a.id === appId ? { ...a, isVerified: true } : a
      )
    }));
  },
  
  rejectApp: (appId: string, reason: string) => {
    console.log(`App ${appId} rejected: ${reason}`);
  },
  
  deleteApp: (appId: string) => {
    set(state => ({
      apps: state.apps.filter(a => a.id !== appId)
    }));
  },

  // Testimonials
  approveTestimonial: (id: string) => {
    set(state => ({
      testimonials: state.testimonials.map(t => 
        t.id === id ? { ...t, isApproved: true } : t
      )
    }));
  },
  
  rejectTestimonial: (id: string) => {
    set(state => ({
      testimonials: state.testimonials.filter(t => t.id !== id)
    }));
  },
  
  featureTestimonial: (id: string) => {
    set(state => ({
      testimonials: state.testimonials.map(t => 
        t.id === id ? { ...t, isFeatured: !t.isFeatured } : t
      )
    }));
  },
  
  replyToTestimonial: (id: string, reply: string) => {
    set(state => ({
      testimonials: state.testimonials.map(t => 
        t.id === id ? { 
          ...t, 
          adminReply: reply, 
          adminReplyAt: new Date() 
        } : t
      )
    }));
  },
  
  deleteTestimonial: (id: string) => {
    set(state => ({
      testimonials: state.testimonials.filter(t => t.id !== id)
    }));
  },

  // Premium
  approvePremiumRequest: (requestId: string) => {
    set(state => ({
      premiumRequests: state.premiumRequests.map(r => 
        r.id === requestId ? { 
          ...r, 
          status: 'approved', 
          processedAt: new Date(),
          processedBy: 'admin'
        } : r
      )
    }));
  },
  
  rejectPremiumRequest: (requestId: string, reason: string) => {
    set(state => ({
      premiumRequests: state.premiumRequests.map(r => 
        r.id === requestId ? { 
          ...r, 
          status: 'rejected', 
          processedAt: new Date(),
          processedBy: 'admin',
          notes: reason
        } : r
      )
    }));
  },
  
  createVoucher: (packageId: string) => {
    const code = 'AXE' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const newVoucher: PremiumVoucher = {
      id: String(Date.now()),
      code,
      packageId,
      isUsed: false,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date()
    };
    set(state => ({
      vouchers: [newVoucher, ...state.vouchers]
    }));
    return code;
  },
  
  revokeVoucher: (voucherId: string) => {
    set(state => ({
      vouchers: state.vouchers.filter(v => v.id !== voucherId)
    }));
  },

  // Server
  refreshServerStats: async () => {
    set({ isLoading: true });
    
    // Simulate fetching server stats
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const stats: ServerStats = {
      cpu: {
        usage: Math.random() * 100,
        cores: 8,
        model: 'Intel Xeon E5-2680'
      },
      memory: {
        total: 32 * 1024 * 1024 * 1024,
        used: Math.random() * 16 * 1024 * 1024 * 1024,
        free: 0,
        percentage: 0
      },
      disk: {
        total: 500 * 1024 * 1024 * 1024,
        used: Math.random() * 300 * 1024 * 1024 * 1024,
        free: 0,
        percentage: 0
      },
      network: {
        uploadSpeed: Math.random() * 100,
        downloadSpeed: Math.random() * 100,
        totalUpload: 1024 * 1024 * 1024 * 1024,
        totalDownload: 2 * 1024 * 1024 * 1024 * 1024
      },
      uptime: 86400 * 30,
      activeConnections: Math.floor(Math.random() * 500)
    };
    
    stats.memory.free = stats.memory.total - stats.memory.used;
    stats.memory.percentage = (stats.memory.used / stats.memory.total) * 100;
    
    stats.disk.free = stats.disk.total - stats.disk.used;
    stats.disk.percentage = (stats.disk.used / stats.disk.total) * 100;
    
    set({ serverStats: stats, isLoading: false });
  },
  
  clearCache: () => {
    console.log('Cache cleared');
  },

  // Config
  updateSiteConfig: (config: Partial<SiteConfig>) => {
    set(state => ({
      siteConfig: { ...state.siteConfig, ...config }
    }));
  },

  // Logs
  clearLogs: () => {
    set({ activityLogs: [] });
  },

  clearError: () => {
    set({ error: null });
  }
}));
