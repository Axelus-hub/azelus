import type { 
  User, App, AppReview, Download, Testimonial, 
  PremiumRequest, PremiumPackage, PremiumVoucher, 
  ActivityLog, WhatsAppTemplate 
} from '@/types';

export const mockUsers: User[] = [
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
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    isPremium: false,
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date(),
    isBanned: false,
    role: 'user',
    downloadCount: 45,
    favorites: ['1', '4']
  },
  {
    id: '3',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    isPremium: true,
    premiumExpiry: new Date('2025-03-15'),
    createdAt: new Date('2024-03-01'),
    lastLogin: new Date(),
    isBanned: false,
    role: 'user',
    downloadCount: 89,
    favorites: ['2', '5', '6']
  },
  {
    id: '4',
    username: 'mike_gamer',
    email: 'mike@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    isPremium: false,
    createdAt: new Date('2024-04-10'),
    lastLogin: new Date(),
    isBanned: false,
    role: 'user',
    downloadCount: 23,
    favorites: ['3']
  },
  {
    id: '5',
    username: 'emma_premium',
    email: 'emma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    isPremium: true,
    premiumExpiry: new Date('2025-06-30'),
    createdAt: new Date('2024-01-20'),
    lastLogin: new Date(),
    isBanned: false,
    role: 'user',
    downloadCount: 156,
    favorites: ['1', '2', '3', '4', '5']
  }
];

