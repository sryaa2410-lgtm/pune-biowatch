import React, { useState, useMemo } from 'react';
import SpeciesCard from '../components/species/SpeciesCard';
import { IUCNBadge, SeverityBadge } from '../components/common/Badge';
import { Search, Filter, LayoutGrid, List, TreePine, X, ArrowUpRight } from 'lucide-react';

export default function SpeciesDatabasePage({
  species = [],
  regions = [],
  onSelectSpecies,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedIUCN, setSelectedIUCN] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['All', 'Mammals', 'Birds', 'Amphibians', 'Reptiles', 'Plants', 'Insects'];
  const severities = ['All', 'Critical', 'High', 'Moderate', 'Medium', 'Low'];
  const iucnStatuses = ['All', 'Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'];

  const regionMap = useMemo(() => {
    const map = {};
    regions.forEach((r) => {
      map[r.id] = r.name;
    });
    return map;
  }, [regions]);

  const filteredSpecies = useMemo(() => {
    return species.filter((item) => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const match =
          item.commonName.toLowerCase().includes(q) ||
          item.scientificName.toLowerCase().includes(q) ||
          (item.marathiName && item.marathiName.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedRegion !== 'All' && !item.regions?.includes(selectedRegion)) {
        return false;
      }

      if (selectedSeverity !== 'All') {
        const target = selectedSeverity.toLowerCase();
        const itemSev = item.climateSeverity.toLowerCase();
        if (target === 'moderate' || target === 'medium') {
          if (itemSev !== 'moderate' && itemSev !== 'medium') return false;
        } else if (itemSev !== target) {
          return false;
        }
      }

      if (selectedIUCN !== 'All' && item.iucnStatus !== selectedIUCN) {
        return false;
      }

      return true;
    });
  }, [species, searchTerm, selectedCategory, selectedRegion, selectedSeverity, selectedIUCN]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setSelectedSeverity('All');
    setSelectedIUCN('All');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'All' ||
    selectedRegion !== 'All' ||
    selectedSeverity !== 'All' ||
    selectedIUCN !== 'All';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider mb-1">
            Taxonomic Climate Matrix
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pune Species Vulnerability Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Detailed vulnerability scores, microclimate sensitivities, and conservation guidelines across 18 key indicator species.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/60 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Modern Filter Controls */}
      <div className="space-y-4">
        {/* Search Input & Secondary Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by common, scientific, or Marathi name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200/80 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Region Dropdown */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 rounded-full border border-slate-200/80 bg-white text-xs text-slate-700 font-medium focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All Pune Sub-Regions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            {/* Severity Dropdown */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 rounded-full border border-slate-200/80 bg-white text-xs text-slate-700 font-medium focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All Impact Severities</option>
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* IUCN Dropdown */}
            <select
              value={selectedIUCN}
              onChange={(e) => setSelectedIUCN(e.target.value)}
              className="px-3 py-2 rounded-full border border-slate-200/80 bg-white text-xs text-slate-700 font-medium focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All IUCN Statuses</option>
              {iucnStatuses.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-xs text-rose-600 hover:text-rose-700 font-medium rounded-full hover:bg-rose-50 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Clean Category Pill Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((c) => {
            const isSelected = selectedCategory === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/60'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecies.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200/80 text-center text-slate-500">
              <TreePine className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-700">No species match active filter criteria</p>
              <button
                onClick={clearFilters}
                className="mt-3 text-xs text-emerald-700 font-semibold underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredSpecies.map((sp) => (
              <SpeciesCard
                key={sp.id}
                species={sp}
                onSelect={(item) => onSelectSpecies(item)}
              />
            ))
          )}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-4">Common Name</th>
                  <th className="px-5 py-4">Scientific Name</th>
                  <th className="px-5 py-4">IUCN Red List</th>
                  <th className="px-5 py-4">Climate Severity</th>
                  <th className="px-5 py-4 text-center">Score</th>
                  <th className="px-5 py-4">Habitats</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSpecies.map((sp) => (
                  <tr key={sp.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      <div>{sp.commonName}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-normal uppercase">
                        {sp.category}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-serif italic text-slate-500">
                      {sp.scientificName}
                    </td>
                    <td className="px-5 py-3.5">
                      <IUCNBadge status={sp.iucnStatus} />
                    </td>
                    <td className="px-5 py-3.5">
                      <SeverityBadge severity={sp.climateSeverity} />
                    </td>
                    <td className="px-5 py-3.5 text-center font-mono font-bold text-slate-800">
                      {sp.severityScore}
                    </td>
                    <td className="px-5 py-3.5 max-w-xs truncate text-[11px] text-slate-500">
                      {sp.regions?.map((rId) => regionMap[rId] || rId).join(', ')}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => onSelectSpecies(sp)}
                        className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
