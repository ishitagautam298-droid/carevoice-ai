import os

base = '/Users/ishitagautam/.gemini/antigravity/scratch/carevoice-ai'

# 1. src/components/common/Navbar.tsx
with open(f'{base}/src/components/common/Navbar.tsx', 'w') as f:
    f.write("""import React from 'react';
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
""")

# 2. src/components/common/AccessibilityBar.tsx
with open(f'{base}/src/components/common/AccessibilityBar.tsx', 'w') as f:
    f.write("""import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Type, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Gauge, 
  Eye, 
  PhoneCall,
  RotateCcw
} from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const { 
    accessibility, 
    updateAccessibility, 
    setEmergencyModalOpen,
    resetConversation 
  } = useApp();

  return (
    <div className="bg-emerald-900 text-emerald-50 px-4 py-2.5 border-b border-emerald-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        
        {/* Left: Senior Accessibility Helpers */}
        <div className="flex items-center flex-wrap gap-4">
          <span className="font-bold flex items-center gap-1.5 text-emerald-200">
            <Eye className="w-4 h-4" /> Senior Friendly:
          </span>

          {/* Font Size Toggles */}
          <div className="flex items-center gap-1 bg-emerald-950/60 p-1 rounded-lg border border-emerald-700/50">
            <span className="text-xs text-emerald-300 font-medium px-1.5">Text Size:</span>
            <button
              onClick={() => updateAccessibility({ fontSize: 'normal' })}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                accessibility.fontSize === 'normal' ? 'bg-emerald-500 text-white' : 'text-emerald-300 hover:text-white'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => updateAccessibility({ fontSize: 'large' })}
              className={`px-2.5 py-1 rounded text-sm font-bold ${
                accessibility.fontSize === 'large' ? 'bg-emerald-500 text-white' : 'text-emerald-300 hover:text-white'
              }`}
            >
              Large
            </button>
            <button
              onClick={() => updateAccessibility({ fontSize: 'extralarge' })}
              className={`px-3 py-1 rounded text-base font-extrabold ${
                accessibility.fontSize === 'extralarge' ? 'bg-emerald-500 text-white' : 'text-emerald-300 hover:text-white'
              }`}
            >
              XL
            </button>
          </div>

          {/* High Contrast */}
          <button
            onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              accessibility.highContrast
                ? 'bg-amber-400 text-black border-amber-300 font-bold'
                : 'bg-emerald-950/60 text-emerald-200 border-emerald-700/50 hover:text-white'
            }`}
          >
            {accessibility.highContrast ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>High Contrast</span>
          </button>

          {/* Voice Speed Toggle */}
          <div className="flex items-center gap-1 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-700/50 text-xs">
            <Gauge className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-emerald-300">Speech Pace:</span>
            <select
              value={accessibility.voiceSpeed}
              onChange={(e) => updateAccessibility({ voiceSpeed: parseFloat(e.target.value) })}
              className="bg-emerald-900 text-white font-semibold rounded px-1.5 py-0.5 border border-emerald-700 cursor-pointer"
            >
              <option value="0.8">Gentle & Relaxed (0.8x)</option>
              <option value="0.92">Natural Senior Pace (0.9x)</option>
              <option value="1.0">Standard (1.0x)</option>
              <option value="1.15">Brisk (1.15x)</option>
            </select>
          </div>

          {/* Auto-Speak Toggle */}
          <button
            onClick={() => updateAccessibility({ autoSpeakResponse: !accessibility.autoSpeakResponse })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              accessibility.autoSpeakResponse
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
            }`}
          >
            {accessibility.autoSpeakResponse ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{accessibility.autoSpeakResponse ? 'Voice Audio ON' : 'Voice Audio Muted'}</span>
          </button>
        </div>

        {/* Right: Emergency & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetConversation}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition"
            title="Restart conversation from beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Check-in</span>
          </button>

          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-rose-500 animate-pulse"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency SOS (911)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
""")

