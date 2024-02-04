import { UniqueEntityID } from "@/domain/core/unique-entity-id";
import { UserRepostiory } from "@/domain/forum/application/repositories/user-repository";
import { User } from "@/domain/forum/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepostiory {
  constructor(private prismaService: PrismaService) { }
  async register(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        email: user.email,
        passoword: user.password,
        username: user.username
      }
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id
      }
    })
  }

  async update(user: User): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.id.toString()
      },
      data: {
        username: user.username,
        email: user.email,
        updatedAt: new Date(),
        passoword: user.password
      }
    })
  }
  async getByUsername(username: string): Promise<User> {
    const result = await this.prismaService.user.findUnique({
      where : { username }
    })

    if(!result) return null

    return User.create({
      email : result.email,
      password : result.passoword,
      username : result.username,
      createdAt : result.createdAt,
      updatedAt : result.updatedAt
    },new UniqueEntityID(result.id))
  }
  async getByEmail(email: string): Promise<User> {
    const result = await this.prismaService.user.findUnique({
      where : { email }
    })

    if(!result) return null

    return User.create({
      email : result.email,
      password : result.passoword,
      username : result.username,
      createdAt : result.createdAt,
      updatedAt : result.updatedAt
    },new UniqueEntityID(result.id))
  }
  async getById(id: string): Promise<User> {
    const result = await this.prismaService.user.findUnique({
      where : { id }
    })

    if(!result) return null
    
    return User.create({
      email : result.email,
      password : result.passoword,
      username : result.username,
      createdAt : result.createdAt,
      updatedAt : result.updatedAt
    },new UniqueEntityID(result.id))
  }
}