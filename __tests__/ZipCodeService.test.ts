import { ZipCodeService } from "../src/application/services/ZipCodeService.ts";
import { ZipCodeContext } from "../src/application/services/ZipCodeContext.ts";
import { ZippopotamStrategy } from "../src/application/strategies/ZippopotamStrategy.ts";
import { ZipCode } from "../src/domain/entities/ZipCode.ts";
import axios from "axios";

// Mock axios so it doesn't make a real API call
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ZipCodeService", () => {
  it("should return the correct postal code information", async () => {
    // Mock Zippopotam API response
    const mockApiResponse = {
      "post code": "90210",
      country: "United States",
      "country abbreviation": "US",
      places: [
        {
          "place name": "Beverly Hills",
          longitude: "-118.4065",
          latitude: "34.0901",
          state: "California",
          "state abbreviation": "CA",
        },
      ],
    };

    // Set up the mock to return the simulated data
    mockedAxios.get.mockResolvedValue({ data: mockApiResponse });

    // Set up the strategy context and service
    const strategy = new ZippopotamStrategy();
    const context = new ZipCodeContext(strategy);
    const zipCodeService = new ZipCodeService(context);

    // Call the service with the country code and postal code
    const result = await zipCodeService.getZipCodeInfo("us", "90210");

    // Verify that the result matches the expectations
    expect(result).toBeInstanceOf(ZipCode);
    expect(result.postCode).toBe("90210");
    expect(result.country).toBe("United States");
    expect(result.places[0].placeName).toBe("Beverly Hills");
    expect(result.places[0].state).toBe("California");
  });
});
