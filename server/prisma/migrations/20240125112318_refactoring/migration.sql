/*
  Warnings:

  - You are about to drop the column `answerReplyId` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `answerId` on the `its_not_relevant` table. All the data in the column will be lost.
  - You are about to drop the column `answerReplyId` on the `its_not_relevant` table. All the data in the column will be lost.
  - You are about to drop the column `answerReplyId` on the `its_relevant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "answers_replies" DROP CONSTRAINT "answers_replies_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_answerReplyId_fkey";

-- DropForeignKey
ALTER TABLE "its_not_relevant" DROP CONSTRAINT "its_not_relevant_answerId_fkey";

-- DropForeignKey
ALTER TABLE "its_not_relevant" DROP CONSTRAINT "its_not_relevant_answerReplyId_fkey";

-- DropForeignKey
ALTER TABLE "its_relevant" DROP CONSTRAINT "its_relevant_answerReplyId_fkey";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "answerReplyId";

-- AlterTable
ALTER TABLE "its_not_relevant" DROP COLUMN "answerId",
DROP COLUMN "answerReplyId",
ADD COLUMN     "answer_id" TEXT,
ADD COLUMN     "answer_reply_id" TEXT;

-- AlterTable
ALTER TABLE "its_relevant" DROP COLUMN "answerReplyId",
ADD COLUMN     "answer_reply_id" TEXT;

-- AddForeignKey
ALTER TABLE "its_relevant" ADD CONSTRAINT "its_relevant_answer_reply_id_fkey" FOREIGN KEY ("answer_reply_id") REFERENCES "answers_replies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "its_not_relevant" ADD CONSTRAINT "its_not_relevant_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "its_not_relevant" ADD CONSTRAINT "its_not_relevant_answer_reply_id_fkey" FOREIGN KEY ("answer_reply_id") REFERENCES "answers_replies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_replies" ADD CONSTRAINT "answers_replies_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_answer_reply_id_fkey" FOREIGN KEY ("answer_reply_id") REFERENCES "answers_replies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
