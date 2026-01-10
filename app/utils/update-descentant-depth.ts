import { PrismaClient } from "@prisma/client";

export async function updateDescendantsDepth(
  prisma: PrismaClient,
  parentId: number,
  parentDepth: number
) {
  const children = await prisma.node.findMany({
    where: { parentNodeId: parentId },
  });

  if (children.length) {
    for (const child of children) {
      const newDepth = parentDepth + 1;
      await prisma.node.update({
        where: { id: child.id },
        data: { depth: newDepth },
      });
      await updateDescendantsDepth(prisma, child.id, newDepth);
    }
  }
}
