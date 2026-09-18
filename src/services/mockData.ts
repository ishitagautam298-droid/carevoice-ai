import { PatientProfile, TrendMetric, ClinicalReport } from '../types';

export const PATIENT_PROFILES: PatientProfile[] = [
  {
    id: "pat-eleanor-74",
    name: "Eleanor Vance",
    age: 74,
    gender: "Female",
    avatar: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=150&auto=format&fit=crop&q=80",
    primaryConditions: ["Congestive Heart Failure (Stage B)", "Hypertension", "Mild Osteoarthritis"],
    allergies: ["Penicillin (Hives)", "Sulfa drugs"],
    medications: [
      {
        id: "med-1",
        name: "Furosemide (Lasix)",
        dosage: "20mg",
        frequency: "Once Daily",
        timing: "Morning with food",
        instructions: "Take in morning to prevent nighttime urination",
        purpose: "Fluid retention & Heart failure",
        lastTakenStatus: "missed",
        adherenceRateLast30Days: 82
      },
      {
        id: "med-2",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once Daily",
        timing: "Morning",
        instructions: "Monitor blood pressure weekly",
        purpose: "Blood pressure regulation",
        lastTakenStatus: "taken",
        adherenceRateLast30Days: 96
      },
      {
        id: "med-3",
        name: "Carvedilol",
        dosage: "6.25mg",
        frequency: "Twice Daily",
        timing: "Morning & Evening",
        instructions: "Take with meal",
        purpose: "Heart strain reduction",
        lastTakenStatus: "taken",
        adherenceRateLast30Days: 90
      }
    ],
    primaryPhysician: {
      name: "Dr. Sarah Jenkins, MD",
      specialty: "Cardiology & Geriatric Medicine",
      clinic: "St. Jude Heart & Vascular Center",
      phone: "(555) 382-9011",
      nextAppointment: "Thursday, Oct 2nd at 10:30 AM"
    },
    emergencyContact: {
      name: "David Vance (Son)",
      relationship: "Son / Primary Caregiver",
      phone: "(555) 948-2219"
    },
    baselineVitals: {
      targetSystolic: 125,
      targetDiastolic: 80,
      targetBloodSugarFasting: 95,
      targetWeightLbs: 142
    },
    overallAdherenceRate: 88,
    riskTier: "high",
    notes: "Recent weight fluctuation noticed. Needs close monitoring for lower extremity edema and nocturnal shortness of breath."
  },
  {
    id: "pat-arthur-68",
    name: "Arthur Chen",
    age: 68,
    gender: "Male",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    primaryConditions: ["Type 2 Diabetes Mellitus", "Hyperlipidemia", "Knee Osteoarthritis"],
    allergies: ["No known drug allergies"],
    medications: [
      {
        id: "med-4",
        name: "Metformin ER",
        dosage: "500mg",
        frequency: "Twice Daily",
        timing: "With breakfast & dinner",
        instructions: "Take with full glass of water",
        purpose: "Blood sugar control",
        lastTakenStatus: "taken",
        adherenceRateLast30Days: 97
      },
      {
        id: "med-5",
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once Daily",
        timing: "Bedtime",
        instructions: "Take consistently at night",
        purpose: "Cholesterol & cardiovascular risk reduction",
        lastTakenStatus: "taken",
        adherenceRateLast30Days: 94
      }
    ],
    primaryPhysician: {
      name: "Dr. Michael Ramirez, MD",
      specialty: "Endocrinology & Internal Medicine",
      clinic: "Metropolitan Health Partners",
      phone: "(555) 712-4433",
      nextAppointment: "Monday, Sep 29th at 2:00 PM"
    },
    emergencyContact: {
      name: "Linda Chen",
      relationship: "Spouse",
      phone: "(555) 712-9901"
    },
    baselineVitals: {
      targetSystolic: 120,
      targetDiastolic: 78,
      targetBloodSugarFasting: 105,
      targetWeightLbs: 178
    },
    overallAdherenceRate: 95,
    riskTier: "low",
    notes: "Well-controlled diabetes. Actively engaging in 30-min morning walking routine."
  },
  {
    id: "pat-margaret-81",
    name: "Margaret Miller",
    age: 81,
    gender: "Female",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    primaryConditions: ["Post Total Hip Arthroplasty (Right)", "Osteoporosis", "Mild Hypertension"],
    allergies: ["Codeine (Nausea/Vomiting)"],
    medications: [
      {
        id: "med-7",
        name: "Alendronate",
        dosage: "70mg",
        frequency: "Once Weekly",
        timing: "Sunday morning on empty stomach",
        instructions: "Stay upright for 30 minutes after taking with full water",
        purpose: "Bone density protection",
        lastTakenStatus: "taken",
        adherenceRateLast30Days: 100
      },
      {
        id: "med-8",
        name: "Acetaminophen ER",
        dosage: "650mg",
        frequency: "As Needed",
        timing: "Every 8 hours as needed for hip ache",
        instructions: "Do not exceed 3000mg/day",
        purpose: "Post-op joint comfort",
        lastTakenStatus: "taken",
        adherenceRateLast30Days: 90
      }
    ],
    primaryPhysician: {
      name: "Dr. Patricia Hayes, MD",
      specialty: "Orthopedic Surgery & Rehabilitation",
      clinic: "Summit Orthopedics & Rehab",
      phone: "(555) 431-8890",
      nextAppointment: "Wednesday, Oct 8th at 11:00 AM"
    },
    emergencyContact: {
      name: "Emily Davis",
      relationship: "Daughter",
      phone: "(555) 831-2900"
    },
    baselineVitals: {
      targetSystolic: 128,
      targetDiastolic: 82,
      targetBloodSugarFasting: 92,
      targetWeightLbs: 130
    },
    overallAdherenceRate: 95,
    riskTier: "moderate",
    notes: "Physical therapy phase 2. Encouraged to use walker during all transfers."
  }
];

