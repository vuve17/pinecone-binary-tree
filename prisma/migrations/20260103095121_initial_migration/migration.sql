-- CreateTable
CREATE TABLE "node" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "parent_node_id" INTEGER,
    "ordering" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,

    CONSTRAINT "node_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "node" ADD CONSTRAINT "node_parent_node_id_fkey" FOREIGN KEY ("parent_node_id") REFERENCES "node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
