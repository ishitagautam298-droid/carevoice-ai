import React from 'react';
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
