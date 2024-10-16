import { ZipCodeContext } from "./ZipCodeContext.ts";
import { ZipCodeRepository } from "../../domain/repositories/ZipCodeRepository.ts";
import { ZipCode } from "../../domain/entities/ZipCode.ts";

export class ZipCodeService implements ZipCodeRepository {
  constructor(private readonly context: ZipCodeContext) {}

  async getZipCodeInfo(countryCode: string, zipCode: string): Promise<ZipCode> {
    return this.context.executeStrategy(countryCode, zipCode);
  }
}
