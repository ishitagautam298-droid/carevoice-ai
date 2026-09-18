import React from 'react';
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
