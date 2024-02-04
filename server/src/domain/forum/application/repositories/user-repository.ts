import { Injectable } from "@nestjs/common";
import { User } from "@/domain/forum/enterprise/entities/user";

@Injectable()
export abstract class UserRepostiory {
  abstract register(user : User) : Promise<void>
  abstract delete(id : string) : Promise<void>
  abstract update(user: User) : Promise<void>
  abstract getByUsername(username : string) : Promise<User | null>
  abstract getByEmail(email : string): Promise<User | null>
  abstract getById(id : string): Promise<User | null>
}