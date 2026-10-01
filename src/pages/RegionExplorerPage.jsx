import React from 'react';
import PuneLeafletMap from '../components/map/PuneLeafletMap';
import { SeverityBadge } from '../components/common/Badge';
import {
  MapPin,
  Mountain,
  AlertTriangle,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Compass,
} from 'lucide-react';

import pashan2024 from '../assets/satellite/pashan-2024.svg';
import sinhagad2024 from '../assets/satellite/sinhagad-2024.svg';
import urban2024 from '../assets/satellite/urban-2024.svg';
import mulshi2024 from '../assets/satellite/mulshi-2024.svg';

export default function RegionExplorerPage({
  regions = [],
  species = [],
  alerts = [],
  selectedRegion = null,
  setSelectedRegion,
  onSelectSpecies,
  setActiveTab,
}) {
  const currentRegion = selectedRegion || regions[0];

  const satelliteMap = {
    pashan: pashan2024,
    sinhagad: sinhagad2024,
    'urban-pune': urban2024,
    mulshi: mulshi2024,
    tekdi: urban2024,
    bhimashankar: sinhagad2024,
    panshet: mulshi2024,
    'mula-mutha': urban2024,
  };

  const currentSatImg = satelliteMap[currentRegion?.satelliteImageKey] || pashan2024;

  const regionSpecies = currentRegion
    ? species.filter((s) => s.regions?.includes(currentRegion.id))
    : [];

  const regionAlerts = currentRegion
    ? alerts.filter((a) => a.regionId === currentRegion.id)
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-1">
            Spatial Ecosystem Explorer
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pune Sub-Regions & Microclimates
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Select an ecological sub-zone to inspect microclimatic anomalies, resident indicator species, and active directives.
          </p>
        </div>

        {/* Zone Selector Pill */}
        <select
          value={currentRegion?.id || ''}
          onChange={(e) => {
            const target = regions.find((r) => r.id === e.target.value);
            if (target) setSelectedRegion(target);
          }}
          className="px-4 py-2 rounded-full border border-slate-200/80 bg-white text-xs font-semibold text-slate-800 shadow-sm focus:outline-none cursor-pointer self-start sm:self-auto"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Grid: Map & Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Map + Quick Switcher (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-3.5 rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <PuneLeafletMap
              regions={regions}
              selectedRegionId={currentRegion?.id}
              onSelectRegion={(reg) => setSelectedRegion(reg)}
              height="380px"
            />
          </div>

          {/* Sub-zone Selector Pills */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider mb-3">
              Monitored Sub-Zones ({regions.length})
            </div>
            <div className="grid grid-cols-2 gap-2">
              {regions.map((reg) => {
                const isSelected = reg.id === currentRegion?.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg)}
                    className={`p-3 rounded-2xl text-left border text-xs transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200/60 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="font-bold truncate">{reg.name}</div>
                    <div
                      className={`text-[10px] font-mono mt-1 ${
                        isSelected ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      Index: {reg.metrics.vulnerabilityScore}/100
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Clean Region Dossier (7 cols) */}
        <div className="lg:col-span-7">
          {currentRegion && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
              {/* Dossier Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-100 font-semibold">
                    {currentRegion.habitatType}
                  </span>
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="text-slate-400">Vulnerability:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                        currentRegion.metrics.vulnerabilityScore >= 85
                          ? 'bg-rose-50 text-rose-700 border border-rose-100'
                          : currentRegion.metrics.vulnerabilityScore >= 75
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}
                    >
                      {currentRegion.metrics.vulnerabilityScore}/100
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentRegion.name}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  {currentRegion.localName}
                </div>

                {/* Geography Pills */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{currentRegion.coordinates.lat}°N, {currentRegion.coordinates.lng}°E</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Mountain className="w-3.5 h-3.5 text-slate-400" />
                    <span>Elevation: {currentRegion.elevationMeters}m</span>
                  </div>
                  <span>•</span>
                  <div>Area: {currentRegion.areaKm2} km²</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-slate-600 leading-relaxed text-[13px]">
                  {currentRegion.description}
                </p>
              </div>

              {/* Microclimate Stats Grid */}
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2.5">
                  Microclimate Metrics
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Summer Peak</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">
                      {currentRegion.climateSummary.avgSummerTemp}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Precipitation</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">
                      {currentRegion.climateSummary.annualRainfall}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Variance</div>
                    <div className="text-xs font-bold text-amber-700 mt-1">
                      {currentRegion.climateSummary.rainfallAnomaly}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Humidity</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">
                      {currentRegion.climateSummary.humidityRange}
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Threats List */}
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4">
                <div className="text-[11px] font-mono uppercase text-amber-800 font-bold mb-2 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Key Climatic & Anthropogenic Pressures</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-950">
                  {currentRegion.climateSummary.primaryThreats.map((threat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Satellite Image Preview Card */}
              <div className="rounded-2xl border border-slate-200/80 p-4 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Sentinel-2 Satellite Observation</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('satellite')}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
                  >
                    <span>Before/After Slider</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-full aspect-[16/8] rounded-xl overflow-hidden border border-slate-200 relative">
                  <img
                    src={currentSatImg}
                    alt={currentRegion.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Canopy Loss: {currentRegion.metrics.treeCanopyLossPercent}%
                  </div>
                </div>
              </div>

              {/* Resident Species */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                    Indicator Species in this Zone ({regionSpecies.length})
                  </div>
                  <button
                    onClick={() => setActiveTab('species')}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    All Species →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {regionSpecies.map((sp) => (
                    <div
                      key={sp.id}
                      onClick={() => onSelectSpecies(sp)}
                      className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-900">{sp.commonName}</div>
                        <div className="text-[11px] font-serif italic text-slate-500">{sp.scientificName}</div>
                        <div className="mt-1">
                          <SeverityBadge severity={sp.climateSeverity} />
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-slate-700">{sp.severityScore}/100</span>
                        <div className="text-[10px] text-slate-400 font-mono">Index</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Alerts in this Zone */}
              {regionAlerts.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-700">
                      Active Directives in this Zone ({regionAlerts.length})
                    </span>
                    <button
                      onClick={() => setActiveTab('alerts')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Manage in Desk →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {regionAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 bg-rose-50/50 border border-rose-100 rounded-2xl text-xs flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-rose-950">{alert.speciesName}</div>
                          <div className="text-[11px] text-slate-600">{alert.recommendedAction}</div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <SeverityBadge severity={alert.severity} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
