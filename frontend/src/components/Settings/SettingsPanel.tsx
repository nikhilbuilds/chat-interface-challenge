import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MicIcon from "@mui/icons-material/Mic";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";
import { useThemeContext } from "../../context/themeContext";
import { useChatStore } from "../../context/chatStore";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
];

const SettingsPanel = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { darkMode, toggleDarkMode } = useThemeContext();
  const { settings, updateSettings } = useChatStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event: any) => {
    const newLang = event.target.value;
    updateSettings({ language: newLang });
  };

  const handleSpeechToggle = () => {
    updateSettings({ speechEnabled: !settings.speechEnabled });
  };

  return (
    <Box>
      <IconButton onClick={handleClick} color="inherit">
        <SettingsIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              width: 300,
              "& .MuiMenuItem-root": {
                px: 2,
                py: 1,
              },
            },
          },
        }}
      >
        <MenuItem onClick={toggleDarkMode}>
          <ListItemIcon>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSpeechToggle}>
          <ListItemIcon>
            <MicIcon />
          </ListItemIcon>
          <ListItemText primary="Speech Recognition" />
          <Switch
            edge="end"
            checked={settings.speechEnabled}
            onChange={handleSpeechToggle}
            data-testid="speech-switch"
          />
        </MenuItem>

        <Divider />

        <Box sx={{ px: 2, py: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="language-select-label">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LanguageIcon fontSize="small" />
                Language
              </Box>
            </InputLabel>
            <Select
              labelId="language-select-label"
              role="listbox"
              value={settings.language}
              label="Language"
              onChange={handleLanguageChange}
              data-testid="language-select"
            >
              {LANGUAGES.map((lang) => (
                <MenuItem
                  key={lang.code}
                  value={lang.code}
                  data-testid={`language-option-${lang.code}`}
                >
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
    </Box>
  );
};

export default SettingsPanel;