# 3. src/components/patient/AudioOrb.tsx
with open(f'{base}/src/components/patient/AudioOrb.tsx', 'w') as f:
    f.write("""import React from 'react';
import { Mic, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface AudioOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  onClick: () => void;
  disabled?: boolean;
}

export const AudioOrb: React.FC<AudioOrbProps> = ({
  isListening,
  isSpeaking,
  audioLevel,
  onClick,
  disabled
}) => {
  // Scale calculation for pulsing visual feedback
  const dynamicScale = isListening 
    ? 1 + Math.min(0.35, audioLevel * 0.8)
    : isSpeaking 
    ? 1.08 + Math.sin(Date.now() / 200) * 0.05 
    : 1.0;

  return (
    <div className="flex flex-col items-center justify-center my-6">
      
      {/* Outer Ripple Rings */}
      <div className="relative flex items-center justify-center">
        {isListening && (
          <>
            <div className="absolute w-52 h-52 rounded-full bg-teal-400/20 animate-ping pointer-events-none" />
            <div className="absolute w-64 h-64 rounded-full bg-teal-300/15 animate-pulse-slow pointer-events-none" />
          </>
        )}

        {isSpeaking && (
          <div className="absolute w-56 h-56 rounded-full bg-cyan-400/25 animate-pulse pointer-events-none" />
        )}

        {/* Main Interactive Button Orb */}
        <button
          onClick={onClick}
          disabled={disabled}
          style={{ transform: `scale(${dynamicScale})` }}
          aria-label={isListening ? "Listening to your voice. Click to finish." : "Click to speak with CareVoice"}
          className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-8 ${
            isListening
              ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-500 shadow-rose-500/40 ring-rose-300'
              : isSpeaking
              ? 'bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 shadow-teal-500/40 ring-teal-200'
              : 'bg-gradient-to-tr from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-500 hover:to-emerald-500 shadow-teal-600/30 ring-teal-100 hover:scale-105'
          }`}
        >
          {isListening ? (
            <div className="flex flex-col items-center">
              <Mic className="w-14 h-14 animate-bounce" />
              <span className="text-xs font-extrabold uppercase tracking-widest mt-1">Listening</span>
            </div>
          ) : isSpeaking ? (
            <div className="flex flex-col items-center">
              <Volume2 className="w-14 h-14 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest mt-1">Speaking</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Mic className="w-14 h-14" />
              <span className="text-xs font-extrabold uppercase tracking-widest mt-1">Tap to Speak</span>
            </div>
          )}
        </button>
      </div>

      {/* Senior Visual Guidance Hint */}
      <div className="mt-4 text-center">
        {isListening ? (
          <p className="text-base font-bold text-rose-600 animate-pulse">
            ● I am listening... Speak naturally at your own pace.
          </p>
        ) : isSpeaking ? (
          <p className="text-base font-bold text-teal-700">
            CareVoice is speaking. Listen carefully.
          </p>
        ) : (
          <p className="text-base font-medium text-slate-600">
            Tap the microphone button above and speak anytime.
          </p>
        )}
      </div>

    </div>
  );
};
""")

