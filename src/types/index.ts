// AxeLux - Type Definitions

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  premiumExpiry?: Date;
  createdAt: Date;
  lastLogin?: Date;
  isBanned: boolean;
  role: 'user' | 'admin' | 'superadmin';
  downloadCount: number;
  favorites: string[];
}

export interface App {
  id: string;
  name: string;
  packageName: string;
  description: string;
  shortDescription: string;
  category: AppCategory;
  subcategory?: string;
  type: 'free' | 'premium';
  developer: string;
  developerId?: string;
  icon: string;
  screenshots: string[];
  githubRepo?: string;
  githubOwner?: string;
  currentVersion: string;
  versionCode: number;
  minAndroidVersion: string;
  targetAndroidVersion: string;
  apkSize: number;
  downloads: number;
  rating: number;
  reviewCount: number;
  releaseDate: Date;
  lastUpdate: Date;
  changelog: string;
  tags: string[];
  isVerified: boolean;
  isActive: boolean;
  hashMd5: string;
  hashSha256: string;
  virusScanResult?: VirusScanResult;
  versions: AppVersion[];
}

export interface AppVersion {
  id: string;
  version: string;
  versionCode: number;
  apkUrl: string;
  apkSize: number;
  changelog: string;
  releaseDate: Date;
  downloadCount: number;
  hashMd5: string;
  hashSha256: string;
  githubReleaseId?: number;
  githubTag?: string;
}

export interface VirusScanResult {
  isClean: boolean;
  scanDate: Date;
  engineVersion: string;
  detections: number;
  totalEngines: number;
  reportUrl?: string;
}

export type AppCategory = 
  | 'games'
  | 'tools'
  | 'productivity'
  | 'social'
  | 'entertainment'
  | 'education'
  | 'finance'
  | 'health'
  | 'lifestyle'
  | 'premium';

export interface Testimonial {
  id: string;
  userId: string;
  user: User;
  appId?: string;
  app?: App;
  rating: number;
  content: string;
  createdAt: Date;
  isApproved: boolean;
  isFeatured: boolean;
  adminReply?: string;
  adminReplyAt?: Date;
}

export interface Download {
  id: string;
  userId?: string;
  appId: string;
  app: App;
  versionId: string;
  version: string;
  downloadDate: Date;
  completed: boolean;
  fileSize: number;
  downloadSpeed?: number;
  ipAddress: string;
  userAgent: string;
}

export interface PremiumPackage {
  id: string;
  name: string;
  duration: number; // in days
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
}

export interface PremiumVoucher {
  id: string;
  code: string;
  packageId: string;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: Date;
  expiryDate: Date;
  createdAt: Date;
}

export interface PremiumRequest {
  id: string;
  userId: string;
  user: User;
  whatsappNumber: string;
  packageId: string;
  package: PremiumPackage;
  status: 'pending' | 'approved' | 'rejected';
  paymentProof?: string;
  notes?: string;
  createdAt: Date;
  processedAt?: Date;
  processedBy?: string;
}

export interface ServerStats {
  cpu: {
    usage: number;
    cores: number;
    model: string;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    percentage: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    percentage: number;
  };
  network: {
    uploadSpeed: number;
    downloadSpeed: number;
    totalUpload: number;
    totalDownload: number;
  };
  uptime: number;
  activeConnections: number;
}

export interface ActivityLog {
  id: string;
  userId?: string;
  user?: User;
  action: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export interface AppReview {
  id: string;
  userId: string;
  user: User;
  appId: string;
  app: App;
  rating: number;
  title?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  helpfulCount: number;
  isVerified: boolean;
}

export interface FilterOptions {
  category?: AppCategory;
  type?: 'free' | 'premium' | 'all';
  sortBy: 'popular' | 'rating' | 'newest' | 'name';
  searchQuery?: string;
  minRating?: number;
  maxSize?: number;
  androidVersion?: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
  html_url: string;
}

export interface GitHubAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  category: 'premium' | 'support' | 'notification';
  isActive: boolean;
}

export interface WhatsAppMessage {
  id: string;
  to: string;
  templateId?: string;
  content: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxUploadSize: number;
  defaultTheme: 'light' | 'dark' | 'system';
  cacheDuration: number;
  cdnUrl?: string;
  whatsappNumber: string;
}
