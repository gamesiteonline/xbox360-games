/**
 * Media Integration Service
 * Handles game trailers, screenshots, galleries, and media management
 */

export interface GameMedia {
  gameId: string;
  coverArt: string;
  trailers: VideoTrailer[];
  screenshots: Screenshot[];
  gallery: GalleryItem[];
}

export interface VideoTrailer {
  id: string;
  title: string;
  url: string;
  platform: 'youtube' | 'vimeo' | 'custom';
  thumbnail: string;
  duration: number; // seconds
  views: number;
  uploadedAt: Date;
}

export interface Screenshot {
  id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  uploadedAt: Date;
  likes: number;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title?: string;
  description?: string;
  uploadedBy: number;
  uploadedAt: Date;
  views: number;
  likes: number;
}

/**
 * Get game media
 */
export function getGameMedia(gameId: string): GameMedia {
  return {
    gameId,
    coverArt: `https://api.example.com/games/${gameId}/cover.jpg`,
    trailers: getGameTrailers(gameId),
    screenshots: getGameScreenshots(gameId),
    gallery: getGameGallery(gameId),
  };
}

/**
 * Get game trailers from YouTube
 */
function getGameTrailers(gameId: string): VideoTrailer[] {
  return [
    {
      id: `trailer-${gameId}-1`,
      title: 'Official Gameplay Trailer',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      platform: 'youtube',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: 120,
      views: 45230,
      uploadedAt: new Date('2024-01-15'),
    },
    {
      id: `trailer-${gameId}-2`,
      title: 'Launch Trailer',
      url: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      platform: 'youtube',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
      duration: 90,
      views: 32150,
      uploadedAt: new Date('2024-01-10'),
    },
  ];
}

/**
 * Get game screenshots
 */
function getGameScreenshots(gameId: string): Screenshot[] {
  return [
    {
      id: `screenshot-${gameId}-1`,
      url: `https://api.example.com/games/${gameId}/screenshots/1.jpg`,
      thumbnail: `https://api.example.com/games/${gameId}/screenshots/1-thumb.jpg`,
      caption: 'Main gameplay screen',
      uploadedAt: new Date('2024-01-15'),
      likes: 234,
    },
    {
      id: `screenshot-${gameId}-2`,
      url: `https://api.example.com/games/${gameId}/screenshots/2.jpg`,
      thumbnail: `https://api.example.com/games/${gameId}/screenshots/2-thumb.jpg`,
      caption: 'Boss battle scene',
      uploadedAt: new Date('2024-01-15'),
      likes: 189,
    },
    {
      id: `screenshot-${gameId}-3`,
      url: `https://api.example.com/games/${gameId}/screenshots/3.jpg`,
      thumbnail: `https://api.example.com/games/${gameId}/screenshots/3-thumb.jpg`,
      caption: 'Beautiful landscape',
      uploadedAt: new Date('2024-01-15'),
      likes: 156,
    },
  ];
}

/**
 * Get user-generated gallery
 */
function getGameGallery(gameId: string): GalleryItem[] {
  return [
    {
      id: `gallery-${gameId}-1`,
      type: 'image',
      url: `https://api.example.com/gallery/${gameId}/1.jpg`,
      thumbnail: `https://api.example.com/gallery/${gameId}/1-thumb.jpg`,
      title: 'Amazing speedrun!',
      description: 'Completed in under 2 hours',
      uploadedBy: 123,
      uploadedAt: new Date('2024-01-14'),
      views: 890,
      likes: 145,
    },
    {
      id: `gallery-${gameId}-2`,
      type: 'video',
      url: 'https://www.youtube.com/embed/example',
      thumbnail: 'https://img.youtube.com/vi/example/maxresdefault.jpg',
      title: 'Gameplay highlights',
      description: 'Best moments from my playthrough',
      uploadedBy: 456,
      uploadedAt: new Date('2024-01-13'),
      views: 1240,
      likes: 234,
    },
  ];
}

/**
 * Upload media
 */
export interface MediaUploadResult {
  id: string;
  url: string;
  thumbnail: string;
  uploadedAt: Date;
}

export function uploadMedia(
  gameId: string,
  file: File,
  type: 'screenshot' | 'video',
  userId: number
): MediaUploadResult {
  const id = `media-${Date.now()}`;
  return {
    id,
    url: `https://api.example.com/media/${id}`,
    thumbnail: `https://api.example.com/media/${id}-thumb`,
    uploadedAt: new Date(),
  };
}

/**
 * Get media statistics
 */
export interface MediaStats {
  totalMediaItems: number;
  totalTrailers: number;
  totalScreenshots: number;
  totalGalleryItems: number;
  averageViews: number;
  averageLikes: number;
  mostViewedMedia: GalleryItem;
  mostLikedMedia: GalleryItem;
}

export function getMediaStats(gameId: string): MediaStats {
  return {
    totalMediaItems: 45,
    totalTrailers: 3,
    totalScreenshots: 12,
    totalGalleryItems: 30,
    averageViews: 1240,
    averageLikes: 156,
    mostViewedMedia: {
      id: 'media-1',
      type: 'video',
      url: 'https://example.com/video',
      thumbnail: 'https://example.com/thumb',
      title: 'Epic gameplay',
      uploadedBy: 123,
      uploadedAt: new Date(),
      views: 5420,
      likes: 890,
    },
    mostLikedMedia: {
      id: 'media-2',
      type: 'image',
      url: 'https://example.com/image',
      thumbnail: 'https://example.com/thumb',
      title: 'Beautiful scene',
      uploadedBy: 456,
      uploadedAt: new Date(),
      views: 3240,
      likes: 1240,
    },
  };
}

/**
 * YouTube integration
 */
export function getYouTubeTrailers(searchQuery: string): VideoTrailer[] {
  // In real implementation, call YouTube API
  return [];
}

/**
 * Media carousel component data
 */
export function getMediaCarousel(gameId: string) {
  const media = getGameMedia(gameId);
  return {
    items: [
      ...media.trailers.map(t => ({ ...t, type: 'trailer' as const })),
      ...media.screenshots.map(s => ({ ...s, type: 'screenshot' as const })),
    ],
    total: media.trailers.length + media.screenshots.length,
  };
}

/**
 * Media recommendations
 */
export function getRelatedMedia(gameId: string, limit: number = 5) {
  return {
    similarGames: [
      { gameId: 'game-1', title: 'Similar Game 1', mediaCount: 24 },
      { gameId: 'game-2', title: 'Similar Game 2', mediaCount: 18 },
      { gameId: 'game-3', title: 'Similar Game 3', mediaCount: 15 },
    ],
    trendingMedia: [
      { id: 'media-1', title: 'Trending video', views: 5420 },
      { id: 'media-2', title: 'Popular screenshot', views: 3240 },
    ],
  };
}
