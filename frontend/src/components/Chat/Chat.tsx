import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../../context/chatStore";
import { Box, Typography, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { sendMessage, setupWebSocket } from "../../services/websocketService";
import { useThemeContext } from "../../context/themeContext";
import { SpeechService } from "../../services/speechService";
import MessageRow from "./MessageRow";
import ThinkingIndicator from "./ThinkingIndicator";
import { showToast } from "../../utils/toast";
import { TOAST_MESSAGES } from "../../utils/constants";
import QuickReplies from "./QuickReplies";
import MessageInput from "./MessageInput";

const Chat = () => {
  const {
    messages,
    addMessage,
    isProcessing,
    setProcessing,
    isLoading,
    error,
    setError,
    clearError,
  } = useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useThemeContext();

  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(
    null
  );
  const speechService = SpeechService.getInstance();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setupWebSocket((message) => {
      addMessage({ content: message, type: "ai" });
      setProcessing(false);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      addMessage({ content: input, type: "user", source: "text" });
      setProcessing(true);
      try {
        sendMessage(input);
      } catch (error) {
        showToast("error", TOAST_MESSAGES.ERROR.MESSAGE_SEND_FAILED);
        setProcessing(false);
      }
      setInput("");
    }
  };

  const handleSpeechInput = (text: string) => {
    addMessage({ content: text, type: "user", source: "speech" });
    setProcessing(true);
    sendMessage(text);
  };

  const handleSpeak = (messageId: string, content: string) => {
    if (speakingMessageId === messageId) {
      speechService.stop();
      setSpeakingMessageId(null);
    } else {
      if (speakingMessageId) {
        console.log("stopping", speakingMessageId);
        speechService.stop();
      }
      speechService.speak(content);
      setSpeakingMessageId(messageId);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    handleSend();
  };

  return (
    <Box
      sx={{
        height: { xs: "100vh", sm: "90vh" },
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          bgcolor: darkMode ? "#5f5f5f" : "white",
          position: "relative",
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
              opacity: 0.7,
            }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 48 }} />
            <Typography>No messages yet. Start a conversation!</Typography>
          </Box>
        ) : (
          <Stack
            spacing={1}
            sx={{
              p: 1,
              pb: { xs: 1, sm: 1 },
              height: "90%",
              overflowY: "auto",
            }}
          >
            {messages.map((message, index) => (
              <MessageRow
                key={message.id || index}
                index={index}
                message={message}
                speakingMessageId={speakingMessageId}
                onSpeak={handleSpeak}
              />
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        )}

        {isProcessing && <ThinkingIndicator isProcessing={isProcessing} />}
      </Box>

      <Box
        sx={{
          p: { xs: 1, sm: 2 },
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          position: { xs: "relative", sm: "relative" },
          bottom: { xs: 20, sm: 2 },
          zIndex: 1,
        }}
      >
        <QuickReplies onReplyClick={handleQuickReply} />
        <MessageInput
          input={input}
          isLoading={isLoading}
          isProcessing={isProcessing}
          error={error}
          onInputChange={setInput}
          onSend={handleSend}
          onSpeechInput={handleSpeechInput}
        />
      </Box>
    </Box>
  );
};

export default Chat;
