import { Box, Paper, Typography, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { formatTimestamp } from "../../utils/timeFormatter";
import { Message } from "../../types/chat";

interface MessageRowProps {
  index: number;
  message: Message;
  speakingMessageId: string | null;
  onSpeak: (messageId: string, content: string) => void;
}

const MessageRow = ({
  message,
  speakingMessageId,
  onSpeak,
}: MessageRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: message.type === "user" ? "row-reverse" : "row",
        p: 1,
      }}
    >
      {message.type === "ai" && (
        <PersonIcon
          sx={{
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
            mr: { xs: 1, sm: 2 },
          }}
        />
      )}
      <Paper
        sx={{
          p: { xs: 1.5, sm: 2 },
          maxWidth: { xs: "85%", sm: "70%" },
          bgcolor: message.type === "user" ? "#323232" : "background.paper",
          color: message.type === "user" ? "white" : "text.primary",
          borderRadius: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          minHeight: "60px",
        }}
      >
        {message.source === "speech" && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mb: 0.5,
              color: "text.secondary",
            }}
          >
            🎤 Voice message
          </Typography>
        )}
        <Typography sx={{ flex: 1 }}>{message.content}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
            pt: 0.5,
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {formatTimestamp(message.timestamp.getTime())}
          </Typography>
          {message.type === "ai" && (
            <IconButton
              size="small"
              onClick={() => onSpeak(message.id, message.content)}
              sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
            >
              {speakingMessageId === message.id ? (
                <VolumeOffIcon fontSize="small" />
              ) : (
                <VolumeUpIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MessageRow;
