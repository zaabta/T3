/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Quote` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Quote_id_userId_key` ON `Quote`(`id`, `userId`);
