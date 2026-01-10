import { Node } from "@prisma/client";

export interface BinaryNode extends Node {
  leftChild?: BinaryNode;
  rightChild?: BinaryNode;
}
