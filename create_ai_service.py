import os

base = '/Users/ishitagautam/.gemini/antigravity/scratch/carevoice-ai'

ai_service_code = """import { PatientProfile, CheckInMode, VoiceMessage, TriageFlag } from '../types';

export interface AgentResponse {
  messageText: string;
  detectedFlags: TriageFlag[];
  suggestedFollowUps: string[];
  isEmergency: boolean;
  category: 'general' | 'symptom' | 'medication' | 'vital' | 'concern' | 'flag';
}

interface DialogueState {
  currentMode: CheckInMode;
  stepIndex: number;
  extractedVitals: Record<string, any>;
  extractedSymptoms: Array<{ symptom: string; severity: number; details: string }>;
  extractedMeds: Array<{ medName: string; status: 'taken' | 'missed'; reason?: string }>;
  extractedConcerns: string[];
  activeFlags: TriageFlag[];
}

export class AIAgentService {
  private dialogueState: DialogueState = {
    currentMode: 'daily_checkin',
    stepIndex: 0,
    extractedVitals: {},
    extractedSymptoms: [],
    extractedMeds: [],
    extractedConcerns: [],
    activeFlags: []
  };

  public resetSession(mode: CheckInMode = 'daily_checkin'): void {
    this.dialogueState = {
      currentMode: mode,
      stepIndex: 0,
      extractedVitals: {},
      extractedSymptoms: [],
      extractedMeds: [],
      extractedConcerns: [],
      activeFlags: []
    };
  }

  public getInitialGreeting(patient: PatientProfile, mode: CheckInMode): string {
    const firstName = patient.name.split(' ')[0];
    
    switch (mode) {
      case 'daily_checkin':
        return `Good morning, ${firstName}! It is wonderful to talk with you today. How are you feeling overall this morning? How did you sleep last night?`;
      case 'medication_review':
        return `Hello ${firstName}! Let\\'s take a quick look at your medications together. Were you able to take your morning prescriptions today, including your ${patient.medications[0]?.name || 'daily pills'}?`;
      case 'symptom_deepdive':
        return `Hello ${firstName}. I\\'m here to listen closely. Can you tell me about any symptoms, discomfort, or changes you\\'ve noticed in your body recently?`;
      case 'appointment_prep':
        return `Hello ${firstName}! Your next visit with ${patient.primaryPhysician.name} is on ${patient.primaryPhysician.nextAppointment}. What questions or concerns are most important for you to discuss with them?`;
      case 'free_chat':
      default:
        return `Hello ${firstName}! I\\'m your CareVoice wellness companion. What\\'s on your mind today? We can chat about how you\\'re feeling, review your meds, or prepare for your next doctor\\'s visit.`;
    }
  }

  public async processUserInput(
    userInput: string,
    patient: PatientProfile,
    conversationHistory: VoiceMessage[]
  ): Promise<AgentResponse> {
    const lower = userInput.toLowerCase();
    const flags: TriageFlag[] = [];
    let isEmergency = false;
    let category: 'general' | 'symptom' | 'medication' | 'vital' | 'concern' | 'flag' = 'general';
    const suggestedFollowUps: string[] = [];

    // 1. RED FLAG SAFETY DETECTOR (High Risk Clinical Triggers)
    if (
      lower.includes('chest pain') ||
      lower.includes('chest pressure') ||
      lower.includes('tightness in my chest') ||
      lower.includes('heart is racing') ||
      (lower.includes('breath') && (lower.includes('hard to') || lower.includes("can't") || lower.includes('shortness') || lower.includes('panting') || lower.includes('gasping'))) ||
      lower.includes('passed out') ||
      lower.includes('fainted') ||
      lower.includes('fell down') ||
      lower.includes('lost consciousness') ||
      lower.includes('slurred speech') ||
      lower.includes('face drooping') ||
      lower.includes('one side of my body') ||
      lower.includes('severe pain 9') ||
      lower.includes('severe pain 10')
    ) {
      isEmergency = true;
      category = 'flag';

      if (lower.includes('chest') || lower.includes('heart')) {
        flags.push({
          id: `rf-${Date.now()}-1`,
          type: 'red',
          title: 'Acute Chest Discomfort / Cardiac Alert',
          description: 'Patient reported chest tightness/discomfort during conversation.',
          category: 'cardiovascular',
          severity: 'critical',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Immediate emergency protocol: instruct patient to dial 911 or dispatch caregiver assistance immediately.',
          status: 'active'
        });
      }

      if (lower.includes('breath') || lower.includes('pillows') || lower.includes('lying flat')) {
        flags.push({
          id: `rf-${Date.now()}-2`,
          type: 'red',
          title: 'Severe Respiratory Distress / Acute Orthopnea',
          description: 'Patient reported significant dyspnea or inability to breathe comfortably lying down.',
          category: 'respiratory',
          severity: 'critical',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Direct escalation to on-call clinical team and emergency contact notification.',
          status: 'active'
        });
      }

      if (lower.includes('fell') || lower.includes('fall') || lower.includes('fainted')) {
        flags.push({
          id: `rf-${Date.now()}-3`,
          type: 'red',
          title: 'Fall Incident / Syncope Episode',
          description: 'Patient reported a fall or loss of balance event.',
          category: 'mobility',
          severity: 'critical',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Evaluate for acute trauma, head injury, and orthostatic vitals check.',
          status: 'active'
        });
      }

      this.dialogueState.activeFlags.push(...flags);

      return {
        messageText: `${patient.name.split(' ')[0]}, I am very concerned by what you just shared about having ${lower.includes('chest') ? 'chest tightness' : lower.includes('breath') ? 'difficulty breathing' : 'this severe symptom'}. Because your safety is our top priority, please rest in a comfortable seated position. If you feel dizzy or your chest tightens, please call 911 or let me notify your caregiver ${patient.emergencyContact.name} right away. I have already flagged this with high priority for Dr. ${patient.primaryPhysician.name.split(',')[0]}. Are you safe and sitting down right now?`,
        detectedFlags: flags,
        suggestedFollowUps: ['Yes, I am sitting down safely', 'Please alert my emergency contact', 'The feeling is easing up now'],
        isEmergency: true,
        category: 'flag'
      };
    }

    // 2. YELLOW FLAG & SYMPTOM DETECTORS (Monitoring & Quality of Life)
    if (
      lower.includes('swelling') ||
      lower.includes('swollen') ||
      lower.includes('puffy') ||
      lower.includes('ankles') ||
      lower.includes('feet') ||
      lower.includes('socks left marks') ||
      lower.includes('weight gained') ||
      lower.includes('heavier') ||
      lower.includes('dizzy') ||
      lower.includes('lightheaded') ||
      lower.includes('missed') ||
      lower.includes('forgot my pill') ||
      lower.includes('stopped taking') ||
      lower.includes('did not take') ||
      lower.includes("couldn't sleep") ||
      lower.includes('insomnia') ||
      lower.includes('constipated') ||
      lower.includes('upset stomach') ||
      lower.includes('nausea')
    ) {
      category = 'symptom';

      if (lower.includes('swelling') || lower.includes('puffy') || lower.includes('socks')) {
        flags.push({
          id: `yf-${Date.now()}-1`,
          type: 'yellow',
          title: 'Peripheral Edema / Fluid Retention Notice',
          description: 'Reported ankle swelling / sock indentations indicating possible fluid shifts.',
          category: 'cardiovascular',
          severity: 'moderate',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Review daily dry weight log, check sodium intake, and monitor diuretic adherence.',
          status: 'active'
        });
      }

      if (lower.includes('missed') || lower.includes('forgot') || lower.includes('stopped')) {
        flags.push({
          id: `yf-${Date.now()}-2`,
          type: 'yellow',
          title: 'Medication Non-Adherence Reported',
          description: 'Patient disclosed skipping or stopping a prescribed medication.',
          category: 'adherence',
          severity: 'moderate',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Review pill burden, reason for hesitation, and provide clinician consultation.',
          status: 'active'
        });
      }

      if (lower.includes('dizzy') || lower.includes('lightheaded')) {
        flags.push({
          id: `yf-${Date.now()}-3`,
          type: 'yellow',
          title: 'Postural Dizziness / Orthostatic Risk',
          description: 'Patient noted dizziness upon standing.',
          category: 'neurological',
          severity: 'moderate',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Advise rising slowly from sitting to standing; evaluate antihypertensive dosages.',
          status: 'active'
        });
      }

      this.dialogueState.activeFlags.push(...flags);
    }

    // 3. GREEN FLAG / POSITIVE PROGRESS DETECTOR
    if (
      lower.includes('walked') ||
      lower.includes('steps') ||
      lower.includes('slept well') ||
      lower.includes('slept great') ||
      lower.includes('feel better') ||
      lower.includes('took all my pills') ||
      lower.includes('on time') ||
      lower.includes('drank water') ||
      lower.includes('gardening') ||
      lower.includes('exercised') ||
      lower.includes('normal') ||
      lower.includes('good blood sugar') ||
      lower.includes('good pressure')
    ) {
      category = 'vital';

      if (lower.includes('walk') || lower.includes('steps') || lower.includes('garden')) {
        flags.push({
          id: `gf-${Date.now()}-1`,
          type: 'green',
          title: 'Active Mobility & Lifestyle Engagement',
          description: 'Patient met daily physical activity goals and engaged in uplifting routines.',
          category: 'lifestyle',
          severity: 'positive',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Encourage continued routine with proper hydration and supportive footwear.',
          status: 'acknowledged'
        });
      }

      if (lower.includes('took all') || lower.includes('on time') || lower.includes('pills')) {
        flags.push({
          id: `gf-${Date.now()}-2`,
          type: 'green',
          title: '100% Medication Adherence Streak',
          description: 'Patient successfully took scheduled morning and evening doses.',
          category: 'adherence',
          severity: 'positive',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Reinforce positive reinforcement and maintain current reminder schedule.',
          status: 'acknowledged'
        });
      }

      this.dialogueState.activeFlags.push(...flags);
    }

    // 4. GENERATE EMPATHETIC CONTEXTUAL RESPONSE
    const firstName = patient.name.split(' ')[0];
    let responseText = '';

    // Guided Check-in State Progression
    this.dialogueState.stepIndex += 1;
    const step = this.dialogueState.stepIndex;

    if (flags.some(f => f.type === 'yellow')) {
      const yellowTitle = flags.find(f => f.type === 'yellow')?.title;
      if (lower.includes('missed') || lower.includes('stopped')) {
        responseText = `Thank you for being open and honest with me, ${firstName}. Many people experience side effects or concerns with their pills. May I ask what caused you to hold off on taking it? Was it dizziness, stomach upset, or something else?`;
        suggestedFollowUps.push('It made me feel dizzy when standing', 'I was worried about going to the bathroom often', 'I simply forgot yesterday');
      } else if (lower.includes('swelling') || lower.includes('puff')) {
        responseText = `Thank you for noticing that and letting me know, ${firstName}. Ankle swelling is really helpful for Dr. ${patient.primaryPhysician.name.split(',')[0]} to track. Have you weighed yourself on your scale this morning, and are you able to elevate your legs when sitting?`;
        suggestedFollowUps.push('My scale was about 4-5 lbs higher', 'My weight is about normal', 'Yes, I am elevating my feet now');
      } else {
        responseText = `I hear you, ${firstName}. I have noted that carefully for your health record. Let\\'s make sure you stay comfortable. How are your other daily tasks going today?`;
        suggestedFollowUps.push('Everything else is okay', 'I feel a bit tired', 'I want to ask the doctor about this');
      }
    } else if (flags.some(f => f.type === 'green')) {
      responseText = `That is truly wonderful news, ${firstName}! Hearing that you are feeling good and staying on top of your routine makes such a positive difference. How is your energy level for the rest of the day? Have you been drinking plenty of water?`;
      suggestedFollowUps.push('Yes, drinking lots of water!', 'Energy is good today', 'A bit tired but doing well');
    } else if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('ask dr')) {
      category = 'concern';
      this.dialogueState.extractedConcerns.push(userInput);
      responseText = `That is an excellent point to bring up with Dr. ${patient.primaryPhysician.name.split(',')[0]}. I am adding that directly to your Doctor Visit Agenda so you won\\'t have to remember it on the spot. Is there anything else about your symptoms or daily routine you would like them to review?`;
      suggestedFollowUps.push('Can we check my medication dosage?', 'I want to ask about my travel plans', 'That is all for now, thank you');
    } else {
      // Step-based guided conversational progression
      if (step === 1) {
        responseText = `Thank you for sharing that, ${firstName}. It is always helpful to know how your day begins. Have you had a chance to take your morning medications and drink a glass of water yet?`;
        suggestedFollowUps.push('Yes, took all my morning pills', 'Not yet, about to take them', 'I missed one because I felt uneasy');
      } else if (step === 2) {
        responseText = `Good to know! And how is your body feeling physically today? Any aches, joint stiffness, or unusual shortness of breath?`;
        suggestedFollowUps.push('No aches at all, feeling good', 'A little knee stiffness', 'Feeling slightly short of breath');
      } else if (step === 3) {
        responseText = `Got it. And how about your appetite and hydration? Have you been able to enjoy your meals and drink enough fluids today?`;
        suggestedFollowUps.push('Appetite is great, drank 4 glasses', 'Not very hungry today', 'Drinking water throughout the day');
      } else {
        responseText = `Thank you so much for this thoughtful check-in, ${firstName}. I\\'ve documented everything we discussed. Remember that I am here to help keep you and your care team connected. Would you like me to prepare the updated summary report for Dr. ${patient.primaryPhysician.name.split(',')[0]} now?`;
        suggestedFollowUps.push('Yes, generate my doctor summary', 'I have one more question', 'Thank you, CareVoice');
      }
    }

    return {
      messageText: responseText,
      detectedFlags: flags,
      suggestedFollowUps: suggestedFollowUps.length > 0 ? suggestedFollowUps : ['Tell me more', 'I feel okay', 'What should I do next?'],
      isEmergency: false,
      category
    };
  }
}

export const aiAgentService = new AIAgentService();
"""

with open(f'{base}/src/services/aiAgentService.ts', 'w') as f:
    f.write(ai_service_code)

print("Created aiAgentService.ts")
