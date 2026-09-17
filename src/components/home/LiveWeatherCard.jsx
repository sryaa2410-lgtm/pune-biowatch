import React from 'react';
import {
  CloudSun,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  Compass,
  Gauge,
  CloudRain,
  Sunset,
  Sunrise,
  Activity,
  AlertTriangle,
} from 'lucide-react';

export default function LiveWeatherCard({ weather }) {
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const daily = weather.daily || {};
  const hourly = weather.hourly || {};
  const astro = daily.astro?.sun || {};

  const isHighUv = current.uv_index >= 7;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-slate-700/80 shadow-xl text-white p-6 relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-5">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-700/60 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Pune Regional Live Meteorological Telemetry
                </h3>
                <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 animate-pulse">
                  Live Feed
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                API place_id: <span className="text-emerald-400">pune</span> • Units: metric • Timezone: Asia/Kolkata
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-slate-300 self-start sm:self-auto">
            <span className="flex items-center space-x-1">
              <Sunrise className="w-3.5 h-3.5 text-amber-400" />
              <span>{astro.rise ? astro.rise.slice(11, 16) : '06:22'} IST</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Sunset className="w-3.5 h-3.5 text-orange-400" />
              <span>{astro.set ? astro.set.slice(11, 16) : '18:36'} IST</span>
            </span>
          </div>
        </div>

        {/* Core Weather Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Temp & Condition (5 cols) */}
          <div className="md:col-span-5 flex items-center space-x-5">
            <div className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-mono flex items-start">
              <span>{current.temperature}</span>
              <span className="text-2xl text-emerald-400 mt-1 font-sans">°C</span>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-300 capitalize flex items-center space-x-2">
                <span>{current.weather || 'Mostly cloudy'}</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Feels like <b className="text-slate-200">{current.feels_like}°C</b> • Dew Pt: {current.dew_point}°C
              </div>
              <div className="text-xs text-slate-400">
                Today: Min <b className="text-slate-300">{daily.all_day?.temperature_min || 22.2}°C</b> / Max <b className="text-slate-300">{daily.all_day?.temperature_max || 29.5}°C</b>
              </div>
            </div>
          </div>

          {/* Daily Outlook Banner (7 cols) */}
          <div className="md:col-span-7 bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/80">
            <div className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-1 flex items-center space-x-1.5">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
              <span>Meteorological Forecast & Ecological Outlook</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {daily.summary || 'Mostly cloudy changing to rain showers in the afternoon. Temperature 22/30 °C.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-slate-400">
              <span className="text-cyan-300">
                Rain Probability: <b>{hourly.probability?.precipitation || 30}% (Afternoon peak)</b>
              </span>
              <span>•</span>
              <span>Cloud Cover: <b>{current.cloud_cover}%</b></span>
              <span>•</span>
              <span>Solar Irradiance: <b>{current.irradiance} W/m²</b></span>
            </div>
          </div>
        </div>

        {/* Grid of Micro-Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-800 text-xs">
          {/* Humidity */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>Humidity</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {current.humidity}%
            </div>
            <span className="text-[10px] text-slate-400">High ambient</span>
          </div>

          {/* Wind Speed & Dir */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
              <Wind className="w-3.5 h-3.5 text-teal-400" />
              <span>Wind Speed</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {current.wind?.speed} <span className="text-xs font-normal">m/s</span>
            </div>
            <span className="text-[10px] text-slate-400">
              {current.wind?.dir} ({current.wind?.angle}°) • Gusts {current.wind?.gusts}
            </span>
          </div>

          {/* UV Index */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>UV Index</span>
            </div>
            <div className={`text-lg font-bold font-mono mt-1 ${isHighUv ? 'text-rose-400' : 'text-amber-300'}`}>
              {current.uv_index}
            </div>
            <span className="text-[10px] text-rose-400 font-semibold">
              {isHighUv ? 'Very High Alert' : 'Moderate'}
            </span>
          </div>

          {/* Barometric Pressure */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
              <Gauge className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pressure</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {current.pressure} <span className="text-xs font-normal">hPa</span>
            </div>
            <span className="text-[10px] text-slate-400">Deccan Plateau norm</span>
          </div>

          {/* Cloud Cover */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
              <CloudSun className="w-3.5 h-3.5 text-slate-300" />
              <span>Cloud Cover</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {current.cloud_cover}%
            </div>
            <span className="text-[10px] text-slate-400">Scattered stratocumulus</span>
          </div>

          {/* Solar Irradiance */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Irradiance</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {Math.round(current.irradiance)} <span className="text-xs font-normal">W/m²</span>
            </div>
            <span className="text-[10px] text-slate-400">Solar radiation flux</span>
          </div>
        </div>
      </div>
    </div>
  );
}
