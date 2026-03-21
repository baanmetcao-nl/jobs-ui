import { locations, locationMap, getLocationName } from "@/lib/locations";

describe("locations", () => {
  it("exports the expected city slugs", () => {
    expect(locations).toEqual(
      expect.arrayContaining([
        "amsterdam",
        "rotterdam",
        "utrecht",
        "den-haag",
        "eindhoven",
        "groningen",
        "tilburg",
      ]),
    );
    expect(locations).toHaveLength(7);
  });
});

describe("locationMap", () => {
  it("maps every slug in locations to a display name", () => {
    for (const slug of locations) {
      expect(locationMap[slug]).toBeDefined();
      expect(typeof locationMap[slug]).toBe("string");
    }
  });

  it("maps den-haag correctly", () => {
    expect(locationMap["den-haag"]).toBe("Den Haag");
  });

  it("maps single-word cities with a capital first letter", () => {
    expect(locationMap["amsterdam"]).toBe("Amsterdam");
    expect(locationMap["rotterdam"]).toBe("Rotterdam");
    expect(locationMap["utrecht"]).toBe("Utrecht");
    expect(locationMap["eindhoven"]).toBe("Eindhoven");
    expect(locationMap["groningen"]).toBe("Groningen");
    expect(locationMap["tilburg"]).toBe("Tilburg");
  });
});

describe("getLocationName", () => {
  it("returns the display name for a known slug", () => {
    expect(getLocationName("amsterdam")).toBe("Amsterdam");
    expect(getLocationName("den-haag")).toBe("Den Haag");
  });

  it("falls back to the slug itself for unknown values", () => {
    expect(getLocationName("unknown-city")).toBe("unknown-city");
    expect(getLocationName("")).toBe("");
  });
});
