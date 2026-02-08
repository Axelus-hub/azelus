import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  upgradeToPremium: (expiryDate: Date) => void;
  clearError: () => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@axelux.id',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    isPremium: true,
    premiumExpiry: new Date('2025-12-31'),
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    isBanned: false,
    role: 'superadmin',
    downloadCount: 150,
    favorites: ['1', '2', '3']
  },
  {
    id: '2',
    username: 'demo_user',
    email: 'demo@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    isPremium: false,
    createdAt: new Date('2024-06-01'),
    lastLogin: new Date(),
    isBanned: false,
    role: 'user',
    downloadCount: 25,
    favorites: ['1']
  },
  {
    id: '3',
    username: 'premium_user',
    email: 'premium@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=premium',
    isPremium: true,
    premiumExpiry: new Date('2025-06-30'),
    createdAt: new Date('2024-03-01'),
    lastLogin: new Date(),
    isBanned: false,
    role: 'user',
    downloadCount: 89,
    favorites: ['2', '4', '5']
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo login logic
        if (email === 'demo@example.com' && password === 'demo123') {
          const user = mockUsers.find(u => u.email === email);
          if (user) {
            set({ 
              user: { ...user, lastLogin: new Date() }, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return true;
          }
        }
        
        if (email === 'premium@example.com' && password === 'premium123') {
          const user = mockUsers.find(u => u.email === email);
          if (user) {
            set({ 
              user: { ...user, lastLogin: new Date() }, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return true;
          }
        }

        // Admin login - credentials from env (mock)
        if (email === 'admin@axelux.id' && password === 'admin123') {
          const user = mockUsers.find(u => u.email === email);
          if (user) {
            set({ 
              user: { ...user, lastLogin: new Date() }, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return true;
          }
        }
        
        set({ 
          error: 'Invalid email or password', 
          isLoading: false 
        });
        return false;
      },

      register: async (username: string, email: string, _password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if email exists
        if (mockUsers.some(u => u.email === email)) {
          set({ 
            error: 'Email already registered', 
            isLoading: false 
          });
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: String(mockUsers.length + 1),
          username,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          isPremium: false,
          createdAt: new Date(),
          lastLogin: new Date(),
          isBanned: false,
          role: 'user',
          downloadCount: 0,
          favorites: []
        };
        
        mockUsers.push(newUser);
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return true;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      updateProfile: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, ...data } 
          });
        }
      },

      upgradeToPremium: (expiryDate: Date) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { 
              ...user, 
              isPremium: true, 
              premiumExpiry: expiryDate 
            } 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'axelux-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);