# 4. src/components/patient/CheckInModeSelector.tsx
with open(f'{base}/src/components/patient/CheckInModeSelector.tsx', 'w') as f:
    f.write("""import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckInMode } from '../../types';
import { 
  Sun, 
  Pill, 
  Activity, 
  CalendarCheck, 
  MessageSquareHeart 
} from 'lucide-react';

export const CheckInModeSelector: React.FC = () => {
  const { currentMode, setCheckInMode } = useApp();

  const modes: Array<{
    id: CheckInMode;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }> = [
    {
      id: 'daily_checkin',
      label: 'Daily Wellness Check',
      description: 'Sleep, energy, vitals & mood',
      icon: Sun,
      accentColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 'medication_review',
      label: 'Medications & Pills',
      description: 'Adherence & side effect check',
      icon: Pill,
      accentColor: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'symptom_deepdive',
      label: 'Symptom Tracker',
      description: 'Pain, swelling or discomfort',
      icon: Activity,
      accentColor: 'from-rose-500 to-pink-500'
    },
    {
      id: 'appointment_prep',
      label: 'Doctor Visit Prep',
      description: 'Prepare questions for physician',
      icon: CalendarCheck,
      accentColor: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'free_chat',
      label: 'Free Voice Chat',
      description: 'Open conversation with agent',
      icon: MessageSquareHeart,
      accentColor: 'from-purple-500 to-violet-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-4">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = currentMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => setCheckInMode(mode.id)}
            className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-teal-50/80 border-teal-500 shadow-md ring-2 ring-teal-400/30'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${mode.accentColor} mb-2 shadow-sm`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-sm font-bold ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
              {mode.label}
            </span>
            <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
              {mode.description}
            </span>
          </button>
        );
      })}
    </div>
  );
};
""")

# 5. src/components/patient/QuickPromptPills.tsx
with open(f'{base}/src/components/patient/QuickPromptPills.tsx', 'w') as f:
    f.write("""import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageCircle } from 'lucide-react';

export const QuickPromptPills: React.FC = () => {
  const { currentMode, sendUserMessage, selectedPatient } = useApp();

  const promptsByMode: Record<string, string[]> = {
    daily_checkin: [
      "I slept okay, about 6 hours, but woke up feeling a little stiff.",
      "I took my morning Lisinopril, but my scale was 3 pounds heavier today.",
      "I had to sleep with three pillows because I couldn't catch my breath.",
      "I feel great today! Walked around the garden and drank my morning water."
    ],
    medication_review: [
      "I skipped my water pill (Lasix) because it makes me dizzy when standing.",
      "I took all my prescribed pills right after breakfast without trouble.",
      "My blood pressure pill is running low, I might need a refill next week.",
      "Does my knee pain cream interfere with my daily heart pills?"
    ],
    symptom_deepdive: [
      "My ankles look quite swollen today and my socks left deep ring marks.",
      "I have a mild dull ache in my left knee, about 4 out of 10.",
      "I felt lightheaded for a minute when I stood up quickly from my chair.",
      "I have tightness in my chest and my heart feels like it's racing."
    ],
    appointment_prep: [
      "I want to ask Dr. Jenkins if we can adjust my water pill timing.",
      "Can I safely travel by plane for my granddaughter's graduation next month?",
      "Can we review my latest blood test results for kidney function?",
      "Is it normal to still have morning knee stiffness after walking?"
    ],
    free_chat: [
      "Good morning! Just checking in to see how my health log looks.",
      "What are healthy low-sodium snacks I can eat for lunch?",
      "Can you remind me of my next scheduled doctor visit?"
    ]
  };

  const samplePrompts = promptsByMode[currentMode] || promptsByMode.daily_checkin;

  return (
    <div className="mt-4 pt-4 border-t border-slate-200">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
        <span>One-Click Sample Voice Prompts (For quick testing without microphone):</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => sendUserMessage(prompt)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 hover:border-teal-300 transition shadow-sm text-left"
          >
            <MessageCircle className="w-3 h-3 text-teal-600 flex-shrink-0" />
            <span>"{prompt}"</span>
          </button>
        ))}
      </div>
    </div>
  );
};
""")

