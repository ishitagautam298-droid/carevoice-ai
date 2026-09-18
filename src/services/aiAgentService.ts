import { PatientProfile, CheckInMode, VoiceMessage, TriageFlag } from '../types';

export interface AgentResponse {
  messageText: string;
  detectedFlags: TriageFlag[];
  suggestedFollowUps: string[];
  isEmergency: boolean;
  category: 'general' | 'symptom' | 'medication' | 'vital' | 'concern' | 'flag';
}

export class AIAgentService {
  private lastTopicDiscussed: string = 'greeting';

  public resetSession(mode: CheckInMode = 'daily_checkin'): void {
    this.lastTopicDiscussed = 'greeting';
  }

  public getInitialGreeting(patient: PatientProfile, mode: CheckInMode): string {
    const firstName = patient.name.split(' ')[0];
    
    switch (mode) {
      case 'daily_checkin':
        return `Good morning, ${firstName}! It is wonderful to speak with you today. How did you rest last night, and how is your body feeling overall this morning?`;
      case 'medication_review':
        return `Hello ${firstName}! Let\'s review your medications. Were you able to take your ${patient.medications[0]?.name || 'morning pills'} today, or did any of them cause any dizziness or side effects?`;
      case 'symptom_deepdive':
        return `Hello ${firstName}. I am listening closely. Tell me about any discomfort, swelling, pain, or changes you are noticing in your body today.`;
      case 'appointment_prep':
        return `Hello ${firstName}! Your next visit with ${patient.primaryPhysician.name} is on ${patient.primaryPhysician.nextAppointment}. What questions or topics are top of mind for you to discuss?`;
      case 'free_chat':
      default:
        return `Hello ${firstName}! I\'m your CareVoice companion. What would you like to talk about today? We can talk about how you\'re feeling, your meals, or anything on your mind.`;
    }
  }

