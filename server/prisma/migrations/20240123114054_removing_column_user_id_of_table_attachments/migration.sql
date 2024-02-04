/*
  Warnings:

  - You are about to drop the column `user_id` on the `attachents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "attachents" DROP CONSTRAINT "attachents_user_id_fkey";

-- AlterTable
ALTER TABLE "attachents" DROP COLUMN "user_id";
