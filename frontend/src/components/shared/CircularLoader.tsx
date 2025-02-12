import { Box, CircularProgress, Typography } from '@mui/material';

interface CircularLoaderProps {
  message: string;
}

const CircularLoader = ({ message }: CircularLoaderProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: 2 
    }}>
      <CircularProgress size={16} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default CircularLoader; 