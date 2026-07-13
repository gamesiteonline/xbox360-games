import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // User profile operations
  user: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return ctx.user;
    }),
    
    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
        avatar: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Update user profile in database
        return { success: true };
      }),

    getTheme: protectedProcedure.query(async ({ ctx }) => {
      return { theme: 'auto' };
    }),

    setTheme: protectedProcedure
      .input(z.enum(['light', 'dark', 'auto']))
      .mutation(async ({ input, ctx }) => {
        return { success: true, theme: input };
      }),
  }),

  // Wishlist operations
  wishlist: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserWishlist(ctx.user.id);
    }),

    add: protectedProcedure
      .input(z.object({
        gameId: z.string(),
        gameName: z.string(),
        gameImage: z.string().optional(),
        platform: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.addToWishlist(ctx.user.id, input.gameId, input.gameName, input.gameImage || '', input.platform);
        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ gameId: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await db.removeFromWishlist(ctx.user.id, input.gameId);
        return { success: true };
      }),

    isInWishlist: protectedProcedure
      .input(z.object({ gameId: z.string() }))
      .query(async ({ input, ctx }) => {
        const wishlistItems = await db.getUserWishlist(ctx.user.id);
        return wishlistItems.some(item => item.gameId === input.gameId);
      }),
  }),

  // Download history
  downloadHistory: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserDownloadHistory(ctx.user.id);
    }),

    add: protectedProcedure
      .input(z.object({
        gameId: z.string(),
        gameName: z.string(),
        fileName: z.string(),
        fileSize: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.addDownloadHistory(ctx.user.id, input.gameId, input.gameName, input.fileName, input.fileSize);
        await db.logActivity(ctx.user.id, 'download', input.gameId, input.gameName);
        return { success: true };
      }),
  }),

  // Game reviews
  reviews: router({
    getByGame: publicProcedure
      .input(z.object({ gameId: z.string() }))
      .query(async ({ input }) => {
        return await db.getGameReviews(input.gameId);
      }),

    getAverageRating: publicProcedure
      .input(z.object({ gameId: z.string() }))
      .query(async ({ input }) => {
        return await db.getAverageRating(input.gameId);
      }),

    create: protectedProcedure
      .input(z.object({
        gameId: z.string(),
        gameName: z.string(),
        rating: z.number().min(1).max(5),
        title: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.addGameReview(ctx.user.id, input.gameId, input.gameName, input.rating, input.title, input.content);
        return { success: true };
      }),
  }),

  // Game comments
  comments: router({
    getByGame: publicProcedure
      .input(z.object({ gameId: z.string() }))
      .query(async ({ input }) => {
        return await db.getGameComments(input.gameId);
      }),

    create: protectedProcedure
      .input(z.object({
        gameId: z.string(),
        gameName: z.string(),
        content: z.string(),
        parentCommentId: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.addGameComment(ctx.user.id, input.gameId, input.gameName, input.content, input.parentCommentId);
        return { success: true };
      }),
  }),

  // Game statistics
  stats: router({
    getTopGames: publicProcedure.query(async () => {
      return await db.getTopGames(10);
    }),

    incrementView: publicProcedure
      .input(z.object({ gameId: z.string(), gameName: z.string() }))
      .mutation(async ({ input }) => {
        const stats = await db.getOrCreateGameStats(input.gameId, input.gameName);
        await db.incrementGameStat(input.gameId, 'viewCount');
        return { success: true };
      }),

    incrementDownload: publicProcedure
      .input(z.object({ gameId: z.string(), gameName: z.string() }))
      .mutation(async ({ input }) => {
        const stats = await db.getOrCreateGameStats(input.gameId, input.gameName);
        await db.incrementGameStat(input.gameId, 'downloadCount');
        return { success: true };
      }),
  }),

  // Platform guides
  guides: router({
    getByPlatform: publicProcedure
      .input(z.object({ 
        platform: z.string(),
        category: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return await db.getPlatformGuides(input.platform, input.category);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getPlatformGuideBySlug(input.slug);
      }),
  }),

  // Blog posts
  blog: router({
    getPublished: publicProcedure.query(async () => {
      return await db.getPublishedBlogPosts(10);
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogPostBySlug(input.slug);
      }),
  }),

  // Newsletter
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.subscribeNewsletter(input.email, input.name);
        return { success: true };
      }),

    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await db.unsubscribeNewsletter(input.email);
        return { success: true };
      }),
  }),

  // Achievements
  achievements: router({
    getUser: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserAchievements(ctx.user.id);
    }),

    unlock: protectedProcedure
      .input(z.object({
        badge: z.string(),
        title: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.unlockAchievement(ctx.user.id, input.badge, input.title, input.description);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
