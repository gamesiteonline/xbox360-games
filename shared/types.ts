/**
 * Shared game data types for all platforms
 */

export interface GameEntry {
  GameID: string;
  FileName: string;
  Extension: string;
  Platform: string;
  Genre: string;
  Rating: string;
  Description: string;
  Compatibility: string;
  Size: string;
  DownloadLink: string;
  CoverArtLink: string;
}

export interface GameFilters {
  search: string;
  genres: string[];
  extensions: string[];
  ratingMin: number;
  ratingMax: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface DownloadState {
  isDownloading: boolean;
  progress: number;
  gameId: string | null;
}
