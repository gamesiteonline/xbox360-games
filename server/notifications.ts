/**
 * Notification System
 * Email, push notifications, and in-app alerts
 */

export type NotificationType = 
  | 'game-release' 
  | 'recommendation' 
  | 'community-reply' 
  | 'achievement' 
  | 'promotion' 
  | 'system';

export interface Notification {
  id: string;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface NotificationPreferences {
  userId: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  gameReleases: boolean;
  recommendations: boolean;
  communityUpdates: boolean;
  promotions: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}

/**
 * Email notification templates
 */
export interface EmailTemplate {
  id: string;
  subject: string;
  template: string;
  variables: string[];
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'game-release',
    subject: 'New Game Released: {{gameName}}',
    template: `
      <h1>New Game Available!</h1>
      <p>A new game you might like has been released: <strong>{{gameName}}</strong></p>
      <p>{{description}}</p>
      <a href="{{gameUrl}}">Download Now</a>
    `,
    variables: ['gameName', 'description', 'gameUrl'],
  },
  {
    id: 'achievement-unlocked',
    subject: 'Achievement Unlocked: {{achievementName}}',
    template: `
      <h1>🏆 Achievement Unlocked!</h1>
      <p>Congratulations! You've unlocked the <strong>{{achievementName}}</strong> achievement!</p>
      <p>You earned {{points}} points!</p>
      <a href="{{profileUrl}}">View Your Profile</a>
    `,
    variables: ['achievementName', 'points', 'profileUrl'],
  },
  {
    id: 'community-reply',
    subject: 'New Reply to Your Post',
    template: `
      <h1>New Reply!</h1>
      <p><strong>{{userName}}</strong> replied to your post:</p>
      <blockquote>{{reply}}</blockquote>
      <a href="{{threadUrl}}">View Discussion</a>
    `,
    variables: ['userName', 'reply', 'threadUrl'],
  },
  {
    id: 'recommendation',
    subject: 'Recommended for You: {{gameName}}',
    template: `
      <h1>Game Recommendation</h1>
      <p>Based on your interests, we recommend <strong>{{gameName}}</strong></p>
      <p>{{reason}}</p>
      <a href="{{gameUrl}}">Check It Out</a>
    `,
    variables: ['gameName', 'reason', 'gameUrl'],
  },
  {
    id: 'promotion',
    subject: '{{promotionTitle}} - Limited Time!',
    template: `
      <h1>{{promotionTitle}}</h1>
      <p>{{description}}</p>
      <p><strong>Valid until: {{expiryDate}}</strong></p>
      <a href="{{promoUrl}}">Claim Offer</a>
    `,
    variables: ['promotionTitle', 'description', 'expiryDate', 'promoUrl'],
  },
];

/**
 * Push notification payload
 */
export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, string>;
}

/**
 * Send email notification
 */
export async function sendEmailNotification(
  userId: number,
  email: string,
  templateId: string,
  variables: Record<string, string>
): Promise<boolean> {
  const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
  if (!template) return false;

  // In real implementation, use email service like SendGrid, Mailgun, etc.
  let emailContent = template.template;
  let subject = template.subject;

  for (const [key, value] of Object.entries(variables)) {
    emailContent = emailContent.replace(`{{${key}}}`, value);
    subject = subject.replace(`{{${key}}}`, value);
  }

  console.log(`[EMAIL] To: ${email}, Subject: ${subject}`);
  return true;
}

/**
 * Send push notification
 */
export async function sendPushNotification(
  userId: number,
  payload: PushNotificationPayload
): Promise<boolean> {
  // In real implementation, use Firebase Cloud Messaging, OneSignal, etc.
  console.log(`[PUSH] User: ${userId}`, payload);
  return true;
}

/**
 * Create in-app notification
 */
export function createInAppNotification(
  userId: number,
  type: NotificationType,
  title: string,
  message: string,
  data?: Record<string, any>
): Notification {
  return {
    id: `notif-${Date.now()}`,
    userId,
    type,
    title,
    message,
    data,
    read: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  };
}

