import { Injectable } from "@nestjs/common";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment";

@Injectable()
export abstract class AttachmentsRepository {
  abstract create(attachment : Attachment) : Promise<void>
}