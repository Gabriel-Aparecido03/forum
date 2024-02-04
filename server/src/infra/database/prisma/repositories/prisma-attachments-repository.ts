import { AttachmentsRepository } from "@/domain/forum/application/repositories/attachments-repository";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";


@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {

  constructor(private prismaService: PrismaService) { }

  async create(attachment: Attachment): Promise<void> {
    await this.prismaService.attachments.create({
      data : {
        id  : attachment.id.toString(),
        name : attachment.name,
        url : attachment.url
      }
    })
  }
}