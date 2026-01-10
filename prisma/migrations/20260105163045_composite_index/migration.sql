/*
  Warnings:

  - You are about to alter the column `title` on the `node` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "node" ALTER COLUMN "title" SET DATA TYPE VARCHAR(20);

-- CreateIndex
CREATE INDEX "idx_parent_node_id" ON "node"("parent_node_id", "ordering");
