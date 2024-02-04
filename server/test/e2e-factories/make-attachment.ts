import { Attachment } from "@/domain/forum/enterprise/entities/attachment";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AttachmentFactory {

  constructor(private prismaService: PrismaService) { }

  async execute(attachment: Attachment) {
    const data = {
      id: attachment.id.toString(),
      name: attachment.name,
      url: attachment.url
    }


    await this.prismaService.attachments.createMany({ data })

    return data
  }
}