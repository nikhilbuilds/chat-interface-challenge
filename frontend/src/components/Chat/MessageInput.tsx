import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SpeechInput from "../shared/SpeechInput";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  isProcessing: boolean;
  error: Error | null;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onSpeechInput: (text: string) => void;
}

const MessageInput = ({
  input,
  isLoading,
  isProcessing,
  error,
  onInputChange,
  onSend,
  onSpeechInput,
}: MessageInputProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 0.5, sm: 1 },
        px: { xs: 1, sm: 0 },
      }}
    >
      <TextField
        fullWidth
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isMobile ? "Message..." : "Type your message..."}
        variant="outlined"
        size="small"
        data-testid="message-input"
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: { xs: "0.875rem", sm: "1rem" },
          },
        }}
        slotProps={{
          input: {
            endAdornment: <SpeechInput onSpeechInput={onSpeechInput} />,
          },
        }}
        disabled={isLoading}
        error={!!error}
      />
      <IconButton
        color="primary"
        onClick={onSend}
        disabled={isProcessing || !input.trim() || isLoading}
        size={isMobile ? "small" : "medium"}
        type="button"
        data-testid="send-button"
      >
        <SendIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
