export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  type: "user" | "ai" | "system";
  source?: "text" | "speech";
}

export interface ChatStateData {
  messages: Message[];
  isRecording: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  error: Error | null;
  settings: ChatSettings;
}

export interface ChatState extends ChatStateData {
  addMessage: (msg: Partial<Message>) => void;
  setRecording: (status: boolean) => void;
  setProcessing: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearError: () => void;
  updateSettings: (settings: Partial<ChatSettings>) => void;
  loadMoreMessages: (page: number) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export interface ChatSettings {
  theme: "light" | "dark";
  language: string;
  speechEnabled: boolean;
}

export interface ChatActions {
  addMessage: (msg: Partial<Message>) => void;
  setRecording: (status: boolean) => void;
  setProcessing: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearError: () => void;
  updateSettings: (settings: Partial<ChatSettings>) => void;
  loadMoreMessages: (page: number) => Promise<void>;
  clearHistory: () => Promise<void>;
} 