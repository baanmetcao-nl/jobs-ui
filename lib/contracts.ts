export const ALLOWED_CONTRACTS = ["temporary", "permanent"] as const;

export type Contract = (typeof ALLOWED_CONTRACTS)[number];
