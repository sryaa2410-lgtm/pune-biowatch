import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  TreePine,
  MapPin,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  CloudRain,
} from 'lucide-react';

export default function UnifiedTelemetryBento({
  weather = null,
  speciesCount = 18,
  regionsCount = 8,
  alertsCount = 10,
  criticalAlertsCount = 4,
  tempRise = '+1.42°C',
  setActiveTab,
}) {
  const current = weather?.current || {
    temperature: 28,
    feels_like: 30.2,
    weather: 'Mostly cloudy',
    humidity: 71,
    wind: { speed: 3.1, dir: 'W' },
    uv_index: 7.77,
    cloud_cover: 75,
  };

  const daily = weather?.daily || {
    summary: 'Mostly cloudy changing to rain showers in the afternoon. Temperature 22/30 °C.',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-8">
      {/* 1. Live Weather & Microclimate Station (7 Cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Live Pune Telemetry • Station MH-12
              </span>
            </div>
            <button
              onClick={() => setActiveTab('climate')}
              className="text-xs font-medium text-slate-500 hover:text-emerald-700 flex items-center space-x-1"
            >
              <span>Climate Trends</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Temperature & Condition */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
            <div className="flex items-baseline space-x-3">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 font-mono">
                {current.temperature}°
              </span>
              <div>
                <div className="text-base font-bold text-slate-800">{current.weather}</div>
                <div className="text-xs text-slate-500">
                  Feels like <span className="font-semibold text-slate-700">{current.feels_like}°C</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60 font-mono">
              Decadal Anomaly: <b className="text-amber-700">{tempRise}</b>
            </div>
          </div>

          {/* Micro-metrics Row */}
          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-2 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
              <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Humidity</div>
                <div className="text-xs font-bold text-slate-800">{current.humidity}%</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
              <Wind className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Wind</div>
                <div className="text-xs font-bold text-slate-800">
                  {current.wind?.speed} m/s {current.wind?.dir}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
              <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-medium">UV Index</div>
                <div className="text-xs font-bold text-rose-600">{current.uv_index} Alert</div>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast snippet */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-600">
          <CloudRain className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="truncate">{daily.summary}</span>
        </div>
      </div>

      {/* Right Column Stack (5 Cols) */}
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {/* 2. Species Under Watch Card */}
        <div
          onClick={() => setActiveTab('species')}
          className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Taxa Under Observation
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">{speciesCount}</span>
              <span className="text-xs text-slate-500">endemic & indicator species</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Tracking mammals, birds, amphibians, reptiles, and flora across 5 threat levels.
            </p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 flex">
            <div className="bg-rose-500 h-full w-[25%]" title="Critical (25%)"></div>
            <div className="bg-amber-500 h-full w-[45%]" title="High (45%)"></div>
            <div className="bg-emerald-500 h-full w-[30%]" title="Moderate (30%)"></div>
          </div>
        </div>

        {/* 3. Sub-Regions & Directives Combined Mini-Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Sub-Zones */}
          <div
            onClick={() => setActiveTab('regions')}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="text-[11px] font-mono text-slate-400 font-medium">Sub-Regions</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
              {regionsCount}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>Ghats to City</span>
            </div>
          </div>

          {/* Active Directives */}
          <div
            onClick={() => setActiveTab('alerts')}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="text-[11px] font-mono text-rose-500 font-medium">Active Directives</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
              {alertsCount}
            </div>
            <div className="text-[11px] text-rose-600 font-medium mt-1 flex items-center space-x-1">
              <ShieldAlert className="w-3 h-3" />
              <span>{criticalAlertsCount} Critical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
