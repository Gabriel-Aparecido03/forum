import { Injectable } from "@nestjs/common";
import { AnswerReplyAttachment } from "@/domain/forum/enterprise/entities/answer-reply-attachment";

@Injectable()
export abstract class AnswerReplyAttachmentRepository {
  abstract getByAnswerReplyId(answerReplyId : string ) : Promise<AnswerReplyAttachment[] | null>
  abstract createMany(attachment : AnswerReplyAttachment[] ) : Promise<void>
  abstract deleteMany(attachment : AnswerReplyAttachment[] ) : Promise<void>
}