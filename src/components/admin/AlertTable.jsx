import React, { useState } from 'react';
import { SeverityBadge, StatusBadge } from '../common/Badge';
import { ShieldAlert, CheckCircle2, Clock, Eye, Filter, ArrowUpDown, FileText, Check, AlertTriangle, Building } from 'lucide-react';

export default function AlertTable({ alerts = [], onUpdateStatus, regions = [] }) {
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAlertDetail, setActiveAlertDetail] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (selectedSeverity !== 'All' && alert.severity.toLowerCase() !== selectedSeverity.toLowerCase()) {
      return false;
    }
    if (selectedStatus !== 'All' && alert.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    if (selectedRegion !== 'All' && alert.regionId !== selectedRegion) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        alert.speciesName.toLowerCase().includes(q) ||
        alert.regionName.toLowerCase().includes(q) ||
        alert.recommendedAction.toLowerCase().includes(q) ||
        alert.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleStatusChange = async (alertId, newStatus) => {
    try {
      setUpdatingId(alertId);
      await onUpdateStatus(alertId, newStatus);
    } catch (e) {
      console.error('Failed to change status:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const criticalCount = alerts.filter((a) => a.severity === 'Critical').length;
  const pendingCount = alerts.filter((a) => a.status === 'Pending').length;
  const reviewedCount = alerts.filter((a) => a.status === 'Reviewed').length;
  const actionTakenCount = alerts.filter((a) => a.status === 'Action Taken').length;

  return (
    <div className="space-y-6">
      {/* Official Status Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Active Directives</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{alerts.length}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-rose-600 uppercase font-medium">Critical Thresholds</div>
            <div className="text-2xl font-bold text-rose-600 mt-1">{criticalCount}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-amber-600 uppercase font-medium">Pending Review</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-emerald-600 uppercase font-medium">Action Executed</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{actionTakenCount}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Internal Tool Header & Filters */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 sm:p-7 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Active Ecological Risk Directives & Interventions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Auto-generated alerts triggered when Pune regional climatic and ecological indices cross critical resilience thresholds.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search alert by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs border border-slate-200/80 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 bg-slate-50/80 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-400 font-mono font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Severity filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 rounded-full border border-slate-200/80 bg-slate-50/80 text-slate-700 font-medium focus:outline-none hover:bg-white cursor-pointer"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Stress</option>
            <option value="Moderate">Moderate</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-full border border-slate-200/80 bg-slate-50/80 text-slate-700 font-medium focus:outline-none hover:bg-white cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Review</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Action Taken">Action Taken</option>
          </select>

          {/* Region filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 rounded-full border border-slate-200/80 bg-slate-50/80 text-slate-700 font-medium focus:outline-none hover:bg-white cursor-pointer"
          >
            <option value="All">All Pune Sub-Regions</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <span className="text-slate-400 font-mono text-[11px] ml-auto">
            Showing {filteredAlerts.length} of {alerts.length} directives
          </span>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-slate-500 font-mono uppercase text-[11px] tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="px-4 py-3.5 font-medium">Directive ID</th>
                <th className="px-4 py-3.5 font-medium">Severity</th>
                <th className="px-4 py-3.5 font-medium">Affected Species & Region</th>
                <th className="px-4 py-3.5 font-medium">Ecological Trigger / Threshold</th>
                <th className="px-4 py-3.5 font-medium">Recommended Action</th>
                <th className="px-4 py-3.5 text-center font-medium">Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 font-medium">
                    No alerts match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => {
                  const isUpdating = updatingId === alert.id;
                  return (
                    <tr
                      key={alert.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* ID & Date */}
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono">
                        <div className="font-semibold text-slate-800">{alert.id}</div>
                        <div className="text-[10px] text-slate-400">{alert.dateIssued}</div>
                      </td>

                      {/* Severity */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <SeverityBadge severity={alert.severity} />
                      </td>

                      {/* Species & Region */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900">{alert.speciesName}</div>
                        <div className="text-[11px] text-emerald-700 font-medium">
                          {alert.regionName}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{alert.issuingAgency}</div>
                      </td>

                      {/* Trigger */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="text-slate-700 leading-snug line-clamp-3">
                          {alert.thresholdExceeded}
                        </p>
                      </td>

                      {/* Recommendation */}
                      <td className="px-4 py-3.5 max-w-sm">
                        <p className="text-slate-800 leading-snug bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/60">
                          {alert.recommendedAction}
                        </p>
                        {alert.adminNotes && (
                          <div className="mt-1 text-[10px] text-slate-400 font-mono italic">
                            Note: {alert.adminNotes}
                          </div>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <div className="inline-flex flex-col items-center space-y-1">
                          <select
                            disabled={isUpdating}
                            value={alert.status}
                            onChange={(e) => handleStatusChange(alert.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors focus:outline-none cursor-pointer ${
                              alert.status === 'Action Taken'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : alert.status === 'Reviewed'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Action Taken">Action Taken</option>
                          </select>
                          {isUpdating && (
                            <span className="text-[10px] font-mono text-slate-400 animate-pulse">
                              Updating...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
