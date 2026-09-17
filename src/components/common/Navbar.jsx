import React, { useState } from 'react';
import { ShieldAlert, Compass, TreePine, BarChart3, Layers, Info, Menu, X, Globe2, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, alertCount = 10, weather = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Globe2 },
    { id: 'regions', label: 'Region Explorer', icon: Compass },
    { id: 'species', label: 'Species Database', icon: TreePine },
    { id: 'climate', label: 'Climate Dashboard', icon: BarChart3 },
    { id: 'satellite', label: 'Satellite Viewer', icon: Layers },
    {
      id: 'alerts',
      label: 'Admin Alerts',
      icon: ShieldAlert,
      badge: alertCount > 0 ? alertCount : null,
      badgeColor: 'bg-rose-500 text-white',
    },
    { id: 'about', label: 'About & Sighting', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-800">
      {/* Top agency metadata banner with live weather telemetry */}
      <div className="bg-emerald-950/95 text-emerald-300 text-xs px-4 py-1.5 border-b border-emerald-800/40 flex flex-wrap justify-between items-center tracking-wide font-mono gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>PUNE METROPOLITAN OBSERVATORY</span>
          {weather?.current && (
            <span className="hidden sm:inline bg-emerald-900/90 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700/60 font-semibold">
              LIVE: {weather.current.temperature}°C ({weather.current.weather}) • Hum: {weather.current.humidity}% • Wind: {weather.current.wind?.speed} m/s {weather.current.wind?.dir} • UV: {weather.current.uv_index}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3 text-emerald-400/90 text-[11px]">
          <span>LAT: 18.5204° N</span>
          <span>LNG: 73.8567° E</span>
          <span className="bg-emerald-800/50 text-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold">STATION ONLINE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand / Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Pune BioWatch
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-900/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700/60">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-tight">
                Biodiversity & Climate Impact Monitor
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-inner font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                        item.badgeColor || 'bg-slate-700 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.badgeColor}`}
                  >
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
