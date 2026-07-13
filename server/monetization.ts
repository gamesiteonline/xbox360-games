/**
 * Monetization System
 * Premium subscriptions, ads, donations, and affiliate links
 */

export interface PremiumTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  description: string;
  color: string;
}

export interface UserSubscription {
  userId: number;
  tierId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  renewalDate: Date;
  autoRenew: boolean;
  paymentMethod: string;
}

export interface Transaction {
  id: string;
  userId: number;
  type: 'subscription' | 'donation' | 'affiliate';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  metadata?: Record<string, any>;
}

/**
 * Premium subscription tiers
 */
export const PREMIUM_TIERS: PremiumTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    billingCycle: 'monthly',
    features: [
      'Access to all games',
      'Basic filtering',
      'Community access',
      'Standard downloads',
    ],
    description: 'Perfect for casual gamers',
    color: '#6B7280',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 4.99,
    currency: 'USD',
    billingCycle: 'monthly',
    features: [
      'All Free features',
      'Ad-free experience',
      'Priority downloads',
      'Advanced analytics',
      'Exclusive content',
      'Early access to new games',
    ],
    description: 'For dedicated gamers',
    color: '#3B82F6',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    currency: 'USD',
    billingCycle: 'monthly',
    features: [
      'All Pro features',
      'Unlimited downloads',
      'Custom collections',
      'Premium support',
      'Game recommendations AI',
      'Exclusive events',
      'VIP badge',
    ],
    description: 'For serious collectors',
    color: '#F59E0B',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 19.99,
    currency: 'USD',
    billingCycle: 'monthly',
    features: [
      'All Premium features',
      'Lifetime access',
      'Personal curator',
      '24/7 priority support',
      'Custom game bundles',
      'Exclusive merchandise',
      'Lifetime elite status',
    ],
    description: 'For ultimate collectors',
    color: '#10B981',
  },
];

/**
 * Get subscription benefits
 */
export function getSubscriptionBenefits(tierId: string) {
  const tier = PREMIUM_TIERS.find(t => t.id === tierId);
  return tier?.features || [];
}

/**
 * Check if user has feature access
 */
export function hasFeatureAccess(
  userTierId: string,
  feature: string
): boolean {
  const features = getSubscriptionBenefits(userTierId);
  return features.includes(feature);
}

/**
 * Advertising system
 */
export interface AdPlacement {
  id: string;
  location: 'header' | 'sidebar' | 'footer' | 'inline';
  type: 'banner' | 'native' | 'video';
  dimensions: { width: number; height: number };
  enabled: boolean;
}

export interface AdNetwork {
  name: string;
  enabled: boolean;
  revenue: number;
  impressions: number;
  clicks: number;
  ctr: number; // click-through rate
}

export const AD_PLACEMENTS: AdPlacement[] = [
  {
    id: 'header-banner',
    location: 'header',
    type: 'banner',
    dimensions: { width: 728, height: 90 },
    enabled: true,
  },
  {
    id: 'sidebar-banner',
    location: 'sidebar',
    type: 'banner',
    dimensions: { width: 300, height: 250 },
    enabled: true,
  },
  {
    id: 'footer-banner',
    location: 'footer',
    type: 'banner',
    dimensions: { width: 728, height: 90 },
    enabled: true,
  },
];

/**
 * Get ads for user
 */
export function getAdsForUser(userId: number, tierId: string): AdPlacement[] {
  // Premium users don't see ads
  if (['pro', 'premium', 'elite'].includes(tierId)) {
    return [];
  }
  return AD_PLACEMENTS.filter(ad => ad.enabled);
}

/**
 * Donation system
 */
export interface DonationOption {
  id: string;
  amount: number;
  label: string;
  emoji: string;
}

export const DONATION_OPTIONS: DonationOption[] = [
  { id: 'small', amount: 2.99, label: 'Coffee', emoji: '☕' },
  { id: 'medium', amount: 9.99, label: 'Lunch', emoji: '🍽️' },
  { id: 'large', amount: 24.99, label: 'Dinner', emoji: '🍽️' },
  { id: 'huge', amount: 99.99, label: 'Weekend Trip', emoji: '✈️' },
];

/**
 * Affiliate system
 */
export interface AffiliateLink {
  id: string;
  gameId: string;
  userId: number;
  url: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: Date;
}

export interface AffiliateStats {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
  averageCommission: number;
  topLinks: AffiliateLink[];
}

export function generateAffiliateLink(
  gameId: string,
  userId: number
): AffiliateLink {
  return {
    id: `aff-${Date.now()}`,
    gameId,
    userId,
    url: `https://gamesiteonline.com/game/${gameId}?ref=${userId}`,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    createdAt: new Date(),
  };
}

/**
 * Referral program
 */
export interface ReferralProgram {
  referrerBonus: number;
  refereeBonus: number;
  maxReferrals: number;
  commissionPercentage: number;
}

export const REFERRAL_PROGRAM: ReferralProgram = {
  referrerBonus: 10, // dollars
  refereeBonus: 5, // dollars
  maxReferrals: 100,
  commissionPercentage: 20, // 20% commission on referred subscriptions
};

/**
 * Revenue analytics
 */
export interface RevenueMetrics {
  totalRevenue: number;
  subscriptionRevenue: number;
  adRevenue: number;
  donationRevenue: number;
  affiliateRevenue: number;
  monthlyRecurringRevenue: number;
  averageRevenuePerUser: number;
  churnRate: number;
}

export function getRevenueMetrics(): RevenueMetrics {
  return {
    totalRevenue: 45230,
    subscriptionRevenue: 28340,
    adRevenue: 12450,
    donationRevenue: 3240,
    affiliateRevenue: 1200,
    monthlyRecurringRevenue: 12340,
    averageRevenuePerUser: 5.07,
    churnRate: 3.2,
  };
}

/**
 * Payment processing
 */
export async function processSubscription(
  userId: number,
  tierId: string,
  paymentMethod: string
): Promise<Transaction> {
  const tier = PREMIUM_TIERS.find(t => t.id === tierId);
  if (!tier) throw new Error('Invalid tier');

  return {
    id: `txn-${Date.now()}`,
    userId,
    type: 'subscription',
    amount: tier.price,
    currency: tier.currency,
    status: 'completed',
    timestamp: new Date(),
  };
}

export async function processDonation(
  userId: number,
  amount: number
): Promise<Transaction> {
  return {
    id: `txn-${Date.now()}`,
    userId,
    type: 'donation',
    amount,
    currency: 'USD',
    status: 'completed',
    timestamp: new Date(),
  };
}

/**
 * Coupon system
 */
export interface Coupon {
  code: string;
  discount: number; // percentage
  maxUses: number;
  currentUses: number;
  expiryDate: Date;
  applicableTiers: string[];
}

export function validateCoupon(code: string, tierId: string): Coupon | null {
  // In real implementation, fetch from database
  return null;
}

export function applyCoupon(
  amount: number,
  coupon: Coupon
): number {
  return amount * (1 - coupon.discount / 100);
}
