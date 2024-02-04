export abstract class HashGenerator {
  abstract encrypt(plain : string) : Promise<string>
}