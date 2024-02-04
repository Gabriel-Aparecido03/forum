import { RegisterUserUseCase } from "@/domain/forum/application/use-cases/register-user"
import { Controller, Post, HttpCode, Body } from "@nestjs/common"
import { z } from "zod"

const bodySchemaValidation = z.object({
  username: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().min(4)
})

@Controller('/session/register')
export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(@Body() requestBody) {
    const { email, password, username } = bodySchemaValidation.parse(requestBody)
    await this.registerUserUseCase.execute({ email, password, username })
  }
}