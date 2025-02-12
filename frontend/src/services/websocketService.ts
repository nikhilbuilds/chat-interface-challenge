const API_URL = process.env.REACT_APP_API_URL;

const socket = new WebSocket(API_URL as string);

export const sendMessage = (message: string) => {
  socket.send(message);
};

export const setupWebSocket = (onMessage: (msg: string) => void) => {
  socket.onmessage = (event) => {
    onMessage(event.data);
  };
};

export const fetchQuickReplies = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/quick-replies`);
  if (!response.ok) {
    throw new Error("Failed to fetch quick replies");
  }
  return response.json();
};
