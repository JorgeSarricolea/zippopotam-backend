import { ZipCode } from "../entities/ZipCode.ts";

export interface ZipCodeRepository {
  getZipCodeInfo(countryCode: string, zipCode: string): Promise<ZipCode>;
}
