import { AuthenticateUserUseCase } from "@/domain/forum/application/use-cases/authenticate-user"
import { Controller, Post, HttpCode, Body } from "@nestjs/common"
import { z } from "zod"


const bodySchemaValidation = z.object({
  email : z.string().email(),
  password : z.string()
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/session/authenticate')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase : AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() requestBody : bodyType) {
    const { email ,password } = bodySchemaValidation.parse(requestBody)
    const result = await this.authenticateUserUseCase.execute({ email , password  })
    return result
  }
}