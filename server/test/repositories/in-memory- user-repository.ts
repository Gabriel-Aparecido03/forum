import { UserRepostiory } from "../../src/domain/forum/application/repositories/user-repository";
import { User } from "../../src/domain/forum/enterprise/entities/user";

export class InMemoryUserRepository implements UserRepostiory {

  public items: User[] = []


  async register(user: User): Promise<void> {
    this.items.push(user)
  }

  async delete(id: string): Promise<void> {
    const filtered = this.items.filter(item => item.id.toString() !== id)
    this.items = filtered
  }

  async update(user: User): Promise<void> {
    const index = this.items.findIndex(item => item.id.equals(user.id))
    this.items[index] = user
  }

  async getByUsername(username: string): Promise<User | null> {
    const item = this.items.find(item => item.username === username)
    return item ?? null
  }

  async getByEmail(email: string): Promise<User | null> {
    const item = this.items.find(item => item.email === email)
    return item ?? null
  }
  

  async getById(id: string): Promise<User | null> {
    const item = this.items.find(item => item.id.toString() === id)
    return item ?? null
  }
}