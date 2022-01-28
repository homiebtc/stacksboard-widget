import React, { FC } from 'react';
import type { SlotInfo } from './App';
import { Slot } from './slot';
import { TierOptions, TIERS } from './types';

type Props = {
  allSlotInfo: SlotInfo[];
};

export const BOARD_CONFIG = [
  Array.from({ length: 8 }).map((_, index) => index + 1),
  Array.from({ length: 16 }).map((_, index) => index + 9),
  Array.from({ length: 16 }).map((_, index) => index + 25),
];

export const Board: FC<Props> = ({ allSlotInfo }) => {
  return (
    <div className="stacksboard-board-container" style={{ height: 288 }}>
      <div className="stacksboard-board-overlay" />
      <div className="stacksboard-board-middle">
        <img
          src="https://www.stacksboard.art/logo-white.svg"
          style={{ height: '24px', width: '24px', marginRight: '0.25rem' }}
          alt=""
        />
        Stacksboard
      </div>
      {BOARD_CONFIG.map((row) => {
        let rowEmpty = true;
        return (
          <div className="stacksboard-row-container">
            {row.map((nftId, i) => {
              const slot = allSlotInfo.find((s) => s.nftId === nftId);
              if (slot) {
                rowEmpty = false;
              }
              const { height, width } =
                TIERS[
                  nftId <= 8 ? TierOptions.Collectionxl : TierOptions.Collection
                ];
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
