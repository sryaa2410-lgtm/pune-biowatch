import React from 'react';
import { Shield, ExternalLink, Leaf } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-500 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <span>🌱</span>
              <span>Pune BioWatch</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Open community engagement and regional climate impact decision support platform for Pune District, Maharashtra.
            </p>
            <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md inline-block border border-emerald-100">
              Station ID: #MH-12-PUNE
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Observatory Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('regions')} className="hover:text-emerald-700 transition-colors">
                  Pune Sub-Region Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('species')} className="hover:text-emerald-700 transition-colors">
                  Species Vulnerability Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('climate')} className="hover:text-emerald-700 transition-colors">
                  Decadal Climate Anomalies
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('satellite')} className="hover:text-emerald-700 transition-colors">
                  Satellite Earth Observation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('alerts')} className="hover:text-emerald-700 transition-colors">
                  Administrative Directives
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Sources */}
          <div className="space-y-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Scientific Data Sources
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>• India Meteorological Department (IMD Pune)</li>
              <li>• Maharashtra Forest Department (Wildlife Wing)</li>
              <li>• IUCN Red List of Threatened Species</li>
              <li>• USGS Landsat & ESA Sentinel-2 Imagery</li>
              <li>• Savitribai Phule Pune University (SPPU)</li>
            </ul>
          </div>

          {/* Academic Notice */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold">
              Academic & Community Use
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Engineered for academic research demonstration and citizen science engagement. Datasets model validated regional meteorological and habitat trends.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-3 font-mono">
          <div>
            © 2024 Pune BioWatch Initiative • Developed for Pune Regional Biodiversity Conservation
          </div>
          <div className="flex items-center space-x-2 text-emerald-700 font-medium">
            <span>● Status: Active Telemetry</span>
            <span>•</span>
            <span>Pune, Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
