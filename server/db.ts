import { eq, and, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, wishlist, downloadHistory, gameReviews, gameStats, gameComments, platformGuides, blogPosts, userAchievements, newsletterSubscribers, activityLog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Wishlist operations
export async function addToWishlist(userId: number, gameId: string, gameName: string, gameImage: string, platform: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(wishlist).values({
    userId,
    gameId,
    gameName,
    gameImage,
    platform,
  });
}

export async function removeFromWishlist(userId: number, gameId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(wishlist).where(
    and(eq(wishlist.userId, userId), eq(wishlist.gameId, gameId))
  );
}

export async function getUserWishlist(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(wishlist).where(eq(wishlist.userId, userId));
}

// Download history
export async function addDownloadHistory(userId: number, gameId: string, gameName: string, fileName: string, fileSize: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(downloadHistory).values({
    userId,
    gameId,
    gameName,
    fileName,
    fileSize,
  });
}

export async function getUserDownloadHistory(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(downloadHistory)
    .where(eq(downloadHistory.userId, userId))
    .orderBy(desc(downloadHistory.downloadedAt))
    .limit(limit);
}

// Game reviews
export async function addGameReview(userId: number, gameId: string, gameName: string, rating: number, title: string, content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(gameReviews).values({
    userId,
    gameId,
    gameName,
    rating,
    title,
    content,
    status: 'pending',
  });
}

export async function getGameReviews(gameId: string, limit = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(gameReviews)
    .where(and(eq(gameReviews.gameId, gameId), eq(gameReviews.status, 'approved')))
    .orderBy(desc(gameReviews.createdAt))
    .limit(limit);
}

export async function getAverageRating(gameId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select({
    avg: sql<number>`AVG(rating)`,
    count: sql<number>`COUNT(*)`,
  }).from(gameReviews)
    .where(and(eq(gameReviews.gameId, gameId), eq(gameReviews.status, 'approved')));
  
  return result[0] || { avg: 0, count: 0 };
}

// Game comments
export async function addGameComment(userId: number, gameId: string, gameName: string, content: string, parentCommentId?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(gameComments).values({
    userId,
    gameId,
    gameName,
    content,
    parentCommentId,
    status: 'pending',
  });
}

export async function getGameComments(gameId: string, limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(gameComments)
    .where(and(eq(gameComments.gameId, gameId), eq(gameComments.status, 'approved')))
    .orderBy(desc(gameComments.createdAt))
    .limit(limit);
}

// Game stats
export async function getOrCreateGameStats(gameId: string, gameName: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db.select().from(gameStats).where(eq(gameStats.gameId, gameId)).limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }
  
  await db.insert(gameStats).values({
    gameId,
    gameName,
  });
  
  return await db.select().from(gameStats).where(eq(gameStats.gameId, gameId)).limit(1);
}

export async function incrementGameStat(gameId: string, field: 'downloadCount' | 'viewCount') {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(gameStats)
    .set({
      [field]: sql`${field} + 1`,
    })
    .where(eq(gameStats.gameId, gameId));
}

export async function getTopGames(limit = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(gameStats)
    .orderBy(desc(gameStats.downloadCount))
    .limit(limit);
}

// Platform guides
export async function getPlatformGuides(platform: string, category?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const conditions = [eq(gameStats.gameId, platform), eq(platformGuides.published, true)];
  if (category) {
    conditions.push(eq(platformGuides.category, category));
  }
  
  return await db.select().from(platformGuides)
    .where(and(...conditions))
    .orderBy(asc(platformGuides.order));
}

export async function getPlatformGuideBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(platformGuides)
    .where(eq(platformGuides.slug, slug))
    .limit(1);
  
  return result[0] || null;
}

// Blog posts
export async function getPublishedBlogPosts(limit = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit);
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
}

// Newsletter
export async function subscribeNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(newsletterSubscribers).values({
    email,
    name,
    subscribed: true,
  });
}

export async function unsubscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(newsletterSubscribers)
    .set({ subscribed: false, unsubscribedAt: new Date() })
    .where(eq(newsletterSubscribers.email, email));
}

// Activity logging
export async function logActivity(userId: number, action: string, gameId: string, gameName: string, metadata?: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(activityLog).values({
    userId,
    action,
    gameId,
    gameName,
    metadata,
  });
}

// User achievements
export async function unlockAchievement(userId: number, badge: string, title: string, description?: string, icon?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(userAchievements).values({
    userId,
    badge,
    title,
    description,
    icon,
  });
}

export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(userAchievements)
    .where(eq(userAchievements.userId, userId));
}
