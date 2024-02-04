import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { HashComparer } from "../cryptography/hash-comparer";
import { UserRepostiory } from "../repositories/user-repository";
import { Encrypter } from "../cryptography/encrypter";
import { Injectable } from "@nestjs/common";

interface AuthenticateUserParams {
  email: string
  password: string
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private usersRepository: UserRepostiory, private hashComparer : HashComparer ,private encrypter : Encrypter ) { }

  async execute({ email, password }: AuthenticateUserParams) {
    const user = await this.usersRepository.getByEmail(email)
    if(!user) throw new InvalidCredentialsError()

    const passwordMatch = await this.hashComparer.comparer( password, user.password )
    if(!passwordMatch) throw new InvalidCredentialsError()

    const accessToken = await this.encrypter.encrypt({ sub : user.id })

    return { access_token : accessToken }
  }
}