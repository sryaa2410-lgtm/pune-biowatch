import React from 'react';
import { Compass, TreePine, ArrowRight, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

export default function HeroSection({ setActiveTab, urgentAlert = null }) {
  return (
    <div className="relative pt-6 pb-10 text-center max-w-4xl mx-auto">
      {/* Delicate background blur elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-72 bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Modern pill tag */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium mb-6 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Pune District Ecological Observatory & Resilience System</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
        Climate intelligence for{' '}
        <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-8">
          Pune’s biodiversity.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8 text-balance">
        Synthesizing live microclimate telemetry, satellite land-cover observations, and species sensitivity indices across the Western Ghats crest to urban wetlands.
      </p>

      {/* Clean Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setActiveTab('regions')}
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm hover:shadow transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Regional Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setActiveTab('species')}
          className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs border border-slate-200/90 shadow-sm transition-all"
        >
          <TreePine className="w-4 h-4 text-emerald-600" />
          <span>Species Vulnerability Directory</span>
        </button>
      </div>

      {/* Subtle Urgent Directive Notice if active */}
      {urgentAlert && (
        <div className="mt-8 flex justify-center">
          <div
            onClick={() => setActiveTab('alerts')}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-800 text-xs cursor-pointer hover:bg-rose-100/70 transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-semibold text-rose-900">Priority Alert:</span>
            <span className="truncate max-w-xs">{urgentAlert.speciesName} in {urgentAlert.regionName}</span>
            <span className="text-rose-600 font-bold ml-1">→</span>
          </div>
        </div>
      )}
    </div>
  );
}
