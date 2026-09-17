import React from 'react';
import ClimateCharts from '../components/climate/ClimateCharts';
import { BarChart3, Thermometer, CloudRain, Sun, Flame, Wind, ShieldCheck, Activity, Droplets } from 'lucide-react';

export default function ClimateDashboardPage({ climateData, weather }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-emerald-700 font-bold mb-1">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Meteorological & Bio-Correlation Observatory</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Pune District Climate Trends & Species Stress Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Empirical observation of shifting precipitation regimes, extreme pre-monsoon heatwave spikes, and their quantified correlation with biodiversity stress across Pune’s 8 micro-climatic zones.
        </p>
      </div>

      {/* Live Pune Telemetry Ribbon if available */}
      {weather?.current && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4 text-white border border-slate-700 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <div>
              <span className="text-emerald-400 font-bold">LIVE TELEMETRY STATION (PUNE):</span>{' '}
              <span className="text-slate-200">{weather.current.temperature}°C</span>{' '}
              <span className="text-slate-400">({weather.current.weather})</span> • Feels: {weather.current.feels_like}°C
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-[11px]">
            <span>Humidity: <b className="text-blue-300">{weather.current.humidity}%</b></span>
            <span>Wind: <b className="text-teal-300">{weather.current.wind?.speed} m/s {weather.current.wind?.dir}</b></span>
            <span>UV: <b className={weather.current.uv_index >= 7 ? 'text-rose-400' : 'text-amber-300'}>{weather.current.uv_index}</b></span>
            <span>Pressure: <b>{weather.current.pressure} hPa</b></span>
            <span>Cloud: <b>{weather.current.cloud_cover}%</b></span>
          </div>
        </div>
      )}

      {/* Climate Charts Component */}
      <ClimateCharts climateData={climateData} />

      {/* Pune District Climatology Brief */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
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

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
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

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
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
