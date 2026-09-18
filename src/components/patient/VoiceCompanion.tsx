import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AudioOrb } from './AudioOrb';
import { CheckInModeSelector } from './CheckInModeSelector';
import { QuickPromptPills } from './QuickPromptPills';
import { HealthEducationModal } from './HealthEducationModal';
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
  Volume2,
  BookOpen
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
  const [isEducationOpen, setEducationOpen] = useState(false);
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
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-900 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={selectedPatient.avatar}
              alt={selectedPatient.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome, {selectedPatient.name.split(' ')[0]}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
                  Age {selectedPatient.age}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/30 border border-emerald-300/40 text-emerald-200">
                  {selectedPatient.gender}
                </span>
              </div>
              <p className="text-teal-100 text-sm mt-0.5 font-medium">
                Primary Doctor: {selectedPatient.primaryPhysician.name} • {selectedPatient.primaryPhysician.clinic}
              </p>
              <p className="text-teal-200 text-xs mt-0.5">
                Next Appointment: <strong>{selectedPatient.primaryPhysician.nextAppointment}</strong>
              </p>
            </div>
          </div>

          {/* Action Hub Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setEducationOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-teal-800/80 hover:bg-teal-700 text-white font-bold text-xs border border-teal-600/50 shadow-sm transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-teal-300" />
              <span>Health Guides</span>
            </button>

            <button
              onClick={generateReportNow}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-teal-900 font-bold text-xs shadow-md hover:bg-teal-50 transition transform hover:scale-[1.02] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-teal-700" />
              <span>Clinician Report</span>
            </button>
          </div>
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

      {/* Health Education Modal */}
      <HealthEducationModal
        isOpen={isEducationOpen}
        onClose={() => setEducationOpen(false)}
      />

    </div>
  );
};
