import { Node } from "@prisma/client";

export const isDescendant = (
  nodes: Node[],
  activeId: number,
  targetId: number
): boolean => {
  const children = nodes.filter((n) => n.parentNodeId === activeId);
  for (const child of children) {
    if (child.id === targetId || isDescendant(nodes, child.id, targetId)) {
      return true;
    }
  }
  return false;
};
