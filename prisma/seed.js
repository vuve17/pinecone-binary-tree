import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding the database...");

  const rootNode = await prisma.node.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Pinecone tree",
      ordering: 0,
      depth: 0,
      parentNodeId: null,
    },
  });
  
  console.log(`Root node created (ID: ${rootNode.id})`);
  console.log("Database seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
