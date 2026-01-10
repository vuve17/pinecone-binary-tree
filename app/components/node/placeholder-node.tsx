"use client";

import { useDroppable } from '@dnd-kit/core';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface DroppablePlaceholderProps {
  parentNodeId: number;
  ordering: number;
}

export const NodePlaceholder: React.FC<DroppablePlaceholderProps> = ({
  parentNodeId,
  ordering
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `placeholder-${parentNodeId}-${ordering}`,
    data: {
      isPlaceholder: true,
      parentNodeId,
      ordering
    }
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: 192,
        height: 96,
        border: '2px dashed',
        borderColor: isOver ? 'primary.main' : 'grey.300',
        borderRadius: 2,
        m: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
        backgroundColor: isOver ? 'primary.50' : 'rgba(249, 250, 251, 0.4)',
        transform: isOver ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isOver ? 3 : 0,
        opacity: isOver ? 1 : 0.8,
        '&:hover': {
          opacity: 1,
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <Typography
          variant="h6"
          component="span"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            lineHeight: 1
          }}
        >
          +
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            textAlign: 'center',
            fontSize: '10px'
          }}
        >
          Drop for <br />
          {ordering === 2 ? 'Left Child' : 'Right Child'}
        </Typography>
      </Box>
    </Box>
  );
};