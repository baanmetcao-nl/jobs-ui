export const locations = [
  "amsterdam",
  "rotterdam",
  "utrecht",
  "den-haag",
  "eindhoven",
  "groningen",
  "tilburg",
];

export const locationMap: Record<string, string> = {
  amsterdam: "Amsterdam",
  rotterdam: "Rotterdam",
  utrecht: "Utrecht",
  "den-haag": "Den Haag",
  eindhoven: "Eindhoven",
  groningen: "Groningen",
  tilburg: "Tilburg",
};

export function getLocationName(slug: string) {
  return locationMap[slug] ?? slug;
}
