/**
 * Gamification System
 * Handles achievements, leaderboards, levels, and rewards
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  condition: string;
}

export interface UserLevel {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  color: string;
}

// Achievement Definitions
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-download',
    name: 'First Step',
    description: 'Download your first game',
    icon: '🎮',
    points: 10,
    condition: 'downloadCount >= 1',
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Download 10 games',
    icon: '📚',
    points: 50,
    condition: 'downloadCount >= 10',
  },
  {
    id: 'enthusiast',
    name: 'Enthusiast',
    description: 'Download 50 games',
    icon: '🌟',
    points: 100,
    condition: 'downloadCount >= 50',
  },
  {
    id: 'reviewer',
    name: 'Reviewer',
    description: 'Write 5 reviews',
    icon: '✍️',
    points: 75,
    condition: 'reviewCount >= 5',
  },
  {
    id: 'critic',
    name: 'Critic',
    description: 'Write 20 reviews',
    icon: '📝',
    points: 150,
    condition: 'reviewCount >= 20',
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Get 10 likes on reviews',
    icon: '🦋',
    points: 100,
    condition: 'totalReviewLikes >= 10',
  },
  {
    id: 'community-leader',
    name: 'Community Leader',
    description: 'Get 100 likes on reviews',
    icon: '👑',
    points: 250,
    condition: 'totalReviewLikes >= 100',
  },
  {
    id: 'wishlist-master',
    name: 'Wishlist Master',
    description: 'Add 20 games to wishlist',
    icon: '💝',
    points: 75,
    condition: 'wishlistCount >= 20',
  },
  {
    id: 'speedrunner',
    name: 'Speedrunner',
    description: 'Download 5 games in one day',
    icon: '⚡',
    points: 125,
    condition: 'downloadsInOneDay >= 5',
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Download 100 games',
    icon: '🏆',
    points: 500,
    condition: 'downloadCount >= 100',
  },
];

// User Levels
export const USER_LEVELS: UserLevel[] = [
  { level: 1, title: 'Novice', minPoints: 0, maxPoints: 99, color: '#6B7280' },
  { level: 2, title: 'Gamer', minPoints: 100, maxPoints: 249, color: '#3B82F6' },
  { level: 3, title: 'Enthusiast', minPoints: 250, maxPoints: 499, color: '#8B5CF6' },
  { level: 4, title: 'Expert', minPoints: 500, maxPoints: 999, color: '#EC4899' },
  { level: 5, title: 'Master', minPoints: 1000, maxPoints: 1999, color: '#F59E0B' },
  { level: 6, title: 'Legend', minPoints: 2000, maxPoints: Infinity, color: '#10B981' },
];

export function getUserLevel(points: number): UserLevel {
  return USER_LEVELS.find(
    level => points >= level.minPoints && points <= level.maxPoints
  ) || USER_LEVELS[0];
}

export function getAchievementProgress(
  achievement: Achievement,
  userStats: any
): number {
  // Parse condition and calculate progress
  // This is a simplified version
  if (achievement.id === 'first-download') {
    return Math.min(100, (userStats.downloadCount / 1) * 100);
  }
  if (achievement.id === 'collector') {
    return Math.min(100, (userStats.downloadCount / 10) * 100);
  }
  if (achievement.id === 'enthusiast') {
    return Math.min(100, (userStats.downloadCount / 50) * 100);
  }
  if (achievement.id === 'reviewer') {
    return Math.min(100, (userStats.reviewCount / 5) * 100);
  }
  if (achievement.id === 'critic') {
    return Math.min(100, (userStats.reviewCount / 20) * 100);
  }
  if (achievement.id === 'social-butterfly') {
    return Math.min(100, (userStats.totalReviewLikes / 10) * 100);
  }
  if (achievement.id === 'community-leader') {
    return Math.min(100, (userStats.totalReviewLikes / 100) * 100);
  }
  if (achievement.id === 'wishlist-master') {
    return Math.min(100, (userStats.wishlistCount / 20) * 100);
  }
  if (achievement.id === 'speedrunner') {
    return Math.min(100, (userStats.downloadsInOneDay / 5) * 100);
  }
  if (achievement.id === 'completionist') {
    return Math.min(100, (userStats.downloadCount / 100) * 100);
  }
  return 0;
}

export function checkAchievementUnlocked(
  achievement: Achievement,
  userStats: any
): boolean {
  const progress = getAchievementProgress(achievement, userStats);
  return progress >= 100;
}

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  score: number;
  level: number;
  achievements: number;
}

export interface LeaderboardStats {
  totalUsers: number;
  topPlayers: LeaderboardEntry[];
  userRank?: number;
  userStats?: LeaderboardEntry;
}

export function generateLeaderboard(
  users: any[],
  currentUserId?: number
): LeaderboardStats {
  // Sort users by points
  const sorted = users
    .map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      username: user.name || 'Anonymous',
      score: user.points || 0,
      level: getUserLevel(user.points || 0).level,
      achievements: user.achievements?.length || 0,
    }))
    .sort((a, b) => b.score - a.score);

  const topPlayers = sorted.slice(0, 100);
  const userRank = currentUserId
    ? sorted.findIndex(u => u.userId === currentUserId) + 1
    : undefined;
  const userStats = currentUserId
    ? sorted.find(u => u.userId === currentUserId)
    : undefined;

  return {
    totalUsers: users.length,
    topPlayers,
    userRank,
    userStats,
  };
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  goal: number;
  reward: number;
  duration: 'daily' | 'weekly' | 'monthly';
  icon: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'daily-download',
    name: 'Daily Download',
    description: 'Download 1 game today',
    goal: 1,
    reward: 10,
    duration: 'daily',
    icon: '📥',
  },
  {
    id: 'weekly-reviewer',
    name: 'Weekly Reviewer',
    description: 'Write 2 reviews this week',
    goal: 2,
    reward: 50,
    duration: 'weekly',
    icon: '✍️',
  },
  {
    id: 'monthly-collector',
    name: 'Monthly Collector',
    description: 'Download 10 games this month',
    goal: 10,
    reward: 200,
    duration: 'monthly',
    icon: '📚',
  },
];

export function getChallengeProgress(
  challenge: Challenge,
  userStats: any
): number {
  if (challenge.id === 'daily-download') {
    return Math.min(100, (userStats.todayDownloads / 1) * 100);
  }
  if (challenge.id === 'weekly-reviewer') {
    return Math.min(100, (userStats.weeklyReviews / 2) * 100);
  }
  if (challenge.id === 'monthly-collector') {
    return Math.min(100, (userStats.monthlyDownloads / 10) * 100);
  }
  return 0;
}

export function isChallengeCompleted(
  challenge: Challenge,
  userStats: any
): boolean {
  return getChallengeProgress(challenge, userStats) >= 100;
}
