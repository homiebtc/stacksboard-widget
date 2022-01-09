import React, { FC } from 'react';
import type { SlotInfo } from './App';
import { Slot } from './slot';

type Props = {
  allSlotInfo: SlotInfo[];
};

const boardConfig = [
  Array.from({ length: 8 }).map((_, index) => index + 1),
  Array.from({ length: 16 }).map((_, index) => index + 9),
  Array.from({ length: 16 }).map((_, index) => index + 25),
];

export const Board: FC<Props> = ({ allSlotInfo }) => {
  return (
    <div className="stacksboard-board-container">
      {boardConfig.map((row) => (
        <div className="stacksboard-row-container">
          {row.map((i) => {
            const slot = allSlotInfo.find((s) => s.nftId === i);
            return <Slot slotInfo={slot} isXL={i <= 8} />;
          })}
        </div>
      ))}
    </div>
  );
};
