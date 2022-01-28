import { TierOptions, TierInfo } from './types';

export const COLLECTION_BOARD_CONFIG = [
  Array.from({ length: 8 }).map((_, index) => index + 1),
  Array.from({ length: 16 }).map((_, index) => index + 9),
  Array.from({ length: 16 }).map((_, index) => index + 25),
];

export const STACKSBOARD_CONFIG = [
  Array.from({ length: 12 }).map((_, index) => index),
  Array.from({ length: 4 }).map((_, index) => index + 12),
  Array.from({ length: 12 }).map((_, index) => index + 16),
  Array.from({ length: 8 }).map((_, index) => index + 28),
  Array.from({ length: 12 }).map((_, index) => index + 36),
  Array.from({ length: 9 }).map((_, index) => index + 48),
  Array.from({ length: 16 }).map((_, index) => index + 57),
  Array.from({ length: 16 }).map((_, index) => index + 73),
  Array.from({ length: 24 }).map((_, index) => index + 89),
  Array.from({ length: 24 }).map((_, index) => index + 113),
  Array.from({ length: 24 }).map((_, index) => index + 137),
  Array.from({ length: 48 }).map((_, index) => index + 161),
  Array.from({ length: 48 }).map((_, index) => index + 209),
  Array.from({ length: 48 }).map((_, index) => index + 257),
  Array.from({ length: 48 }).map((_, index) => index + 305),
];

export const STACKSBOARD_ROW_TO_TIER = [
  TierOptions.Diamond,
  TierOptions.Sapphire,
  TierOptions.Diamond,
  TierOptions.Emerald,
  TierOptions.Diamond,
  TierOptions.Platinum,
  TierOptions.Gold,
  TierOptions.Gold,
  TierOptions.Silver,
  TierOptions.Silver,
  TierOptions.Silver,
  TierOptions.Bronze,
  TierOptions.Bronze,
  TierOptions.Bronze,
  TierOptions.Bronze,
];

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
