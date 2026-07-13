import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Enhanced schema with user accounts, wishlists, reviews, and analytics
 */

// Core user table
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  bio: text("bio"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "moderator"]).default("user").notNull(),
  theme: mysqlEnum("theme", ["light", "dark", "auto"]).default("auto").notNull(),
  emailNotifications: boolean("emailNotifications").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Wishlist/Favorites
export const wishlist = mysqlTable("wishlist", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: varchar("gameId", { length: 64 }).notNull(),
  gameName: varchar("gameName", { length: 255 }).notNull(),
  gameImage: text("gameImage"),
  platform: varchar("platform", { length: 64 }).notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type Wishlist = typeof wishlist.$inferSelect;
export type InsertWishlist = typeof wishlist.$inferInsert;

// Download History
export const downloadHistory = mysqlTable("downloadHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: varchar("gameId", { length: 64 }).notNull(),
  gameName: varchar("gameName", { length: 255 }).notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileSize: varchar("fileSize", { length: 32 }).notNull(),
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
  downloadCount: int("downloadCount").default(1).notNull(),
});

export type DownloadHistory = typeof downloadHistory.$inferSelect;
export type InsertDownloadHistory = typeof downloadHistory.$inferInsert;

// Game Reviews & Ratings
export const gameReviews = mysqlTable("gameReviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: varchar("gameId", { length: 64 }).notNull(),
  gameName: varchar("gameName", { length: 255 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  helpfulCount: int("helpfulCount").default(0).notNull(),
  unhelpfulCount: int("unhelpfulCount").default(0).notNull(),
  isVerified: boolean("isVerified").default(false).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GameReview = typeof gameReviews.$inferSelect;
export type InsertGameReview = typeof gameReviews.$inferInsert;

// Game Comments
export const gameComments = mysqlTable("gameComments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: varchar("gameId", { length: 64 }).notNull(),
  gameName: varchar("gameName", { length: 255 }).notNull(),
  content: text("content").notNull(),
  parentCommentId: int("parentCommentId"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GameComment = typeof gameComments.$inferSelect;
export type InsertGameComment = typeof gameComments.$inferInsert;

// Game Statistics
export const gameStats = mysqlTable("gameStats", {
  id: int("id").autoincrement().primaryKey(),
  gameId: varchar("gameId", { length: 64 }).notNull().unique(),
  gameName: varchar("gameName", { length: 255 }).notNull(),
  downloadCount: int("downloadCount").default(0).notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: int("reviewCount").default(0).notNull(),
  wishlistCount: int("wishlistCount").default(0).notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
});

export type GameStats = typeof gameStats.$inferSelect;
export type InsertGameStats = typeof gameStats.$inferInsert;

// User Activity Log
export const activityLog = mysqlTable("activityLog", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  action: varchar("action", { length: 64 }).notNull(), // "download", "view", "review", "wishlist"
  gameId: varchar("gameId", { length: 64 }).notNull(),
  gameName: varchar("gameName", { length: 255 }).notNull(),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = typeof activityLog.$inferInsert;

// Newsletter Subscribers
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  subscribed: boolean("subscribed").default(true).notNull(),
  verificationToken: varchar("verificationToken", { length: 255 }),
  verifiedAt: timestamp("verifiedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// Platform Guides & Content
export const platformGuides = mysqlTable("platformGuides", {
  id: int("id").autoincrement().primaryKey(),
  platform: varchar("platform", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  category: varchar("category", { length: 64 }).notNull(), // "setup", "requirements", "troubleshooting", "faq"
  order: int("order").default(0).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlatformGuide = typeof platformGuides.$inferSelect;
export type InsertPlatformGuide = typeof platformGuides.$inferInsert;

// Blog Posts
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featuredImage"),
  author: varchar("author", { length: 255 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  tags: varchar("tags", { length: 255 }),
  published: boolean("published").default(false).notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// User Achievements/Badges
export const userAchievements = mysqlTable("userAchievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badge: varchar("badge", { length: 64 }).notNull(), // "collector", "reviewer", "downloader", etc
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: text("icon"),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;

// Analytics Events
export const analyticsEvents = mysqlTable("analyticsEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  eventType: varchar("eventType", { length: 64 }).notNull(),
  eventData: json("eventData"),
  userAgent: text("userAgent"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;
