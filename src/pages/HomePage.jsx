import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsBanner from '../components/home/StatsBanner';
import LiveWeatherCard from '../components/home/LiveWeatherCard';
import PuneLeafletMap from '../components/map/PuneLeafletMap';
import SpeciesCard from '../components/species/SpeciesCard';
import { SeverityBadge } from '../components/common/Badge';
import { Compass, ShieldAlert, ArrowRight, Layers, CheckCircle, Flame, Droplets, Mountain } from 'lucide-react';

export default function HomePage({
  regions = [],
  species = [],
  alerts = [],
  sightings = [],
  climateData = null,
  weather = null,
  setActiveTab,
  onSelectRegion,
  onSelectSpecies,
}) {
  const urgentAlert = alerts.find((a) => a.severity === 'Critical') || alerts[0];
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical').slice(0, 3);
  const featuredSpecies = species.filter((s) => s.climateSeverity === 'Critical' || s.severityScore >= 85).slice(0, 3);

  const handleMapSelectRegion = (region) => {
    onSelectRegion(region);
    setActiveTab('regions');
  };

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <HeroSection setActiveTab={setActiveTab} urgentAlert={urgentAlert} />

      {/* 2. Live Pune Weather Telemetry */}
      {weather && <LiveWeatherCard weather={weather} />}

      {/* 3. Stats Banner */}
      <StatsBanner
        speciesCount={species.length}
        regionsCount={regions.length}
        alertsCount={alerts.length}
        criticalAlertsCount={criticalAlerts.length}
        sightingsCount={sightings.length}
        tempRise={climateData?.districtOverview?.decadeAvgTempRise || '+1.42°C'}
      />

      {/* 3. Interactive Pune District Map Preview Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-emerald-700 font-bold">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Spatial Monitoring Grid</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Pune District Ecological Sub-Regions
            </h2>
            <p className="text-xs text-slate-500">
              Interactive vulnerability mapping centered on Pune (18.5204° N, 73.8567° E). Click any hotspot to explore climate anomalies and affected endemic wildlife.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('regions')}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold self-start md:self-auto transition-colors"
          >
            <span>Open Region Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PuneLeafletMap
              regions={regions}
              onSelectRegion={handleMapSelectRegion}
              height="450px"
            />
          </div>

          {/* Sub-region Quick Jump List */}
          <div className="space-y-2.5 overflow-y-auto max-h-[450px] pr-1">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
              Monitored Sub-Zones ({regions.length})
            </div>
            {regions.map((reg) => (
              <div
                key={reg.id}
                onClick={() => handleMapSelectRegion(reg)}
                className="p-3 bg-slate-50 hover:bg-emerald-50/80 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 flex items-center space-x-2">
                    <span>{reg.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{reg.habitatType}</div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      reg.metrics.vulnerabilityScore >= 85
                        ? 'bg-red-100 text-red-700'
                        : reg.metrics.vulnerabilityScore >= 75
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {reg.metrics.vulnerabilityScore}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Vulnerability</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Critical Active Directives Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              High-Priority Administrative Directives
            </h2>
            <p className="text-xs text-slate-500">
              Immediate interventions flagged for Pune Municipal Corporation & Maharashtra Forest Department.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('alerts')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
          >
            <span>View All Directives ({alerts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {criticalAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setActiveTab('alerts')}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-red-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400">{alert.id}</span>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">{alert.speciesName}</h4>
                <div className="text-xs text-emerald-700 font-medium mb-3">{alert.regionName}</div>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-snug line-clamp-3">
                  {alert.recommendedAction}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{alert.dateIssued}</span>
                <span className="text-emerald-600 font-semibold group-hover:underline">
                  Take Action →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured High-Sensitivity Species */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Indicator Species Facing Severe Climate Strain
            </h2>
            <p className="text-xs text-slate-500">
              Taxa whose breeding cycles, moisture thresholds, or habitats are most acutely impacted in the Pune basin.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('species')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
          >
            <span>Browse Full Database ({species.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSpecies.map((sp) => (
            <SpeciesCard
              key={sp.id}
              species={sp}
              onSelect={(item) => onSelectSpecies(item)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
