import { useEffect, useState, useMemo } from 'react';
import { Loader2, Search, Download, Info } from 'lucide-react';
import type { GameEntry, GameFilters } from '@shared/types';

interface GameWithRating extends GameEntry {
  ratingNum: number;
}

export default function Home() {
  const [games, setGames] = useState<GameWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<GameFilters>({
    search: '',
    genres: [],
    extensions: [],
    ratingMin: 0,
    ratingMax: 10,
  });
  const [selectedGame, setSelectedGame] = useState<GameWithRating | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadCountdown, setDownloadCountdown] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Load games from GitHub
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://raw.githubusercontent.com/gamesiteonline/game-database/master/XBOX_360.json'
        );
        if (!response.ok) throw new Error('Failed to load games');
        const data = await response.json();
        
        // Parse ratings to numbers
        const parsedGames = data.map((game: GameEntry) => ({
          ...game,
          ratingNum: parseFloat(game.Rating.split('/')[0]) || 0,
        }));
        
        setGames(parsedGames);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load games');
        console.error('Error loading games:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Get unique genres and extensions
  const { genres, extensions } = useMemo(() => {
    const genreSet = new Set<string>();
    const extSet = new Set<string>();
    
    games.forEach(game => {
      game.Genre.split(',').forEach(g => genreSet.add(g.trim()));
      extSet.add(game.Extension);
    });
    
    return {
      genres: Array.from(genreSet).sort(),
      extensions: Array.from(extSet).sort(),
    };
  }, [games]);

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // Search filter
      if (filters.search && !game.FileName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Genre filter
      if (filters.genres.length > 0) {
        const gameGenres = game.Genre.split(',').map(g => g.trim());
        if (!filters.genres.some(g => gameGenres.includes(g))) {
          return false;
        }
      }
      
      // Extension filter
      if (filters.extensions.length > 0 && !filters.extensions.includes(game.Extension)) {
        return false;
      }
      
      // Rating filter
      if (game.ratingNum < filters.ratingMin || game.ratingNum > filters.ratingMax) {
        return false;
      }
      
      return true;
    });
  }, [games, filters]);

  // Paginate
  const totalPages = Math.ceil(filteredGames.length / pageSize);
  const paginatedGames = filteredGames.slice((page - 1) * pageSize, page * pageSize);

  // Handle download with countdown
  const handleDownload = (game: GameWithRating) => {
    setDownloading(game.GameID);
    setDownloadCountdown(3);
    
    const interval = setInterval(() => {
      setDownloadCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Trigger actual download
          const link = document.createElement('a');
          link.href = game.DownloadLink;
          link.download = `${game.FileName}.${game.Extension}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setDownloading(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="crt-scanlines min-h-screen bg-dos-bg">
      {/* CRT Bezel Container */}
      <div className="crt-bezel m-4 md:m-8">
        <div className="crt-screen">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 glow-pulse font-courier">
              XBOX 360 COLLECTION
            </h1>
            <h2 className="text-xl mb-4 font-courier">XBOX 360 GAMES</h2>
            <p className="text-sm opacity-75 font-courier">
              Retro Gaming Collection | By Fahad | Tanzania
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4" />
              <input
                type="text"
                placeholder="Search games..."
                value={filters.search}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value });
                  setPage(1);
                }}
                className="input-skeuomorphic w-full pl-8 py-2 font-courier"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="panel-crt mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-bold mb-2">Genre:</label>
                <select
                  multiple
                  value={filters.genres}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFilters({ ...filters, genres: selected });
                    setPage(1);
                  }}
                  className="input-skeuomorphic w-full py-2 px-2 font-courier text-xs"
                  size={4}
                >
                  {genres.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Extension Filter */}
              <div>
                <label className="block text-sm font-bold mb-2">Format:</label>
                <select
                  multiple
                  value={filters.extensions}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFilters({ ...filters, extensions: selected });
                    setPage(1);
                  }}
                  className="input-skeuomorphic w-full py-2 px-2 font-courier text-xs"
                  size={4}
                >
                  {extensions.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-bold mb-2">Rating:</label>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs">Min: {filters.ratingMin.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={filters.ratingMin}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setFilters({ ...filters, ratingMin: val });
                        setPage(1);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs">Max: {filters.ratingMax.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={filters.ratingMax}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setFilters({ ...filters, ratingMax: val });
                        setPage(1);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-4 text-sm font-courier">
            Showing {paginatedGames.length > 0 ? (page - 1) * pageSize + 1 : 0} - {Math.min(page * pageSize, filteredGames.length)} of {filteredGames.length} games
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="panel-crt bg-red-900 border-red-500 mb-4">
              <p className="text-red-300">Error: {error}</p>
            </div>
          )}

          {/* Games Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {paginatedGames.map(game => (
                <div
                  key={game.GameID}
                  className="game-card-crt group"
                  onClick={() => setSelectedGame(game)}
                >
                  {/* Cover Art */}
                  <div className="mb-3 aspect-video bg-dos-bezel rounded overflow-hidden">
                    <img
                      src={game.CoverArtLink}
                      alt={game.FileName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%2300ff00" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm mb-1 truncate font-courier">
                    {game.FileName}
                  </h3>

                  {/* Rating */}
                  <div className="flex justify-between items-center mb-2 text-xs font-courier">
                    <span>Rating: {game.Rating}</span>
                    <span className="badge-skeuomorphic">{game.Extension}</span>
                  </div>

                  {/* Size */}
                  <div className="text-xs opacity-75 mb-3 font-courier">
                    Size: {game.Size}
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(game);
                    }}
                    disabled={downloading === game.GameID}
                    className="btn-crt w-full text-sm py-1 disabled:opacity-50"
                  >
                    {downloading === game.GameID ? (
                      <span>{downloadCountdown}...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-6 font-courier">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="btn-crt px-4 py-2 disabled:opacity-50"
              >
                ← Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = page - 2 + i;
                  if (pageNum < 1) pageNum = i + 1;
                  if (pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`btn-crt px-3 py-1 ${page === pageNum ? 'opacity-100' : 'opacity-60'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="btn-crt px-4 py-2 disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-dos-screen-dark pt-6 mt-6 text-center text-xs font-courier opacity-75">
            <p className="mb-2">Gamesiteonline © 2026 | Owner: Fahad | Tanzania</p>
            <div className="flex justify-center gap-4 mb-2">
              <a href="https://wa.me/qr/FYVTX2AFYSUVH1" target="_blank" rel="noopener noreferrer" className="hover:text-dos-screen">
                WhatsApp
              </a>
              <a href="https://whatsapp.com/channel/0029VbChyDUI1rcht5jajL3q" target="_blank" rel="noopener noreferrer" className="hover:text-dos-screen">
                Channel
              </a>
              <a href="https://www.instagram.com/ard.sing?igsh=NnQ3ZWVmYXh4b2Zn" target="_blank" rel="noopener noreferrer" className="hover:text-dos-screen">
                Instagram
              </a>
              <a href="https://www.threads.com/@ard.sing" target="_blank" rel="noopener noreferrer" className="hover:text-dos-screen">
                Threads
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="modal-crt max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-courier">{selectedGame.FileName}</h2>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="btn-crt px-3 py-1 text-sm"
                >
                  Close
                </button>
              </div>

              {/* Cover Art */}
              <div className="mb-4 aspect-video bg-dos-bezel rounded overflow-hidden">
                <img
                  src={selectedGame.CoverArtLink}
                  alt={selectedGame.FileName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%2300ff00" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm font-courier">
                <div className="panel-crt">
                  <label className="font-bold block mb-1">Platform:</label>
                  <p>{selectedGame.Platform}</p>
                </div>
                <div className="panel-crt">
                  <label className="font-bold block mb-1">Genre:</label>
                  <p>{selectedGame.Genre}</p>
                </div>
                <div className="panel-crt">
                  <label className="font-bold block mb-1">Rating:</label>
                  <p>{selectedGame.Rating}</p>
                </div>
                <div className="panel-crt">
                  <label className="font-bold block mb-1">Size:</label>
                  <p>{selectedGame.Size}</p>
                </div>
              </div>

              {/* Description */}
              <div className="panel-crt mb-4">
                <label className="font-bold block mb-2">Description:</label>
                <p className="text-sm">{selectedGame.Description}</p>
              </div>

              {/* Compatibility */}
              <div className="panel-crt mb-6">
                <label className="font-bold block mb-2">Compatibility:</label>
                <p className="text-sm">{selectedGame.Compatibility}</p>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(selectedGame)}
                disabled={downloading === selectedGame.GameID}
                className="btn-crt w-full py-3 text-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {downloading === selectedGame.GameID ? (
                  <span>Downloading in {downloadCountdown}...</span>
                ) : (
                  <span>Download Now</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
