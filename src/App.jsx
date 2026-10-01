import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SpeciesModal from './components/species/SpeciesModal';

import HomePage from './pages/HomePage';
import RegionExplorerPage from './pages/RegionExplorerPage';
import SpeciesDatabasePage from './pages/SpeciesDatabasePage';
import ClimateDashboardPage from './pages/ClimateDashboardPage';
import SatelliteViewerPage from './pages/SatelliteViewerPage';
import AdminAlertsPage from './pages/AdminAlertsPage';
import AboutPage from './pages/AboutPage';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [regions, setRegions] = useState([]);
  const [species, setSpecies] = useState([]);
  const [climateData, setClimateData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Deep dive selection states
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isSpeciesModalOpen, setIsSpeciesModalOpen] = useState(false);

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [regRes, spRes, climRes, alrRes, sgtRes, weatherRes] = await Promise.all([
          api.getRegions(),
          api.getSpecies(),
          api.getClimate(),
          api.getAlerts(),
          api.getSightings(),
          api.getWeather({ place_id: 'pune', language: 'en', unit: 'metric' }),
        ]);

        setRegions(regRes || []);
        setSpecies(spRes || []);
        setClimateData(climRes || null);
        setAlerts(alrRes || []);
        setSightings(sgtRes || []);
        setWeather(weatherRes || null);

        if (regRes && regRes.length > 0) {
          setSelectedRegion(regRes[0]);
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Update alert status handler
  const handleUpdateAlertStatus = async (alertId, newStatus) => {
    try {
      const updated = await api.updateAlertStatus(alertId, newStatus);
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
      );
      return updated;
    } catch (e) {
      console.error('Alert update failed:', e);
      throw e;
    }
  };

  // Submit citizen sighting handler
  const handleSubmitSighting = async (sightingPayload) => {
    try {
      const res = await api.submitSighting(sightingPayload);
      const newEntry = res.data || res;
      setSightings((prev) => [newEntry, ...prev]);
      return res;
    } catch (e) {
      console.error('Sighting submit error:', e);
      throw e;
    }
  };

  const handleOpenSpeciesModal = (sp) => {
    setSelectedSpecies(sp);
    setIsSpeciesModalOpen(true);
  };

  const handleSelectRegionFromSpecies = (reg) => {
    setSelectedRegion(reg);
    setActiveTab('regions');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-800 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-2xl animate-pulse">
          🌿
        </div>
        <div className="text-xs font-mono tracking-widest text-slate-500 uppercase">
          Initializing Pune BioWatch
        </div>
        <div className="text-xs text-slate-400">
          Loading Western Ghats ecological datasets & microclimates...
        </div>
      </div>
    );
  }

  const activeAlertCount = alerts.filter((a) => a.status === 'Pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans selection:bg-emerald-500 selection:text-white">
      {/* Official Government / Agency Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={activeAlertCount}
        weather={weather}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {activeTab === 'home' && (
          <HomePage
            regions={regions}
            species={species}
            alerts={alerts}
            sightings={sightings}
            climateData={climateData}
            weather={weather}
            setActiveTab={setActiveTab}
            onSelectRegion={(reg) => {
              setSelectedRegion(reg);
              setActiveTab('regions');
            }}
            onSelectSpecies={handleOpenSpeciesModal}
          />
        )}

        {activeTab === 'regions' && (
          <RegionExplorerPage
            regions={regions}
            species={species}
            alerts={alerts}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            onSelectSpecies={handleOpenSpeciesModal}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'species' && (
          <SpeciesDatabasePage
            species={species}
            regions={regions}
            onSelectSpecies={handleOpenSpeciesModal}
            onSelectRegion={handleSelectRegionFromSpecies}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'climate' && (
          <ClimateDashboardPage climateData={climateData} weather={weather} />
        )}

        {activeTab === 'satellite' && <SatelliteViewerPage />}

        {activeTab === 'alerts' && (
          <AdminAlertsPage
            alerts={alerts}
            onUpdateStatus={handleUpdateAlertStatus}
            regions={regions}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            regions={regions}
            species={species}
            sightings={sightings}
            onSubmitSighting={handleSubmitSighting}
          />
        )}
      </main>

      {/* Global Species Detail Modal */}
      <SpeciesModal
        species={selectedSpecies}
        isOpen={isSpeciesModalOpen}
        onClose={() => setIsSpeciesModalOpen(false)}
        regions={regions}
        onSelectRegion={handleSelectRegionFromSpecies}
      />

      {/* Official Agency & Academic Disclaimer Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
