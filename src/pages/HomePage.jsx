import React from 'react';
import HeroSection from '../components/home/HeroSection';
import UnifiedTelemetryBento from '../components/home/UnifiedTelemetryBento';
import PuneLeafletMap from '../components/map/PuneLeafletMap';
import SpeciesCard from '../components/species/SpeciesCard';
import { SeverityBadge } from '../components/common/Badge';
import { Compass, ShieldAlert, ArrowRight, ArrowUpRight, MapPin, TreePine, Sparkles } from 'lucide-react';

export default function HomePage({
  regions = [],
  species = [],
  alerts = [],
  climateData = null,
  weather = null,
  setActiveTab,
  onSelectRegion,
  onSelectSpecies,
}) {
  const urgentAlert = alerts.find((a) => a.severity === 'Critical') || alerts[0];
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical').slice(0, 2);
  const featuredSpecies = species.filter((s) => s.climateSeverity === 'Critical' || s.severityScore >= 85).slice(0, 3);

  const handleMapSelectRegion = (region) => {
    onSelectRegion(region);
    setActiveTab('regions');
  };

  return (
    <div className="space-y-12">
      {/* 1. Minimalist Airy Hero Section */}
      <HeroSection setActiveTab={setActiveTab} urgentAlert={urgentAlert} />

      {/* 2. Unified Modern Bento Telemetry & Key Metrics Grid */}
      <UnifiedTelemetryBento
        weather={weather}
        speciesCount={species.length}
        regionsCount={regions.length}
        alertsCount={alerts.length}
        criticalAlertsCount={alerts.filter((a) => a.severity === 'Critical').length}
        tempRise={climateData?.districtOverview?.decadeAvgTempRise || '+1.42°C'}
        setActiveTab={setActiveTab}
      />

      {/* 3. Interactive Spatial Map Container */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono uppercase text-emerald-700 font-semibold tracking-wider flex items-center space-x-1.5 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Spatial Monitoring Grid</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Pune Ecological Sub-Zones & Vulnerability Map
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any region marker to examine microclimatic anomalies and resident endemic species.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('regions')}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold self-start sm:self-auto transition-colors shadow-sm"
          >
            <span>Full Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Map Display */}
        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
          <PuneLeafletMap
            regions={regions}
            onSelectRegion={handleMapSelectRegion}
            height="460px"
          />
        </div>

        {/* Clean Horizontal Sub-Region Quick Switcher Pills */}
        <div className="pt-2">
          <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider mb-2.5">
            Quick Sub-Region Jump
          </div>
          <div className="flex flex-wrap gap-2">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => handleMapSelectRegion(reg)}
                className="px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 text-xs font-medium text-slate-700 hover:text-emerald-800 transition-all flex items-center space-x-2"
              >
                <span>{reg.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    reg.metrics.vulnerabilityScore >= 85
                      ? 'bg-rose-100 text-rose-700'
                      : reg.metrics.vulnerabilityScore >= 75
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {reg.metrics.vulnerabilityScore}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured High-Sensitivity Species Spotlight */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Ecological Indicators
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Indicator Species Facing Thermal & Drought Strain
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('species')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>All Species ({species.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredSpecies.map((sp) => (
            <SpeciesCard
              key={sp.id}
              species={sp}
              onSelect={(item) => onSelectSpecies(item)}
            />
          ))}
        </div>
      </section>

      {/* 5. Clean Action Directives Preview */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900">
              High-Priority Conservation Directives ({criticalAlerts.length})
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('alerts')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            View Directive Desk →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {criticalAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setActiveTab('alerts')}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">{alert.speciesName}</span>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mb-2">{alert.regionName}</div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {alert.recommendedAction}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{alert.id}</span>
                <span className="text-emerald-700 font-medium font-sans">Inspect action →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
