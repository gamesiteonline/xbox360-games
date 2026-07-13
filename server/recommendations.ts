import { getDb } from './db';
import { eq, inArray } from 'drizzle-orm';

interface GameRecommendation {
  gameId: string;
  score: number;
  reason: string;
}

/**
 * AI Recommendation Engine
 * Uses collaborative filtering and content-based recommendations
 */

export async function getRecommendedGames(
  userId: number,
  limit: number = 10
): Promise<GameRecommendation[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    // Get user's download history
    const userDownloads = await db.query.downloadHistory.findMany({
      where: (dh) => eq(dh.userId, userId),
      limit: 50,
    });

    if (userDownloads.length === 0) {
      return getPopularGames(limit);
    }

    // Get genres from downloaded games
    const downloadedGameIds = userDownloads.map(d => d.gameId);
    const userGenres = new Map<string, number>();

    // Score genres based on user's downloads
    for (const download of userDownloads) {
      // In real implementation, fetch game genres from database
      // For now, we'll use a simple scoring system
    }

    // Find similar games
    const recommendations: GameRecommendation[] = [];

    // Collaborative filtering: Find users with similar taste
    const similarUsers = await findSimilarUsers(userId, downloadedGameIds);

    // Get games liked by similar users
    for (const similarUser of similarUsers) {
      const similarUserDownloads = await db.query.downloadHistory.findMany({
        where: (dh) => eq(dh.userId, similarUser.userId),
      });

      for (const download of similarUserDownloads) {
        if (!downloadedGameIds.includes(download.gameId)) {
          const existing = recommendations.find(r => r.gameId === download.gameId);
          if (existing) {
            existing.score += similarUser.similarity * 10;
          } else {
            recommendations.push({
              gameId: download.gameId,
              score: similarUser.similarity * 10,
              reason: 'Users like you also enjoyed this',
            });
          }
        }
      }
    }

    // Sort by score and return top N
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  } catch (error) {
    console.error('Recommendation engine error:', error);
    return getPopularGames(limit);
  }
}

export async function getTrendingGames(
  limit: number = 10,
  timeframeHours: number = 24
): Promise<GameRecommendation[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const cutoffTime = new Date(Date.now() - timeframeHours * 60 * 60 * 1000);

    // Get recent downloads
    const recentDownloads = await db.query.downloadHistory.findMany({
      where: (dh) => dh.downloadedAt && dh.downloadedAt > cutoffTime,
    });

    // Count downloads per game
    const gameDownloadCounts = new Map<string, number>();
    for (const download of recentDownloads) {
      const count = gameDownloadCounts.get(download.gameId) || 0;
      gameDownloadCounts.set(download.gameId, count + 1);
    }

    // Convert to recommendations
    const recommendations = Array.from(gameDownloadCounts.entries())
      .map(([gameId, count]) => ({
        gameId,
        score: count,
        reason: `Trending now - ${count} downloads in last ${timeframeHours}h`,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return recommendations;
  } catch (error) {
    console.error('Trending games error:', error);
    return [];
  }
}

export async function getPopularGames(limit: number = 10): Promise<GameRecommendation[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const stats = await db.query.gameStats.findMany({
      orderBy: (gs) => gs.downloadCount,
      limit,
    });

    return stats.map(stat => ({
      gameId: stat.gameId,
      score: stat.downloadCount,
      reason: 'Most downloaded game',
    }));
  } catch (error) {
    console.error('Popular games error:', error);
    return [];
  }
}

export async function getHighestRatedGames(limit: number = 10): Promise<GameRecommendation[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const stats = await db.query.gameStats.findMany({
      orderBy: (gs) => gs.averageRating,
      limit,
    });

    return stats
      .filter(s => s.reviewCount > 5) // Only games with enough reviews
      .map(stat => ({
        gameId: stat.gameId,
        score: stat.averageRating * 10,
        reason: `Highly rated - ${stat.averageRating}/5 stars`,
      }))
      .slice(0, limit);
  } catch (error) {
    console.error('Highest rated games error:', error);
    return [];
  }
}

interface SimilarUser {
  userId: number;
  similarity: number;
}

async function findSimilarUsers(
  userId: number,
  userGameIds: string[]
): Promise<SimilarUser[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    // Get all users
    const allUsers = await db.query.users.findMany();

    const similarUsers: SimilarUser[] = [];

    for (const user of allUsers) {
      if (user.id === userId) continue;

      // Get their downloads
      const theirDownloads = await db.query.downloadHistory.findMany({
        where: (dh) => eq(dh.userId, user.id),
      });

      const theirGameIds = theirDownloads.map(d => d.gameId);

      // Calculate Jaccard similarity
      const intersection = userGameIds.filter(g => theirGameIds.includes(g)).length;
      const union = new Set([...userGameIds, ...theirGameIds]).size;
      const similarity = union > 0 ? intersection / union : 0;

      if (similarity > 0.1) {
        similarUsers.push({
          userId: user.id,
          similarity,
        });
      }
    }

    return similarUsers.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
  } catch (error) {
    console.error('Find similar users error:', error);
    return [];
  }
}

/**
 * Content-based recommendation
 * Recommends games similar to ones the user has downloaded
 */
export async function getContentBasedRecommendations(
  userId: number,
  limit: number = 10
): Promise<GameRecommendation[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const userDownloads = await db.query.downloadHistory.findMany({
      where: (dh) => eq(dh.userId, userId),
      limit: 20,
    });

    if (userDownloads.length === 0) {
      return getPopularGames(limit);
    }

    // In a real implementation, you would:
    // 1. Get genres/tags for downloaded games
    // 2. Find other games with similar genres/tags
    // 3. Score them based on similarity

    // For now, return popular games as fallback
    return getPopularGames(limit);
  } catch (error) {
    console.error('Content-based recommendation error:', error);
    return [];
  }
}
