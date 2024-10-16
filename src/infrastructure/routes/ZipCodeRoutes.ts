import { Router } from "express";
import { ZipCodeController } from "../../interfaces/controllers/ZipCodeController.ts";
import { ZipCodeService } from "../../application/services/ZipCodeService.ts";
import { GetZipCodeInfoUseCase } from "../../application/use-cases/GetZipCodeInfoUseCase.ts";
import { ZipCodeContext } from "../../application/services/ZipCodeContext.ts";
import { ZippopotamStrategy } from "../../application/strategies/ZippopotamStrategy.ts";

const router = Router();

// Initialize the context with the strategy
const zippopotamStrategy = new ZippopotamStrategy();
const context = new ZipCodeContext(zippopotamStrategy);

// Usa context to initialize the service and use case
const zipCodeService = new ZipCodeService(context);
const getZipCodeInfoUseCase = new GetZipCodeInfoUseCase(zipCodeService);
const zipCodeController = new ZipCodeController(getZipCodeInfoUseCase);

router.get("/:countryCode/:zipCode", (req, res) =>
  zipCodeController.getZipCodeInfo(req, res)
);

export default router;
