"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  Menu
} from 'lucide-react';
import AnalyticsOverview from '@/components/dashboard/AnalyticsOverview';
import SocialSyndicator from '@/components/dashboard/SocialSyndicator';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('jwt');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 hidden md:flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
            StarConnect
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Creator Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'syndication', label: 'Social Syndication', icon: MessageSquare },
            { id: 'fans', label: 'Fan Management', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.username}</p>
              <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm flex items-center justify-between px-6">
          <div className="md:hidden">
            <button className="p-2 text-zinc-400">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search analytics, fans, or messages..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {activeTab === 'overview' && (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h2>
                  <p className="text-zinc-400">Welcome back, {user.username}. Here's what's happening today.</p>
                </div>
                <AnalyticsOverview />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <SocialSyndicator />
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        { action: "New subscriber", user: "@sarah_j", time: "2m ago" },
                        { action: "Commented on post", user: "@mike_cool", time: "15m ago" },
                        { action: "Tip received ($50)", user: "@super_fan_99", time: "1h ago" },
                        { action: "Shared your story", user: "@jenny_w", time: "2h ago" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-zinc-300 font-medium">{item.user}</span>
                          <span className="text-zinc-500">{item.action}</span>
                          <span className="text-zinc-600 ml-auto text-xs">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'syndication' && (
              <div className="max-w-3xl mx-auto">
                <SocialSyndicator />
              </div>
            )}

            {/* Placeholders for other tabs */}
            {(activeTab === 'fans' || activeTab === 'settings') && (
              <div className="flex flex-col items-center justify-center h-96 text-zinc-500">
                <Settings className="w-12 h-12 mb-4 opacity-20" />
                <p>This module is currently under development.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
