import React, { useState } from 'react';
import {
  Globe2,
  Compass,
  TreePine,
  BarChart3,
  Layers,
  ShieldAlert,
  Info,
  Menu,
  X,
  CloudSun,
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, alertCount = 0, weather = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Globe2 },
    { id: 'regions', label: 'Regions', icon: Compass },
    { id: 'species', label: 'Species', icon: TreePine },
    { id: 'climate', label: 'Climate', icon: BarChart3 },
    { id: 'satellite', label: 'Satellite', icon: Layers },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: ShieldAlert,
      badge: alertCount > 0 ? alertCount : null,
    },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-emerald-500 transition-colors">
              🌱
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Pune BioWatch
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full font-medium">
                Regional Hub
              </span>
            </div>
          </div>

          {/* Desktop Pill Navigation (Shyen / Awsmd Segmented Control Style) */}
          <nav className="hidden lg:flex items-center bg-slate-100/80 p-1 rounded-full border border-slate-200/60 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Live Pune Weather Pill & Mobile Trigger */}
          <div className="flex items-center space-x-3">
            {weather?.current && (
              <div
                onClick={() => setActiveTab('climate')}
                className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer shadow-sm"
                title="Live Pune Meteorological Station"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-slate-900">{weather.current.temperature}°C</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 truncate max-w-[120px]">{weather.current.weather}</span>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
