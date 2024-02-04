import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerWithAuthor } from "../../enterprise/entities/value-objects/answer-with-author";

export interface PaginationParams {
  topicId : string
}

export abstract class AnswerRepository { 
  abstract create(answer : Answer) : Promise<void>
  abstract delete(id : string ) : Promise<void>
  abstract updated(answer : Answer) : Promise<void>
  abstract getById(id : string ) : Promise<Answer | null>
  abstract fetchAnswer(params : PaginationParams) : Promise<AnswerWithAuthor[]>
}