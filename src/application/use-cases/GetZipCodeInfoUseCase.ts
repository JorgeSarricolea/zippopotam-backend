import { ZipCodeRepository } from "../../domain/repositories/ZipCodeRepository.ts";
import { ZipCode } from "../../domain/entities/ZipCode.ts";

export class GetZipCodeInfoUseCase {
  constructor(private readonly zipCodeRepository: ZipCodeRepository) {}

  async execute(countryCode: string, zipCode: string): Promise<ZipCode> {
    return await this.zipCodeRepository.getZipCodeInfo(countryCode, zipCode);
  }
}
