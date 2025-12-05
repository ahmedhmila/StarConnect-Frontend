"use client";

import React from 'react';
import { TrendingUp, Users, DollarSign, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl backdrop-blur-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-amber-500/10 rounded-lg">
        <Icon className="w-6 h-6 text-amber-500" />
      </div>
      <span className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {change}
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4 ml-1" /> : <ArrowDownRight className="w-4 h-4 ml-1" />}
      </span>
    </div>
    <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export default function AnalyticsOverview() {
  const stats = [
    { title: "Total Views", value: "2.4M", change: "+12.5%", trend: "up", icon: Eye },
    { title: "Active Subscribers", value: "14.2K", change: "+8.1%", trend: "up", icon: Users },
    { title: "Monthly Revenue", value: "$42.8K", change: "+23.4%", trend: "up", icon: DollarSign },
    { title: "Engagement Rate", value: "18.2%", change: "-2.1%", trend: "down", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Mock Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Overview</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((height, i) => (
              <div key={i} className="w-full bg-zinc-800 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-zinc-500">
            <span>Jan</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Platform Traffic</h3>
          <div className="space-y-4">
            {[
              { label: "Instagram", value: 85, color: "bg-pink-500" },
              { label: "TikTok", value: 65, color: "bg-cyan-500" },
              { label: "Twitter / X", value: 45, color: "bg-white" },
              { label: "Direct", value: 30, color: "bg-amber-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-300">{item.label}</span>
                  <span className="text-zinc-400">{item.value}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color}`} 
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
