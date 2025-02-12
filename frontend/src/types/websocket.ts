export type WebSocketMessageHandler = (message: string) => void;

export interface WebSocketService {
  sendMessage: (message: string) => void;
  setupWebSocket: (onMessage: WebSocketMessageHandler) => void;
} 