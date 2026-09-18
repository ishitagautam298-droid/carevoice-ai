export type FlagType = 'red' | 'yellow' | 'green';
export type FlagCategory = 'cardiovascular' | 'respiratory' | 'adherence' | 'mobility' | 'mental_health' | 'neurological' | 'lifestyle' | 'metabolic';
export type CheckInMode = 'daily_checkin' | 'medication_review' | 'symptom_deepdive' | 'appointment_prep' | 'free_chat';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  instructions: string;
  purpose: string;
  lastTakenStatus: 'taken' | 'missed' | 'delayed' | 'pending';
  lastTakenTimestamp?: string;
  adherenceRateLast30Days: number;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  avatar: string;
  primaryConditions: string[];
  allergies: string[];
  medications: Medication[];
  primaryPhysician: {
    name: string;
    specialty: string;
    clinic: string;
    phone: string;
    nextAppointment: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  baselineVitals: {
    targetSystolic: number;
    targetDiastolic: number;
    targetBloodSugarFasting: number;
    targetWeightLbs: number;
  };
  overallAdherenceRate: number;
  riskTier: 'low' | 'moderate' | 'high';
  notes: string;
}

export interface VoiceMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  audioDurationSeconds?: number;
  isTranscribing?: boolean;
  category?: 'general' | 'symptom' | 'medication' | 'vital' | 'concern' | 'flag';
  detectedFlag?: FlagType | null;
  flagTitle?: string;
}

export interface TriageFlag {
  id: string;
  type: FlagType;
  title: string;
  description: string;
  category: FlagCategory;
  severity: 'critical' | 'moderate' | 'low' | 'positive';
  timestamp: string;
  relatedQuote: string;
  recommendedAction: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface TrendMetric {
  date: string;
  dayLabel: string;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  bloodGlucose: number;
  weightLbs: number;
  sleepHours: number;
  painLevel: number; // 0-10
  waterGlasses: number; // glasses (8oz)
  stepsCount: number;
  adherencePercent: number;
}

export interface ClinicalReport {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  generatedAt: string;
  sessionDurationSeconds: number;
  sessionMode: CheckInMode;
  
  patientOverview: {
    summary: string;
    overallWellbeing: string; // e.g. 'Fair / Declining', 'Good / Stable'
    recentChanges: string[];
    adherenceScorePercent: number;
    wellbeingScoreOutOf10: number;
  };
  
  redFlags: TriageFlag[];
  yellowFlags: TriageFlag[];
  positiveProgress: TriageFlag[];
  
  symptomsLogged: {
    symptom: string;
    severityOutOf10: number;
    onsetDuration: string;
    aggravatingOrRelieving: string;
  }[];
  
  medicationAdherenceReport: {
    medicationName: string;
    status: 'taken' | 'missed' | 'delayed';
    reportedReason?: string;
    sideEffectReported?: string;
  }[];
  
  patientConcernsForDoctor: string[];
  clinicianFollowUpPlan: string[];
  
  soapNote: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  
  rawTranscript: {
    speaker: string;
    text: string;
    time: string;
  }[];
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extralarge';
  highContrast: boolean;
  voiceSpeed: number; // 0.75 to 1.25
  voicePitch: number;
  autoSpeakResponse: boolean;
  soundEffectsEnabled: boolean;
  showTranscriptLive: boolean;
}
