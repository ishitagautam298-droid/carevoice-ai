import React from 'react';
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
