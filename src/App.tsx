import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { AccessibilityBar } from './components/common/AccessibilityBar';
import { VoiceCompanion } from './components/patient/VoiceCompanion';
import { ClinicianDashboard } from './components/clinician/ClinicianDashboard';
import { AboutProject } from './components/common/AboutProject';
import { EmergencyModal } from './components/patient/EmergencyModal';

const AppContent: React.FC = () => {
  const { activeTab, accessibility } = useApp();

  return (
    <div className={`min-h-screen ${accessibility.highContrast ? 'high-contrast' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />
      <AccessibilityBar />

      <main className="pb-16">
        {activeTab === 'patient_voice' && <VoiceCompanion />}
        {activeTab === 'clinician_hub' && <ClinicianDashboard />}
        {activeTab === 'about_project' && <AboutProject />}
      </main>

      <EmergencyModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
