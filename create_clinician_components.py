import os

base = '/Users/ishitagautam/.gemini/antigravity/scratch/carevoice-ai'

# 1. src/components/clinician/TriageFlagCard.tsx
with open(f'{base}/src/components/clinician/TriageFlagCard.tsx', 'w') as f:
    f.write("""import React from 'react';
import { TriageFlag } from '../../types';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Quote, 
  ArrowRight,
  Check
} from 'lucide-react';

interface TriageFlagCardProps {
  flag: TriageFlag;
  onAcknowledge?: (id: string) => void;
}

export const TriageFlagCard: React.FC<TriageFlagCardProps> = ({ flag, onAcknowledge }) => {
  const isRed = flag.type === 'red';
  const isYellow = flag.type === 'yellow';
  const isGreen = flag.type === 'green';

  const cardBorder = isRed
    ? 'border-rose-300 bg-rose-50/50 hover:bg-rose-50'
    : isYellow
    ? 'border-amber-300 bg-amber-50/50 hover:bg-amber-50'
    : 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50';

  const badgeBg = isRed
    ? 'bg-rose-600 text-white'
    : isYellow
    ? 'bg-amber-500 text-white'
    : 'bg-emerald-600 text-white';

  const iconBg = isRed
    ? 'text-rose-600 bg-rose-100'
    : isYellow
    ? 'text-amber-600 bg-amber-100'
    : 'text-emerald-600 bg-emerald-100';

  return (
    <div className={`p-4 rounded-2xl border ${cardBorder} shadow-sm transition-all duration-200 relative`}>
      <div className="flex items-start justify-between gap-3">
        
        {/* Left Icon & Title */}
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            {isRed && <AlertOctagon className="w-5 h-5 animate-pulse" />}
            {isYellow && <AlertTriangle className="w-5 h-5" />}
            {isGreen && <CheckCircle className="w-5 h-5" />}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${badgeBg}`}>
                {isRed ? 'RED FLAG (URGENT)' : isYellow ? 'YELLOW FLAG (MONITOR)' : 'POSITIVE PROGRESS'}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {flag.timestamp}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                {flag.category}
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 mt-1">
              {flag.title}
            </h4>

            <p className="text-sm text-slate-600 mt-0.5">
              {flag.description}
            </p>
          </div>
        </div>

        {/* Status / Acknowledge Action */}
        <div>
          {flag.status === 'active' ? (
            <button
              onClick={() => onAcknowledge?.(flag.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Acknowledge</span>
            </button>
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200 text-slate-700 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> Acknowledged
            </span>
          )}
        </div>

      </div>

      {/* Patient Voice Quote */}
      {flag.relatedQuote && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border">
          <Quote className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs italic text-slate-700">
            "{flag.relatedQuote}"
          </p>
        </div>
      )}

      {/* Recommended Action */}
      <div className="mt-2.5 flex items-start gap-2 text-xs font-semibold text-slate-800">
        <ArrowRight className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
        <span><strong className="text-teal-900">Clinical Recommendation:</strong> {flag.recommendedAction}</span>
      </div>

    </div>
  );
};
""")

# 2. src/components/clinician/HealthTrendsChart.tsx
with open(f'{base}/src/components/clinician/HealthTrendsChart.tsx', 'w') as f:
    f.write("""import React, { useState } from 'react';
import { TrendMetric } from '../../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { Activity, Pill, Moon, Droplets, TrendingUp } from 'lucide-react';

interface HealthTrendsChartProps {
  data: TrendMetric[];
}

export const HealthTrendsChart: React.FC<HealthTrendsChartProps> = ({ data }) => {
  const [metricTab, setMetricTab] = useState<'vitals' | 'adherence' | 'sleep_pain' | 'lifestyle'>('vitals');

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span>Longitudinal Health Trends (7-Day Overview)</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Aggregated from daily voice check-ins & smart home vitals
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setMetricTab('vitals')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'vitals' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blood Pressure & Weight
          </button>
          <button
            onClick={() => setMetricTab('adherence')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'adherence' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Medication %
          </button>
          <button
            onClick={() => setMetricTab('sleep_pain')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'sleep_pain' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sleep & Pain
          </button>
          <button
            onClick={() => setMetricTab('lifestyle')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'lifestyle' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hydration & Steps
          </button>
        </div>
      </div>

      {/* Chart Render Area */}
      <div className="h-72 w-full">
        {metricTab === 'vitals' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis yAxisId="left" stroke="#ef4444" fontSize={12} domain={[70, 160]} />
              <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="systolicBP" name="Systolic BP (mmHg)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="left" type="monotone" dataKey="diastolicBP" name="Diastolic BP (mmHg)" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" />
              <Line yAxisId="right" type="monotone" dataKey="weightLbs" name="Weight (lbs)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {metricTab === 'adherence' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorAdh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#10b981" fontSize={12} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="adherencePercent" name="Medication Adherence %" stroke="#10b981" fillOpacity={1} fill="url(#colorAdh)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {metricTab === 'sleep_pain' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis yAxisId="left" stroke="#8b5cf6" fontSize={12} domain={[0, 12]} unit="h" />
              <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={12} domain={[0, 10]} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sleepHours" name="Sleep Duration (Hours)" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="painLevel" name="Pain Level (0-10 Scale)" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {metricTab === 'lifestyle' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis yAxisId="left" stroke="#06b6d4" fontSize={12} domain={[0, 12]} unit=" gl" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} domain={[0, 8000]} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="waterGlasses" name="Water Intake (8oz Glasses)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="stepsCount" name="Daily Steps" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};
""")

