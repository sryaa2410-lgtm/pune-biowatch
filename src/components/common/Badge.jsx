import React from 'react';

export function IUCNBadge({ status }) {
  const styles = {
    'Critically Endangered': { bg: 'bg-rose-50 text-rose-700 border-rose-100', dot: 'bg-rose-500' },
    Endangered: { bg: 'bg-orange-50 text-orange-700 border-orange-100', dot: 'bg-orange-500' },
    Vulnerable: { bg: 'bg-amber-50 text-amber-700 border-amber-100', dot: 'bg-amber-500' },
    'Near Threatened': { bg: 'bg-yellow-50 text-yellow-800 border-yellow-100', dot: 'bg-yellow-500' },
    'Least Concern': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', dot: 'bg-emerald-500' },
  };

  const style = styles[status] || { bg: 'bg-slate-50 text-slate-700 border-slate-100', dot: 'bg-slate-400' };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${style.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.dot}`}></span>
      {status}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const styles = {
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    High: 'bg-orange-50 text-orange-700 border-orange-100',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Advisory: 'bg-sky-50 text-sky-700 border-sky-100',
  };

  const style = styles[severity] || 'bg-slate-50 text-slate-700 border-slate-100';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border ${style}`}>
      {severity}
    </span>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    Pending: { bg: 'bg-rose-50 text-rose-700 border-rose-100', dot: 'bg-rose-500' },
    Reviewed: { bg: 'bg-amber-50 text-amber-700 border-amber-100', dot: 'bg-amber-500' },
    'Action Taken': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', dot: 'bg-emerald-500' },
    Verified: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', dot: 'bg-emerald-500' },
    'Community Submitted': { bg: 'bg-sky-50 text-sky-700 border-sky-100', dot: 'bg-sky-500' },
  };

  const style = styles[status] || { bg: 'bg-slate-50 text-slate-700 border-slate-100', dot: 'bg-slate-400' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${style.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.dot}`}></span>
      {status}
    </span>
  );
}
