import React from 'react';
import AlertTable from '../components/admin/AlertTable';
import { ShieldAlert, Download, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminAlertsPage({ alerts = [], onUpdateStatus, regions = [] }) {
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Severity', 'Region', 'Species', 'Threshold Trigger', 'Recommended Action', 'Status'];
    const rows = alerts.map((a) => [
      a.id,
      a.dateIssued,
      a.severity,
      `"${a.regionName}"`,
      `"${a.speciesName}"`,
      `"${a.thresholdExceeded.replace(/"/g, '""')}"`,
      `"${a.recommendedAction.replace(/"/g, '""')}"`,
      a.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pune_biowatch_alerts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Internal Tool Header */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-medium border border-emerald-200/60">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            <span>Administrative Console • Pune Forest & Municipal Cell</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Ecological Threshold Directives & Incident Dispatch Desk
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Automated alerts synthesized from real-time meteorological sensor feeds, river flow monitors, and satellite vegetation reflectance thresholds across Pune district.
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Directives (CSV)</span>
          </button>
        </div>
      </div>

      {/* Main Alert Table */}
      <AlertTable alerts={alerts} onUpdateStatus={onUpdateStatus} regions={regions} />
    </div>
  );
}
