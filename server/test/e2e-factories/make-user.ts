import { Injectable } from "@nestjs/common";
import { User } from "src/domain/forum/enterprise/entities/user";
import { PrismaUserMapper } from "src/infra/database/prisma/mapper/prisma-user-mapper";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

@Injectable()
export class UserFactory{
  constructor(private prismaService : PrismaService) {}

  async execute(data : User) {
    await this.prismaService.user.create({
      data : new PrismaUserMapper().toPrisma(data)
    })
  }
}