# 3. src/components/clinician/ReportExportModal.tsx
with open(f'{base}/src/components/clinician/ReportExportModal.tsx', 'w') as f:
    f.write("""import React, { useState } from 'react';
import { ClinicalReport, PatientProfile } from '../../types';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  X, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ReportExportModalProps {
  report: ClinicalReport;
  patient: PatientProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  report,
  patient,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [exportType, setExportType] = useState<'soap' | 'json' | 'summary'>('soap');

  if (!isOpen) return null;

  const soapText = `CLINICAL VOICE ENCOUNTER NOTE (SOAP)
=====================================================
Patient: ${patient.name} (Age: ${patient.age}, Gender: ${patient.gender})
Encounter Date: ${new Date(report.generatedAt).toLocaleString()}
Primary Physician: ${patient.primaryPhysician.name}
Session Mode: ${report.sessionMode}

[SUBJECTIVE]
${report.soapNote.subjective}

[OBJECTIVE]
${report.soapNote.objective}

[ASSESSMENT]
${report.soapNote.assessment}

[PLAN & ACTION ITEMS]
${report.soapNote.plan}

RED FLAGS IDENTIFIED (${report.redFlags.length}):
${report.redFlags.map(f => `- [${f.category.toUpperCase()}] ${f.title}: ${f.description} (Action: ${f.recommendedAction})`).join('\\n') || 'None'}

YELLOW FLAGS FOR MONITORING (${report.yellowFlags.length}):
${report.yellowFlags.map(f => `- [${f.category.toUpperCase()}] ${f.title}: ${f.description}`).join('\\n') || 'None'}

PATIENT QUESTIONS FOR CLINICIAN:
${report.patientConcernsForDoctor.map(q => `- ${q}`).join('\\n')}
=====================================================
Generated by CareVoice AI Geriatric Voice Triage System`;

  const jsonText = JSON.stringify(report, null, 2);

  const handleCopy = () => {
    const textToCopy = exportType === 'json' ? jsonText : soapText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(13, 148, 136); // Teal
    doc.text('CareVoice.AI - Clinician Encounter Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${new Date(report.generatedAt).toLocaleString()}`, 14, 26);
    doc.text(`Patient: ${patient.name} | Age: ${patient.age} | PCP: ${patient.primaryPhysician.name}`, 14, 32);

    doc.line(14, 36, 196, 36);

    let currentY = 44;

    // Overview
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('1. PATIENT OVERVIEW & WELLBEING', 14, currentY);
    currentY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const overviewLines = doc.splitTextToSize(report.patientOverview.summary, 180);
    doc.text(overviewLines, 14, currentY);
    currentY += overviewLines.length * 5 + 6;

    // SOAP
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('2. SOAP CLINICAL DOCUMENTATION', 14, currentY);
    currentY += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Subjective:', 14, currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    const subjLines = doc.splitTextToSize(report.soapNote.subjective, 180);
    doc.text(subjLines, 14, currentY);
    currentY += subjLines.length * 5 + 4;

    doc.setFont('helvetica', 'bold');
    doc.text('Objective:', 14, currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    const objLines = doc.splitTextToSize(report.soapNote.objective, 180);
    doc.text(objLines, 14, currentY);
    currentY += objLines.length * 5 + 4;

    doc.setFont('helvetica', 'bold');
    doc.text('Assessment:', 14, currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    const assLines = doc.splitTextToSize(report.soapNote.assessment, 180);
    doc.text(assLines, 14, currentY);
    currentY += assLines.length * 5 + 4;

    doc.setFont('helvetica', 'bold');
    doc.text('Plan & Recommendations:', 14, currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    const planLines = doc.splitTextToSize(report.soapNote.plan, 180);
    doc.text(planLines, 14, currentY);
    currentY += planLines.length * 5 + 6;

    // Flags
    if (report.redFlags.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(225, 29, 72); // Red
      doc.text('3. RED FLAGS REQUIRING IMMEDIATE ATTENTION', 14, currentY);
      currentY += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      report.redFlags.forEach(rf => {
        const flagText = `• [${rf.category.toUpperCase()}] ${rf.title}: ${rf.description} -> ACTION: ${rf.recommendedAction}`;
        const flagLines = doc.splitTextToSize(flagText, 180);
        doc.text(flagLines, 14, currentY);
        currentY += flagLines.length * 5 + 2;
      });
    }

    doc.save(`CareVoice_Clinical_Report_${patient.name.replace(' ', '_')}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Export Clinician Report
              </h3>
              <p className="text-xs text-slate-500">
                SOAP Note & EHR Integration Ready
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-2 my-4">
          <button
            onClick={() => setExportType('soap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              exportType === 'soap' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            SOAP Clinical Note
          </button>
          <button
            onClick={() => setExportType('json')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              exportType === 'json' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            EHR JSON Schema
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs leading-relaxed border border-slate-800 my-2 whitespace-pre-wrap">
          {exportType === 'json' ? jsonText : soapText}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 mt-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-800 font-bold text-xs border border-slate-300 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-teal-600" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Note</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
""")

