const { jsPDF } = require('jspdf');
const fs = require('fs');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const margin = 16;
const contentWidth = pageWidth - margin * 2;

// Color Palette
const TEAL = [13, 148, 136];      // #0d9488
const DARK_TEAL = [15, 118, 110]; // #0f766e
const SLATE_900 = [15, 23, 42];   // #0f172a
const SLATE_700 = [51, 65, 85];   // #334155
const SLATE_500 = [100, 116, 139];// #64748b
const LIGHT_BG = [248, 250, 252]; // #f8fafc
const ROSE_RED = [225, 29, 72];   // #e11d48
const AMBER_GOLD = [217, 119, 6]; // #d97706
const EMERALD = [5, 150, 105];    // #059669

let currentY = margin;

function checkPageBreak(requiredHeight) {
  if (currentY + requiredHeight > pageHeight - 18) {
    doc.addPage();
    currentY = margin + 6;
    drawHeaderFooter();
  }
}

function drawHeaderFooter() {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Top subtle bar
    doc.setFillColor(...TEAL);
    doc.rect(0, 0, pageWidth, 4, 'F');
    
    // Bottom footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...SLATE_500);
    doc.text('CareVoice AI — Geriatric Voice Healthcare Platform (55+) | Internship Project Submission', margin, pageHeight - 8);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 15, pageHeight - 8);
    
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  }
}

// ==========================================
// PAGE 1: TITLE & EXECUTIVE OVERVIEW
// ==========================================

// Header Banner Box
doc.setFillColor(...DARK_TEAL);
doc.roundedRect(margin, currentY, contentWidth, 38, 4, 4, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(18);
doc.setTextColor(255, 255, 255);
doc.text('CareVoice AI: Voice Healthcare for Adults 55+', margin + 6, currentY + 11);

doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.setTextColor(204, 251, 241);
doc.text('AI Voice Companion & Clinician Decision Support Portal', margin + 6, currentY + 18);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(255, 255, 255);
doc.text('Author: Ishita Gautam   |   Project Submission Report', margin + 6, currentY + 28);

currentY += 44;

// Key Links Box (Highlighted Callout)
doc.setFillColor(240, 253, 250);
doc.setDrawColor(...TEAL);
doc.setLineWidth(0.6);
doc.roundedRect(margin, currentY, contentWidth, 24, 3, 3, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...DARK_TEAL);
doc.text('PROJECT ACCESS & LIVE DEMO LINKS', margin + 5, currentY + 7);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...SLATE_900);
doc.text('Live Application (Render):', margin + 5, currentY + 14);
doc.setTextColor(2, 132, 199);
doc.textWithLink('https://carevoice-ai-v54n.onrender.com', margin + 52, currentY + 14, { url: 'https://carevoice-ai-v54n.onrender.com' });

doc.setTextColor(...SLATE_900);
doc.text('GitHub Repository:', margin + 5, currentY + 19);
doc.setTextColor(2, 132, 199);
doc.textWithLink('https://github.com/ishitagautam298-droid/carevoice-ai', margin + 42, currentY + 19, { url: 'https://github.com/ishitagautam298-droid/carevoice-ai' });

currentY += 30;

// Section 1: Problem Statement & Mission
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(...DARK_TEAL);
doc.text('1. Problem Statement & Mission', margin, currentY);
currentY += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...SLATE_700);
const p1Text = `Adults aged 55+ often manage multiple complex chronic conditions (such as hypertension, congestive heart failure, diabetes, and osteoarthritis) while facing barriers with touchscreen navigation and tiny mobile text. Meanwhile, doctors are overwhelmed by unorganized patient communications and raw conversation logs.

CareVoice AI bridges this critical gap by delivering:
1. A warm, empathetic, low-latency conversational voice agent tailored for seniors with zero typing friction.
2. An automated clinical intelligence engine that converts voice conversations into structured, actionable SOAP clinical summaries, quantified longitudinal trends, and multi-tier triage flags without clinician burden.`;

const p1Lines = doc.splitTextToSize(p1Text, contentWidth);
doc.text(p1Lines, margin, currentY);
currentY += p1Lines.length * 4.2 + 4;

