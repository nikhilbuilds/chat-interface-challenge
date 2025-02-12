import { render, screen, fireEvent, act } from "@testing-library/react";
import Chat from "../../../components/Chat/Chat";
import { useChatStore } from "../../../context/chatStore";
import type { Mock } from "jest-mock";

// Mock WebSocket
class MockWebSocket {
  onmessage: ((event: any) => void) | null = null;
  send = jest.fn();
  close = jest.fn();
}

// Mock the global WebSocket
global.WebSocket = MockWebSocket as any;

// Mock the components
jest.mock("../../../components/Chat/MessageInput", () => ({
  __esModule: true,
  default: ({ onSend }: any) => (
    <button onClick={onSend} data-testid="mock-message-input">
      Send Message
    </button>
  ),
}));

jest.mock("../../../components/Chat/QuickReplies", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("../../../context/chatStore", () => ({
  useChatStore: jest.fn(),
}));

jest.mock("../../../services/websocketService", () => ({
  setupWebSocket: jest.fn((callback) => {
    // Store callback for later use if needed
  }),
  sendMessage: jest.fn(),
  fetchQuickReplies: jest.fn().mockResolvedValue([]),
}));

describe("Chat", () => {
  beforeEach(() => {
    (useChatStore as unknown as Mock<any>).mockReturnValue({
      messages: [],
      isProcessing: false,
      isLoading: false,
      error: null,
      settings: {
        language: "en",
        speechEnabled: true,
        theme: "light",
      },
      addMessage: jest.fn(),
      setProcessing: jest.fn(),
      setError: jest.fn(),
      clearError: jest.fn(),
    });
  });

  it("renders empty state when no messages", async () => {
    await act(async () => {
      render(<Chat />);
    });
    expect(
      screen.getByText("No messages yet. Start a conversation!")
    ).toBeInTheDocument();
  });

  it("shows thinking indicator when processing", async () => {
    (useChatStore as unknown as Mock<any>).mockReturnValue({
      messages: [],
      isProcessing: true,
      isLoading: false,
      error: null,
      settings: {
        language: "en",
        speechEnabled: true,
        theme: "light",
      },
    });

    await act(async () => {
      render(<Chat />);
    });
    expect(screen.getByText("Thinking...")).toBeInTheDocument();
  });
});
