import { InvalidCredentialsError } from "@/domain/core/errors/invalid-credentials";
import { UserRepostiory } from "../repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { HashGenerator } from "../cryptography/hash-generator";
import { User } from "../../enterprise/entities/user";

interface RegisterUserUseCaseType {
  email: string
  password: string
  username: string
}

@Injectable()
export class RegisterUserUseCase {
  constructor(private usersRepository: UserRepostiory, private hashGenerator : HashGenerator) { }

  async execute({ email, password, username }: RegisterUserUseCaseType) {
    const repeatedEmail = await this.usersRepository.getByEmail(email)
    if(!repeatedEmail) throw new InvalidCredentialsError()

    const repeatedUsername = await this.usersRepository.getByUsername(username)
    if(!repeatedUsername) throw new InvalidCredentialsError()

    const hashedPassword = await this.hashGenerator.encrypt(password)

    const user = User.create({
      email,
      password : hashedPassword,
      username
    })

    await this.usersRepository.register(user)
  }
}