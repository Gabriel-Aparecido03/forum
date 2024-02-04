import { Injectable } from "@nestjs/common";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

@Injectable()
export abstract class AnswerAttachmentRepository {
  abstract getByAnswerId(answerId : string ) : Promise<AnswerAttachment[] | null>
  abstract createMany(attachments : AnswerAttachment[]) : Promise<void>
  abstract deleteMany(attachments : AnswerAttachment[]) : Promise<void>
  
} 