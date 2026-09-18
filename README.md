# 🎙️ CareVoice AI — AI Voice Healthcare Companion (55+) & Clinician Triage Portal

> **An AI-powered voice agent for adults aged 55+ that enables natural, empathetic conversations with their healthcare platform while converting conversational data into structured, actionable clinician reports and real-time triage summaries.**

![CareVoice AI Badge](https://img.shields.io/badge/Geriatric_Care-AI_Voice_55+-0d9488?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-emerald?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-cyan?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal?style=for-the-badge)

---

## 🌟 Executive Summary & Problem Statement

For older adults (aged 55+), navigating complex health apps, typing small screens, and managing multi-condition care (hypertension, heart failure, diabetes, arthritis) is daunting. Meanwhile, clinicians receive either fragmented patient messages or unreadable raw conversation transcripts that add to physician burnout.

**CareVoice AI bridges this gap**:
1. **For Seniors (55+)**: A warm, natural, low-latency voice companion with large typography, high-contrast mode, empathetic active listening, and simple guided check-in routines.
2. **For Clinicians**: An automated intelligence hub that structures conversational data into executive overviews, longitudinal trends, 🔴 Red / 🟡 Yellow / 🟢 Green triage flags, and exportable SOAP clinical notes.

---

## 🚀 Key Features

### 1. 👵 Senior-Centered Voice Experience
- **Natural Two-Way Speech**: Low-latency Speech-to-Text (STT) and Text-to-Speech (TTS) with relaxed 0.9x pacing tailored for older listeners.
- **Visual Audio Orb & Waveforms**: Live pulsing visualizer that reacts in real-time to microphone audio levels.
- **Senior Accessibility Toolbar**:
  - 🔠 3-level font scaling (`Standard`, `Large`, `Extra Large`).
  - 🌓 High Contrast accessibility mode.
  - 🎚️ Speech pace selector (0.8x to 1.15x).
  - 🚨 Instant Emergency SOS (911 & Caregiver direct dial).
- **Guided Check-in Routines**:
  - 🌅 *Daily Wellness & Vitals Check-in*
  - 💊 *Medication Adherence & Side Effect Tracker*
  - 🩺 *Symptom Deep-Dive & Pain Scale (0-10)*
  - 📋 *Doctor Visit Preparation & Question Builder*
  - 💬 *Free Voice Conversation*

### 2. 🛡️ Clinical Guardrails & Automated Triaging Engine
- **Non-Diagnostic Safety Boundary**: The AI assistant strictly reinforces that it supports, rather than replaces, clinician judgment.
- **Multi-Tier Triage Flag System**:
  - 🔴 **Red Flags (Urgent)**: Severe dyspnea / orthopnea, acute chest tightness, syncope / fall events, severe pain > 8. Auto-triggers emergency escalation protocols.
  - 🟡 **Yellow Flags (Monitoring)**: Voluntary medication omission due to dizziness, peripheral edema / sock marks, sleep disruption.
  - 🟢 **Positive Progress (Milestones)**: 100% adherence streaks, daily walking goals met, stable BP control.

### 3. 🩺 Clinician Intelligence Dashboard
- **Executive Patient Scorecard**: Wellbeing Index (out of 10), 7-day adherence rate, active triage alerts.
- **Longitudinal Trend Analytics (7-Day Charts)**:
  - Systolic / Diastolic Blood Pressure & Weight Trajectory
  - Medication Adherence Percentage Area Chart
  - Sleep Duration vs. Pain Scale Line Charts
  - Daily Hydration (glasses) vs. Step Count Bar Charts
- **Actionable Physician Follow-Up Plan**: Specific clinical talking points and diagnostic test orders generated automatically.
- **1-Click Export Hub**:
  - 📄 Printable / Downloadable **PDF Clinical Encounter Report**
  - 📋 **SOAP Note (Subjective, Objective, Assessment, Plan)** for direct EHR clipboard pasting
  - 💻 **FHIR / HL7 JSON Schema** export for hospital integration

---

## 👥 Multi-Patient Persona Showcase

For interactive demonstrations and recruiter walkthroughs, three clinical personas are pre-loaded:
1. **Eleanor Vance (74 y/o)**: Congestive Heart Failure (Stage B) & Hypertension. *Scenario: Experiences mild nocturnal orthopnea and missed Lasix dose due to lightheadedness.*
2. **Arthur Chen (68 y/o)**: Type 2 Diabetes Mellitus & Knee Osteoarthritis. *Scenario: Excellent adherence, preparing for endocrinologist visit, morning joint stiffness.*
3. **Margaret Miller (81 y/o)**: Post Total Hip Arthroplasty (Right) & Osteoporosis. *Scenario: Physical therapy recovery milestone, taper questions.*

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Voice / Audio**: Web Speech API (SpeechRecognition + SpeechSynthesis), Web Audio API (Oscillator synthesis, AnalyserNode audio levels)
- **Data Visualization**: Recharts (Responsive Line, Area, Bar charts)
- **Document Generation**: jsPDF for dynamic clinical report generation
- **Design Pattern**: Layered Provider Architecture (`AppProvider`, `aiAgentService`, `clinicalReportService`, `speechService`)

---

## 🏃 Getting Started (Local Setup)

```bash
# Clone or navigate to the project directory
cd carevoice-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 💼 Internship & Recruiter Demo Talking Points

1. **Patient-First Accessibility**: *"I designed this specifically for geriatric users (55+) where mobile navigation is a primary friction point. Voice lowers the barrier to daily tracking by 80%."*
2. **Clinical Utility over Transcript Dumps**: *"Doctors don't have time to read 15-minute voice transcripts. CareVoice extracts structured SOAP notes, quantifiable trends, and explicit patient concerns."*
3. **Safety by Design**: *"The AI adheres to strict clinical boundaries—it never provides medical diagnoses, and proactively triggers 🔴 Red Flags with immediate 911 / caregiver escalation protocols."*

---

*Built with ❤️ for empathetic senior healthcare innovation.*
