import { create } from 'zustand';
import { ChatState, ChatStateData, Message } from '../types/chat';
import { dbService } from '../services/dbService';

const initialState: ChatStateData = {
  messages: [],
  isRecording: false,
  isProcessing: false,
  isLoading: false,
  error: null,
  settings: {
    theme: 'light',
    language: 'en',
    speechEnabled: true
  }
};

export const useChatStore = create<ChatState>((set, get) => ({
  ...initialState,
  addMessage: async (msg) => {
    try {
      const message = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        ...msg,
      } as Message;

      await dbService.saveMessage(message);
      set((state) => ({
        messages: [...state.messages, message].sort((a, b) => 
          a.timestamp.getTime() - b.timestamp.getTime()
        ),
        error: null,
      }));
    } catch (error) {
      set({ error: error as Error });
      console.error('Failed to add message:', error);
    }
  },
  setRecording: (status) => set({ isRecording: status }),
  setProcessing: (status) => set({ isProcessing: status }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings },
  })),
  loadMoreMessages: async (page: number) => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      const olderMessages = await dbService.getMessages(page);
      set((state) => ({
        messages: [...olderMessages, ...state.messages].sort((a, b) => 
          a.timestamp.getTime() - b.timestamp.getTime()
        ),
        error: null,
      }));
    } catch (error) {
      setError(error as Error);
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  },
  clearHistory: async () => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      await dbService.clearMessages();
      set({ messages: [], error: null });
    } catch (error) {
      setError(error as Error);
      console.error('Failed to clear messages:', error);
    } finally {
      setLoading(false);
    }
  },
}));

dbService.getMessages(0).then((messages) => {
  const sortedMessages = messages.sort((a, b) => 
    a.timestamp.getTime() - b.timestamp.getTime()
  );
  useChatStore.setState({ messages: sortedMessages });
});