import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalReportView } from './ClinicalReportView';
import { HealthTrendsChart } from './HealthTrendsChart';
import { 
  Stethoscope, 
  Users, 
  AlertOctagon, 
  TrendingUp, 
  Search, 
  Filter, 
  CheckCircle2,
  Calendar,
  Phone,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ClinicianDashboard: React.FC = () => {
  const { 
    allPatients, 
    selectedPatient, 
    setSelectedPatient, 
    currentReport, 
    acknowledgeFlag,
    trendsData 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'report' | 'trends'>('report');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredPatients = allPatients.filter(p =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.primaryConditions.some(c => c.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Clinician Hub Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Plus_Jakarta_Sans']">
              Clinician Intelligence & Triage Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Structured patient insights converted directly from natural voice conversations
          </p>
        </div>

        {/* View Switcher: Clinical Report vs Longitudinal Trends */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'report'
                ? 'bg-white text-teal-700 shadow-sm border border-teal-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Clinical Report & Triage
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'trends'
                ? 'bg-white text-teal-700 shadow-sm border border-teal-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Longitudinal Trends (7D)
          </button>
        </div>
      </div>

      {/* Main Grid: Patient Sidebar + Clinical View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Patient Roster & Triage Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span>Patient Care Roster</span>
              </h3>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {allPatients.length} Active
              </span>
            </div>

            {/* Search filter */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search by name or condition..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            {/* Patient Cards List */}
            <div className="space-y-2.5">
              {filteredPatients.map((patient) => {
                const isSelected = selectedPatient.id === patient.id;

                return (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/80 border-teal-500 shadow-sm ring-2 ring-teal-400/20'
                        : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-900">
                            {patient.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-500">
                            ({patient.age}y)
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {patient.primaryConditions[0]}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-extrabold px-2 py-0.2 rounded-md ${
                            patient.riskTier === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {patient.riskTier.toUpperCase()} RISK
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Adherence: {patient.overallAdherenceRate}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-teal-600' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Doctor Note Summary */}
          <div className="bg-slate-100 rounded-3xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Decision Support & EHR Sync</span>
            </div>
            <p>
              CareVoice AI converts conversational speech patterns into FHIR-compatible health logs, highlighting potential adverse drug events, volume shifts, and mental wellness indicators.
            </p>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-8">
          {activeTab === 'report' ? (
            <ClinicalReportView
              report={currentReport}
              patient={selectedPatient}
              onAcknowledgeFlag={acknowledgeFlag}
            />
          ) : (
            <div className="space-y-6">
              <HealthTrendsChart data={trendsData} />
              
              <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Clinical Trend Insights for {selectedPatient.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Correlation detected between morning medication adherence drops and upward spikes in blood pressure (r = -0.74). Weight logging regularity remains high across the last 14 days, providing reliable volume tracking for geriatric heart failure management.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
