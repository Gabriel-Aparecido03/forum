import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, HttpCode, Get, UseGuards } from "@nestjs/common"
import { z } from "zod"
import { UserPresenter } from "../../presenters/user-presenter"
import { MeUserUseCase } from "@/domain/forum/application/use-cases/me-user"

@Controller('/session/me')
export class MeUserController {
  constructor(private getUserById: MeUserUseCase) { }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async handle(@CurrentUser() { user }) {
    const result = await this.getUserById.execute({ id : user })
    return UserPresenter.toHTTP(result.user)
  }
}