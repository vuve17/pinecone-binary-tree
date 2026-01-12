import prisma from "@/app/lib/prisma";
import { isDescendant } from "@/app/utils/is-descendant-helper-func";
import { updateDescendantsDepth } from "@/app/utils/update-descentant-depth";
import { Node } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idParsed = parseInt(id);

    if (isNaN(idParsed)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    if (idParsed === 1) {
      return NextResponse.json(
        { error: "Root node cannot be moved" },
        { status: 400 }
      );
    }

    const { parentNodeId, ordering } = await request.json();

    if (!parentNodeId || !ordering) {
      return NextResponse.json(
        {
          error: `${
            !parentNodeId
              ? "Parent node ID is required."
              : "Ordering is required"
          }`,
        },
        { status: 400 }
      );
    }

    if (idParsed === parentNodeId) {
      return NextResponse.json(
        { error: "A node cannot be its own parent." },
        { status: 400 }
      );
    }

    const targetParent = await prisma.node.findUnique({
      where: { id: parentNodeId },
    });

    if (!targetParent) {
      return NextResponse.json(
        { error: "Target parent node not found" },
        { status: 404 }
      );
    }

    const existingNode = await prisma.node.findUnique({
      where: { id: idParsed },
    });

    if (!existingNode) {
      return NextResponse.json({ error: "Node not found" }, { status: 404 });
    }

    const conflictingNode = await prisma.node.findFirst({
      where: {
        parentNodeId: parentNodeId,
        ordering: ordering,
        NOT: { id: idParsed },
      },
    });

    let conflictingNodeUpdated: Node | null = null;
    let nodes: Node[] = [];
    const result = await prisma.$transaction(async (tx) => {
      if (conflictingNode) {
        if (existingNode.depth !== conflictingNode.depth) {
          const lowerDepthNode =
            existingNode.depth < conflictingNode.depth
              ? existingNode
              : conflictingNode;
          const higherDepthNode =
            lowerDepthNode.id === conflictingNode.id
              ? existingNode
              : conflictingNode;

          nodes = await tx.node.findMany();
          if (isDescendant(nodes, lowerDepthNode.id, higherDepthNode.id)) {
            throw new Error("CIRCULAR_DEPENDENCY");
          }
        }

        conflictingNodeUpdated = await tx.node.update({
          where: { id: conflictingNode.id },
          data: {
            parentNodeId: existingNode.parentNodeId,
            ordering: existingNode.ordering,
            depth: existingNode.depth,
          },
        });
      }

      const newDepth = targetParent.depth + 1;
      const updated = await tx.node.update({
        where: { id: idParsed },
        data: {
          parentNodeId: parentNodeId,
          ordering: ordering,
          depth: newDepth,
        },
      });

      return updated;
    });

    await updateDescendantsDepth(prisma, result.id, result.depth);

    if (conflictingNodeUpdated) {
      const checkConflict = conflictingNodeUpdated as Node;
      if (checkConflict.parentNodeId !== result.id) {
        await updateDescendantsDepth(
          prisma,
          checkConflict.id,
          checkConflict.depth
        );
      }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "CIRCULAR_DEPENDENCY") {
      return NextResponse.json(
        { error: "Cannot move a parent into its own descendant." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Node ordering update failed" },
      { status: 500 }
    );
  }
}
