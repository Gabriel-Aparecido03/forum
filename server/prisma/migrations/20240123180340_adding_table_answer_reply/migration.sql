-- AlterTable
ALTER TABLE "attachents" ADD COLUMN     "answerReplyId" TEXT,
ADD COLUMN     "answer_reply_id" TEXT;

-- AlterTable
ALTER TABLE "its_not_relevant" ADD COLUMN     "answerReplyId" TEXT;

-- AlterTable
ALTER TABLE "its_relevant" ADD COLUMN     "answerReplyId" TEXT;

-- CreateTable
CREATE TABLE "answers_replies" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "answer_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "answers_replies_id_key" ON "answers_replies"("id");

-- AddForeignKey
ALTER TABLE "its_relevant" ADD CONSTRAINT "its_relevant_answerReplyId_fkey" FOREIGN KEY ("answerReplyId") REFERENCES "answers_replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "its_not_relevant" ADD CONSTRAINT "its_not_relevant_answerReplyId_fkey" FOREIGN KEY ("answerReplyId") REFERENCES "answers_replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_replies" ADD CONSTRAINT "answers_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_replies" ADD CONSTRAINT "answers_replies_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachents" ADD CONSTRAINT "attachents_answerReplyId_fkey" FOREIGN KEY ("answerReplyId") REFERENCES "answers_replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