export const mockApps: App[] = [
  {
    id: '1',
    name: 'Nova Launcher Prime',
    packageName: 'com.teslacoilsw.launcher.prime',
    description: 'The highly customizable, performance driven, home screen replacement. Nova Launcher Prime unlocks the full potential of Nova Launcher with gesture controls, unread counts, custom drawer groups, and more.',
    shortDescription: 'Highly customizable home screen replacement with premium features',
    category: 'tools',
    type: 'premium',
    developer: 'TeslaCoil Software',
    icon: 'https://play-lh.googleusercontent.com/3Qag0O1Q2RwO3RFuYj6LJ8j1w8u5z3x8y9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5',
    screenshots: [
      'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800',
      'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'
    ],
    githubRepo: 'nova-launcher',
    githubOwner: 'teslacoilsw',
    currentVersion: '8.0.5',
    versionCode: 8050,
    minAndroidVersion: '8.0',
    targetAndroidVersion: '14',
    apkSize: 15 * 1024 * 1024,
    downloads: 5000000,
    rating: 4.7,
    reviewCount: 125000,
    releaseDate: new Date('2024-01-15'),
    lastUpdate: new Date('2024-12-01'),
    changelog: '- New icon shapes\n- Improved gesture navigation\n- Bug fixes and performance improvements',
    tags: ['launcher', 'customization', 'premium', 'productivity'],
    isVerified: true,
    isActive: true,
    hashMd5: 'a1b2c3d4e5f678901234567890123456',
    hashSha256: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v1',
        version: '8.0.5',
        versionCode: 8050,
        apkUrl: 'https://axelux.id/download/nova-launcher-8.0.5.apk',
        apkSize: 15 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-12-01'),
        downloadCount: 500000,
        hashMd5: 'a1b2c3d4e5f678901234567890123456',
        hashSha256: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      },
      {
        id: 'v2',
        version: '8.0.4',
        versionCode: 8040,
        apkUrl: 'https://axelux.id/download/nova-launcher-8.0.4.apk',
        apkSize: 14.8 * 1024 * 1024,
        changelog: 'Bug fixes',
        releaseDate: new Date('2024-11-15'),
        downloadCount: 450000,
        hashMd5: 'b2c3d4e5f6a789012345678901234567',
        hashSha256: 'bcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a'
      }
    ]
  },
  {
    id: '2',
    name: 'Poweramp Full Version',
    packageName: 'com.maxmpz.audioplayer',
    description: 'Poweramp is a powerful music player for Android. Features include gapless playback, 10-band equalizer, lyrics support, and stunning visual themes.',
    shortDescription: 'Powerful music player with 10-band equalizer',
    category: 'entertainment',
    type: 'premium',
    developer: 'Max MP',
    icon: 'https://play-lh.googleusercontent.com/poweramp-icon',
    screenshots: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800'
    ],
    githubRepo: 'poweramp',
    githubOwner: 'maxmpz',
    currentVersion: '3.0.5',
    versionCode: 3050,
    minAndroidVersion: '5.0',
    targetAndroidVersion: '14',
    apkSize: 25 * 1024 * 1024,
    downloads: 2500000,
    rating: 4.8,
    reviewCount: 89000,
    releaseDate: new Date('2024-02-01'),
    lastUpdate: new Date('2024-11-20'),
    changelog: '- New UI themes\n- Improved audio engine\n- Hi-Res output support',
    tags: ['music', 'audio', 'premium', 'entertainment'],
    isVerified: true,
    isActive: true,
    hashMd5: 'c3d4e5f6a7b890123456789012345678',
    hashSha256: 'cdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v3',
        version: '3.0.5',
        versionCode: 3050,
        apkUrl: 'https://axelux.id/download/poweramp-3.0.5.apk',
        apkSize: 25 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-11-20'),
        downloadCount: 300000,
        hashMd5: 'c3d4e5f6a7b890123456789012345678',
        hashSha256: 'cdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'
      }
    ]
  },
  {
    id: '3',
    name: 'Minecraft PE',
    packageName: 'com.mojang.minecraftpe',
    description: 'Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode.',
    shortDescription: 'Explore infinite worlds and build amazing structures',
    category: 'games',
    type: 'premium',
    developer: 'Mojang',
    icon: 'https://play-lh.googleusercontent.com/minecraft-icon',
    screenshots: [
      'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=800',
      'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'
    ],
    githubRepo: 'minecraft-pe',
    githubOwner: 'mojang',
    currentVersion: '1.20.50',
    versionCode: 12050,
    minAndroidVersion: '8.0',
    targetAndroidVersion: '14',
    apkSize: 180 * 1024 * 1024,
    downloads: 10000000,
    rating: 4.6,
    reviewCount: 2500000,
    releaseDate: new Date('2024-01-01'),
    lastUpdate: new Date('2024-12-05'),
    changelog: '- New biomes\n- Updated mobs\n- Performance improvements',
    tags: ['game', 'adventure', 'premium', 'sandbox'],
    isVerified: true,
    isActive: true,
    hashMd5: 'd4e5f6a7b8c901234567890123456789',
    hashSha256: 'def1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v4',
        version: '1.20.50',
        versionCode: 12050,
        apkUrl: 'https://axelux.id/download/minecraft-1.20.50.apk',
        apkSize: 180 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-12-05'),
        downloadCount: 1000000,
        hashMd5: 'd4e5f6a7b8c901234567890123456789',
        hashSha256: 'def1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc'
      }
    ]
  },
  {
    id: '4',
    name: 'Termux',
    packageName: 'com.termux',
    description: 'Termux is an Android terminal emulator and Linux environment app that works directly with no rooting or setup required.',
    shortDescription: 'Terminal emulator and Linux environment',
    category: 'tools',
    type: 'free',
    developer: 'Fredrik Fornwall',
    icon: 'https://play-lh.googleusercontent.com/termux-icon',
    screenshots: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800'
    ],
    githubRepo: 'termux-app',
    githubOwner: 'termux',
    currentVersion: '0.118.0',
    versionCode: 1180,
    minAndroidVersion: '7.0',
    targetAndroidVersion: '14',
    apkSize: 10 * 1024 * 1024,
    downloads: 10000000,
    rating: 4.8,
    reviewCount: 150000,
    releaseDate: new Date('2023-01-01'),
    lastUpdate: new Date('2024-10-15'),
    changelog: '- Android 14 support\n- Bug fixes',
    tags: ['terminal', 'developer', 'linux', 'free'],
    isVerified: true,
    isActive: true,
    hashMd5: 'e5f6a7b8c9d012345678901234567890',
    hashSha256: 'ef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v5',
        version: '0.118.0',
        versionCode: 1180,
        apkUrl: 'https://axelux.id/download/termux-0.118.0.apk',
        apkSize: 10 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-10-15'),
        downloadCount: 500000,
        hashMd5: 'e5f6a7b8c9d012345678901234567890',
        hashSha256: 'ef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd'
      }
    ]
  },
  {
    id: '5',
    name: 'Tasker',
    packageName: 'net.dinglisch.android.taskerm',
    description: 'Total Automation for Android. Automate everything from settings to photos, SMS to speech. ADC2 prize winner.',
    shortDescription: 'Total automation for Android',
    category: 'productivity',
    type: 'premium',
    developer: 'joaomgcd',
    icon: 'https://play-lh.googleusercontent.com/tasker-icon',
    screenshots: [
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800'
    ],
    githubRepo: 'tasker',
    githubOwner: 'joaomgcd',
    currentVersion: '6.2.22',
    versionCode: 6222,
    minAndroidVersion: '9.0',
    targetAndroidVersion: '14',
    apkSize: 8 * 1024 * 1024,
    downloads: 1000000,
    rating: 4.5,
    reviewCount: 45000,
    releaseDate: new Date('2024-03-01'),
    lastUpdate: new Date('2024-11-10'),
    changelog: '- New actions\n- Improved UI',
    tags: ['automation', 'productivity', 'premium'],
    isVerified: true,
    isActive: true,
    hashMd5: 'f6a7b8c9d0e123456789012345678901',
    hashSha256: 'f1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v6',
        version: '6.2.22',
        versionCode: 6222,
        apkUrl: 'https://axelux.id/download/tasker-6.2.22.apk',
        apkSize: 8 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-11-10'),
        downloadCount: 100000,
        hashMd5: 'f6a7b8c9d0e123456789012345678901',
        hashSha256: 'f1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde'
      }
    ]
  },
  {
    id: '6',
    name: 'SD Maid Pro',
    packageName: 'eu.thedarken.sdm',
    description: 'SD Maid is a system cleaning tool for Android. It helps you manage files and apps to keep your device clean and organized.',
    shortDescription: 'System cleaning and file management tool',
    category: 'tools',
    type: 'premium',
    developer: 'darken',
    icon: 'https://play-lh.googleusercontent.com/sdmaid-icon',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    githubRepo: 'sd-maid',
    githubOwner: 'd4rken',
    currentVersion: '5.6.3',
    versionCode: 5630,
    minAndroidVersion: '8.0',
    targetAndroidVersion: '14',
    apkSize: 12 * 1024 * 1024,
    downloads: 5000000,
    rating: 4.6,
    reviewCount: 120000,
    releaseDate: new Date('2024-04-01'),
    lastUpdate: new Date('2024-11-25'),
    changelog: '- Improved corpse finder\n- Updated translations',
    tags: ['cleaner', 'tools', 'premium', 'system'],
    isVerified: true,
    isActive: true,
    hashMd5: 'a7b8c9d0e1f234567890123456789012',
    hashSha256: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v7',
        version: '5.6.3',
        versionCode: 5630,
        apkUrl: 'https://axelux.id/download/sdmaid-5.6.3.apk',
        apkSize: 12 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-11-25'),
        downloadCount: 200000,
        hashMd5: 'a7b8c9d0e1f234567890123456789012',
        hashSha256: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      }
    ]
  },
  {
    id: '7',
    name: 'AdGuard Premium',
    packageName: 'com.adguard.android',
    description: 'AdGuard is the best way to get rid of annoying ads and online tracking, and protect your device from malware.',
    shortDescription: 'Ad blocker and privacy protection',
    category: 'tools',
    type: 'premium',
    developer: 'AdGuard Software',
    icon: 'https://play-lh.googleusercontent.com/adguard-icon',
    screenshots: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
    ],
    githubRepo: 'adguard-android',
    githubOwner: 'adguard',
    currentVersion: '4.5.0',
    versionCode: 4500,
    minAndroidVersion: '7.0',
    targetAndroidVersion: '14',
    apkSize: 35 * 1024 * 1024,
    downloads: 8000000,
    rating: 4.7,
    reviewCount: 200000,
    releaseDate: new Date('2024-05-01'),
    lastUpdate: new Date('2024-12-01'),
    changelog: '- Improved filtering\n- New DNS filters',
    tags: ['adblock', 'privacy', 'premium', 'security'],
    isVerified: true,
    isActive: true,
    hashMd5: 'b8c9d0e1f2a345678901234567890123',
    hashSha256: '234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v8',
        version: '4.5.0',
        versionCode: 4500,
        apkUrl: 'https://axelux.id/download/adguard-4.5.0.apk',
        apkSize: 35 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-12-01'),
        downloadCount: 400000,
        hashMd5: 'b8c9d0e1f2a345678901234567890123',
        hashSha256: '234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1'
      }
    ]
  },
  {
    id: '8',
    name: 'PicsArt Gold',
    packageName: 'com.picsart.studio',
    description: 'PicsArt is the best all-in-one photo and video editor on mobile. Unleash your creativity with AI-powered tools.',
    shortDescription: 'All-in-one photo and video editor',
    category: 'entertainment',
    type: 'premium',
    developer: 'PicsArt',
    icon: 'https://play-lh.googleusercontent.com/picsart-icon',
    screenshots: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800'
    ],
    githubRepo: 'picsart',
    githubOwner: 'picsart',
    currentVersion: '23.8.0',
    versionCode: 23800,
    minAndroidVersion: '8.0',
    targetAndroidVersion: '14',
    apkSize: 45 * 1024 * 1024,
    downloads: 100000000,
    rating: 4.4,
    reviewCount: 8000000,
    releaseDate: new Date('2024-06-01'),
    lastUpdate: new Date('2024-11-30'),
    changelog: '- New AI features\n- Improved editor',
    tags: ['photo', 'video', 'editor', 'premium'],
    isVerified: true,
    isActive: true,
    hashMd5: 'c9d0e1f2a3b456789012345678901234',
    hashSha256: '34567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    virusScanResult: {
      isClean: true,
      scanDate: new Date(),
      engineVersion: '1.0.0',
      detections: 0,
      totalEngines: 70
    },
    versions: [
      {
        id: 'v9',
        version: '23.8.0',
        versionCode: 23800,
        apkUrl: 'https://axelux.id/download/picsart-23.8.0.apk',
        apkSize: 45 * 1024 * 1024,
        changelog: 'Latest stable release',
        releaseDate: new Date('2024-11-30'),
        downloadCount: 2000000,
        hashMd5: 'c9d0e1f2a3b456789012345678901234',
        hashSha256: '34567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12'
      }
    ]
  }
];

