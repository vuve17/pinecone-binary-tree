import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, parentNodeId, ordering } = await request.json();

    const missingFields = [];
    if (!parentNodeId) missingFields.push("parentNodeId");
    if (!ordering) missingFields.push("ordering");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing ${missingFields.join(", ")} required field${
            missingFields.length > 1 ? "s" : ""
          }.`,
        },
        { status: 400 }
      );
    }

    const existingNode = await prisma.node.findFirst({
      where: {
        parentNodeId,
        ordering,
      },
    });

    if (existingNode) {
      return NextResponse.json(
        { error: "This node already exists." },
        { status: 409 }
      );
    }

    const parentNode = await prisma.node.findUnique({
      where: {
        id: parentNodeId,
      },
    });

    if (!parentNode) {
      return NextResponse.json(
        { error: `Parent node with ID of ${parentNodeId} doesn't exist.` },
        { status: 409 }
      );
    }

    const newNode = await prisma.node.create({
      data: {
        title,
        parentNodeId,
        depth: parentNode.depth + 1,
        ordering: ordering,
      },
    });

    return NextResponse.json(newNode, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create node" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const nodes = await prisma.node.findMany({
      orderBy: [{ depth: "asc" }, { ordering: "asc" }],
    });

    const totalDepthRecord = await prisma.node.aggregate({
      _max: { depth: true },
    });
    const maxDepth = totalDepthRecord._max.depth || 0;

    return new NextResponse(JSON.stringify({ nodes: nodes, total: maxDepth }), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch level range" },
      { status: 500 }
    );
  }
}
