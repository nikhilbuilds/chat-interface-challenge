import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../../context/chatStore";
import { Box, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { sendMessage, setupWebSocket } from "../../services/websocketService";
import { useThemeContext } from "../../context/themeContext";
import { SpeechService } from "../../services/speechService";
import MessageRow from "./MessageRow";
import ThinkingIndicator from "./ThinkingIndicator";
import { showToast } from "../../utils/toast";
import { MAX_MESSAGE_HEIGHT, TOAST_MESSAGES } from "../../utils/constants";
import QuickReplies from "./QuickReplies";
import MessageInput from "./MessageInput";

const MESSAGE_HEIGHT = MAX_MESSAGE_HEIGHT;

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
  const listRef = useRef<List>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [listHeight, setListHeight] = useState(window.innerHeight);

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

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <MessageRow
      index={index}
      style={style}
      message={messages[index]}
      speakingMessageId={speakingMessageId}
      onSpeak={handleSpeak}
    />
  );

  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      listRef.current.scrollToItem(messages.length - 1, "end");
    }
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      const height = isMobile
        ? window.innerHeight - 180
        : window.innerHeight * 0.9 - 140;
      setListHeight(height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

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
          overflow: "hidden",
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
          <List
            ref={listRef}
            height={listHeight}
            itemCount={messages.length}
            itemSize={MESSAGE_HEIGHT}
            width="100%"
            overscanCount={5}
            style={{ overflowX: "hidden" }}
            initialScrollOffset={messages.length * MESSAGE_HEIGHT}
          >
            {renderRow}
          </List>
        )}

        {isProcessing && <ThinkingIndicator isProcessing={isProcessing} />}
      </Box>

      <Box
        sx={{
          p: { xs: 1, sm: 2 },
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
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
