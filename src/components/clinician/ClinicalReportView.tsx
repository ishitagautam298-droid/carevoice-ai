import React, { useState } from 'react';
import { ClinicalReport, PatientProfile } from '../../types';
import { TriageFlagCard } from './TriageFlagCard';
import { ReportExportModal } from './ReportExportModal';
import { 
  FileText, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  ListChecks, 
  HelpCircle, 
  Download, 
  Printer, 
  User, 
  Clock, 
  ChevronRight,
  Pill,
  Activity,
  Heart
} from 'lucide-react';

interface ClinicalReportViewProps {
  report: ClinicalReport;
  patient: PatientProfile;
  onAcknowledgeFlag: (id: string) => void;
}

export const ClinicalReportView: React.FC<ClinicalReportViewProps> = ({
  report,
  patient,
  onAcknowledgeFlag
}) => {
  const [isExportOpen, setExportOpen] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Top Header Card with Patient Scorecard */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="flex items-start gap-4">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-black text-slate-900">
                  {patient.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  {patient.age} y/o {patient.gender}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                  patient.riskTier === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {patient.riskTier.toUpperCase()} RISK TIER
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium mt-1">
                Conditions: <strong className="text-slate-700">{patient.primaryConditions.join(' • ')}</strong>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Session Generated: {new Date(report.generatedAt).toLocaleString()} ({Math.round(report.sessionDurationSeconds / 60)} min voice encounter)
              </p>
            </div>
          </div>

          {/* Action Export Buttons */}
          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => setExportOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export SOAP Note / PDF</span>
            </button>
          </div>
        </div>

        {/* 4 Scorecard Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
              <span>Overall Wellbeing</span>
              <Heart className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {report.patientOverview.wellbeingScoreOutOf10}/10
            </p>
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {report.patientOverview.overallWellbeing}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
              <span>Med Adherence</span>
              <Pill className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-600">
              {report.patientOverview.adherenceScorePercent}%
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Current 7-day compliance
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
              <span>Triage Red Flags</span>
              <AlertOctagon className="w-4 h-4 text-rose-600" />
            </div>
            <p className={`text-2xl font-black ${report.redFlags.length > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
              {report.redFlags.length}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {report.redFlags.length > 0 ? 'Urgent attention required' : 'No acute safety alerts'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
              <span>Yellow Monitoring</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-500">
              {report.yellowFlags.length}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Issues to review next visit
            </p>
          </div>
        </div>

      </div>

      {/* Structured Patient Overview */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-teal-600" />
          <span>Patient Overview & Executive Clinical Summary</span>
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed bg-teal-50/50 p-4 rounded-2xl border border-teal-100 font-medium">
          {report.patientOverview.summary}
        </p>

        <div className="mt-4">
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
            Recent Noted Changes:
          </h4>
          <ul className="space-y-1.5">
            {report.patientOverview.recentChanges.map((change, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <ChevronRight className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clinical Triage Flags Breakdown */}
      <div className="space-y-4">
        
        {/* Red Flags */}
        {report.redFlags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
              <AlertOctagon className="w-5 h-5 animate-pulse" />
              <span>🔴 Red Flags - Critical Issues Requiring Clinical Attention ({report.redFlags.length})</span>
            </div>
            {report.redFlags.map(rf => (
              <TriageFlagCard key={rf.id} flag={rf} onAcknowledge={onAcknowledgeFlag} />
            ))}
          </div>
        )}

        {/* Yellow Flags */}
        {report.yellowFlags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>🟡 Yellow Flags - Issues to Monitor or Follow Up ({report.yellowFlags.length})</span>
            </div>
            {report.yellowFlags.map(yf => (
              <TriageFlagCard key={yf.id} flag={yf} onAcknowledge={onAcknowledgeFlag} />
            ))}
          </div>
        )}

        {/* Positive Progress */}
        {report.positiveProgress.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>🟢 Positive Progress & Adherence Milestones ({report.positiveProgress.length})</span>
            </div>
            {report.positiveProgress.map(pf => (
              <TriageFlagCard key={pf.id} flag={pf} />
            ))}
          </div>
        )}

      </div>

      {/* Symptoms & Medication Adherence Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Symptoms Log */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-rose-500" />
            <span>Symptoms Logged in Session</span>
          </h3>

          <div className="space-y-3">
            {report.symptomsLogged.map((sym, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                  <span>{sym.symptom}</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                    sym.severityOutOf10 >= 7 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Severity: {sym.severityOutOf10}/10
                  </span>
                </div>
                <p className="text-slate-500 mt-1">
                  <strong>Onset:</strong> {sym.onsetDuration}
                </p>
                <p className="text-slate-600 mt-0.5">
                  <strong>Details:</strong> {sym.aggravatingOrRelieving}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Adherence Log */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Pill className="w-5 h-5 text-teal-600" />
            <span>Medication Adherence Audit</span>
          </h3>

          <div className="space-y-3">
            {report.medicationAdherenceReport.map((med, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                  <span>{med.medicationName}</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-extrabold uppercase ${
                    med.status === 'taken' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {med.status.toUpperCase()}
                  </span>
                </div>
                {med.reportedReason && (
                  <p className="text-slate-600 mt-1">
                    <strong>Reported Notes:</strong> {med.reportedReason}
                  </p>
                )}
                {med.sideEffectReported && (
                  <p className="text-rose-700 font-semibold mt-0.5">
                    <strong>Side Effect:</strong> {med.sideEffectReported}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Patient Concerns & Clinician Follow-up Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Patient Questions for Doctor */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>Patient Concerns for Next Visit</span>
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Topics and questions explicitly logged by the patient to discuss with {patient.primaryPhysician.name}:
          </p>
          <ul className="space-y-2">
            {report.patientConcernsForDoctor.map((concern, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs font-medium text-slate-800 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold flex-shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Clinician Follow-up Checklist */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
            <ListChecks className="w-5 h-5 text-teal-600" />
            <span>Actionable Clinician Follow-Up Plan</span>
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Recommended clinical actions and orders based on real-time conversational triage:
          </p>
          <ul className="space-y-2">
            {report.clinicianFollowUpPlan.map((action, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs font-medium text-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* EHR-Ready SOAP Clinical Note Block */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <h3 className="text-base font-bold text-white font-mono">
              EHR SOAP Note (Automated Clinical Synthesis)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Format: HL7 / FHIR Ready
          </span>
        </div>

        <div className="space-y-4 font-mono text-xs leading-relaxed">
          <div>
            <span className="text-teal-400 font-bold uppercase">[SUBJECTIVE]:</span>
            <p className="text-slate-300 mt-1 pl-4 border-l-2 border-teal-500/50">
              {report.soapNote.subjective}
            </p>
          </div>

          <div>
            <span className="text-cyan-400 font-bold uppercase">[OBJECTIVE]:</span>
            <p className="text-slate-300 mt-1 pl-4 border-l-2 border-cyan-500/50">
              {report.soapNote.objective}
            </p>
          </div>

          <div>
            <span className="text-amber-400 font-bold uppercase">[ASSESSMENT]:</span>
            <p className="text-slate-300 mt-1 pl-4 border-l-2 border-amber-500/50">
              {report.soapNote.assessment}
            </p>
          </div>

          <div>
            <span className="text-emerald-400 font-bold uppercase">[PLAN]:</span>
            <p className="text-slate-300 mt-1 pl-4 border-l-2 border-emerald-500/50">
              {report.soapNote.plan}
            </p>
          </div>
        </div>
      </div>

      {/* Raw Transcript Drawer */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
          <span>Full Raw Encounter Transcript (Audit Log)</span>
          <span className="text-xs text-slate-400 font-normal">
            {report.rawTranscript.length} lines recorded
          </span>
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
          {report.rawTranscript.map((t, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="font-bold text-slate-700 min-w-[120px] flex-shrink-0">
                {t.speaker} ({t.time}):
              </span>
              <span className="text-slate-600">{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export Modal */}
      <ReportExportModal
        report={report}
        patient={patient}
        isOpen={isExportOpen}
        onClose={() => setExportOpen(false)}
      />

    </div>
  );
};