// Section 2: Core Platform Capabilities
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(...DARK_TEAL);
doc.text('2. Senior-Centered Voice Experience (55+)', margin, currentY);
currentY += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);

const features = [
  { title: 'Natural Two-Way Speech:', desc: 'Speech-to-Text (STT) and warm Speech Synthesis (TTS) at a relaxed 0.9x pacing designed for older adults.' },
  { title: 'Senior Accessibility Controls:', desc: '3-level dynamic typography (Standard, Large, XL), WCAG AAA High Contrast mode, speech pace adjustments, and audio replay.' },
  { title: 'Pulsing Audio-Reactive Orb:', desc: 'Real-time Web Audio API visual feedback reacting to ambient voice levels with zero audio feedback loop.' },
  { title: '5 Guided Routine Modules:', desc: 'Daily Wellness Check-in, Medication & Side Effect Log, Symptom Tracker, Doctor Appointment Prep, and Free Conversation.' },
  { title: 'Approved Health Education Library:', desc: 'Evidence-based AGS/AHA wellness guides (Heart fluid limits, DASH diet, Hydration, Fall safety) with interactive voice read-aloud.' },
  { title: '1-Touch Emergency SOS:', desc: 'Immediate direct 911 dispatching and primary caregiver phone dialing in acute safety scenarios.' }
];

features.forEach(f => {
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK_TEAL);
  doc.text(`• ${f.title}`, margin + 2, currentY);
  const titleWidth = doc.getTextWidth(`• ${f.title} `);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...SLATE_700);
  const descLines = doc.splitTextToSize(f.desc, contentWidth - titleWidth - 2);
  doc.text(descLines[0], margin + 2 + titleWidth, currentY);
  
  if (descLines.length > 1) {
    currentY += 4;
    doc.text(descLines.slice(1), margin + 6, currentY);
  }
  currentY += 4.5;
});

currentY += 3;

// ==========================================
// PAGE 2: CLINICAL TRIAGE & DASHBOARD
// ==========================================
checkPageBreak(120);

doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(...DARK_TEAL);
doc.text('3. Automated Clinical Triaging & Safety Guardrails', margin, currentY);
currentY += 6;

// 3 Flag Cards Table
const cardWidth = (contentWidth - 6) / 3;

// Red Flag Box
doc.setFillColor(255, 241, 242);
doc.setDrawColor(...ROSE_RED);
doc.setLineWidth(0.4);
doc.roundedRect(margin, currentY, cardWidth, 38, 2, 2, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...ROSE_RED);
doc.text('RED FLAGS (URGENT)', margin + 3, currentY + 6);
doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(...SLATE_700);
const redText = `• Acute Chest Pressure\n• Severe Orthopnea (3+ pillows)\n• Syncope / Fall Events\n• Acute Shortness of Breath\n\nAction: Immediate safety triage & emergency protocol trigger.`;
doc.text(redText, margin + 3, currentY + 11);

// Yellow Flag Box
doc.setFillColor(254, 252, 232);
doc.setDrawColor(...AMBER_GOLD);
doc.roundedRect(margin + cardWidth + 3, currentY, cardWidth, 38, 2, 2, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...AMBER_GOLD);
doc.text('YELLOW FLAGS (MONITOR)', margin + cardWidth + 6, currentY + 6);
doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(...SLATE_700);
const yellowText = `• Voluntary Diuretic Omission\n• Peripheral Ankle Edema\n• Sleep Fragmentation (<5h)\n• Postural Lightheadedness\n\nAction: Care team callback & dosage review.`;
doc.text(yellowText, margin + cardWidth + 6, currentY + 11);

// Green Flag Box
doc.setFillColor(236, 253, 245);
doc.setDrawColor(...EMERALD);
doc.roundedRect(margin + (cardWidth + 3) * 2, currentY, cardWidth, 38, 2, 2, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...EMERALD);
doc.text('POSITIVE PROGRESS', margin + (cardWidth + 3) * 2 + 3, currentY + 6);
doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(...SLATE_700);
const greenText = `• 100% Med Adherence Streak\n• Daily Walking Goals Met\n• Stable Dry Weight Log\n• Improved Energy / Mood\n\nAction: Positive reinforcement & adherence maintenance.`;
doc.text(greenText, margin + (cardWidth + 3) * 2 + 3, currentY + 11);

