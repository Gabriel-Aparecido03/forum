import { User } from "@/domain/forum/enterprise/entities/user";

export class UserPresenter {
  static toHTTP(user : User) {
    return {
      id : user.id.toString(),
      username : user.username,
      email : user.email,
    }
  }
}