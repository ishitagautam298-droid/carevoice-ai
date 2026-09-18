import os

base = '/Users/ishitagautam/.gemini/antigravity/scratch/carevoice-ai'

context_code = """import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  PatientProfile, 
  VoiceMessage, 
  CheckInMode, 
  ClinicalReport, 
  TriageFlag, 
  AccessibilitySettings, 
  TrendMetric 
} from '../types';
import { PATIENT_PROFILES, HISTORICAL_TRENDS, SAMPLE_INITIAL_REPORT } from '../services/mockData';
import { aiAgentService } from '../services/aiAgentService';
import { speechService } from '../services/speechService';
import { clinicalReportService } from '../services/clinicalReportService';

interface AppContextType {
  // Navigation
  activeTab: 'patient_voice' | 'clinician_hub' | 'about_project';
  setActiveTab: (tab: 'patient_voice' | 'clinician_hub' | 'about_project') => void;
  
  // Patient Selection
  selectedPatient: PatientProfile;
  setSelectedPatient: (patient: PatientProfile) => void;
  allPatients: PatientProfile[];
  
  // Accessibility
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  
  // Voice & Conversation State
  messages: VoiceMessage[];
  currentMode: CheckInMode;
  setCheckInMode: (mode: CheckInMode) => void;
  isListening: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  transcriptionError: string | null;
  startVoiceSession: () => void;
  stopVoiceSession: () => void;
  sendUserMessage: (text: string) => Promise<void>;
  resetConversation: () => void;
  
  // Clinical Report & Triage
  currentReport: ClinicalReport;
  sessionFlags: TriageFlag[];
  generateReportNow: () => void;
  acknowledgeFlag: (flagId: string) => void;
  trendsData: TrendMetric[];
  
  // Emergency Modal
  isEmergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'patient_voice' | 'clinician_hub' | 'about_project'>('patient_voice');
  const [selectedPatient, setSelectedPatientState] = useState<PatientProfile>(PATIENT_PROFILES[0]);
  
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 'large', // Default to large for 55+
    highContrast: false,
    voiceSpeed: 0.92,
    voicePitch: 1.0,
    autoSpeakResponse: true,
    soundEffectsEnabled: false,
    showTranscriptLive: true
  });

  const [currentMode, setCurrentMode] = useState<CheckInMode>('daily_checkin');
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  const [sessionFlags, setSessionFlags] = useState<TriageFlag[]>(SAMPLE_INITIAL_REPORT.redFlags.concat(SAMPLE_INITIAL_REPORT.yellowFlags, SAMPLE_INITIAL_REPORT.positiveProgress));
  const [currentReport, setCurrentReport] = useState<ClinicalReport>(SAMPLE_INITIAL_REPORT);
  const [isEmergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  const isInitialMount = useRef(true);

  // Initialize initial message when patient or mode changes
  useEffect(() => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsSpeaking(false);
    setIsListening(false);

    aiAgentService.resetSession(currentMode);
    const greeting = aiAgentService.getInitialGreeting(selectedPatient, currentMode);
    
    const initialMsg: VoiceMessage = {
      id: `msg-agent-init-${Date.now()}`,
      sender: 'agent',
      text: greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'general'
    };
    
    setMessages([initialMsg]);

    // Update isInitialMount
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [selectedPatient.id, currentMode]);

  const updateAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...newSettings }));
  };

  const setSelectedPatient = (patient: PatientProfile) => {
    setSelectedPatientState(patient);
  };

  const setCheckInMode = (mode: CheckInMode) => {
    setCurrentMode(mode);
  };

  const startVoiceSession = () => {
    setTranscriptionError(null);
    speechService.stopSpeaking();
    setIsSpeaking(false);

    speechService.startListening({
      onStart: () => {
        setIsListening(true);
      },
      onResult: (transcript, isFinal) => {
        if (isFinal && transcript.trim()) {
          speechService.stopListening();
          setIsListening(false);
          sendUserMessage(transcript.trim());
        }
      },
      onError: (err) => {
        setIsListening(false);
        setTranscriptionError(err);
      },
      onEnd: () => {
        setIsListening(false);
      },
      onAudioLevel: (level) => {
        setAudioLevel(level);
      }
    });
  };

  const stopVoiceSession = () => {
    speechService.stopListening();
    setIsListening(false);
    setAudioLevel(0);
  };

  const sendUserMessage = async (userText: string) => {
    if (!userText.trim()) return;

    // Stop listening before processing
    speechService.stopListening();
    setIsListening(false);

    const userMsg: VoiceMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);

    // Call Context-Aware AI Agent logic
    const agentRes = await aiAgentService.processUserInput(userText, selectedPatient, newHistory);

    // Collect newly detected flags
    if (agentRes.detectedFlags.length > 0) {
      setSessionFlags(prev => [...agentRes.detectedFlags, ...prev]);
    }

    if (agentRes.isEmergency) {
      setEmergencyModalOpen(true);
    }

    const agentMsg: VoiceMessage = {
      id: `msg-agent-${Date.now()}`,
      sender: 'agent',
      text: agentRes.messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: agentRes.category,
      detectedFlag: agentRes.detectedFlags[0]?.type || null,
      flagTitle: agentRes.detectedFlags[0]?.title
    };

    const updatedHistory = [...newHistory, agentMsg];
    setMessages(updatedHistory);

    // Speak agent response clearly with no overlap
    if (accessibility.autoSpeakResponse) {
      speechService.speak(agentRes.messageText, {
        rate: accessibility.voiceSpeed,
        pitch: accessibility.voicePitch,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false)
      });
    }

    // Auto-update clinical report draft
    const updatedReport = clinicalReportService.generateReportFromSession(
      selectedPatient,
      currentMode,
      updatedHistory,
      [...sessionFlags, ...agentRes.detectedFlags]
    );
    setCurrentReport(updatedReport);
  };

  const resetConversation = () => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsSpeaking(false);
    setIsListening(false);
    aiAgentService.resetSession(currentMode);
    
    const greeting = aiAgentService.getInitialGreeting(selectedPatient, currentMode);
    const initialMsg: VoiceMessage = {
      id: `msg-agent-init-${Date.now()}`,
      sender: 'agent',
      text: greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'general'
    };
    setMessages([initialMsg]);
  };

  const generateReportNow = () => {
    const freshReport = clinicalReportService.generateReportFromSession(
      selectedPatient,
      currentMode,
      messages,
      sessionFlags
    );
    setCurrentReport(freshReport);
    setActiveTab('clinician_hub');
  };

  const acknowledgeFlag = (flagId: string) => {
    setSessionFlags(prev =>
      prev.map(f => (f.id === flagId ? { ...f, status: 'acknowledged' } : f))
    );
    setCurrentReport(prev => ({
      ...prev,
      redFlags: prev.redFlags.map(f => (f.id === flagId ? { ...f, status: 'acknowledged' } : f)),
      yellowFlags: prev.yellowFlags.map(f => (f.id === flagId ? { ...f, status: 'acknowledged' } : f))
    }));
  };

  const trendsData = HISTORICAL_TRENDS[selectedPatient.id] || HISTORICAL_TRENDS['pat-eleanor-74'];

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedPatient,
        setSelectedPatient,
        allPatients: PATIENT_PROFILES,
        accessibility,
        updateAccessibility,
        messages,
        currentMode,
        setCheckInMode,
        isListening,
        isSpeaking,
        audioLevel,
        transcriptionError,
        startVoiceSession,
        stopVoiceSession,
        sendUserMessage,
        resetConversation,
        currentReport,
        sessionFlags,
        generateReportNow,
        acknowledgeFlag,
        trendsData,
        isEmergencyModalOpen,
        setEmergencyModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
"""

with open(f'{base}/src/context/AppContext.tsx', 'w') as f:
    f.write(context_code)

print("AppContext.tsx updated successfully!")
