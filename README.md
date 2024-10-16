### README for Backend (Zip Code API)

## Overview

This backend service is built using **Node.js** and **Express** to provide zip code information by querying an external API (Zippopotam). The service follows **Clean Architecture** principles, with separation of concerns across entities, use cases, strategies, and controllers.

### Key Features:

- Retrieve postal code data for different countries.
- Output includes city, state, and latitude/longitude.
- Supports multiple countries through a strategy pattern.
- Built-in CORS support for frontend communication.

## Requirements

- **Node.js** (v14 or higher)
- **TypeScript** (for typing and structure)
- **Express** (for routing)
- **Jest** (for unit testing)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:8000`.

## API Endpoints

### Get Zip Code Information

**GET** `/api/v1/zipcodes/:countryCode/:zipCode`

- **Description**: Retrieve information about the provided zip code, including city, state, and coordinates.

- **Parameters**:

  - `countryCode`: ISO country code (e.g., `US` for the United States).
  - `zipCode`: The postal code to retrieve information for.

- **Response** (Example):
  ```json
  {
    "post_code": "90210",
    "country": "United States",
    "country_abbreviation": "US",
    "places": [
      {
        "place_name": "Beverly Hills",
        "longitude": "-118.4065",
        "latitude": "34.0901",
        "state": "California",
        "state_abbreviation": "CA"
      }
    ]
  }
  ```

### CORS Support

The server allows requests from `http://localhost:5173` by default, so the frontend and backend can communicate seamlessly.

## Usage with Postman

1. Start the server:

   ```bash
   npm run dev
   ```

2. Open **Postman** and create a new GET request to:

   ```
   http://localhost:8000/api/v1/zipcodes/us/90210
   ```

3. Replace `us` and `90210` with the desired country code and zip code.

4. Send the request and check the response.

## Unit Testing

### Running the Tests

The backend uses **Jest** for unit testing. To run the tests:

```bash
npm run test
```

### Example Unit Test for Zip Code Service

In the `__tests__` folder, the test suite for `ZipCodeService` mocks the Zippopotam API to ensure that the service behaves correctly.

```typescript
import { ZipCodeService } from "../src/application/services/ZipCodeService";
import { ZipCodeContext } from "../src/application/services/ZipCodeContext";
import { ZippopotamStrategy } from "../src/application/strategies/ZippopotamStrategy";
import { ZipCode } from "../src/domain/entities/ZipCode";
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

    mockedAxios.get.mockResolvedValue({ data: mockApiResponse });

    const strategy = new ZippopotamStrategy();
    const context = new ZipCodeContext(strategy);
    const zipCodeService = new ZipCodeService(context);

    const result = await zipCodeService.getZipCodeInfo("us", "90210");

    expect(result).toBeInstanceOf(ZipCode);
    expect(result.postCode).toBe("90210");
    expect(result.country).toBe("United States");
    expect(result.places[0].placeName).toBe("Beverly Hills");
  });
});
```

### Structure

- **Entities**: `ZipCode.ts`, `Place.ts` define the core domain logic.
- **Services**: The `ZipCodeService.ts` handles the business logic for retrieving zip code information.
- **Use Cases**: The `GetZipCodeInfoUseCase.ts` executes the logic for fetching the data.
- **Controllers**: The `ZipCodeController.ts` handles HTTP requests.
- **Strategies**: The `ZippopotamStrategy.ts` handles external API logic.
- **Presenters**: The `ZipCodePresenter.ts` formats the data for the API response.
