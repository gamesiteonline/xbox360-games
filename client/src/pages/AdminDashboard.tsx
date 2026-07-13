import { useAuth } from '@/_core/hooks/useAuth';
import { useState } from 'react';
import { BarChart3, FileText, Users, Settings, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'users' | 'settings'>('overview');

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-dos-bg flex items-center justify-center px-4">
        <div className="panel-crt max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-dos-screen mx-auto mb-4" />
          <h1 className="text-xl font-bold text-dos-screen mb-2 font-courier">Access Denied</h1>
          <p className="text-dos-screen-light mb-4">
            You don't have permission to access the admin dashboard.
          </p>
          <a href="/" className="btn-crt px-6 py-2 inline-block">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dos-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dos-screen mb-2 font-courier">Admin Dashboard</h1>
          <p className="text-dos-screen-light font-courier">Manage content, users, and site settings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-dos-screen-dark flex-wrap">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
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
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-dos-screen mb-6 font-courier">Site Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-dos-bg/50 p-4 rounded border border-dos-screen">
                  <div className="text-3xl font-bold text-dos-screen mb-2">4,650</div>
                  <div className="text-sm text-dos-screen-light">Total Games</div>
                </div>
                <div className="bg-dos-bg/50 p-4 rounded border border-dos-screen">
                  <div className="text-3xl font-bold text-dos-screen mb-2">2,340</div>
                  <div className="text-sm text-dos-screen-light">Total Downloads</div>
                </div>
                <div className="bg-dos-bg/50 p-4 rounded border border-dos-screen">
                  <div className="text-3xl font-bold text-dos-screen mb-2">1,205</div>
                  <div className="text-sm text-dos-screen-light">Active Users</div>
                </div>
                <div className="bg-dos-bg/50 p-4 rounded border border-dos-screen">
                  <div className="text-3xl font-bold text-dos-screen mb-2">342</div>
                  <div className="text-sm text-dos-screen-light">Reviews</div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-dos-screen mb-4 font-courier">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-dos-bg/50 rounded border border-dos-screen-dark">
                    <span className="text-dos-screen-light text-sm">User registered: john_doe</span>
                    <span className="text-xs text-dos-screen-light/50">2 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-dos-bg/50 rounded border border-dos-screen-dark">
                    <span className="text-dos-screen-light text-sm">Game downloaded: Doom</span>
                    <span className="text-xs text-dos-screen-light/50">1 hour ago</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-dos-bg/50 rounded border border-dos-screen-dark">
                    <span className="text-dos-screen-light text-sm">Review posted: Duke Nukem 3D</span>
                    <span className="text-xs text-dos-screen-light/50">30 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-bold text-dos-screen mb-6 font-courier">Content Management</h2>
              <div className="space-y-4">
                <div className="p-4 bg-dos-bg/50 rounded border border-dos-screen">
                  <h3 className="font-bold text-dos-screen mb-2">Blog Posts</h3>
                  <p className="text-dos-screen-light text-sm mb-3">Manage blog posts and announcements</p>
                  <button className="btn-crt px-4 py-2 text-sm">Manage Blog</button>
                </div>
                <div className="p-4 bg-dos-bg/50 rounded border border-dos-screen">
                  <h3 className="font-bold text-dos-screen mb-2">Platform Guides</h3>
                  <p className="text-dos-screen-light text-sm mb-3">Edit setup guides and tutorials</p>
                  <button className="btn-crt px-4 py-2 text-sm">Manage Guides</button>
                </div>
                <div className="p-4 bg-dos-bg/50 rounded border border-dos-screen">
                  <h3 className="font-bold text-dos-screen mb-2">Game Reviews</h3>
                  <p className="text-dos-screen-light text-sm mb-3">Moderate and manage game reviews</p>
                  <button className="btn-crt px-4 py-2 text-sm">Review Submissions</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-dos-screen mb-6 font-courier">User Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dos-screen-dark">
                      <th className="text-left py-2 px-3 text-dos-screen font-bold">User</th>
                      <th className="text-left py-2 px-3 text-dos-screen font-bold">Email</th>
                      <th className="text-left py-2 px-3 text-dos-screen font-bold">Role</th>
                      <th className="text-left py-2 px-3 text-dos-screen font-bold">Joined</th>
                      <th className="text-left py-2 px-3 text-dos-screen font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dos-screen-dark/50">
                      <td className="py-2 px-3 text-dos-screen-light">John Doe</td>
                      <td className="py-2 px-3 text-dos-screen-light">john@example.com</td>
                      <td className="py-2 px-3"><span className="px-2 py-1 bg-dos-screen/20 rounded text-dos-screen text-xs">User</span></td>
                      <td className="py-2 px-3 text-dos-screen-light text-xs">2 days ago</td>
                      <td className="py-2 px-3"><button className="text-dos-screen hover:underline text-xs">Edit</button></td>
                    </tr>
                    <tr className="border-b border-dos-screen-dark/50">
                      <td className="py-2 px-3 text-dos-screen-light">Jane Smith</td>
                      <td className="py-2 px-3 text-dos-screen-light">jane@example.com</td>
                      <td className="py-2 px-3"><span className="px-2 py-1 bg-dos-screen/20 rounded text-dos-screen text-xs">User</span></td>
                      <td className="py-2 px-3 text-dos-screen-light text-xs">1 week ago</td>
                      <td className="py-2 px-3"><button className="text-dos-screen hover:underline text-xs">Edit</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-dos-screen mb-6 font-courier">Site Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-dos-screen mb-2">Site Title</label>
                  <input
                    type="text"
                    defaultValue="Gamesiteonline"
                    className="input-skeuomorphic w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dos-screen mb-2">Site Description</label>
                  <textarea
                    defaultValue="The ultimate retro gaming collection"
                    className="input-skeuomorphic w-full h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dos-screen mb-2">Maintenance Mode</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-dos-screen-light text-sm">Enable maintenance mode</span>
                  </label>
                </div>
                <button className="btn-crt px-6 py-2">Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
