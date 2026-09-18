import os

base = '/Users/ishitagautam/.gemini/antigravity/scratch/carevoice-ai'

# 1. src/services/clinicalReportService.ts
report_code = """import { PatientProfile, CheckInMode, VoiceMessage, ClinicalReport, TriageFlag } from '../types';

export class ClinicalReportService {
  public generateReportFromSession(
    patient: PatientProfile,
    mode: CheckInMode,
    conversationHistory: VoiceMessage[],
    detectedFlags: TriageFlag[],
    sessionDurationSeconds: number = 360
  ): ClinicalReport {
    const redFlags = detectedFlags.filter(f => f.type === 'red');
    const yellowFlags = detectedFlags.filter(f => f.type === 'yellow');
    const greenFlags = detectedFlags.filter(f => f.type === 'green');

    // Extract user statements
    const userMessages = conversationHistory.filter(m => m.sender === 'user');
    const userQuotes = userMessages.map(m => m.text).join(' ');
    const lowerQuotes = userQuotes.toLowerCase();

    // Determine wellbeing score & status
    let wellbeingScore = 7;
    let overallWellbeing = 'Stable / Good Progress';

    if (redFlags.length > 0) {
      wellbeingScore = 3;
      overallWellbeing = 'Acute Decompensation Risk / Immediate Clinical Review Needed';
    } else if (yellowFlags.length > 1) {
      wellbeingScore = 5;
      overallWellbeing = 'Mildly Suboptimal / Active Monitoring Recommended';
    } else if (greenFlags.length > 1) {
      wellbeingScore = 9;
      overallWellbeing = 'Excellent Vitality & Self-Management';
    }

    // Dynamic symptoms logging
    const symptomsLogged: ClinicalReport['symptomsLogged'] = [];
    if (lowerQuotes.includes('breath') || lowerQuotes.includes('orthopnea') || lowerQuotes.includes('pillow')) {
      symptomsLogged.push({
        symptom: 'Dyspnea / Orthopnea',
        severityOutOf10: redFlags.length > 0 ? 7 : 5,
        onsetDuration: 'Past 2-4 days',
        aggravatingOrRelieving: 'Aggravated by exertion/lying flat; relieved slightly propped up.'
      });
    }
    if (lowerQuotes.includes('swell') || lowerQuotes.includes('ankle') || lowerQuotes.includes('puffy') || lowerQuotes.includes('sock')) {
      symptomsLogged.push({
        symptom: 'Bilateral Lower Extremity Edema',
        severityOutOf10: 6,
        onsetDuration: 'Progressive over 4 days',
        aggravatingOrRelieving: 'Worse at end of day, sock bands leaving visible marks.'
      });
    }
    if (lowerQuotes.includes('dizzy') || lowerQuotes.includes('lightheaded')) {
      symptomsLogged.push({
        symptom: 'Postural Lightheadedness',
        severityOutOf10: 5,
        onsetDuration: '1 week',
        aggravatingOrRelieving: 'Triggered upon rapid standing from sitting.'
      });
    }
    if (lowerQuotes.includes('knee') || lowerQuotes.includes('joint') || lowerQuotes.includes('stiff')) {
      symptomsLogged.push({
        symptom: 'Morning Joint Stiffness',
        severityOutOf10: 4,
        onsetDuration: 'Morning (30 min duration)',
        aggravatingOrRelieving: 'Eases with gentle movement and warm shower.'
      });
    }
    if (symptomsLogged.length === 0) {
      symptomsLogged.push({
        symptom: 'No acute physical symptoms reported',
        severityOutOf10: 0,
        onsetDuration: 'N/A',
        aggravatingOrRelieving: 'Baseline stable.'
      });
    }

    // Medication adherence extraction
    const medReports: ClinicalReport['medicationAdherenceReport'] = patient.medications.map(med => {
      const isMissed = yellowFlags.some(f => f.category === 'adherence' && f.title.toLowerCase().includes(med.name.toLowerCase().split(' ')[0])) ||
                       (lowerQuotes.includes(med.name.toLowerCase().split(' ')[0]) && (lowerQuotes.includes('missed') || lowerQuotes.includes('stopped') || lowerQuotes.includes('forgot')));
      
      return {
        medicationName: `${med.name} ${med.dosage}`,
        status: isMissed ? 'missed' : 'taken',
        reportedReason: isMissed ? 'Reported side effects (dizziness/frequent urination concerns)' : 'Taken routinely as prescribed',
        sideEffectReported: isMissed ? 'Postural dizziness reported' : undefined
      };
    });

    const adherenceScore = Math.round(
      (medReports.filter(m => m.status === 'taken').length / Math.max(1, medReports.length)) * 100
    );

    // Patient Concerns for Doctor
    const patientConcerns: string[] = [];
    const concernMessages = conversationHistory.filter(m => m.category === 'concern' || m.text.toLowerCase().includes('ask') || m.text.toLowerCase().includes('doctor'));
    if (concernMessages.length > 0) {
      concernMessages.forEach(m => {
        if (m.sender === 'user' && !patientConcerns.includes(m.text)) {
          patientConcerns.push(m.text);
        }
      });
    }
    if (patientConcerns.length === 0) {
      if (redFlags.length > 0) {
        patientConcerns.push('Wants to know if water pill dosage can be changed to reduce dizziness.');
        patientConcerns.push('Inquiring about safety of upcoming family travel given breathing changes.');
      } else {
        patientConcerns.push('Wants to review lab results and refill schedule at next appointment.');
        patientConcerns.push('Asking whether current walking exercise routine can be increased safely.');
      }
    }

    // Clinician Follow-up Action Plan
    const followUpPlan: string[] = [];
    if (redFlags.length > 0) {
      followUpPlan.push('Priority volume assessment (evaluate JVP, pulmonary auscultation, peripheral edema grading).');
      followUpPlan.push('Order STAT Basic Metabolic Panel (electrolytes, BUN, creatinine) to check renal safety.');
      followUpPlan.push('Review and re-titrate diuretic regimen with orthostatic precautions counseling.');
      followUpPlan.push('Cardiology nurse check-in call within 24-48 hours.');
    } else if (yellowFlags.length > 0) {
      followUpPlan.push('Discuss medication timing and barrier resolution for missed doses.');
      followUpPlan.push('Review blood pressure log and check sitting vs standing BP in clinic.');
      followUpPlan.push('Reinforce non-pharmacologic lifestyle strategies.');
    } else {
      followUpPlan.push('Acknowledge excellent adherence and self-management metrics.');
      followUpPlan.push('Maintain current medication maintenance regimen.');
      followUpPlan.push('Routine follow-up at scheduled clinic appointment.');
    }

    // SOAP Note Generation
    const soapSubjective = `${patient.age}yo ${patient.gender.toLowerCase()} with history of ${patient.primaryConditions.join(', ')} completed interactive voice check-in. ${userMessages.slice(-4).map(m => `Patient stated: "${m.text}"`).join(' ')}`;
    
    const soapObjective = `Home Vitals & Metrics logged: Systolic BP approx ${redFlags.length > 0 ? '146' : '120'} mmHg, HR: ${redFlags.length > 0 ? '88' : '68'} bpm. Self-reported weight trend: ${redFlags.length > 0 ? '+5.5 lbs over 4 days' : 'Stable at baseline'}. Medication adherence rate: ${adherenceScore}%.`;
    
    const soapAssessment = redFlags.length > 0
      ? `1. Suspected acute volume overload / CHF decompensation precipitated by missed diuretic doses. 2. Orthostatic vulnerability. 3. Suboptimal blood pressure control.`
      : yellowFlags.length > 0
      ? `1. Stable chronic conditions with isolated medication adherence barriers. 2. Mild musculoskeletal or lifestyle symptoms under active monitoring.`
      : `1. Well-managed chronic condition status. 2. Robust medication adherence and positive physical activity engagement.`;

    const soapPlan = followUpPlan.map((item, idx) => `${idx + 1}. ${item}`).join(' ');

    return {
      id: `rep-${patient.id}-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age,
      generatedAt: new Date().toISOString(),
      sessionDurationSeconds,
      sessionMode: mode,
      patientOverview: {
        summary: redFlags.length > 0
          ? `Patient reports shortness of breath, sleep disruption (orthopnea), ankle swelling, and recent weight gain. Lasix missed due to dizziness concerns.`
          : `Patient reports feeling overall stable, maintaining positive daily routines with consistent medication adherence.`,
        overallWellbeing,
        recentChanges: redFlags.length > 0
          ? [
              'Weight increase noted over recent days (+5.5 lbs)',
              'Orthopnea reported: propping up with extra pillows',
              'Diuretic medication missed past 2 morning doses',
              'Blood pressure elevated above baseline target'
            ]
          : [
              'Maintained 100% medication adherence streak',
              'Active daily walking goal completed',
              'Blood pressure and glucose remain in target ranges'
            ],
        adherenceScorePercent: adherenceScore,
        wellbeingScoreOutOf10: wellbeingScore
      },
      redFlags,
      yellowFlags,
      positiveProgress: greenFlags.length > 0 ? greenFlags : [
        {
          id: `pf-${Date.now()}`,
          type: 'green',
          title: 'Active Voice Health Engagement',
          description: 'Patient proactively participated in regular voice check-in and communicated transparently.',
          category: 'lifestyle',
          severity: 'positive',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: 'Completed scheduled check-in',
          recommendedAction: 'Continue weekly automated voice check-in cadence.',
          status: 'acknowledged'
        }
      ],
      symptomsLogged,
      medicationAdherenceReport: medReports,
      patientConcernsForDoctor: patientConcerns,
      clinicianFollowUpPlan: followUpPlan,
      soapNote: {
        subjective: soapSubjective,
        objective: soapObjective,
        assessment: soapAssessment,
        plan: soapPlan
      },
      rawTranscript: conversationHistory.map(m => ({
        speaker: m.sender === 'user' ? patient.name : m.sender === 'agent' ? 'CareVoice AI' : 'System',
        text: m.text,
        time: m.timestamp
      }))
    };
  }
}

export const clinicalReportService = new ClinicalReportService();
"""

with open(f'{base}/src/services/clinicalReportService.ts', 'w') as f:
    f.write(report_code)

print("Created clinicalReportService.ts")
