import { HashComparer } from "src/domain/forum/application/cryptography/hash-comparer";

export class InTestHashComparer implements HashComparer {
  async comparer(plain: string, hash: string): Promise<boolean> {
    return plain.concat('hashed') === hash
  }
}