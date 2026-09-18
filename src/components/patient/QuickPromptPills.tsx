import React from 'react';
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
