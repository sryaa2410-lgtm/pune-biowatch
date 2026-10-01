import React from 'react';
import ClimateCharts from '../components/climate/ClimateCharts';
import { BarChart3, Flame, CloudRain, Wind, Activity, Droplets, Sun } from 'lucide-react';

export default function ClimateDashboardPage({ climateData, weather }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-1">
          Meteorological & Bio-Correlation Observatory
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pune District Climate Trends & Species Stress
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Empirical observation of shifting precipitation regimes, extreme pre-monsoon heatwave spikes, and their quantified correlation with biodiversity stress across Pune’s 8 micro-climatic zones.
        </p>
      </div>

      {/* Live Pune Telemetry Banner (Light Minimalist Bento Style) */}
      {weather?.current && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Live Telemetry Station (Pune): <span className="font-mono text-emerald-700">{weather.current.temperature}°C</span>{' '}
                <span className="text-slate-500 font-normal">({weather.current.weather})</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Feels like {weather.current.feels_like}°C • Dew Point: {weather.current.dew_point}°C
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-mono">
            <span className="bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
              Humidity: <b className="text-slate-800">{weather.current.humidity}%</b>
            </span>
            <span className="bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
              Wind: <b className="text-slate-800">{weather.current.wind?.speed} m/s {weather.current.wind?.dir}</b>
            </span>
            <span className="bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
              UV Index: <b className={weather.current.uv_index >= 7 ? 'text-rose-600 font-bold' : 'text-slate-800'}>{weather.current.uv_index}</b>
            </span>
            <span className="bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
              Pressure: <b className="text-slate-800">{weather.current.pressure} hPa</b>
            </span>
          </div>
        </div>
      )}

      {/* Climate Charts Component */}
      <ClimateCharts climateData={climateData} />

      {/* Pune District Climatology Brief */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase font-mono">
            <Flame className="w-4 h-4" />
            <span>Pre-Monsoon Thermal Spikes</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Urban Heat Island & Thermal Prostration
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Metropolitan Pune routinely records afternoon temperatures exceeding 41.5°C during April and May. The expanding concrete footprint limits nocturnal radiative cooling, causing acute heat exhaustion in colonial fruit bats and suppressing nocturnal reptile activity.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase font-mono">
            <CloudRain className="w-4 h-4" />
            <span>Monsoon Precipitation Volatility</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Erratic Cloudbursts vs Extended Dry Breaks
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            While total seasonal rainfall in Western Ghats zones (Mulshi, Tamhini) remains abundant, precipitation is increasingly concentrated in short, violent cloudburst events followed by 15 to 25-day rainless spells that desiccate delicate amphibian egg clutches.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase font-mono">
            <Wind className="w-4 h-4" />
            <span>Western Ghats Orographic Buffer</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Montane Cloud-Forest Disruption
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            High-altitude ridges like Sinhagad and Bhimashankar rely on sustained cloud mist cover during the monsoon. Rising cloud base altitudes and warmer wind trajectories reduce mist persistence, jeopardizing epiphyte flora and tree fern groves.
          </p>
        </div>
      </div>
    </div>
  );
}
