import { render, screen, fireEvent } from "@testing-library/react";
import MessageInput from "../../../components/Chat/MessageInput";

// Mock SpeechInput component
jest.mock("../../../components/shared/SpeechInput", () => ({
  __esModule: true,
  default: () => null,
}));

describe("MessageInput", () => {
  const mockProps = {
    input: "",
    isLoading: false,
    isProcessing: false,
    error: null,
    onInputChange: jest.fn(),
    onSend: jest.fn(),
    onSpeechInput: jest.fn(),
  };

  it("renders input field and send button", () => {
    render(<MessageInput {...mockProps} />);
    expect(
      screen.getByPlaceholderText("Type your message...")
    ).toBeInTheDocument();
    expect(screen.getByTestId("send-button")).toBeInTheDocument();
  });

  it("handles input change", () => {
    render(<MessageInput {...mockProps} />);
    const input = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(input, { target: { value: "test message" } });
    expect(mockProps.onInputChange).toHaveBeenCalled();
  });

  it("handles enter key press", () => {
    render(<MessageInput {...mockProps} />);
    const input = screen.getByPlaceholderText("Type your message...");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockProps.onSend).toHaveBeenCalled();
  });

  it("disables send button when processing", () => {
    render(<MessageInput {...mockProps} isProcessing={true} />);
    expect(screen.getByTestId("send-button")).toBeDisabled();
  });

  it("disables send button when loading", () => {
    render(<MessageInput {...mockProps} isLoading={true} />);
    expect(screen.getByTestId("send-button")).toBeDisabled();
  });

  it("shows error state", () => {
    render(<MessageInput {...mockProps} error={new Error("test error")} />);
    const textField = screen.getByTestId("message-input");
    expect(textField.querySelector(".MuiOutlinedInput-root")).toHaveClass(
      "Mui-error"
    );
  });
});
