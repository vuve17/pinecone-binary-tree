'use client'

import { hideSnackbar } from '@/app/store/notification.slice';
import { AppDispatch, RootState } from '@/app/store/store';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GlobalSnackbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, message, severity } = useSelector((state: RootState) => state.notificationReducer);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;