  public async processUserInput(
    userInput: string,
    patient: PatientProfile,
    conversationHistory: VoiceMessage[]
  ): Promise<AgentResponse> {
    const lower = userInput.toLowerCase();
    const firstName = patient.name.split(' ')[0];
    const flags: TriageFlag[] = [];
    let isEmergency = false;
    let category: 'general' | 'symptom' | 'medication' | 'vital' | 'concern' | 'flag' = 'general';
    const suggestedFollowUps: string[] = [];
    let responseText = '';

    // =========================================================================
    // 1. CRITICAL RED FLAGS (Urgent Medical Escalation)
    // =========================================================================
    if (
      lower.includes('chest pain') ||
      lower.includes('chest pressure') ||
      lower.includes('tightness in my chest') ||
      lower.includes('heart is racing') ||
      lower.includes('fluttering') ||
      (lower.includes('breath') && (lower.includes('hard') || lower.includes("can't") || lower.includes('shortness') || lower.includes('gasping') || lower.includes('struggling') || lower.includes('three pillows') || lower.includes('3 pillows'))) ||
      lower.includes('passed out') ||
      lower.includes('fainted') ||
      lower.includes('fell') ||
      lower.includes('fall') ||
      lower.includes('slurred') ||
      lower.includes('drooping') ||
      lower.includes('severe pain 8') ||
      lower.includes('severe pain 9') ||
      lower.includes('severe pain 10')
    ) {
      isEmergency = true;
      category = 'flag';

      if (lower.includes('chest') || lower.includes('heart') || lower.includes('flutter')) {
        flags.push({
          id: `rf-${Date.now()}-1`,
          type: 'red',
          title: 'Acute Chest Tightness / Cardiac Concern',
          description: 'Patient reported chest tightness or racing heartbeat.',
          category: 'cardiovascular',
          severity: 'critical',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Immediate safety protocol: instruct patient to stay seated; offer emergency 911 / caregiver dispatch.',
          status: 'active'
        });
      }

      if (lower.includes('breath') || lower.includes('pillow') || lower.includes('gasp')) {
        flags.push({
          id: `rf-${Date.now()}-2`,
          type: 'red',
          title: 'Acute Orthopnea / Severe Dyspnea',
          description: 'Patient reported inability to breathe lying flat or severe breathing struggle.',
          category: 'respiratory',
          severity: 'critical',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Priority cardiology review; evaluate for pulmonary congestion / volume overload.',
          status: 'active'
        });
      }

      if (lower.includes('fell') || lower.includes('fall') || lower.includes('faint')) {
        flags.push({
          id: `rf-${Date.now()}-3`,
          type: 'red',
          title: 'Fall Incident / Syncope Alert',
          description: 'Patient reported falling or losing consciousness.',
          category: 'mobility',
          severity: 'critical',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Immediate trauma check and orthostatic vitals assessment.',
          status: 'active'
        });
      }

      return {
        messageText: `${firstName}, I am listening carefully and I want to make sure you are safe right now. What you described with ${lower.includes('chest') ? 'chest tightness' : lower.includes('breath') ? 'your breathing' : 'this symptom'} is very important. Please sit down in a sturdy, comfortable chair. If it gets worse or you feel faint, please tap the Emergency button or call 911. I am flagging this immediately for Dr. ${patient.primaryPhysician.name.split(',')[0]}. Are you sitting down safely right now?`,
        detectedFlags: flags,
        suggestedFollowUps: ['Yes, I am sitting down safely', 'Please alert my emergency contact', 'The feeling is easing up'],
        isEmergency: true,
        category: 'flag'
      };
    }

    // =========================================================================
    // 2. YELLOW FLAGS & SPECIFIC CLINICAL SYMPTOMS
    // =========================================================================
    if (lower.includes('swelling') || lower.includes('swollen') || lower.includes('puffy') || lower.includes('ankle') || lower.includes('feet') || lower.includes('socks left')) {
      category = 'symptom';
      flags.push({
        id: `yf-${Date.now()}-edema`,
        type: 'yellow',
        title: 'Peripheral Ankle Edema Reported',
        description: 'Patient noted ankle puffiness / visible sock band indentations.',
        category: 'cardiovascular',
        severity: 'moderate',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedQuote: userInput,
        recommendedAction: 'Check daily weight trend, evaluate sodium intake, and monitor diuretic adherence.',
        status: 'active'
      });
      responseText = `Thank you for telling me about the swelling in your ankles, ${firstName}. That is really helpful information for Dr. ${patient.primaryPhysician.name.split(',')[0]}. Have you noticed if your shoes feel tighter today, and what did your scale say when you weighed yourself this morning?`;
      suggestedFollowUps.push('My scale was about 3-4 lbs higher', 'My weight is about the same', 'My shoes feel quite snug today');
    }

    else if (lower.includes('missed') || lower.includes('skipped') || lower.includes('forgot') || lower.includes('stopped taking') || lower.includes("didn't take") || lower.includes('ran out')) {
      category = 'medication';
      flags.push({
        id: `yf-${Date.now()}-adh`,
        type: 'yellow',
        title: 'Prescription Non-Adherence / Missed Dose',
        description: 'Patient disclosed skipping or missing scheduled prescription medication.',
        category: 'adherence',
        severity: 'moderate',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedQuote: userInput,
        recommendedAction: 'Identify adherence barrier (dizziness, polyuria, cost) and coordinate clinician counseling.',
        status: 'active'
      });
      responseText = `I appreciate you being so open with me, ${firstName}. It is very common to have concerns or miss a dose. What was the reason you held off on taking it? Did it make you feel dizzy, upset your stomach, or did you simply forget?`;
      suggestedFollowUps.push('It makes me dizzy when standing', 'I was worried about going to the bathroom often', 'I simply forgot yesterday morning');
    }

    else if (lower.includes('dizzy') || lower.includes('lightheaded') || lower.includes('woozy') || lower.includes('spinning') || lower.includes('unsteady')) {
      category = 'symptom';
      flags.push({
        id: `yf-${Date.now()}-dizzy`,
        type: 'yellow',
        title: 'Postural Lightheadedness / Dizziness',
        description: 'Patient reported dizzy spells upon changing positions.',
        category: 'neurological',
        severity: 'moderate',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedQuote: userInput,
        recommendedAction: 'Advise rising slowly from sitting/lying down; assess for orthostatic hypotension.',
        status: 'active'
      });
      responseText = `Dizziness can be very unsettling, ${firstName}. Does this lightheaded feeling happen mostly when you stand up quickly from your chair or bed? Please take your time when getting up, and pause sitting on the edge of your bed for 30 seconds first. Have you had enough water to drink today?`;
      suggestedFollowUps.push('Yes, happens right when I stand up', 'I have only had 1 glass of water today', 'It happens even when sitting down');
    }

    // =========================================================================
    // 3. SLEEP RESPONSES
    // =========================================================================
    else if (lower.includes('sleep') || lower.includes('slept') || lower.includes('woke up') || lower.includes('insomnia') || lower.includes('tossed and turned') || lower.includes('night') || lower.includes('bed')) {
      category = 'vital';
      if (lower.includes('well') || lower.includes('great') || lower.includes('good') || lower.includes('7 hours') || lower.includes('8 hours') || lower.includes('soundly')) {
        flags.push({
          id: `gf-${Date.now()}-sleep`,
          type: 'green',
          title: 'Restful Sleep Duration Achieved',
          description: 'Patient reported restorative 7+ hours of uninterrupted sleep.',
          category: 'lifestyle',
          severity: 'positive',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Encourage consistent bedtime routine and sleep hygiene.',
          status: 'acknowledged'
        });
        responseText = `That is wonderful to hear, ${firstName}! Getting deep, restful sleep is so important for your healing, heart, and energy. How is your energy feeling right now, and have you taken your morning medications yet?`;
        suggestedFollowUps.push('Yes, took all my morning pills', 'Energy is great today', 'I need to take my pills now');
      } else {
        flags.push({
          id: `yf-${Date.now()}-sleep`,
          type: 'yellow',
          title: 'Sleep Disruption / Restless Night',
          description: 'Patient reported interrupted or poor quality sleep.',
          category: 'lifestyle',
          severity: 'moderate',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Evaluate for nocturia, pain, anxiety, or nocturnal orthopnea.',
          status: 'active'
        });
        responseText = `I\'m sorry you had a rough night, ${firstName}. Restless nights can make the whole day harder. Was it pain, needing to use the bathroom, or something on your mind that kept waking you up?`;
        suggestedFollowUps.push('I had to get up multiple times for the bathroom', 'My joint pain was bothering me', 'I was just feeling anxious');
      }
    }

    // =========================================================================
    // 4. PAIN & JOINT STIFFNESS RESPONSES
    // =========================================================================
    else if (lower.includes('knee') || lower.includes('joint') || lower.includes('stiff') || lower.includes('pain') || lower.includes('ache') || lower.includes('back') || lower.includes('shoulder') || lower.includes('hip') || lower.includes('headache')) {
      category = 'symptom';
      responseText = `I hear you, ${firstName}. Living with discomfort can be so draining. On a scale from 1 to 10, with 10 being the most severe, how would you rate that ache today? Does gentle walking or heat make it feel a bit easier?`;
      suggestedFollowUps.push('It is about a 3 or 4 out of 10', 'It is about a 6 out of 10', 'A warm shower helps ease it');
    }

    // =========================================================================
    // 5. NUTRITION & HYDRATION RESPONSES
    // =========================================================================
    else if (lower.includes('ate') || lower.includes('eat') || lower.includes('food') || lower.includes('meal') || lower.includes('breakfast') || lower.includes('lunch') || lower.includes('dinner') || lower.includes('water') || lower.includes('drank') || lower.includes('thirsty') || lower.includes('sodium') || lower.includes('salt') || lower.includes('tea') || lower.includes('coffee') || lower.includes('oatmeal') || lower.includes('soup') || lower.includes('salad')) {
      category = 'vital';
      if (lower.includes('water') || lower.includes('glasses') || lower.includes('sipping')) {
        flags.push({
          id: `gf-${Date.now()}-hydr`,
          type: 'green',
          title: 'Consistent Daily Hydration Intake',
          description: 'Patient actively tracking and drinking recommended water glasses.',
          category: 'lifestyle',
          severity: 'positive',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relatedQuote: userInput,
          recommendedAction: 'Reinforce steady hydration throughout daytime hours.',
          status: 'acknowledged'
        });
        responseText = `Excellent! Staying hydrated keeps your blood flowing smoothly and helps prevent dizzy spells. Have you also had a balanced, low-sodium bite to eat today?`;
        suggestedFollowUps.push('Yes, had oatmeal and fruit', 'I had eggs and toast', 'I need to make lunch soon');
      } else {
        responseText = `Thank you for sharing your meal details with me, ${firstName}. Eating nourishing foods and keeping salt low helps keep your blood pressure steady. How many glasses of water have you been able to drink so far today?`;
        suggestedFollowUps.push('About 4 glasses of water', 'Only 1 or 2 glasses so far', 'Drinking herbal tea and water');
      }
    }

    // =========================================================================
    // 6. VITALS & MEASUREMENTS (Blood Pressure, Weight, Glucose)
    // =========================================================================
    else if (lower.includes('pressure') || lower.includes('120') || lower.includes('130') || lower.includes('140') || lower.includes('sugar') || lower.includes('glucose') || lower.includes('scale') || lower.includes('pounds') || lower.includes('lbs') || lower.includes('weight')) {
      category = 'vital';
      flags.push({
        id: `gf-${Date.now()}-vital`,
        type: 'green',
        title: 'Home Vitals Monitored & Recorded',
        description: 'Patient actively measured and reported home vitals / biometric data.',
        category: 'cardiovascular',
        severity: 'positive',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedQuote: userInput,
        recommendedAction: 'Log into EHR trend chart for clinician longitudinal review.',
        status: 'acknowledged'
      });
      responseText = `Thank you for logging those numbers, ${firstName}! Tracking your vitals at home gives Dr. ${patient.primaryPhysician.name.split(',')[0]} such valuable insight. I\'ve logged this directly into your health trends chart. How are you feeling physically after checking those numbers?`;
      suggestedFollowUps.push('Feeling pretty good overall', 'A little tired today', 'Want to make sure the doctor sees this');
    }

    // =========================================================================
    // 7. PHYSICAL ACTIVITY & MOBILITY
    // =========================================================================
    else if (lower.includes('walk') || lower.includes('steps') || lower.includes('garden') || lower.includes('exercise') || lower.includes('yard') || lower.includes('stroll') || lower.includes('outside')) {
      category = 'vital';
      flags.push({
        id: `gf-${Date.now()}-act`,
        type: 'green',
        title: 'Active Daily Physical Mobility',
        description: 'Patient engaged in safe walking / gardening routine.',
        category: 'lifestyle',
        severity: 'positive',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedQuote: userInput,
        recommendedAction: 'Encourage continued daily movement with supportive footwear.',
        status: 'acknowledged'
      });
      responseText = `That is fantastic, ${firstName}! Staying active with walking or gardening keeps your joints mobile and lifts your mood. Did you feel steady on your feet, and did you take your walker or supportive shoes?`;
      suggestedFollowUps.push('Yes, felt steady and wore good shoes', 'Felt a little tired towards the end', 'Took my walker with me');
    }

    // =========================================================================
    // 8. DOCTOR APPOINTMENT & QUESTIONS FOR CLINICIAN
    // =========================================================================
    else if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('ask') || lower.includes('travel') || lower.includes('refill') || lower.includes('dr.') || lower.includes('question')) {
      category = 'concern';
      responseText = `That is an excellent question to bring to Dr. ${patient.primaryPhysician.name.split(',')[0]} at your upcoming appointment on ${patient.primaryPhysician.nextAppointment}. I\'ve added it directly to your Clinician Agenda so you won\'t have to remember it on the spot. Is there anything else you want to ask them?`;
      suggestedFollowUps.push('Can we check if my medication dose can be adjusted?', 'Can we review my latest blood test results?', 'That is all for my doctor list, thank you!');
    }

