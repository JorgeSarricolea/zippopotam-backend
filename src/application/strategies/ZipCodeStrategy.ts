import { ZipCode } from "../../domain/entities/ZipCode.ts";

export interface ZipCodeStrategy {
  getZipCodeInfo(countryCode: string, zipCode: string): Promise<ZipCode>;
}
