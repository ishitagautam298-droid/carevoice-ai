// Clean Web Speech API STT and TTS with audio level analyzer (ZERO feedback, ZERO audio loop)

export interface SpeechRecognitionHandlers {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onStart: () => void;
  onEnd: () => void;
  onAudioLevel?: (level: number) => void;
}

class SpeechService {
  private recognition: any = null;
  private synth: SpeechSynthesis | null = null;
  private isListening: boolean = false;
  private isSpeaking: boolean = false;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private animFrameId: number | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 1;
      }
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return !!this.recognition;
  }

  public isSpeechSynthesisSupported(): boolean {
    return !!this.synth;
  }

  public startListening(handlers: SpeechRecognitionHandlers): void {
    // Stop any ongoing speech so agent does not speak into its own mic!
    this.stopSpeaking();

    if (!this.recognition) {
      handlers.onError('Speech recognition is not supported in this browser. Please type or use sample prompts.');
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.isListening = true;

    // Start clean audio level analyzer without routing to speakers!
    this.setupAudioAnalyser(handlers.onAudioLevel);

    this.recognition.onstart = () => {
      handlers.onStart();
    };

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        handlers.onResult(finalTranscript.trim(), true);
      } else if (interimTranscript.trim()) {
        handlers.onResult(interimTranscript.trim(), false);
      }
    };

    this.recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech') {
        handlers.onError(event.error);
      }
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        try {
          this.recognition.start();
        } catch {
          this.isListening = false;
          handlers.onEnd();
        }
      } else {
        handlers.onEnd();
      }
    };

    try {
      this.recognition.start();
    } catch (e: any) {
      handlers.onError(e.message || 'Microphone could not be started');
    }
  }

  public stopListening(): void {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
    }
    this.cleanupAudioAnalyser();
  }

  public speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
    }
  ): void {
    if (!this.synth || !text.trim()) return;

    // Stop listening during speech output to prevent acoustic feedback / echo loops!
    if (this.isListening) {
      this.stopListening();
    }

    // Cancel all previously queued utterances
    this.stopSpeaking();

    // Clean text of markdown, asterisks, bullet points, brackets
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/🔴|🟡|🟢|•|\d+\./g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = options?.rate ?? 0.92;
    utterance.pitch = options?.pitch ?? 1.0;
    utterance.lang = 'en-US';

    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(
      v =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Daniel') ||
          v.name.includes('Serena') ||
          v.name.includes('Moira'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.activeUtterance = utterance;

    utterance.onstart = () => {
      this.isSpeaking = true;
      options?.onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.activeUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.activeUtterance = null;
      options?.onEnd?.();
    };

    this.synth.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
      this.isSpeaking = false;
      this.activeUtterance = null;
    }
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }

  public getListeningState(): boolean {
    return this.isListening;
  }

  private setupAudioAnalyser(onLevel?: (level: number) => void): void {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        this.micStream = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;

        this.audioContext = new AudioCtx();
        const source = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
        
        // IMPORTANT: DO NOT CONNECT TO audioContext.destination (this prevents feedback echo loop!)
        source.connect(this.analyser);

        if (onLevel) {
          const bufferLength = this.analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateLevel = () => {
            if (!this.analyser || !this.isListening) return;
            this.analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            const normalized = Math.min(1, average / 90);
            onLevel(normalized);
            this.animFrameId = requestAnimationFrame(updateLevel);
          };

          updateLevel();
        }
      })
      .catch(() => {
        // Fallback subtle animation for UI
        if (onLevel) {
          const simInterval = setInterval(() => {
            if (!this.isListening) {
              clearInterval(simInterval);
              onLevel(0);
              return;
            }
            onLevel(0.25 + Math.random() * 0.35);
          }, 180);
        }
      });
  }

  private cleanupAudioAnalyser(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
      this.micStream = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
    this.analyser = null;
  }
}

export const speechService = new SpeechService();
