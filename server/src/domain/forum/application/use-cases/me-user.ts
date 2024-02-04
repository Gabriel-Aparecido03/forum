import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { HashComparer } from "../cryptography/hash-comparer";
import { UserRepostiory } from "../repositories/user-repository";
import { Encrypter } from "../cryptography/encrypter";
import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/domain/core/errors/resource-not-found";

interface AuthenticateUserParams {
  id: string
}

@Injectable()
export class MeUserUseCase {
  constructor(private usersRepository: UserRepostiory ) { }

  async execute({ id }: AuthenticateUserParams) {
    const user = await this.usersRepository.getById(id)
    if(!user) throw new ResourceNotFoundError()

    return { user }
  }
}