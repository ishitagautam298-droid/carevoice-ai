import React from 'react';
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
