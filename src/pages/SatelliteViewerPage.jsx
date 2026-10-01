import React from 'react';
import SatelliteSlider from '../components/satellite/SatelliteSlider';
import { Layers, Eye, ShieldAlert, CheckCircle, Database } from 'lucide-react';

export default function SatelliteViewerPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-medium border border-emerald-200/60">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>Multispectral Land-Cover Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          Decadal Satellite Earth Observation Viewer
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
          Visualizing 10-year ecological transformations across critical Pune hotspots using calibrated Sentinel-2 and Landsat multispectral composites. Drag the interactive slider to examine wetland loss, urban encroachment, and ridge fragmentation.
        </p>
      </div>

      {/* Main Slider Stage */}
      <SatelliteSlider />

      {/* Remote Sensing Methodology Card */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-slate-400 font-semibold">
          <Database className="w-4 h-4 text-slate-600" />
          <span>Remote Sensing Methodology & Spectral Indices</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/60">
            <span className="font-semibold text-slate-900 block mb-1">NDVI (Vegetation Density)</span>
            Normalized Difference Vegetation Index calculates the contrast between near-infrared (NIR) and red reflectance to quantify canopy photosynthetic vigour along the Sahyadri crest and Sinhagad slopes.
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/60">
            <span className="font-semibold text-slate-900 block mb-1">NDWI (Open Water Contrast)</span>
            Normalized Difference Water Index delineates lake shoreline boundaries at Pashan Lake and Mulshi Dam, isolating floating aquatic macrophytes from clear open water.
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/60">
            <span className="font-semibold text-slate-900 block mb-1">TIRS (Thermal Infrared Band)</span>
            Thermal Infrared Sensors from Landsat-8/9 quantify surface brightness temperature, mapping the thermal radiance footprint of urban concrete corridors in Hinjawadi and Baner.
          </div>
        </div>
      </div>
    </div>
  );
}