export const mockReviews: AppReview[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    appId: '1',
    app: mockApps[0],
    rating: 5,
    title: 'Best launcher ever!',
    content: 'Nova Launcher Prime is absolutely worth it. The customization options are endless.',
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-15'),
    helpfulCount: 45,
    isVerified: true
  },
  {
    id: '2',
    userId: '3',
    user: mockUsers[2],
    appId: '1',
    app: mockApps[0],
    rating: 5,
    title: 'Perfect for power users',
    content: 'Gesture controls and custom drawer groups make this a must-have.',
    createdAt: new Date('2024-10-20'),
    helpfulCount: 32,
    isVerified: true
  },
  {
    id: '3',
    userId: '4',
    user: mockUsers[3],
    appId: '2',
    app: mockApps[1],
    rating: 5,
    title: 'Amazing sound quality',
    content: 'The equalizer is fantastic. Best music player on Android.',
    createdAt: new Date('2024-11-10'),
    helpfulCount: 28,
    isVerified: true
  }
];

export const mockDownloads: Download[] = [
  {
    id: '1',
    userId: '2',
    appId: '1',
    app: mockApps[0],
    versionId: 'v1',
    version: '8.0.5',
    downloadDate: new Date('2024-12-01'),
    completed: true,
    fileSize: 15 * 1024 * 1024,
    downloadSpeed: 5 * 1024 * 1024,
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0'
  },
  {
    id: '2',
    userId: '3',
    appId: '2',
    app: mockApps[1],
    versionId: 'v3',
    version: '3.0.5',
    downloadDate: new Date('2024-11-25'),
    completed: true,
    fileSize: 25 * 1024 * 1024,
    downloadSpeed: 8 * 1024 * 1024,
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    appId: '1',
    app: mockApps[0],
    rating: 5,
    content: 'AxeLux has completely changed how I discover and download apps. The premium collection is amazing!',
    createdAt: new Date('2024-11-20'),
    isApproved: true,
    isFeatured: true
  },
  {
    id: '2',
    userId: '3',
    user: mockUsers[2],
    appId: '2',
    app: mockApps[1],
    rating: 5,
    content: 'Best platform for premium APKs. The GitHub integration ensures I always get the latest versions.',
    createdAt: new Date('2024-11-15'),
    isApproved: true,
    isFeatured: true
  },
  {
    id: '3',
    userId: '4',
    user: mockUsers[3],
    rating: 4,
    content: 'Great selection of apps and the download speeds are excellent. Highly recommended!',
    createdAt: new Date('2024-11-10'),
    isApproved: true,
    isFeatured: false
  },
  {
    id: '4',
    userId: '5',
    user: mockUsers[4],
    appId: '3',
    app: mockApps[2],
    rating: 5,
    content: 'Premium membership is worth every penny. Access to exclusive apps and instant updates!',
    createdAt: new Date('2024-11-05'),
    isApproved: true,
    isFeatured: true
  }
];

