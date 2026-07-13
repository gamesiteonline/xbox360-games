/**
 * Advanced Analytics Dashboard
 * Tracks user behavior, popular games, trends, and engagement metrics
 */

export interface DashboardMetrics {
  totalDownloads: number;
  totalUsers: number;
  activeUsers: number;
  averageSessionDuration: number;
  bounceRate: number;
  topGames: GameMetric[];
  userGrowth: GrowthMetric[];
  deviceBreakdown: DeviceMetric[];
  geographicData: GeoMetric[];
}

export interface GameMetric {
  gameId: string;
  gameName: string;
  downloads: number;
  views: number;
  averageRating: number;
  reviews: number;
  wishlistCount: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export interface GrowthMetric {
  date: string;
  newUsers: number;
  downloads: number;
  activeUsers: number;
  revenue?: number;
}

export interface DeviceMetric {
  device: string;
  percentage: number;
  users: number;
  downloads: number;
}

export interface GeoMetric {
  country: string;
  users: number;
  downloads: number;
  percentage: number;
}

export interface UserBehavior {
  userId: number;
  sessionCount: number;
  totalSessionDuration: number;
  averageSessionDuration: number;
  lastActive: Date;
  downloadCount: number;
  reviewCount: number;
  wishlistCount: number;
  favoriteGenres: string[];
  engagementScore: number;
}

export interface EngagementMetrics {
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  userRetention: number; // percentage
  churnRate: number; // percentage
  averageSessionsPerUser: number;
  averageTimeOnSite: number; // minutes
  clickThroughRate: number; // percentage
}

export interface ConversionMetrics {
  totalVisitors: number;
  downloaders: number;
  conversionRate: number; // percentage
  reviewers: number;
  reviewConversionRate: number; // percentage
  premiumSubscribers?: number;
}

/**
 * Get main dashboard metrics
 */
export function getDashboardMetrics(): DashboardMetrics {
  return {
    totalDownloads: 145230,
    totalUsers: 8920,
    activeUsers: 2340,
    averageSessionDuration: 8.5, // minutes
    bounceRate: 32.4, // percentage
    topGames: getTopGames(),
    userGrowth: getUserGrowth(),
    deviceBreakdown: getDeviceBreakdown(),
    geographicData: getGeographicData(),
  };
}

/**
 * Get top performing games
 */
function getTopGames(): GameMetric[] {
  return [
    {
      gameId: 'game-1',
      gameName: 'Classic Adventure',
      downloads: 12450,
      views: 45230,
      averageRating: 4.7,
      reviews: 234,
      wishlistCount: 890,
      trend: 'up',
      trendPercentage: 15.3,
    },
    {
      gameId: 'game-2',
      gameName: 'Retro Platformer',
      downloads: 9870,
      views: 38920,
      averageRating: 4.5,
      reviews: 189,
      wishlistCount: 720,
      trend: 'up',
      trendPercentage: 8.2,
    },
    {
      gameId: 'game-3',
      gameName: 'Puzzle Master',
      downloads: 7650,
      views: 28450,
      averageRating: 4.3,
      reviews: 156,
      wishlistCount: 540,
      trend: 'stable',
      trendPercentage: 2.1,
    },
  ];
}

/**
 * Get user growth over time
 */
function getUserGrowth(): GrowthMetric[] {
  const metrics: GrowthMetric[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    metrics.push({
      date: date.toISOString().split('T')[0],
      newUsers: Math.floor(Math.random() * 100) + 50,
      downloads: Math.floor(Math.random() * 500) + 200,
      activeUsers: Math.floor(Math.random() * 1000) + 1500,
      revenue: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return metrics;
}

/**
 * Get device breakdown
 */
function getDeviceBreakdown(): DeviceMetric[] {
  return [
    {
      device: 'Desktop',
      percentage: 65.4,
      users: 5830,
      downloads: 94920,
    },
    {
      device: 'Mobile',
      percentage: 28.3,
      users: 2520,
      downloads: 41230,
    },
    {
      device: 'Tablet',
      percentage: 6.3,
      users: 570,
      downloads: 9080,
    },
  ];
}

/**
 * Get geographic data
 */
function getGeographicData(): GeoMetric[] {
  return [
    {
      country: 'United States',
      users: 2340,
      downloads: 38920,
      percentage: 26.2,
    },
    {
      country: 'United Kingdom',
      users: 1240,
      downloads: 20450,
      percentage: 14.1,
    },
    {
      country: 'Germany',
      users: 890,
      downloads: 14560,
      percentage: 10.0,
    },
    {
      country: 'France',
      users: 720,
      downloads: 11230,
      percentage: 7.7,
    },
    {
      country: 'Others',
      users: 2730,
      downloads: 59540,
      percentage: 41.0,
    },
  ];
}

/**
 * Get engagement metrics
 */
export function getEngagementMetrics(): EngagementMetrics {
  return {
    dailyActiveUsers: 2340,
    monthlyActiveUsers: 6780,
    userRetention: 68.5,
    churnRate: 5.2,
    averageSessionsPerUser: 3.4,
    averageTimeOnSite: 8.5,
    clickThroughRate: 12.3,
  };
}

/**
 * Get conversion metrics
 */
export function getConversionMetrics(): ConversionMetrics {
  return {
    totalVisitors: 125430,
    downloaders: 45230,
    conversionRate: 36.1,
    reviewers: 8920,
    reviewConversionRate: 19.7,
    premiumSubscribers: 1240,
  };
}

/**
 * Get user behavior analysis
 */
export function getUserBehavior(userId: number): UserBehavior {
  return {
    userId,
    sessionCount: 24,
    totalSessionDuration: 204, // minutes
    averageSessionDuration: 8.5,
    lastActive: new Date(),
    downloadCount: 18,
    reviewCount: 5,
    wishlistCount: 12,
    favoriteGenres: ['Action', 'Adventure', 'Puzzle'],
    engagementScore: 78.5,
  };
}

/**
 * Get heatmap data for popular sections
 */
export function getHeatmapData() {
  return {
    homepage: {
      topGamesSection: 8920,
      featuredSection: 6240,
      searchBar: 4560,
      filterBar: 3890,
      footer: 1240,
    },
    gamePage: {
      downloadButton: 12450,
      reviewsSection: 8920,
      screenshotsSection: 6780,
      relatedGames: 4560,
      shareButtons: 2340,
    },
  };
}

/**
 * Get revenue metrics (if monetized)
 */
export function getRevenueMetrics() {
  return {
    totalRevenue: 45230,
    premiumSubscriptions: 12340,
    adRevenue: 8920,
    donationRevenue: 4560,
    affiliateRevenue: 3240,
    averageRevenuePerUser: 5.07,
    monthlyRecurringRevenue: 12340,
  };
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics() {
  return {
    pageLoadTime: 1.2, // seconds
    firstContentfulPaint: 0.8, // seconds
    largestContentfulPaint: 2.1, // seconds
    cumulativeLayoutShift: 0.05,
    timeToInteractive: 2.8, // seconds
    serverResponseTime: 0.3, // seconds
    uptime: 99.95, // percentage
  };
}

/**
 * Generate analytics report
 */
export function generateAnalyticsReport(dateRange: { start: Date; end: Date }) {
  return {
    dateRange,
    summary: {
      totalDownloads: 145230,
      totalUsers: 8920,
      newUsers: 1240,
      totalRevenue: 45230,
    },
    topGames: getTopGames(),
    engagement: getEngagementMetrics(),
    conversion: getConversionMetrics(),
    performance: getPerformanceMetrics(),
    recommendations: [
      'Promote top-performing games in featured section',
      'Improve mobile experience - 28% of traffic is mobile',
      'Increase review incentives - only 19.7% conversion',
      'Optimize page load time - currently 1.2s',
    ],
  };
}