export const HISTORICAL_TRENDS: Record<string, TrendMetric[]> = {
  "pat-eleanor-74": [
    { date: "2026-09-10", dayLabel: "Wed", systolicBP: 124, diastolicBP: 79, heartRate: 72, bloodGlucose: 94, weightLbs: 142.1, sleepHours: 7.2, painLevel: 2, waterGlasses: 6, stepsCount: 2800, adherencePercent: 100 },
    { date: "2026-09-11", dayLabel: "Thu", systolicBP: 126, diastolicBP: 80, heartRate: 74, bloodGlucose: 96, weightLbs: 142.4, sleepHours: 6.8, painLevel: 2, waterGlasses: 5, stepsCount: 3100, adherencePercent: 100 },
    { date: "2026-09-12", dayLabel: "Fri", systolicBP: 128, diastolicBP: 82, heartRate: 76, bloodGlucose: 95, weightLbs: 143.0, sleepHours: 6.5, painLevel: 3, waterGlasses: 6, stepsCount: 2600, adherencePercent: 100 },
    { date: "2026-09-13", dayLabel: "Sat", systolicBP: 132, diastolicBP: 84, heartRate: 78, bloodGlucose: 98, weightLbs: 144.2, sleepHours: 5.5, painLevel: 4, waterGlasses: 4, stepsCount: 1900, adherencePercent: 75 },
    { date: "2026-09-14", dayLabel: "Sun", systolicBP: 138, diastolicBP: 86, heartRate: 81, bloodGlucose: 101, weightLbs: 145.5, sleepHours: 5.0, painLevel: 4, waterGlasses: 4, stepsCount: 1400, adherencePercent: 66 },
    { date: "2026-09-15", dayLabel: "Mon", systolicBP: 142, diastolicBP: 89, heartRate: 84, bloodGlucose: 102, weightLbs: 146.8, sleepHours: 4.5, painLevel: 5, waterGlasses: 3, stepsCount: 1200, adherencePercent: 50 },
    { date: "2026-09-16", dayLabel: "Today", systolicBP: 146, diastolicBP: 92, heartRate: 88, bloodGlucose: 104, weightLbs: 147.6, sleepHours: 4.0, painLevel: 6, waterGlasses: 3, stepsCount: 950, adherencePercent: 50 }
  ],
  "pat-arthur-68": [
    { date: "2026-09-10", dayLabel: "Wed", systolicBP: 122, diastolicBP: 78, heartRate: 68, bloodGlucose: 112, weightLbs: 179.2, sleepHours: 7.5, painLevel: 3, waterGlasses: 8, stepsCount: 5200, adherencePercent: 100 },
    { date: "2026-09-11", dayLabel: "Thu", systolicBP: 120, diastolicBP: 76, heartRate: 67, bloodGlucose: 108, weightLbs: 179.0, sleepHours: 7.8, painLevel: 3, waterGlasses: 8, stepsCount: 5800, adherencePercent: 100 },
    { date: "2026-09-12", dayLabel: "Fri", systolicBP: 119, diastolicBP: 77, heartRate: 69, bloodGlucose: 105, weightLbs: 178.6, sleepHours: 7.4, painLevel: 2, waterGlasses: 7, stepsCount: 6100, adherencePercent: 100 },
    { date: "2026-09-13", dayLabel: "Sat", systolicBP: 121, diastolicBP: 78, heartRate: 70, bloodGlucose: 106, weightLbs: 178.4, sleepHours: 8.0, painLevel: 2, waterGlasses: 9, stepsCount: 6400, adherencePercent: 100 },
    { date: "2026-09-14", dayLabel: "Sun", systolicBP: 118, diastolicBP: 76, heartRate: 66, bloodGlucose: 103, weightLbs: 178.0, sleepHours: 7.6, painLevel: 2, waterGlasses: 8, stepsCount: 5900, adherencePercent: 100 },
    { date: "2026-09-15", dayLabel: "Mon", systolicBP: 120, diastolicBP: 78, heartRate: 68, bloodGlucose: 102, weightLbs: 177.8, sleepHours: 7.5, painLevel: 1, waterGlasses: 8, stepsCount: 6200, adherencePercent: 100 },
    { date: "2026-09-16", dayLabel: "Today", systolicBP: 118, diastolicBP: 77, heartRate: 67, bloodGlucose: 99, weightLbs: 177.5, sleepHours: 8.0, painLevel: 1, waterGlasses: 9, stepsCount: 6800, adherencePercent: 100 }
  ],
  "pat-margaret-81": [
    { date: "2026-09-10", dayLabel: "Wed", systolicBP: 130, diastolicBP: 84, heartRate: 74, bloodGlucose: 94, weightLbs: 130.5, sleepHours: 6.5, painLevel: 6, waterGlasses: 6, stepsCount: 1500, adherencePercent: 100 },
    { date: "2026-09-11", dayLabel: "Thu", systolicBP: 128, diastolicBP: 82, heartRate: 72, bloodGlucose: 93, weightLbs: 130.4, sleepHours: 6.8, painLevel: 5, waterGlasses: 7, stepsCount: 1800, adherencePercent: 100 },
    { date: "2026-09-12", dayLabel: "Fri", systolicBP: 127, diastolicBP: 83, heartRate: 73, bloodGlucose: 92, weightLbs: 130.2, sleepHours: 7.0, painLevel: 5, waterGlasses: 7, stepsCount: 2100, adherencePercent: 100 },
    { date: "2026-09-13", dayLabel: "Sat", systolicBP: 126, diastolicBP: 81, heartRate: 71, bloodGlucose: 91, weightLbs: 130.0, sleepHours: 7.2, painLevel: 4, waterGlasses: 6, stepsCount: 2400, adherencePercent: 100 },
    { date: "2026-09-14", dayLabel: "Sun", systolicBP: 125, diastolicBP: 80, heartRate: 70, bloodGlucose: 93, weightLbs: 129.8, sleepHours: 7.5, painLevel: 3, waterGlasses: 8, stepsCount: 2800, adherencePercent: 100 },
    { date: "2026-09-15", dayLabel: "Mon", systolicBP: 124, diastolicBP: 80, heartRate: 69, bloodGlucose: 90, weightLbs: 129.9, sleepHours: 7.8, painLevel: 3, waterGlasses: 8, stepsCount: 3100, adherencePercent: 100 },
    { date: "2026-09-16", dayLabel: "Today", systolicBP: 123, diastolicBP: 79, heartRate: 70, bloodGlucose: 91, weightLbs: 130.0, sleepHours: 8.0, painLevel: 2, waterGlasses: 8, stepsCount: 3500, adherencePercent: 100 }
  ]
};

