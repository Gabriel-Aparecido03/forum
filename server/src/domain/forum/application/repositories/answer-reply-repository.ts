import { Injectable } from "@nestjs/common";
import { AnswerReply } from "@/domain/forum/enterprise/entities/answer-reply";
import { AnswerReplyWithAuthor } from "../../enterprise/entities/value-objects/answer-reply-with-author";

export interface PaginationParams {
  answerId : string
}

@Injectable()
export abstract class AnswerReplyRepository { 
  abstract create(answerreply : AnswerReply) : Promise<void>
  abstract delete(id : string ) : Promise<void>
  abstract updated(answerreply : AnswerReply) : Promise<void>
  abstract getById(id : string ) : Promise<AnswerReply | null>
  abstract fetchAnswerReply(params : PaginationParams) : Promise<AnswerReplyWithAuthor[]>
}