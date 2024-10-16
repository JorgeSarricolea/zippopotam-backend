import { ZipCode } from "../../domain/entities/ZipCode.ts";
import { Place } from "../../domain/entities/Place.ts";

export class ZipCodeFactory {
  static createFromApiResponse(response: any): ZipCode {
    const places = response.places.map((place: any) => {
      return new Place(
        place["place name"],
        place.longitude,
        place.latitude,
        place.state,
        place["state abbreviation"]
      );
    });

    return new ZipCode(
      response["post code"],
      response.country,
      response["country abbreviation"],
      places
    );
  }
}
