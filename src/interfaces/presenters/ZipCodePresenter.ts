import { ZipCode } from "../../domain/entities/ZipCode.ts";

export class ZipCodePresenter {
  static toApiResponse(zipCode: ZipCode): any {
    return {
      post_code: zipCode.postCode,
      country: zipCode.country,
      country_abbreviation: zipCode.countryAbbreviation,
      places: zipCode.places.map((place) => ({
        place_name: place.placeName,
        longitude: place.longitude,
        latitude: place.latitude,
        state: place.state,
        state_abbreviation: place.stateAbbreviation,
      })),
    };
  }
}