currentY += 44;

// Section 4: Clinician Intelligence Hub
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(...DARK_TEAL);
doc.text('4. Clinician Intelligence & Decision Support Hub', margin, currentY);
currentY += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...SLATE_700);

const clinicianPoints = [
  { title: 'Executive Scorecard:', desc: 'Wellbeing Index (out of 10), 7-day adherence rate %, and active triage status.' },
  { title: 'Longitudinal Trends (7D Charts):', desc: 'Interactive Recharts for Blood Pressure vs. Weight, Medication Adherence %, Sleep vs. Pain, and Hydration vs. Steps.' },
  { title: 'Structured Patient Agenda:', desc: 'Captures explicit questions and concerns the patient wants to discuss with their doctor.' },
  { title: 'Actionable Follow-up Checklist:', desc: 'Evidence-backed clinical action items (lab orders, volume checks, medication reconciliation).' },
  { title: 'EHR SOAP Note Synthesis:', desc: 'Automated Subjective, Objective, Assessment, and Plan documentation formatted for instant EHR clipboard export.' },
  { title: '1-Click PDF Encounter Report:', desc: 'High-resolution downloadable clinical document for patient charts.' }
];

clinicianPoints.forEach(p => {
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK_TEAL);
  doc.text(`• ${p.title}`, margin + 2, currentY);
  const titleWidth = doc.getTextWidth(`• ${p.title} `);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...SLATE_700);
  const descLines = doc.splitTextToSize(p.desc, contentWidth - titleWidth - 2);
  doc.text(descLines[0], margin + 2 + titleWidth, currentY);
  if (descLines.length > 1) {
    currentY += 4;
    doc.text(descLines.slice(1), margin + 6, currentY);
  }
  currentY += 4.5;
});

currentY += 4;

// Section 5: Preloaded Clinical Personas
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(...DARK_TEAL);
doc.text('5. Multi-Patient Clinical Personas', margin, currentY);
currentY += 6;

const personas = [
  '1. Eleanor Vance (74 y/o): Congestive Heart Failure (Stage B) & Hypertension. Reports orthopnea (3 pillows), +5.5 lbs weight gain, missed Lasix.',
  '2. Arthur Chen (68 y/o): Type 2 Diabetes Mellitus & Osteoarthritis. 95% adherence, preparing for endocrinologist visit, morning knee stiffness.',
  '3. Margaret Miller (81 y/o): Post Total Hip Arthroplasty & Osteoporosis. Mobility milestones, pain medication taper inquiries.'
];

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...SLATE_700);
personas.forEach(pers => {
  const pLines = doc.splitTextToSize(pers, contentWidth);
  doc.text(pLines, margin + 2, currentY);
  currentY += pLines.length * 3.8 + 1.5;
});

currentY += 4;

// Section 6: Tech Stack & Architecture
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(...DARK_TEAL);
doc.text('6. Technical Stack & Deployment Pipeline', margin, currentY);
currentY += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...SLATE_700);

const techText = `• Frontend: React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
• Voice & Audio Engine: Web Speech API (STT & TTS), Web Audio API (zero-feedback analyser)
• Data Visualization & PDF: Recharts, jsPDF
• Backend & Deployment: Express.js (Node.js), render.yaml, Deployed on Render Cloud Platform`;

doc.text(techText, margin + 2, currentY);

// Final Header and Footer draw
drawHeaderFooter();

// Save PDF
const outputPath = '/Users/ishitagautam/.gemini/antigravity/scratch/carevoice-ai/CareVoice_AI_Project_Report.pdf';
fs.writeFileSync(outputPath, Buffer.from(doc.output('arraybuffer')));
console.log('CareVoice_AI_Project_Report.pdf generated successfully at:', outputPath);
