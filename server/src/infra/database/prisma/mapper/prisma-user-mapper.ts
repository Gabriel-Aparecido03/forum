import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { User } from "@/domain/forum/enterprise/entities/user";
import { User as PrismaUser , Prisma } from "@prisma/client";

export class PrismaUserMapper {
  toDomain(raw : PrismaUser) {
    return User.create({
      email : raw.email,
      password : raw.passoword,
      username : raw.username,
      createdAt : raw.createdAt,
      updatedAt : raw.updatedAt
    }, new UniqueEntityID(raw.id)
    )
  }

  toPrisma(user : User ) : Prisma.UserCreateInput { 
    return {
      email : user.email,
      passoword : user.password,
      username : user.username,
      id : user.id.toString(),
      updatedAt : user.updatedAt,
      createdAt : user.createdAt
    }
  }
}