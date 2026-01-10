import { Node } from "@prisma/client";

export type getAllNodesType = {
  nodes: Node[];
  total: number;
};
