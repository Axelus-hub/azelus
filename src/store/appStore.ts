import { create } from 'zustand';
import type { App, AppCategory, FilterOptions, AppReview, Download } from '@/types';

interface AppState {
  apps: App[];
  featuredApps: App[];
  premiumApps: App[];
  recentApps: App[];
  popularApps: App[];
  currentApp: App | null;
  reviews: AppReview[];
  downloads: Download[];
  isLoading: boolean;
  error: string | null;
  filters: FilterOptions;
  
  // Actions
  setApps: (apps: App[]) => void;
  setCurrentApp: (app: App | null) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  filterApps: () => App[];
  searchApps: (query: string) => App[];
  getAppsByCategory: (category: AppCategory) => App[];
  getPremiumApps: () => App[];
  getFeaturedApps: () => App[];
  addReview: (review: Omit<AppReview, 'id' | 'createdAt'>) => void;
  addToFavorites: (appId: string, userId: string) => void;
  removeFromFavorites: (appId: string, userId: string) => void;
  recordDownload: (download: Omit<Download, 'id' | 'downloadDate'>) => void;
  incrementDownloadCount: (appId: string) => void;
  clearError: () => void;
}

// Import mock data
import { mockApps, mockReviews, mockDownloads } from '@/data/mockData';

export const useAppStore = create<AppState>((set, get) => ({
  apps: mockApps,
  featuredApps: mockApps.filter(app => app.isVerified && app.rating >= 4.5).slice(0, 6),
  premiumApps: mockApps.filter(app => app.type === 'premium'),
  recentApps: mockApps
    .filter(app => app.isActive)
    .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
    .slice(0, 8),
  popularApps: mockApps
    .filter(app => app.isActive)
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8),
  currentApp: null,
  reviews: mockReviews,
  downloads: mockDownloads,
  isLoading: false,
  error: null,
  filters: {
    sortBy: 'popular',
    type: 'all'
  },

  setApps: (apps: App[]) => {
    set({ apps });
  },

  setCurrentApp: (app: App | null) => {
    set({ currentApp: app });
  },

  setFilters: (filters: Partial<FilterOptions>) => {
    set(state => ({ 
      filters: { ...state.filters, ...filters } 
    }));
  },

  filterApps: () => {
    const { apps, filters } = get();
    let filtered = [...apps];

    if (filters.category) {
      filtered = filtered.filter(app => app.category === filters.category);
    }

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(app => app.type === filters.type);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.developer.toLowerCase().includes(query) ||
        app.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(app => app.rating >= filters.minRating!);
    }

    // Sort
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered.filter(app => app.isActive);
  },

  searchApps: (query: string) => {
    const { apps } = get();
    const lowerQuery = query.toLowerCase();
    return apps.filter(app => 
      app.isActive && (
        app.name.toLowerCase().includes(lowerQuery) ||
        app.description.toLowerCase().includes(lowerQuery) ||
        app.developer.toLowerCase().includes(lowerQuery) ||
        app.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    );
  },

  getAppsByCategory: (category: AppCategory) => {
    const { apps } = get();
    return apps.filter(app => app.category === category && app.isActive);
  },

  getPremiumApps: () => {
    const { apps } = get();
    return apps.filter(app => app.type === 'premium' && app.isActive);
  },

  getFeaturedApps: () => {
    const { apps } = get();
    return apps
      .filter(app => app.isVerified && app.isActive && app.rating >= 4.0)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 10);
  },

  addReview: (reviewData: Omit<AppReview, 'id' | 'createdAt'>) => {
    const newReview: AppReview = {
      ...reviewData,
      id: String(Date.now()),
      createdAt: new Date()
    };
    set(state => ({ 
      reviews: [newReview, ...state.reviews] 
    }));
  },

  addToFavorites: (appId: string, userId: string) => {
    // In a real app, this would update the user's favorites in the database
    console.log(`Added ${appId} to favorites for user ${userId}`);
  },

  removeFromFavorites: (appId: string, userId: string) => {
    console.log(`Removed ${appId} from favorites for user ${userId}`);
  },

  recordDownload: (downloadData: Omit<Download, 'id' | 'downloadDate'>) => {
    const newDownload: Download = {
      ...downloadData,
      id: String(Date.now()),
      downloadDate: new Date()
    };
    set(state => ({ 
      downloads: [newDownload, ...state.downloads] 
    }));
  },

  incrementDownloadCount: (appId: string) => {
    set(state => ({
      apps: state.apps.map(app => 
        app.id === appId 
          ? { ...app, downloads: app.downloads + 1 }
          : app
      )
    }));
  },

  clearError: () => {
    set({ error: null });
  }
}));
