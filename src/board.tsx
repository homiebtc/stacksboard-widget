import React, { FC } from 'react';
import type { SlotInfo } from './App';
import {
  COLLECTION_BOARD_CONFIG,
  STACKSBOARD_CONFIG,
  STACKSBOARD_ROW_TO_TIER,
  TIERS,
} from './constants';
import { Slot } from './slot';
import { TierOptions } from './types';

type Props = {
  allSlotInfo: SlotInfo[];
  isStacksboard: boolean;
};

export const Board: FC<Props> = ({ allSlotInfo, isStacksboard }) => {
  const config = isStacksboard ? STACKSBOARD_CONFIG : COLLECTION_BOARD_CONFIG;
  const height = isStacksboard ? 840 : 288;
  return (
    <div className="stacksboard-board-container" style={{ height }}>
      <div className="stacksboard-board-overlay" />
      <div className="stacksboard-board-middle">
        <img
          src="https://www.stacksboard.art/logo-white.svg"
          style={{ height: '24px', width: '24px', marginRight: '0.25rem' }}
          alt=""
        />
        Stacksboard
      </div>
      {config.map((row, rowIndex) => {
        let rowEmpty = true;
        return (
          <div className="stacksboard-row-container">
            {row.map((nftId, i) => {
              const slot = allSlotInfo.find((s) => s.nftId === nftId);
              if (slot) {
                rowEmpty = false;
              }
              const { height, width } = isStacksboard
                ? TIERS[STACKSBOARD_ROW_TO_TIER[rowIndex]]
                : TIERS[
                    nftId <= 8
                      ? TierOptions.Collectionxl
                      : TierOptions.Collection
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
