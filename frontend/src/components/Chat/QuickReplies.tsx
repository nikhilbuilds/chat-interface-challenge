import { Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { fetchQuickReplies } from '../../services/websocketService';
import { showToast } from '../../utils/toast';
import { TOAST_MESSAGES } from '../../utils/constants';
import CircularLoader from '../shared/CircularLoader';

interface QuickRepliesProps {
  onReplyClick: (reply: string) => void;
}

const QuickReplies = ({ onReplyClick }: QuickRepliesProps) => {
    const [quickReplies, setQuickReplies] = useState<string[]>([]);
    const [quickRepliesLoading, setQuickRepliesLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const loadQuickReplies = async () => {
      try {
        const replies = await fetchQuickReplies();
        setQuickReplies(replies);
        setQuickRepliesLoading(false);
        showToast('success', TOAST_MESSAGES.SUCCESS.QUICK_REPLIES_LOADED);
      } catch (error) {
        setQuickRepliesLoading(false);
        showToast('error', TOAST_MESSAGES.ERROR.QUICK_REPLIES_FAILED);
      }
    };

    loadQuickReplies();
  }, []);

  if(quickRepliesLoading) {
    return <CircularLoader message="Loading..." />
  }

  return (
    <>
    <Box sx={{ 
      mb: { xs: 1, sm: 2 }, 
      display: 'flex', 
      gap: 1, 
      flexWrap: 'wrap',
      px: { xs: 1, sm: 0 }
    }}>
      {quickReplies.map((reply) => (
        <Chip
          key={reply}
          label={reply}
          size={isMobile ? "small" : "medium"}
          onClick={() => onReplyClick(reply)}
          sx={{ 
            '&:hover': { bgcolor: 'primary.light', color: 'white' },
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        />
      ))}
    </Box>
    </>
  );
};

export default QuickReplies; 