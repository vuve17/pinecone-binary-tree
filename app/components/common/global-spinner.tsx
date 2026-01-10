import { Box, CircularProgress, useTheme } from '@mui/material';
import React from 'react';

interface GlobalSpinnerProps {
  show?: boolean;
}

const GlobalSpinner: React.FC<GlobalSpinnerProps> = ({ show }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: show ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255,255,255,0.25)',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default GlobalSpinner;
