"use client";

import { Node } from "@prisma/client";
import { BinaryNode } from "../types/binary-node.interface";

export const buildBinaryTree = (nodes: Node[]): BinaryNode | null => {
  const nodeMap = new Map<number, BinaryNode>();

  nodes.forEach((node) => nodeMap.set(node.id, { ...node }));

  let root: BinaryNode | null = null;

  nodeMap.forEach((node) => {
    if (node.parentNodeId === null) {
      root = node;
    } else {
      const parent = nodeMap.get(node.parentNodeId);
      if (parent) {
        if (node.ordering === 2) parent.leftChild = node;
        if (node.ordering === 1) parent.rightChild = node;
      }
    }
  });

  return root;
};