# 6. src/components/patient/EmergencyModal.tsx
with open(f'{base}/src/components/patient/EmergencyModal.tsx', 'w') as f:
    f.write("""import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertOctagon, 
  PhoneCall, 
  User, 
  Stethoscope, 
  X, 
  ShieldAlert 
} from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { 
    isEmergencyModalOpen, 
    setEmergencyModalOpen, 
    selectedPatient 
  } = useApp();

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-rose-500 text-slate-900 relative">
        
        {/* Close button */}
        <button
          onClick={() => setEmergencyModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          aria-label="Close emergency modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Emergency Icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AlertOctagon className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white uppercase tracking-wider">
              Urgent Clinical Alert
            </span>
            <h3 className="text-2xl font-black text-rose-900 mt-1">
              Immediate Safety Protocol
            </h3>
          </div>
        </div>

        {/* Guidance Text */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 my-4 text-rose-900">
          <p className="text-base font-bold">
            {selectedPatient.name.split(' ')[0]}, if you are experiencing severe chest pressure, sudden breathing difficulty, or feel faint:
          </p>
          <p className="text-sm font-medium mt-1 text-rose-800">
            Please sit down immediately in a comfortable chair. Do not try to walk alone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-6">
          <a
            href="tel:911"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-lg shadow-lg shadow-rose-600/30 transition transform hover:scale-[1.02]"
          >
            <PhoneCall className="w-6 h-6" />
            <span>Call 911 (Emergency Services)</span>
          </a>

          <a
            href={`tel:${selectedPatient.emergencyContact.phone}`}
            className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-teal-600" />
              <div className="text-left">
                <p className="text-xs text-slate-500">Call Caregiver / Family</p>
                <p className="text-sm font-bold">{selectedPatient.emergencyContact.name}</p>
              </div>
            </div>
            <span className="text-teal-700 text-sm font-extrabold">{selectedPatient.emergencyContact.phone}</span>
          </a>

          <a
            href={`tel:${selectedPatient.primaryPhysician.phone}`}
            className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition"
          >
            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <div className="text-left">
                <p className="text-xs text-slate-500">Call Clinic On-Call Team</p>
                <p className="text-sm font-bold">{selectedPatient.primaryPhysician.name}</p>
              </div>
            </div>
            <span className="text-teal-700 text-sm font-extrabold">{selectedPatient.primaryPhysician.phone}</span>
          </a>
        </div>

        {/* Dismiss safe button */}
        <button
          onClick={() => setEmergencyModalOpen(false)}
          className="mt-6 w-full py-2.5 text-center text-sm font-bold text-slate-500 hover:text-slate-800 transition"
        >
          I am safe right now. Return to conversation.
        </button>

      </div>
    </div>
  );
};
""")

