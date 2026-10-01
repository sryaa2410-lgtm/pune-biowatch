import React from 'react';
import { IUCNBadge, SeverityBadge } from '../common/Badge';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function SpeciesCard({ species, onSelect }) {
  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-rose-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div
      onClick={() => onSelect(species)}
      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 bg-slate-100/80 px-2.5 py-0.5 rounded-full">
            {species.category}
          </span>
          <div className="flex items-center space-x-1.5">
            <IUCNBadge status={species.iucnStatus} />
            <SeverityBadge severity={species.climateSeverity} />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
          {species.commonName}
        </h3>
        <div className="text-xs text-slate-400 font-serif italic mt-0.5 mb-3 flex items-center space-x-1.5">
          <span>{species.scientificName}</span>
          {species.marathiName && (
            <span className="font-sans not-italic text-slate-500 text-[11px]">
              • {species.marathiName}
            </span>
          )}
        </div>

        {/* Sensitivity Meter */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-xs font-mono mb-1.5">
            <span className="text-slate-500 text-[11px]">Climate Impact Index</span>
            <span className="font-bold text-slate-800">{species.severityScore}/100</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getScoreColor(species.severityScore)}`}
              style={{ width: `${species.severityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {species.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-1 text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{species.regions?.length || 0} Pune habitats</span>
        </div>
        <div className="font-semibold text-emerald-700 flex items-center space-x-0.5 group-hover:translate-x-0.5 transition-transform text-xs">
          <span>Dossier</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
