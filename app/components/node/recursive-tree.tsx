"use client";

import { BinaryNode } from '@/app/types/binary-node.interface';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Node } from '@prisma/client';
import React from 'react';
import { NodePlaceholder } from './placeholder-node';
import { TreeNode } from './tree-node';

interface RecursiveTreeProps {
  treeNode: BinaryNode;
  onEdit: (id: number, title: string) => void;
  onDelete: (node: Node) => void;
  onAddChild: (parentId: number, ordering: number, title: string) => void;
  isRoot?: boolean;
  isThisNodeBeingDragged?: Node | null;
}

export const RecursiveTree: React.FC<RecursiveTreeProps> = ({
  treeNode,
  onEdit,
  onDelete,
  onAddChild,
  isRoot = true,
  isThisNodeBeingDragged = null
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: treeNode.id,
    data: { ...treeNode }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1000 : 1,
    position: 'relative' as const,
  };

  const amIBeingDragged = isDragging || (isThisNodeBeingDragged?.id === treeNode.id);
  const shouldShowPlaceholders = isThisNodeBeingDragged !== null && !amIBeingDragged;
  const hasChildren = treeNode.leftChild || treeNode.rightChild;
  const showVerticalLine = hasChildren || shouldShowPlaceholders;

  const NodeAndChildren = (
    <div ref={setNodeRef} style={style} className="flex flex-col items-center">
      <div className="flex flex-col items-center tree-node-group">
        <TreeNode
          node={treeNode}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
          canAddLeftChild={!treeNode.leftChild}
          canAddRightChild={!treeNode.rightChild}
          dragHandleProps={{ ...attributes, ...listeners }}
          isDraggingInternally={isDragging}
        />
        {showVerticalLine && <div className="tree-v-line"></div>}
      </div>

      {showVerticalLine && (
        <ul className={isDragging ? "opacity-100" : ""}>
          <li className={!treeNode.leftChild ? "placeholder-slot" : ""}>
            {treeNode.leftChild ? (
              <RecursiveTree
                treeNode={treeNode.leftChild}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddChild={onAddChild}
                isRoot={false}
                isThisNodeBeingDragged={amIBeingDragged ? null : isThisNodeBeingDragged}
              />
            ) : isThisNodeBeingDragged ? (
              <NodePlaceholder parentNodeId={treeNode.id} ordering={2} />
            ) : (
              <div className="w-48 h-24 invisible"></div>
            )}
          </li>

          <li className={!treeNode.rightChild ? "placeholder-slot" : ""}>
            {treeNode.rightChild ? (
              <RecursiveTree
                treeNode={treeNode.rightChild}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddChild={onAddChild}
                isRoot={false}
                isThisNodeBeingDragged={amIBeingDragged ? null : isThisNodeBeingDragged}
              />
            ) : isThisNodeBeingDragged ? (
              <NodePlaceholder parentNodeId={treeNode.id} ordering={1} />
            ) : (
              <div className="w-48 h-24 invisible"></div>
            )}
          </li>
        </ul>
      )}
    </div>
  );

  if (isRoot) {
    return (
      <div className="tree">
        <ul>
          <li>{NodeAndChildren}</li>
        </ul>
      </div>
    );
  }

  return NodeAndChildren;
};