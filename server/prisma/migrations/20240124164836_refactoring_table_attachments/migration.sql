/*
  Warnings:

  - You are about to drop the `attachents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attachents" DROP CONSTRAINT "attachents_answerReplyId_fkey";

-- DropForeignKey
ALTER TABLE "attachents" DROP CONSTRAINT "attachents_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "attachents" DROP CONSTRAINT "attachents_topic_id_fkey";

-- DropTable
DROP TABLE "attachents";

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "topic_id" TEXT,
    "answer_id" TEXT,
    "answer_reply_id" TEXT,
    "answerReplyId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "attachments_id_key" ON "attachments"("id");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_answerReplyId_fkey" FOREIGN KEY ("answerReplyId") REFERENCES "answers_replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
