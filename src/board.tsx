import React, { FC } from 'react';
import type { SlotInfo } from './App';
import { Slot } from './slot';

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
    <div className="stacksboard-board-container">
      {BOARD_CONFIG.map((row) => {
        let rowEmpty = true;
        return (
          <div className="stacksboard-row-container">
            {row.map((nftId, i) => {
              const slot = allSlotInfo.find((s) => s.nftId === nftId);
              if (slot) {
                rowEmpty = false;
              }
              return (
                <Slot
                  slotInfo={slot}
                  isXL={nftId <= 8}
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
