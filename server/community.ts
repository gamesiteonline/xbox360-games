/**
 * Community Features
 * Real-time chat, forums, and discussion system
 */

export interface ChatMessage {
  id: string;
  userId: number;
  username: string;
  gameId?: string;
  forumId?: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: ChatMessage[];
}

export interface Forum {
  id: string;
  gameId: string;
  gameName: string;
  title: string;
  description: string;
  createdAt: Date;
  messageCount: number;
  participants: number;
}

export interface DiscussionThread {
  id: string;
  forumId: string;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  replies: number;
  likes: number;
  pinned: boolean;
}

export interface CommunityStats {
  totalMessages: number;
  activeUsers: number;
  totalForums: number;
  totalThreads: number;
  averageResponseTime: number; // in minutes
}

/**
 * Get active forums for a game
 */
export function getGameForums(gameId: string): Forum[] {
  // In real implementation, fetch from database
  return [
    {
      id: `forum-${gameId}-general`,
      gameId,
      gameName: 'Game Name',
      title: 'General Discussion',
      description: 'Talk about anything related to this game',
      createdAt: new Date(),
      messageCount: 150,
      participants: 45,
    },
    {
      id: `forum-${gameId}-tips`,
      gameId,
      gameName: 'Game Name',
      title: 'Tips & Tricks',
      description: 'Share strategies and tips',
      createdAt: new Date(),
      messageCount: 89,
      participants: 32,
    },
    {
      id: `forum-${gameId}-bugs`,
      gameId,
      gameName: 'Game Name',
      title: 'Bug Reports',
      description: 'Report and discuss bugs',
      createdAt: new Date(),
      messageCount: 23,
      participants: 18,
    },
  ];
}

/**
 * Get community statistics
 */
export function getCommunityStats(): CommunityStats {
  return {
    totalMessages: 15420,
    activeUsers: 3240,
    totalForums: 450,
    totalThreads: 8920,
    averageResponseTime: 12,
  };
}

/**
 * Get trending discussions
 */
export function getTrendingDiscussions(): DiscussionThread[] {
  return [
    {
      id: 'thread-1',
      forumId: 'forum-1',
      title: 'Best strategies for beginners',
      content: 'I just started playing and need help...',
      authorId: 123,
      authorName: 'NewPlayer',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000),
      views: 342,
      replies: 18,
      likes: 45,
      pinned: false,
    },
    {
      id: 'thread-2',
      forumId: 'forum-2',
      title: 'Game crashes on level 5',
      content: 'Anyone else experiencing this bug?',
      authorId: 456,
      authorName: 'GamerPro',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      views: 289,
      replies: 12,
      likes: 28,
      pinned: true,
    },
  ];
}

/**
 * Get user's recent activity
 */
export function getUserActivity(userId: number) {
  return {
    recentMessages: 12,
    forumPosts: 5,
    threadsCreated: 2,
    likes: 34,
    followers: 18,
    following: 42,
  };
}

/**
 * Get community guidelines
 */
export const COMMUNITY_GUIDELINES = {
  rules: [
    'Be respectful and courteous to all members',
    'No spam, advertising, or self-promotion',
    'No hate speech, discrimination, or harassment',
    'No sharing of pirated content or illegal material',
    'Keep discussions on-topic',
    'No excessive profanity',
    'Respect intellectual property rights',
    'No trolling or intentional disruption',
  ],
  moderationPolicy: {
    warning: 'First offense - warning',
    tempBan: 'Second offense - 24 hour temporary ban',
    permBan: 'Third offense - permanent ban',
  },
};

/**
 * Moderation system
 */
export interface ModerationAction {
  id: string;
  userId: number;
  action: 'warning' | 'mute' | 'ban';
  reason: string;
  duration?: number; // in hours
  createdAt: Date;
}

export function reportContent(
  contentId: string,
  contentType: 'message' | 'thread' | 'review',
  reason: string,
  reportedBy: number
) {
  return {
    reportId: `report-${Date.now()}`,
    contentId,
    contentType,
    reason,
    reportedBy,
    status: 'pending',
    createdAt: new Date(),
  };
}

/**
 * User reputation system
 */
export interface UserReputation {
  userId: number;
  reputation: number;
  trustLevel: 'new' | 'member' | 'trusted' | 'moderator';
  badges: string[];
  warnings: number;
}

export function calculateReputation(userStats: any): UserReputation {
  const reputation =
    userStats.helpfulVotes * 10 +
    userStats.threadsCreated * 5 +
    userStats.reviewsWritten * 3 -
    userStats.warnings * 20;

  let trustLevel: 'new' | 'member' | 'trusted' | 'moderator' = 'new';
  if (reputation >= 100) trustLevel = 'member';
  if (reputation >= 500) trustLevel = 'trusted';
  if (reputation >= 1000) trustLevel = 'moderator';

  return {
    userId: userStats.id,
    reputation: Math.max(0, reputation),
    trustLevel,
    badges: generateBadges(userStats),
    warnings: userStats.warnings || 0,
  };
}

function generateBadges(userStats: any): string[] {
  const badges: string[] = [];
  if (userStats.threadsCreated > 10) badges.push('contributor');
  if (userStats.helpfulVotes > 50) badges.push('helpful');
  if (userStats.reviewsWritten > 20) badges.push('reviewer');
  return badges;
}

/**
 * Notification system for community
 */
export interface CommunityNotification {
  id: string;
  userId: number;
  type: 'reply' | 'mention' | 'like' | 'follow';
  fromUser: string;
  content: string;
  link: string;
  read: boolean;
  createdAt: Date;
}

export function createNotification(
  userId: number,
  type: 'reply' | 'mention' | 'like' | 'follow',
  fromUser: string,
  content: string,
  link: string
): CommunityNotification {
  return {
    id: `notif-${Date.now()}`,
    userId,
    type,
    fromUser,
    content,
    link,
    read: false,
    createdAt: new Date(),
  };
}
