export const ALLOWED_CONTRACTS = [
  "freelance",
  "temporary",
  "permanent",
  "flex",
] as const;

export type Contract = (typeof ALLOWED_CONTRACTS)[number];