# 7. src/components/patient/VoiceCompanion.tsx
with open(f'{base}/src/components/patient/VoiceCompanion.tsx', 'w') as f:
    f.write("""import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AudioOrb } from './AudioOrb';
import { CheckInModeSelector } from './CheckInModeSelector';
import { QuickPromptPills } from './QuickPromptPills';
import { 
  Heart, 
  ShieldCheck, 
  FileText, 
  Send, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Bot,
  Volume2
} from 'lucide-react';
import { speechService } from '../../services/speechService';

export const VoiceCompanion: React.FC = () => {
  const {
    selectedPatient,
    accessibility,
    messages,
    isListening,
    isSpeaking,
    audioLevel,
    transcriptionError,
    startVoiceSession,
    stopVoiceSession,
    sendUserMessage,
    generateReportNow
  } = useApp();

  const [typedInput, setTypedInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll conversation to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOrbClick = () => {
    if (isListening) {
      stopVoiceSession();
    } else {
      startVoiceSession();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedInput.trim()) {
      sendUserMessage(typedInput.trim());
      setTypedInput('');
    }
  };

  const fontSizeClasses = {
    normal: 'font-size-normal',
    large: 'font-size-large',
    extralarge: 'font-size-extralarge'
  }[accessibility.fontSize];

  return (
    <div className={`max-w-4xl mx-auto p-4 sm:p-6 ${fontSizeClasses}`}>
      
      {/* Patient Greeting & Status Banner */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-800 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={selectedPatient.avatar}
              alt={selectedPatient.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome, {selectedPatient.name.split(' ')[0]}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
                  Age {selectedPatient.age}
                </span>
              </div>
              <p className="text-teal-100 text-sm mt-0.5 font-medium">
                Primary Doctor: {selectedPatient.primaryPhysician.name} • {selectedPatient.primaryPhysician.clinic}
              </p>
            </div>
          </div>

          {/* Quick Doctor Summary Button */}
          <button
            onClick={generateReportNow}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-teal-900 font-bold text-sm shadow-md hover:bg-teal-50 transition transform hover:scale-[1.02] cursor-pointer"
          >
            <FileText className="w-4 h-4 text-teal-700" />
            <span>View Clinician Report</span>
          </button>
        </div>
      </div>

      {/* Routine / Check-in Mode Selector */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
          Select Your Check-in Topic:
        </h2>
        <CheckInModeSelector />
      </div>

      {/* Center Voice Orb Component */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 text-center mb-6">
        <AudioOrb
          isListening={isListening}
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
          onClick={handleOrbClick}
        />

        {transcriptionError && (
          <div className="mt-3 p-3 bg-amber-50 text-amber-900 rounded-xl text-sm border border-amber-200 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{transcriptionError}</span>
          </div>
        )}

        {/* Quick Sample Prompts */}
        <QuickPromptPills />
      </div>

      {/* Conversation Transcript Stream */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-800">
              Live Conversation with CareVoice
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {messages.length} message{messages.length === 1 ? '' : 's'} recorded
          </span>
        </div>

        {/* Message Thread */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {messages.map((msg) => {
            const isAgent = msg.sender === 'agent';
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-sm ${
                    isAgent
                      ? 'bg-gradient-to-tr from-teal-600 to-emerald-500'
                      : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
                  }`}
                >
                  {isAgent ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] rounded-3xl px-5 py-3.5 shadow-sm ${
                    isAgent
                      ? 'bg-slate-100 text-slate-900 rounded-tl-sm border border-slate-200/80'
                      : 'bg-teal-600 text-white rounded-tr-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span
                      className={`text-xs font-bold ${
                        isAgent ? 'text-teal-700' : 'text-teal-100'
                      }`}
                    >
                      {isAgent ? 'CareVoice Assistant' : selectedPatient.name}
                    </span>
                    <span
                      className={`text-[11px] ${
                        isAgent ? 'text-slate-400' : 'text-teal-200'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  <p className="leading-relaxed font-normal whitespace-pre-wrap">{msg.text}</p>

                  {/* Detected Flag Badge if present */}
                  {msg.detectedFlag && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      {msg.detectedFlag === 'red' && <span>🔴 Red Flag: {msg.flagTitle || 'Urgent Clinical Review'}</span>}
                      {msg.detectedFlag === 'yellow' && <span>🟡 Yellow Flag: {msg.flagTitle || 'Monitor closely'}</span>}
                      {msg.detectedFlag === 'green' && <span>🟢 Positive Progress: {msg.flagTitle || 'Goal achieved'}</span>}
                    </div>
                  )}

                  {/* Voice Replay button */}
                  {isAgent && (
                    <button
                      onClick={() =>
                        speechService.speak(msg.text, {
                          rate: accessibility.voiceSpeed,
                          pitch: accessibility.voicePitch
                        })
                      }
                      className="mt-2 text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear again</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Fallback Text Input Bar */}
        <form onSubmit={handleTextSubmit} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            placeholder="Or type what you would like to say here..."
            className="flex-1 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <button
            type="submit"
            disabled={!typedInput.trim()}
            className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>

      {/* Clinical Safety & Non-Diagnostic Disclaimer */}
      <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200 text-xs text-slate-500 leading-relaxed flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-700">Clinical Safety Notice:</p>
          <p>
            CareVoice AI is a supportive communication and wellness logging assistant for adults 55+ and their healthcare providers. It does not replace professional clinical judgment, provide medical diagnoses, or prescribe treatments. In the event of a medical emergency, call 911 immediately.
          </p>
        </div>
      </div>

    </div>
  );
};
""")

print("Patient components created successfully!")