export const mockPremiumPackages: PremiumPackage[] = [
  {
    id: '1',
    name: 'Monthly Premium',
    duration: 30,
    price: 25000,
    currency: 'IDR',
    features: [
      'Access to all Premium APKs',
      'Priority downloads',
      'No ads',
      'Early access to new releases'
    ],
    isActive: true
  },
  {
    id: '2',
    name: 'Quarterly Premium',
    duration: 90,
    price: 65000,
    currency: 'IDR',
    features: [
      'Access to all Premium APKs',
      'Priority downloads',
      'No ads',
      'Early access to new releases',
      'Exclusive beta apps'
    ],
    isActive: true
  },
  {
    id: '3',
    name: 'Yearly Premium',
    duration: 365,
    price: 199000,
    currency: 'IDR',
    features: [
      'Access to all Premium APKs',
      'Priority downloads',
      'No ads',
      'Early access to new releases',
      'Exclusive beta apps',
      'VIP support',
      'Request custom apps'
    ],
    isActive: true
  }
];

export const mockPremiumRequests: PremiumRequest[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    whatsappNumber: '081234567890',
    packageId: '1',
    package: mockPremiumPackages[0],
    status: 'pending',
    createdAt: new Date('2024-12-01')
  },
  {
    id: '2',
    userId: '4',
    user: mockUsers[3],
    whatsappNumber: '082345678901',
    packageId: '3',
    package: mockPremiumPackages[2],
    status: 'approved',
    createdAt: new Date('2024-11-25'),
    processedAt: new Date('2024-11-25'),
    processedBy: 'admin'
  }
];

