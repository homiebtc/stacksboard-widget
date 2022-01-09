import React, { FC, useEffect, useState } from 'react';
import type { SlotInfo } from './App';
import { Slot } from './slot';

type Props = {
  allSlotInfo: SlotInfo[];
};

const leftBoardConfig = [
  Array.from({ length: 8 })
    .map((_, index) => index + 1)
    .slice(0, 4),
  Array.from({ length: 16 })
    .map((_, index) => index + 9)
    .slice(0, 8),
  Array.from({ length: 16 })
    .map((_, index) => index + 25)
    .slice(0, 8),
];

const rightBoardConfig = [
  Array.from({ length: 8 })
    .map((_, index) => index + 1)
    .slice(4),
  Array.from({ length: 16 })
    .map((_, index) => index + 9)
    .slice(8),
  Array.from({ length: 16 })
    .map((_, index) => index + 25)
    .slice(8),
];

export const HalfBoard: FC<Props> = ({ allSlotInfo }) => {
  const [currentBoardConfig, setCurrentBoardConfig] =
    useState(rightBoardConfig);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setCurrentBoardConfig((prev) =>
          prev === leftBoardConfig ? rightBoardConfig : leftBoardConfig,
        ),
      1000,
    );
    return () => clearTimeout(timer);
  }, [currentBoardConfig, setCurrentBoardConfig]);

  return (
    <div className="stacksboard-board-container">
      {currentBoardConfig.map((row) => (
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