# 4. src/components/clinician/ClinicalReportView.tsx
with open(f'{base}/src/components/clinician/ClinicalReportView.tsx', 'w') as f:
    f.write("""import React, { useState } from 'react';
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
""")

# 5. src/components/clinician/ClinicianDashboard.tsx
with open(f'{base}/src/components/clinician/ClinicianDashboard.tsx', 'w') as f:
    f.write("""import React, { useState } from 'react';
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
""")

# 6. src/components/common/AboutProject.tsx (Recruiter & Architecture Guide)
with open(f'{base}/src/components/common/AboutProject.tsx', 'w') as f:
    f.write("""import React from 'react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Mic, 
  FileText, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Portfolio Showcase Project
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-3 font-['Plus_Jakarta_Sans']">
            CareVoice AI: Voice Healthcare for Adults 55+
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Bridging senior health communication with clinical intelligence. Converting natural, empathetic voice interactions into structured, actionable clinical summaries.
          </p>
        </div>
      </div>

      {/* Core Mission & Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
            <Mic className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            1. Senior Accessibility (55+)
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Designed specifically for older adults who struggle with complex typing or mobile apps: one-tap push-to-talk, large typography, high contrast, warm empathetic cadence, and active listening.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            2. Real-time Clinical Triaging
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Intelligent extraction and severity classification: 🔴 Red Flags (urgent alerts like acute orthopnea), 🟡 Yellow Flags (missed diuretic doses), and 🟢 Positive Progress milestones.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            3. Actionable Clinician Reports
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Replaces bloated transcripts with structured SOAP notes, 7-day longitudinal trends (BP, adherence, sleep, pain), patient appointment agendas, and 1-click PDF/EHR exports.
          </p>
        </div>

      </div>

      {/* Technical Architecture & Workflow */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200 mb-8">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
          <Cpu className="w-6 h-6 text-teal-600" />
          <span>System Architecture & Data Pipeline</span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Natural Voice Ingestion & Synthesis</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Uses the Web Speech API with real-time audio analysis and custom Web Audio synthesized chimes, tuned to 0.9x speed for older adults.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Clinical Safety & Intent Classification</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Evaluates symptom mentions against geriatrics clinical heuristics, strictly enforcing non-diagnostic medical boundaries while detecting emergency indicators.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Automated SOAP Note & Trend Aggregation</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Structures raw speech into Subjective, Objective, Assessment, and Plan (SOAP) formats, generating instant PDF reports and EHR JSON payloads.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
""")

# 7. src/App.tsx
with open(f'{base}/src/App.tsx', 'w') as f:
    f.write("""import React from 'react';
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
""")

# 8. src/main.tsx
with open(f'{base}/src/main.tsx', 'w') as f:
    f.write("""import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
""")

print("All components, App.tsx and main.tsx created successfully!")
