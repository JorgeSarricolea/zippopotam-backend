import { ZipCodeStrategy } from "./ZipCodeStrategy.ts";
import { ZipCode } from "../../domain/entities/ZipCode.ts";
import { apiConfig } from "../../infrastructure/config/apiConfig.ts";
import axios from "axios";
import { ZipCodeFactory } from "../../adapters/factories/ZipCodeFactory.ts";

export class ZippopotamStrategy implements ZipCodeStrategy {
  async getZipCodeInfo(countryCode: string, zipCode: string): Promise<ZipCode> {
    const response = await axios.get(
      `${apiConfig.zippopotam.baseURL}/${countryCode}/${zipCode}`
    );
    return ZipCodeFactory.createFromApiResponse(response.data);
  }
}
