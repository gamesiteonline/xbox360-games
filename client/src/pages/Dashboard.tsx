import { useEffect, useState } from 'react';
import { TrendingUp, Star, Download, Eye, Zap } from 'lucide-react';

interface GameStat {
  gameId: string;
  gameName: string;
  downloadCount: number;
  viewCount: number;
  averageRating: number;
  reviewCount: number;
  wishlistCount: number;
}

export default function Dashboard() {
  const [topGames, setTopGames] = useState<GameStat[]>([]);
  const [trendingGames, setTrendingGames] = useState<GameStat[]>([]);
  const [recommendedGames, setRecommendedGames] = useState<GameStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading game stats
    setTimeout(() => {
      const mockStats: GameStat[] = [
        {
          gameId: '1',
          gameName: 'Commander Keen',
          downloadCount: 1250,
          viewCount: 5000,
          averageRating: 4.8,
          reviewCount: 145,
          wishlistCount: 320,
        },
        {
          gameId: '2',
          gameName: 'Doom',
          downloadCount: 2100,
          viewCount: 8500,
          averageRating: 4.9,
          reviewCount: 280,
          wishlistCount: 450,
        },
        {
          gameId: '3',
          gameName: 'Duke Nukem 3D',
          downloadCount: 1800,
          viewCount: 7200,
          averageRating: 4.7,
          reviewCount: 210,
          wishlistCount: 380,
        },
      ];

      setTopGames(mockStats);
      setTrendingGames([...mockStats].reverse());
      setRecommendedGames([...mockStats].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 500);
  }, []);

  const StatCard = ({ icon: Icon, label, value }: any) => (
    <div className="panel-crt">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dos-screen-light text-sm font-courier">{label}</p>
          <p className="text-2xl font-bold text-dos-screen font-courier">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-dos-screen opacity-30" />
      </div>
    </div>
  );

  const GameRow = ({ game, rank }: { game: GameStat; rank: number }) => (
    <div className="panel-crt hover:shadow-lg transition-all cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-dos-screen font-courier">#{rank}</span>
            <div>
              <h3 className="font-bold text-dos-screen font-courier">{game.gameName}</h3>
              <div className="flex items-center gap-4 mt-1 text-xs text-dos-screen-light">
                <span className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {game.downloadCount}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {game.viewCount}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {game.averageRating}/5
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-dos-screen mb-1">{game.reviewCount} reviews</div>
          <div className="text-xs text-dos-screen-light">{game.wishlistCount} wishlists</div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-dos-bg flex items-center justify-center">
        <div className="text-dos-screen font-courier animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dos-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dos-screen mb-2 font-courier">Game Statistics</h1>
          <p className="text-dos-screen-light font-courier">Real-time insights and trending games</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Download} label="Total Downloads" value="12.5K" />
          <StatCard icon={Eye} label="Total Views" value="48.2K" />
          <StatCard icon={Star} label="Avg Rating" value="4.8/5" />
          <StatCard icon={TrendingUp} label="Active Users" value="2.3K" />
        </div>

        {/* Top Games */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dos-screen mb-4 font-courier flex items-center gap-2">
            <Download className="w-6 h-6" />
            Most Downloaded
          </h2>
          <div className="space-y-3">
            {topGames.map((game, idx) => (
              <GameRow key={game.gameId} game={game} rank={idx + 1} />
            ))}
          </div>
        </div>

        {/* Trending Games */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dos-screen mb-4 font-courier flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Trending Now
          </h2>
          <div className="space-y-3">
            {trendingGames.map((game, idx) => (
              <GameRow key={game.gameId} game={game} rank={idx + 1} />
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="text-2xl font-bold text-dos-screen mb-4 font-courier flex items-center gap-2">
            <Star className="w-6 h-6" />
            Highest Rated
          </h2>
          <div className="space-y-3">
            {recommendedGames.map((game, idx) => (
              <GameRow key={game.gameId} game={game} rank={idx + 1} />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Download Trends */}
          <div className="panel-crt">
            <h3 className="text-lg font-bold text-dos-screen mb-4 font-courier">Download Trends</h3>
            <div className="h-40 bg-dos-bg/50 rounded flex items-center justify-center">
              <p className="text-dos-screen-light text-sm">Chart visualization coming soon</p>
            </div>
          </div>

          {/* Genre Distribution */}
          <div className="panel-crt">
            <h3 className="text-lg font-bold text-dos-screen mb-4 font-courier">Genre Distribution</h3>
            <div className="h-40 bg-dos-bg/50 rounded flex items-center justify-center">
              <p className="text-dos-screen-light text-sm">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
