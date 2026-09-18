import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Sparkles, 
  AlertTriangle, 
  UserCheck, 
  FileText,
  Volume2,
  Info
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    selectedPatient, 
    setSelectedPatient, 
    allPatients, 
    sessionFlags 
  } = useApp();

  const activeRedFlags = sessionFlags.filter(f => f.type === 'red' && f.status === 'active').length;
  const activeYellowFlags = sessionFlags.filter(f => f.type === 'yellow' && f.status === 'active').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Heart className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  CareVoice<span className="text-teal-600 font-extrabold">.AI</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
                  Geriatric Care Voice 55+
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                AI Voice Health Companion & Clinician Decision Support Hub
              </p>
            </div>
          </div>

          {/* Navigation View Switcher */}
          <nav className="flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('patient_voice')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === 'patient_voice'
                  ? 'bg-white text-teal-700 shadow-sm font-bold border border-teal-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Volume2 className="w-4 h-4 text-teal-600" />
              <span>Patient Voice (55+)</span>
            </button>

            <button
              onClick={() => setActiveTab('clinician_hub')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 relative ${
                activeTab === 'clinician_hub'
                  ? 'bg-white text-teal-700 shadow-sm font-bold border border-teal-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Clinician Hub</span>
              {(activeRedFlags > 0 || activeYellowFlags > 0) && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white animate-pulse">
                  {activeRedFlags > 0 ? `🔴 ${activeRedFlags}` : `🟡 ${activeYellowFlags}`}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('about_project')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === 'about_project'
                  ? 'bg-white text-teal-700 shadow-sm font-bold border border-teal-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Info className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Architecture</span>
            </button>
          </nav>

          {/* Persona Switcher for Recruiter Showcase */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <select
                value={selectedPatient.id}
                onChange={(e) => {
                  const p = allPatients.find(item => item.id === e.target.value);
                  if (p) setSelectedPatient(p);
                }}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-sm"
              >
                {allPatients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.age}y) - {p.primaryConditions[0].split('(')[0]}
                  </option>
                ))}
              </select>
              <UserCheck className="w-4 h-4 text-teal-600 absolute left-3 top-3 pointer-events-none" />
              <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">▼</div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
