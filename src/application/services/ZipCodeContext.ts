import { ZipCodeStrategy } from "../strategies/ZipCodeStrategy.ts";
import { ZipCode } from "../../domain/entities/ZipCode.ts";

export class ZipCodeContext {
  private strategy: ZipCodeStrategy;

  constructor(strategy: ZipCodeStrategy) {
    this.strategy = strategy;
  }

  async executeStrategy(
    countryCode: string,
    zipCode: string
  ): Promise<ZipCode> {
    return await this.strategy.getZipCodeInfo(countryCode, zipCode);
  }

  setStrategy(strategy: ZipCodeStrategy) {
    this.strategy = strategy;
  }
}
