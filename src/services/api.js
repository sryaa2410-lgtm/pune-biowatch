// API client service with graceful fallback to local bundled datasets

import localRegions from '../data/regions.json';
import localSpecies from '../data/species.json';
import localClimate from '../data/climate.json';
import localAlerts from '../data/alerts.json';
import localSightings from '../data/sightings.json';
import localWeather from '../data/weather.json';

const API_BASE = '/api';

export const api = {
  // Regions
  async getRegions() {
    try {
      const res = await fetch(`${API_BASE}/regions`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('Using local fallback for regions:', e.message);
      return localRegions;
    }
  },

  async getRegionById(id) {
    try {
      const res = await fetch(`${API_BASE}/regions/${id}`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return localRegions.find((r) => r.id === id) || null;
    }
  },

  // Species
  async getSpecies(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.region) params.append('region', filters.region);
      if (filters.severity) params.append('severity', filters.severity);
      if (filters.search) params.append('search', filters.search);

      const url = `${API_BASE}/species${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('Using local fallback for species:', e.message);
      let list = [...localSpecies];
      if (filters.category && filters.category !== 'All') {
        list = list.filter((s) => s.category.toLowerCase() === filters.category.toLowerCase());
      }
      if (filters.region && filters.region !== 'All') {
        list = list.filter((s) => s.regions.includes(filters.region));
      }
      if (filters.severity && filters.severity !== 'All') {
        list = list.filter((s) => s.climateSeverity.toLowerCase() === filters.severity.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (s) =>
            s.commonName.toLowerCase().includes(q) ||
            s.scientificName.toLowerCase().includes(q) ||
            (s.marathiName && s.marathiName.toLowerCase().includes(q))
        );
      }
      return list;
    }
  },

  async getSpeciesById(id) {
    try {
      const res = await fetch(`${API_BASE}/species/${id}`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return localSpecies.find((s) => s.id === id) || null;
    }
  },

  // Climate
  async getClimate() {
    try {
      const res = await fetch(`${API_BASE}/climate`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('Using local fallback for climate:', e.message);
      return localClimate;
    }
  },

  // Alerts
  async getAlerts(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.severity) params.append('severity', filters.severity);
      if (filters.status) params.append('status', filters.status);
      if (filters.regionId) params.append('regionId', filters.regionId);

      const url = `${API_BASE}/alerts${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('Using local fallback for alerts:', e.message);
      let list = [...localAlerts];
      if (filters.severity && filters.severity !== 'All') {
        list = list.filter((a) => a.severity.toLowerCase() === filters.severity.toLowerCase());
      }
      if (filters.status && filters.status !== 'All') {
        list = list.filter((a) => a.status.toLowerCase() === filters.status.toLowerCase());
      }
      if (filters.regionId && filters.regionId !== 'All') {
        list = list.filter((a) => a.regionId === filters.regionId);
      }
      return list;
    }
  },

  async updateAlertStatus(id, status, adminNotes) {
    try {
      const res = await fetch(`${API_BASE}/alerts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      });
      if (!res.ok) throw new Error('Failed to update alert');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('Updating local memory copy for alert:', e.message);
      const alert = localAlerts.find((a) => a.id === id);
      if (alert) {
        if (status) alert.status = status;
        if (adminNotes !== undefined) alert.adminNotes = adminNotes;
        return { ...alert };
      }
      throw e;
    }
  },

  // Sightings
  async getSightings() {
    try {
      const res = await fetch(`${API_BASE}/sightings`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return localSightings;
    }
  },

  async submitSighting(sightingData) {
    try {
      const res = await fetch(`${API_BASE}/sightings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sightingData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }
      return await res.json();
    } catch (e) {
      console.warn('Recording sighting in local memory:', e.message);
      const newEntry = {
        id: `SGT-${1000 + localSightings.length + 1}`,
        ...sightingData,
        status: 'Community Submitted',
        submittedAt: new Date().toISOString(),
      };
      localSightings.unshift(newEntry);
      return { success: true, data: newEntry };
    }
  },

  // Live Pune Weather Telemetry
  async getWeather(params = {}) {
    try {
      const q = new URLSearchParams();
      if (params.place_id) q.append('place_id', params.place_id);
      if (params.language) q.append('language', params.language);
      if (params.unit) q.append('unit', params.unit);

      const url = `${API_BASE}/weather${q.toString() ? `?${q.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API fetch failed');
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn('Using local fallback for live Pune weather:', e.message);
      return localWeather;
    }
  },
};