export const mockVouchers: PremiumVoucher[] = [
  {
    id: '1',
    code: 'AXE2024VIP',
    packageId: '3',
    isUsed: false,
    expiryDate: new Date('2025-01-31'),
    createdAt: new Date('2024-12-01')
  },
  {
    id: '2',
    code: 'AXEMONTH50',
    packageId: '1',
    isUsed: true,
    usedBy: '3',
    usedAt: new Date('2024-11-15'),
    expiryDate: new Date('2024-12-15'),
    createdAt: new Date('2024-11-01')
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    action: 'LOGIN',
    details: 'Super admin logged in from 192.168.1.100',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    timestamp: new Date('2024-12-01 08:00:00'),
    severity: 'info'
  },
  {
    id: '2',
    userId: '1',
    user: mockUsers[0],
    action: 'APP_VERIFY',
    details: 'Verified app: Nova Launcher Prime',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    timestamp: new Date('2024-12-01 09:30:00'),
    severity: 'info'
  },
  {
    id: '3',
    userId: '1',
    user: mockUsers[0],
    action: 'PREMIUM_APPROVE',
    details: 'Approved premium request for user: mike_gamer',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    timestamp: new Date('2024-12-01 10:15:00'),
    severity: 'info'
  },
  {
    id: '4',
    action: 'FAILED_LOGIN',
    details: 'Failed login attempt for user: admin',
    ipAddress: '203.0.113.50',
    userAgent: 'Mozilla/5.0',
    timestamp: new Date('2024-12-01 11:00:00'),
    severity: 'warning'
  }
];

export const mockWhatsAppTemplates: WhatsAppTemplate[] = [
  {
    id: '1',
    name: 'Premium Request Received',
    content: 'Terima kasih telah meminta akses Premium AxeLux! 🎉\n\nPesanan Anda sedang diproses. Mohon tunggu konfirmasi dari admin dalam waktu 1x24 jam.\n\nNomor Order: {{order_id}}\nPaket: {{package_name}}\nHarga: Rp {{price}}\n\nJika ada pertanyaan, silakan balas pesan ini.',
    category: 'premium',
    isActive: true
  },
  {
    id: '2',
    name: 'Premium Approved',
    content: 'Selamat! 🎊 Akses Premium Anda telah diaktifkan!\n\nPaket: {{package_name}}\nMasa Aktif: {{expiry_date}}\n\nAnda sekarang dapat mengakses semua APK Premium di AxeLux. Login ke akun Anda untuk mulai mengunduh.\n\nTerima kasih telah bergabung dengan AxeLux Premium!',
    category: 'premium',
    isActive: true
  },
  {
    id: '3',
    name: 'Download Complete',
    content: 'Halo {{username}}! 👋\n\nDownload Anda telah selesai:\n📱 {{app_name}} v{{version}}\n\nJangan lupa untuk mengaktifkan "Install from Unknown Sources" di pengaturan Anda sebelum menginstal APK.\n\nButuh bantuan? Hubungi kami kapan saja!',
    category: 'notification',
    isActive: true
  }
];
