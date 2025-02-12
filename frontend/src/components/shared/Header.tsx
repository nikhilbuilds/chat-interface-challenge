import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AssistantIcon from "@mui/icons-material/Assistant";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TOAST_MESSAGES } from "../../utils/constants";
import { showToast } from "../../utils/toast";
import { useChatStore } from "../../context/chatStore";
import SettingsPanel from "../Settings/SettingsPanel";

const Header = () => {
  const { clearHistory, isLoading } = useChatStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear all chat history?")) {
      await clearHistory();
      showToast("success", TOAST_MESSAGES.SUCCESS.HISTORY_CLEARED);
    }
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            gap: { xs: 1, sm: 2 },
          }}
        >
          <AssistantIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          <Typography variant={isMobile ? "subtitle1" : "h6"}>
            AI Chat Assistant
          </Typography>
          {!isMobile && (
            <Typography variant="body2" color="text.secondary">
              Speech recognition enabled
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
          <IconButton
            color="inherit"
            onClick={handleClearHistory}
            title="Clear History"
            size={isMobile ? "small" : "medium"}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={isMobile ? 20 : 24} color="inherit" />
            ) : (
              <DeleteSweepIcon fontSize={isMobile ? "small" : "medium"} />
            )}
          </IconButton>
          <SettingsPanel />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
