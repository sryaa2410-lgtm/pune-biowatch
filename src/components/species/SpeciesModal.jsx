import React, { useEffect } from 'react';
import { X, Thermometer, CloudRain, Grid, Flame, MapPin, AlertCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { IUCNBadge, SeverityBadge } from '../common/Badge';

export default function SpeciesModal({ species, isOpen, onClose, onSelectRegion, regions = [] }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !species) return null;

  const threatDetails = [
    {
      factor: 'temperatureSensitivity',
      label: 'Thermal Sensitivity',
      icon: Thermometer,
      level: species.climateThreatFactors?.temperatureSensitivity,
      desc: 'Physiological thermal limits, embryonic incubation, and heat prostration thresholds.',
    },
    {
      factor: 'rainfallVariabilityImpact',
      label: 'Rainfall Rhythm Impact',
      icon: CloudRain,
      level: species.climateThreatFactors?.rainfallVariabilityImpact,
      desc: 'Vulnerability to erratic monsoon breaks, delayed rain, and stream desiccation.',
    },
    {
      factor: 'habitatFragmentation',
      label: 'Canopy Fragmentation',
      icon: Grid,
      level: species.climateThreatFactors?.habitatFragmentation,
      desc: 'Highways and resort clearing severing continuous arboreal corridors.',
    },
    {
      factor: 'urbanHeatIslandEffect',
      label: 'Urban Heat Island (UHI)',
      icon: Flame,
      level: species.climateThreatFactors?.urbanHeatIslandEffect,
      desc: 'Direct exposure to asphalt nocturnal heat radiation and ambient spikes over 40°C.',
    },
  ];

  const getLevelBadge = (lvl) => {
    switch (lvl) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-100 font-bold';
      case 'High':
        return 'bg-orange-50 text-orange-700 border-orange-100 font-bold';
      case 'Moderate':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Clean Header */}
        <div className="bg-white p-6 pb-4 flex items-start justify-between border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {species.category}
              </span>
              <IUCNBadge status={species.iucnStatus} />
              <SeverityBadge severity={species.climateSeverity} />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {species.commonName}
            </h2>
            <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
              <span className="font-serif italic text-emerald-700">{species.scientificName}</span>
              {species.marathiName && <span>• {species.marathiName}</span>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs">
          {/* Habitat */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-1.5">
              Primary Pune Habitat Profile
            </div>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {species.habitat}
            </p>
          </div>

          {/* Description */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-1.5">
              Ecological Overview & Climate Sensitivity
            </div>
            <p className="text-slate-600 leading-relaxed text-[13px]">
              {species.description}
            </p>
          </div>

          {/* Sensitivity Matrix */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2.5">
              4-Factor Climate Vulnerability Matrix
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {threatDetails.map((threat) => {
                const Icon = threat.icon;
                return (
                  <div
                    key={threat.factor}
                    className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-1.5">
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-bold text-slate-800 text-xs">{threat.label}</span>
                      </div>
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${getLevelBadge(threat.level)}`}>
                        {threat.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">{threat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Threat Indicators */}
          <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4">
            <div className="text-[11px] font-mono uppercase text-amber-800 font-bold mb-1 flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Observed Regional Stress Indicators</span>
            </div>
            <p className="text-amber-950 leading-relaxed">
              {species.keyThreatIndicators}
            </p>
          </div>

          {/* Recommended Conservation Action */}
          <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4">
            <div className="text-[11px] font-mono uppercase text-emerald-800 font-bold mb-1 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recommended Forestry & Municipal Directives</span>
            </div>
            <p className="text-emerald-950 leading-relaxed">
              {species.recommendedAction}
            </p>
          </div>

          {/* Sub-Regions */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2">
              Documented Occurrence Across Pune Sub-Zones
            </div>
            <div className="flex flex-wrap gap-1.5">
              {species.regions?.map((regId) => {
                const regionObj = regions.find((r) => r.id === regId);
                const name = regionObj ? regionObj.name : regId;
                return (
                  <button
                    key={regId}
                    onClick={() => {
                      if (onSelectRegion && regionObj) {
                        onSelectRegion(regionObj);
                        onClose();
                      }
                    }}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80 transition-colors text-xs font-medium"
                  >
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            Index: {species.severityScore}/100 • ID: {species.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
