import { HashGenerator } from "src/domain/forum/application/cryptography/hash-generator";

export class InTextHashGenerator implements HashGenerator {
  async encrypt(plain: string): Promise<string> {
    return plain.concat('hashed')
  }
}