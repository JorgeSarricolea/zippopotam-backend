import { Request, Response } from "express";
import { GetZipCodeInfoUseCase } from "../../application/use-cases/GetZipCodeInfoUseCase.ts";
import { ZipCodePresenter } from "../presenters/ZipCodePresenter.ts";

export class ZipCodeController {
  constructor(private readonly getZipCodeInfoUseCase: GetZipCodeInfoUseCase) {}

  async getZipCodeInfo(req: Request, res: Response): Promise<void> {
    const { countryCode, zipCode } = req.params;
    try {
      const zipCodeInfo = await this.getZipCodeInfoUseCase.execute(
        countryCode,
        zipCode
      );
      res.json(ZipCodePresenter.toApiResponse(zipCodeInfo));
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  }
}