/**
 * Get user notifications
 */
export function getUserNotifications(
  userId: number,
  limit: number = 20,
  unreadOnly: boolean = false
): Notification[] {
  // In real implementation, fetch from database
  return [
    {
      id: 'notif-1',
      userId,
      type: 'achievement',
      title: '🏆 Achievement Unlocked!',
      message: 'You unlocked the "Collector" achievement!',
      read: false,
      createdAt: new Date(),
    },
    {
      id: 'notif-2',
      userId,
      type: 'game-release',
      title: 'New Game Released',
      message: 'A game you might like is now available',
      read: false,
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
    },
  ];
}

/**
 * Mark notification as read
 */
export function markNotificationAsRead(notificationId: string): boolean {
  // In real implementation, update database
  return true;
}

/**
 * Mark all notifications as read
 */
export function markAllNotificationsAsRead(userId: number): boolean {
  // In real implementation, update database
  return true;
}

/**
 * Delete notification
 */
export function deleteNotification(notificationId: string): boolean {
  // In real implementation, delete from database
  return true;
}

/**
 * Get notification preferences
 */
export function getNotificationPreferences(userId: number): NotificationPreferences {
  return {
    userId,
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    gameReleases: true,
    recommendations: true,
    communityUpdates: true,
    promotions: false,
    frequency: 'daily',
  };
}

/**
 * Update notification preferences
 */
export function updateNotificationPreferences(
  userId: number,
  preferences: Partial<NotificationPreferences>
): NotificationPreferences {
  // In real implementation, update database
  return {
    userId,
    emailNotifications: preferences.emailNotifications ?? true,
    pushNotifications: preferences.pushNotifications ?? true,
    inAppNotifications: preferences.inAppNotifications ?? true,
    gameReleases: preferences.gameReleases ?? true,
    recommendations: preferences.recommendations ?? true,
    communityUpdates: preferences.communityUpdates ?? true,
    promotions: preferences.promotions ?? false,
    frequency: preferences.frequency ?? 'daily',
  };
}

/**
 * Notification scheduler
 */
export interface ScheduledNotification {
  id: string;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  scheduledFor: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
}

export function scheduleNotification(
  userId: number,
  notification: Omit<ScheduledNotification, 'id'>,
): ScheduledNotification {
  return {
    id: `scheduled-${Date.now()}`,
    ...notification,
  };
}

/**
 * Notification analytics
 */
export interface NotificationMetrics {
  totalSent: number;
  totalOpened: number;
  openRate: number;
  totalClicked: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}

export function getNotificationMetrics(): NotificationMetrics {
  return {
    totalSent: 45230,
    totalOpened: 28340,
    openRate: 62.7,
    totalClicked: 12450,
    clickRate: 27.5,
    bounceRate: 2.3,
    unsubscribeRate: 0.8,
  };
}

/**
 * Notification templates for common scenarios
 */
export const NOTIFICATION_SCENARIOS = {
  gameRelease: (gameName: string, gameUrl: string) => ({
    type: 'game-release' as const,
    title: `🎮 New Game: ${gameName}`,
    message: `${gameName} is now available for download`,
    data: { gameUrl },
  }),
  
  achievement: (achievementName: string, points: number) => ({
    type: 'achievement' as const,
    title: `🏆 Achievement Unlocked!`,
    message: `You earned "${achievementName}" (+${points} points)`,
  }),
  
  recommendation: (gameName: string, gameUrl: string) => ({
    type: 'recommendation' as const,
    title: `💡 Recommended: ${gameName}`,
    message: `Based on your interests, you might like ${gameName}`,
    data: { gameUrl },
  }),
  
  communityReply: (userName: string, threadUrl: string) => ({
    type: 'community-reply' as const,
    title: `💬 New Reply from ${userName}`,
    message: `${userName} replied to your post`,
    data: { threadUrl },
  }),
  
  promotion: (title: string, promoUrl: string) => ({
    type: 'promotion' as const,
    title: `🎉 ${title}`,
    message: `Limited time offer available now`,
    data: { promoUrl },
  }),
};
