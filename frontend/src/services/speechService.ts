import { SpeechServiceInterface } from '../types/speech';

export class SpeechService implements SpeechServiceInterface {
  private static instance: SpeechService;
  private speechSynthesis: SpeechSynthesis;
  private speaking: boolean = false;
  private utterance: SpeechSynthesisUtterance | null = null;

  private constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  speak(text: string) {
    

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = 1;
    this.utterance.pitch = 1;
    this.utterance.volume = 1;

    console.log('speaking', text, this.utterance );
    this.utterance.onstart = () => {
      this.speaking = true;
    };

    this.utterance.onend = () => {
      this.speaking = false;
      this.utterance = null;
    };

    this.utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.speaking = false;
      this.utterance = null;
    };

    // Ensure synthesis is not paused
    this.speechSynthesis.resume();
    
    // Start speaking
    this.speechSynthesis.speak(this.utterance);
  }

  stop() {
    if (this.speaking || this.utterance) {
      this.speechSynthesis.cancel();
      this.speaking = false;
      this.utterance = null;
    }
  }

  isSpeaking(): boolean {
    return this.speaking;
  }
} 