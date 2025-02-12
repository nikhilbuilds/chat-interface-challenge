export interface SpeechServiceInterface {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: () => boolean;
}

export interface SpeechInputProps {
  onSpeechInput: (text: string) => void;
} 