    // =========================================================================
    // 9. GENERAL / MOOD / FALLBACK CONVERSATIONAL RESPONSE
    // =========================================================================
    else {
      if (lower.includes('good') || lower.includes('fine') || lower.includes('okay') || lower.includes('great') || lower.includes('well')) {
        responseText = `I\'m so glad to hear that, ${firstName}! It\'s always a pleasure checking in with you. To keep your health record up to date, how did you sleep last night, and have you had a chance to drink a glass of water yet?`;
        suggestedFollowUps.push('I slept well, drank a glass of water', 'Slept okay, about 6 hours', 'A bit tired this morning');
      } else if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('worn out') || lower.includes('sad') || lower.includes('lonely') || lower.includes('down')) {
        responseText = `I hear you, ${firstName}, and thank you for sharing that with me. It is completely okay to have days when you feel worn down or tired. Please be gentle with yourself today. Have you been able to take your medications and rest in your comfortable chair?`;
        suggestedFollowUps.push('Yes, resting right now', 'Took my morning pills', 'I could use a little company');
      } else {
        responseText = `Thank you for sharing that, ${firstName}. I have documented that in your daily care log. Is there any other symptom, pill reminder, or question you would like to review today?`;
        suggestedFollowUps.push('Let\'s review my morning pills', 'I want to check my health report', 'Everything is good for now, thank you');
      }
    }

    return {
      messageText: responseText,
      detectedFlags: flags,
      suggestedFollowUps: suggestedFollowUps.length > 0 ? suggestedFollowUps : ['I feel okay today', 'Let\'s review my pills', 'View my doctor summary'],
      isEmergency,
      category
    };
  }
}

export const aiAgentService = new AIAgentService();