export const SAMPLE_INITIAL_REPORT: ClinicalReport = {
  id: "rep-eleanor-live",
  patientId: "pat-eleanor-74",
  patientName: "Eleanor Vance",
  patientAge: 74,
  generatedAt: "2026-09-16T10:45:00Z",
  sessionDurationSeconds: 412,
  sessionMode: "daily_checkin",
  patientOverview: {
    summary: "Patient reports progressive dyspnea when lying flat (orthopnea) and noticeable 5.5 lb weight gain over 4 days. Lasix missed past two mornings due to dizziness and frequent urination worries. Blood pressure elevated (146/92).",
    overallWellbeing: "Decline / Moderate Clinical Concern",
    recentChanges: [
      "Weight increased by 5.5 lbs in 4 days (baseline 142 lbs -> currently 147.6 lbs)",
      "Orthopnea reported: now sleeping with 3 pillows",
      "Lasix (Furosemide) missed past 2 doses",
      "Systolic BP up 22 points from baseline"
    ],
    adherenceScorePercent: 66,
    wellbeingScoreOutOf10: 4
  },
  redFlags: [
    {
      id: "rf-1",
      type: "red",
      title: "Acute Fluid Overload & Weight Spike (+5.5 lbs in 4d)",
      description: "Patient gained >3 lbs in 48 hours accompanied by worsening lower extremity tightness and orthopnea.",
      category: "cardiovascular",
      severity: "critical",
      timestamp: "10:41 AM",
      relatedQuote: "I had to prop myself up with three pillows last night because I couldn't catch my breath when lying down.",
      recommendedAction: "Urgent cardiology evaluation or same-day clinic visit to assess volume overload and diuretic adjustment.",
      status: "active"
    },
    {
      id: "rf-2",
      type: "red",
      title: "Nocturnal Orthopnea / Dyspnea on Exertion",
      description: "Shortness of breath walking from bedroom to kitchen; unable to sleep flat.",
      category: "respiratory",
      severity: "critical",
      timestamp: "10:42 AM",
      relatedQuote: "Even walking to the kitchen to make my tea had me huffing and puffing.",
      recommendedAction: "Care team callback within 2 hours; instruct patient to call 911 if resting chest tightness or severe breathing distress ensues.",
      status: "active"
    }
  ],
  yellowFlags: [
    {
      id: "yf-1",
      type: "yellow",
      title: "Voluntary Diuretic Non-Adherence (Lasix)",
      description: "Skipped Furosemide morning doses due to fear of dizziness and nighttime bathroom trips.",
      category: "adherence",
      severity: "moderate",
      timestamp: "10:43 AM",
      relatedQuote: "I stopped taking the water pill on Sunday because it makes me dizzy when standing up to go to the bathroom.",
      recommendedAction: "Review diuretic timing, orthostatic blood pressure check, and assess for dehydration vs over-diuresis balance.",
      status: "active"
    },
    {
      id: "yf-2",
      type: "yellow",
      title: "Sleep Fragmentation (4.0 hrs/night)",
      description: "Sleep decreased from 7 hours to 4 hours over past week due to breathlessness and restlessness.",
      category: "lifestyle",
      severity: "moderate",
      timestamp: "10:44 AM",
      relatedQuote: "I tossed and turned all night, felt like my lungs couldn't fill up.",
      recommendedAction: "Correlate with heart failure decompensation; monitor once volume status restored.",
      status: "active"
    }
  ],
  positiveProgress: [
    {
      id: "pf-1",
      type: "green",
      title: "Lisinopril & Carvedilol Adherence Maintained",
      description: "Consistent with core antihypertensives despite stopping diuretic.",
      category: "adherence",
      severity: "positive",
      timestamp: "10:40 AM",
      relatedQuote: "I took my blood pressure pill and my little heart pill every single morning with breakfast.",
      recommendedAction: "Praise consistency and reinforce importance of not adjusting Lasix without clinician consultation.",
      status: "acknowledged"
    },
    {
      id: "pf-2",
      type: "green",
      title: "Daily Weight Log Self-Monitoring",
      description: "Patient diligently stepped on scale every morning and accurately reported numbers.",
      category: "lifestyle",
      severity: "positive",
      timestamp: "10:41 AM",
      relatedQuote: "I wrote down my scale numbers on my kitchen calendar right after waking up.",
      recommendedAction: "Reinforce proactive monitoring habit; recommend automated cellular scale if available.",
      status: "acknowledged"
    }
  ],
  symptomsLogged: [
    { symptom: "Orthopnea (Breathlessness lying down)", severityOutOf10: 7, onsetDuration: "Past 3 nights", aggravatingOrRelieving: "Aggravated by flat recumbent position, relieved slightly by 3 pillows" },
    { symptom: "Bilateral Ankle Swelling", severityOutOf10: 6, onsetDuration: "4 days", aggravatingOrRelieving: "Worse by evening; sock band indentation left in skin" },
    { symptom: "Orthostatic Lightheadedness", severityOutOf10: 5, onsetDuration: "Past week", aggravatingOrRelieving: "Occurs immediately upon rapid standing from armchair" }
  ],
  medicationAdherenceReport: [
    { medicationName: "Furosemide (Lasix) 20mg", status: "missed", reportedReason: "Fear of frequent bathroom visits and dizziness", sideEffectReported: "Lightheadedness on rapid standing" },
    { medicationName: "Lisinopril 10mg", status: "taken", reportedReason: "Taken routinely with breakfast" },
    { medicationName: "Carvedilol 6.25mg", status: "taken", reportedReason: "Taken with dinner" }
  ],
  patientConcernsForDoctor: [
    "Wants to ask Dr. Jenkins if she can take a milder water pill or take it at a different time of day.",
    "Worried about whether she can travel to her granddaughter's christening in two weeks.",
    "Asked if her knee arthritis cream interacts with her heart medications."
  ],
  clinicianFollowUpPlan: [
    "Assess volume status (JVP, pulmonary crackles, lower extremity pitting edema).",
    "Review renal function and serum electrolytes (BMP / potassium panel) given recent diuretic omission.",
    "Re-educate on Lasix morning scheduling and standing slowly to mitigate orthostatic drops.",
    "Consider temporary uptitration of Furosemide or adding oral potassium supplement if indicated.",
    "Schedule follow-up phone check-in within 48 hours by Heart Failure nurse navigator."
  ],
  soapNote: {
    subjective: "74yo female with HFrEF and HTN reports 4-day history of worsening dyspnea, orthopnea (3 pillows), and bilateral ankle swelling. Admits to discontinuing Furosemide 2 days ago due to polyuria and dizziness. States BP was 146/92 today with 5.5 lb weight gain since Friday.",
    objective: "Home BP: 146/92 mmHg, HR: 88 bpm. Weight: 147.6 lbs (+5.5 lbs vs baseline 142.1 lbs). Self-reported 2+ pitting ankle edema. SpO2 not measured at home.",
    assessment: "1. Acute CHF decompensation / fluid overload, likely precipitated by diuretic non-adherence. 2. Suboptimal BP control secondary to fluid retention. 3. Orthostatic symptoms requiring postural precautions.",
    plan: "1. Urgent clinic visit / cardiology triage today. 2. Check STAT BMP and BNP. 3. Resume Lasix with potential dose adjustment pending labs. 4. Strict daily weight logging (<2 lb/day rule). 5. Re-evaluate in 48h."
  },
  rawTranscript: [
    { speaker: "CareVoice Agent", text: "Good morning, Eleanor! It is so nice to hear your voice today. How are you feeling this morning?", time: "10:40 AM" },
    { speaker: "Eleanor Vance", text: "Good morning, dear. Well, I have to say I'm a bit tired today. Didn't sleep very well at all.", time: "10:40 AM" },
    { speaker: "CareVoice Agent", text: "I'm sorry to hear that you had a restless night, Eleanor. What was keeping you from getting restful sleep?", time: "10:41 AM" },
    { speaker: "Eleanor Vance", text: "I had to prop myself up with three pillows last night because I couldn't catch my breath when lying down. And when I got up to make tea, I was huffing and puffing.", time: "10:41 AM" },
    { speaker: "CareVoice Agent", text: "Thank you for telling me, Eleanor. That sounds uncomfortable, and breathing changes are very important for us to pay attention to. Did you notice any swelling in your ankles or change in your weight on the scale this morning?", time: "10:42 AM" },
    { speaker: "Eleanor Vance", text: "Yes, my ankles are quite puffy, my socks left deep marks. And my scale said 147.6 pounds, which is about 5 pounds heavier than last week.", time: "10:42 AM" },
    { speaker: "CareVoice Agent", text: "I see. Eleanor, have you been able to take your morning medications, including your Lasix water pill and Lisinopril?", time: "10:43 AM" },
    { speaker: "Eleanor Vance", text: "I took my Lisinopril, but I stopped taking the water pill on Sunday because it makes me dizzy when standing up to go to the bathroom.", time: "10:43 AM" },
    { speaker: "CareVoice Agent", text: "I understand why you felt hesitant, Eleanor. Because sudden weight gain and breathing changes can be important signs of fluid build-up, I want to make sure Dr. Jenkins's care team is aware right away so they can help you feel comfortable again. I am preparing a priority report for them right now.", time: "10:44 AM" }
  ]
};
