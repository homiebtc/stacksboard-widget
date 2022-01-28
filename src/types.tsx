export enum TierOptions {
  Bronze = 'BRONZE',
  Collection = 'COLLECTION',
  Collectionxl = 'COLLECTIONXL',
  Diamond = 'DIAMOND',
  Emerald = 'EMERALD',
  Gold = 'GOLD',
  Platinum = 'PLATINUM',
  Sapphire = 'SAPPHIRE',
  Silver = 'SILVER',
}

export type TierInfo = {
  width: number;
  height: number;
};

export const TIERS: Record<TierOptions, TierInfo> = {
  BRONZE: { width: 24, height: 24 },
  SILVER: { width: 48, height: 48 },
  GOLD: { width: 72, height: 48 },
  PLATINUM: { width: 128, height: 72 },
  EMERALD: { width: 144, height: 72 },
  SAPPHIRE: { width: 288, height: 72 },
  DIAMOND: { width: 96, height: 96 },
  COLLECTION: { width: 72, height: 72 },
  COLLECTIONXL: {
    width: 144,
    height: 144,
  },
};
