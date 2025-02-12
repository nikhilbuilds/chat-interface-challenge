export const TOAST_MESSAGES = {
  SUCCESS: {
    QUICK_REPLIES_LOADED: "Quick replies loaded successfully",
    MESSAGE_SENT: "Message sent successfully",
    SETTINGS_UPDATED: "Settings updated successfully",
    HISTORY_CLEARED: "Chat history cleared successfully",
  },
  ERROR: {
    QUICK_REPLIES_FAILED: "Failed to load quick replies",
    MESSAGE_SEND_FAILED: "Failed to send message",
    NETWORK_ERROR: "Network connection error",
    GENERIC_ERROR: "An error occurred",
    API_ERROR: "Service temporarily unavailable",
  },
  WARNING: {
    CONNECTION_UNSTABLE: "Connection is unstable",
    MIC_PERMISSION_NEEDED: "Microphone permission is required",
    UNSAVED_CHANGES: "You have unsaved changes",
  },
  INFO: {
    CONNECTING: "Connecting to server...",
    RECORDING_STARTED: "Recording started",
    RECORDING_STOPPED: "Recording stopped",
    PROCESSING_SPEECH: "Processing speech input",
  },
} as const;

export const LOADING_MESSAGES = {
  QUICK_REPLIES: "Loading quick replies...",
  MESSAGES: "Loading messages...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
} as const;

export const EMPTY_STATES = {
  NO_MESSAGES: "No messages yet. Start a conversation!",
  NO_QUICK_REPLIES: "No quick replies available",
  NO_RESULTS: "No results found",
} as const;
