import React, { FC } from 'react';
import type { SlotInfo } from './App';
import { Slot } from './slot';
import { TierOptions, TIERS } from './types';

type Props = {
  allSlotInfo: SlotInfo[];
};

export const BOARD_CONFIG = [
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

const ROW_TO_TIER = [
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

export const Stacksboard: FC<Props> = ({ allSlotInfo }) => {
  return (
    // const boardWidth = 1152 + 48;
    // const boardHeight = 872 + 48;
    <div className="stacksboard-board-container" style={{ height: 840 }}>
      <div className="stacksboard-board-overlay" />
      <div className="stacksboard-board-middle">
        <img
          src="https://www.stacksboard.art/logo-white.svg"
          style={{ height: '24px', width: '24px', marginRight: '0.25rem' }}
          alt=""
        />
        Stacksboard
      </div>
      {BOARD_CONFIG.map((row, rowIndex) => {
        let rowEmpty = true;
        console.log(ROW_TO_TIER[rowIndex]);
        return (
          <div className="stacksboard-row-container">
            {row.map((nftId, i) => {
              const slot = allSlotInfo.find((s) => s.nftId === nftId);
              if (slot) {
                rowEmpty = false;
              }
              const { height, width } = TIERS[ROW_TO_TIER[rowIndex]];
              return (
                <Slot
                  slotInfo={slot}
                  height={height}
                  width={width}
                  rowEmpty={rowEmpty && i === row.length - 1}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
