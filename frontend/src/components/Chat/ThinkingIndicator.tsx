import { Box } from '@mui/material';
import CircularLoader from '../shared/CircularLoader';

interface ThinkingIndicatorProps {
  isProcessing: boolean;
}

const ThinkingIndicator = ({ isProcessing }: ThinkingIndicatorProps) => {
  if (!isProcessing) return null;

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1, 
      position: 'absolute',
      bottom: { xs: 10, sm: 10 },
      left: 16,
      backgroundColor: 'background.paper',
      padding: '8px 16px',
      borderRadius: '16px',
      boxShadow: 1,
      zIndex: 2
    }}>
      <CircularLoader message="Thinking..." />
    </Box>
  );
};

export default ThinkingIndicator; 