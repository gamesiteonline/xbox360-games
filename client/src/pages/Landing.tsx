import { Download, Gamepad2, Zap, Trophy } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Landing() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(80,230,255,0.03)_0px,rgba(80,230,255,0.03)_1px,transparent_1px,transparent_2px)]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block px-6 py-2 border-2 border-green-500 rounded-sm text-green-400 text-sm font-bold uppercase tracking-widest">
            XBOX 360 COLLECTION
          </div>
          <h1 className="text-7xl font-bold mb-6 text-green-400 drop-shadow-lg" style={{textShadow: '0 0 20px rgba(16, 124, 16, 0.5)'}}>
            XBOX 360 GAMES
          </h1>
          <p className="text-2xl text-green-300 mb-8 max-w-2xl mx-auto">
            Thousands of Xbox 360 titles. Download, play, and relive the golden era of gaming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => navigate('/games')} className="px-8 py-4 bg-green-600 text-white font-bold text-lg border-2 border-green-400 hover:bg-green-500 transition-all uppercase tracking-wider">
              <Download className="inline mr-2 w-5 h-5" /> BROWSE GAMES
            </button>
            <button onClick={() => navigate('/guides')} className="px-8 py-4 bg-slate-700 text-white font-bold text-lg border-2 border-green-500 hover:border-green-400 transition-all uppercase tracking-wider">
              <Zap className="inline mr-2 w-5 h-5" /> LEARN MORE
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-6 border-2 border-green-500 bg-slate-900/50">
              <div className="text-3xl font-bold text-green-400 mb-2">5K+</div>
              <div className="text-sm text-green-300">Games</div>
            </div>
            <div className="p-6 border-2 border-green-500 bg-slate-900/50">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-sm text-green-300">Free</div>
            </div>
            <div className="p-6 border-2 border-green-500 bg-slate-900/50">
              <div className="text-3xl font-bold text-green-400 mb-2">HD</div>
              <div className="text-sm text-green-300">Quality</div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-green-900 py-8 px-4 text-center text-green-400 text-sm">
        <p>© 2026 Gamesiteonline • Fahad • Tanzania</p>
      </footer>
    </div>
  );
}
