"use client";

import { useDroppable } from '@dnd-kit/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';
import { Node } from '@prisma/client';
import React, { useMemo, useState } from 'react';

interface TreeNodeProps {
  node: Node;
  onEdit: (id: number, newTitle: string) => void;
  onDelete: (node: Node) => void;
  onAddChild: (parentId: number, ordering: number, title: string) => void;
  dragHandleProps?: any;
  canAddLeftChild?: boolean;
  canAddRightChild?: boolean;
  isDraggingInternally?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  onEdit,
  onDelete,
  onAddChild,
  canAddRightChild = true,
  canAddLeftChild = true,
  dragHandleProps,
  isDraggingInternally
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(node.title);


  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: node.id,
    data: node,
  });


  const inputMemoContent = useMemo(() => {
    const handleRename = () => {
      onEdit(node.id, tempTitle);
      setIsEditing(false);
    };

    if (!isEditing) return (
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 'bold',
          color: 'text.secondary',
          userSelect: 'none',
          textAlign: 'center',
        }}
      >
        {node.title}
      </Typography>
    )

    return (
      <InputBase
        autoFocus
        onPointerDown={(e) => e.stopPropagation()}
        value={tempTitle}
        onChange={(e) => setTempTitle(e.target.value)}
        onBlur={handleRename}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleRename()
          else if (e.key === 'Escape') { setIsEditing(false); }
        }}
        inputProps={{ inputprops: { min: 0, max: 10 } }}
        sx={{
          width: '100%',
          input: { textAlign: 'center', fontWeight: 'bold' },
          borderBottom: '1px solid',
          borderColor: 'primary.main',
        }}
      />
    )

  }, [isEditing, tempTitle, node.title, node.id, onEdit])

  return (
    <Box
      ref={setDroppableNodeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="node-element"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        outline: isOver ? '4px solid rgba(74, 222, 128, 0.5)' : 'none',
        borderRadius: '8px',
      }}
    >
      <Paper
        {...dragHandleProps}
        elevation={dragHandleProps?.isDragging ? 8 : 1}
        sx={{
          position: 'relative',
          width: 192,
          height: 96,
          backgroundColor: 'white',
          border: '2px solid',
          borderColor: isHovered ? 'primary.main' : 'grey.200',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          transition: 'all 0.2s',
          boxShadow: isHovered ? '0 0 0 2px rgba(25, 118, 210, 0.1)' : 'none',
          cursor: isDraggingInternally ? 'grabbing' : isHovered ? 'grab' : 'default',
        }}
      >
        {isHovered && !isEditing && node.id !== 1 && (
          <Box
            sx={{
              position: 'absolute',
              top: -12,
              right: 8,
              display: 'flex',
              gap: 0.5,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 1,
              p: 0.5,
              zIndex: 20,
              boxShadow: 1,
            }}
          >
            <IconButton
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              sx={{ p: 0.5, '&:hover': { color: 'primary.main' } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onDelete(node); }}
              sx={{ p: 0.5, '&:hover': { color: 'error.main' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}


        {inputMemoContent}

        {isHovered && canAddLeftChild && (
          <Tooltip title="Add Left Child">
            <IconButton
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onAddChild(node.id, 2, `Node L`); }}
              sx={{
                position: 'absolute',
                left: -16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                color: 'success.main',
                boxShadow: 2,
                zIndex: 10,
                '&:hover': { bgcolor: 'grey.50', color: 'success.dark' },
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}

        {isHovered && canAddRightChild && (
          <Tooltip title="Add Right Child">
            <IconButton
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onAddChild(node.id, 1, `Node R`); }}
              sx={{
                position: 'absolute',
                right: -16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                color: 'success.main',
                boxShadow: 2,
                zIndex: 10,
                '&:hover': { bgcolor: 'grey.50', color: 'success.dark' },
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    </Box>
  );
};