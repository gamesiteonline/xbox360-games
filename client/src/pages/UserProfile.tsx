import { useAuth } from '@/_core/hooks/useAuth';
import { useState } from 'react';
import { User, Heart, Download, Trophy, Settings, LogOut } from 'lucide-react';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'downloads' | 'achievements'>('profile');

  if (!user) {
    return (
      <div className="min-h-screen bg-dos-bg flex items-center justify-center">
        <div className="panel-crt text-center">
          <p className="text-dos-screen font-courier mb-4">Please log in to view your profile</p>
          <button className="btn-crt px-6 py-2">Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dos-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="panel-crt mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-dos-screen rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-dos-bg" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dos-screen font-courier">{user.name}</h1>
                <p className="text-dos-screen-light text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="btn-crt px-4 py-2 flex items-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dos-bg/50 p-4 rounded border border-dos-screen">
              <div className="text-2xl font-bold text-dos-screen">0</div>
              <div className="text-xs text-dos-screen-light">Wishlist Items</div>
            </div>
            <div className="bg-dos-bg/50 p-4 rounded border border-dos-screen">
              <div className="text-2xl font-bold text-dos-screen">0</div>
              <div className="text-xs text-dos-screen-light">Downloads</div>
            </div>
            <div className="bg-dos-bg/50 p-4 rounded border border-dos-screen">
              <div className="text-2xl font-bold text-dos-screen">0</div>
              <div className="text-xs text-dos-screen-light">Achievements</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-dos-screen-dark">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'downloads', label: 'Downloads', icon: Download },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 flex items-center gap-2 font-courier text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-dos-screen border-b-2 border-dos-screen'
                  : 'text-dos-screen-light hover:text-dos-screen'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="panel-crt">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold text-dos-screen mb-6 font-courier">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-dos-screen mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name || ''}
                    className="input-skeuomorphic w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dos-screen mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email || ''}
                    disabled
                    className="input-skeuomorphic w-full opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dos-screen mb-2">Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    className="input-skeuomorphic w-full h-24"
                  />
                </div>
                <button className="btn-crt px-6 py-2">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-xl font-bold text-dos-screen mb-6 font-courier">My Wishlist</h2>
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-dos-screen-light/50 mx-auto mb-4" />
                <p className="text-dos-screen-light">No games in your wishlist yet</p>
              </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div>
              <h2 className="text-xl font-bold text-dos-screen mb-6 font-courier">Download History</h2>
              <div className="text-center py-12">
                <Download className="w-12 h-12 text-dos-screen-light/50 mx-auto mb-4" />
                <p className="text-dos-screen-light">No downloads yet</p>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-xl font-bold text-dos-screen mb-6 font-courier">Achievements</h2>
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-dos-screen-light/50 mx-auto mb-4" />
                <p className="text-dos-screen-light">No achievements yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
