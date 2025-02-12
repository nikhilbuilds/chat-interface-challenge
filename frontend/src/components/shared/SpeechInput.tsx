import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useChatStore } from '../../context/chatStore';
import { useState, useEffect } from 'react';

interface SpeechInputProps {
  onSpeechInput: (text: string) => void;
}

export const SpeechInput = ({ onSpeechInput }: SpeechInputProps) => {
  const { isRecording, setRecording, settings } = useChatStore();
  const [recognition, setRecognition] = useState<any | null>(null);   

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = settings.language;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        if (event.results[0].isFinal) {
          onSpeechInput(transcript);
          setRecording(false);
          recognition.stop();
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setRecording(false);
      };

      setRecognition(recognition);
    }
  }, [settings.language]);

  const toggleRecording = () => {
    if (!recognition) return;

    if (!isRecording) {
      recognition.start();
      setRecording(true);
    } else {
      recognition.stop();
      setRecording(false);
    }
  };

  if (!settings.speechEnabled) return null;

  return (
    <IconButton onClick={toggleRecording} color={isRecording ? 'error' : 'primary'}>
      {isRecording ? <MicOffIcon /> : <MicIcon />}
    </IconButton>
  );
};

export default SpeechInput; 