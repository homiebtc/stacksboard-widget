import React, { FC, useEffect, useState } from 'react';
import type { BoardSizes, SlotInfo } from './App';
import { Slot } from './slot';
import { BOARD_CONFIG } from './board';

type Props = {
  allSlotInfo: SlotInfo[];
  boardSize: BoardSizes;
};

const HALF_1_BOARD_CONFIG = BOARD_CONFIG.map((row) =>
  row.slice(0, row.length / 2),
);

const HALF_2_BOARD_CONFIG = BOARD_CONFIG.map((row) =>
  row.slice(row.length / 2),
);

const QUARTER_1_BOARD_CONFIG = HALF_1_BOARD_CONFIG.map((row) =>
  row.slice(0, row.length / 2),
);

const QUARTER_2_BOARD_CONFIG = HALF_1_BOARD_CONFIG.map((row) =>
  row.slice(row.length / 2),
);

const QUARTER_3_BOARD_CONFIG = HALF_2_BOARD_CONFIG.map((row) =>
  row.slice(0, row.length / 2),
);

const QUARTER_4_BOARD_CONFIG = HALF_2_BOARD_CONFIG.map((row) =>
  row.slice(row.length / 2),
);

const HALF_BOARD_CONFIG = [HALF_1_BOARD_CONFIG, HALF_2_BOARD_CONFIG];

const QUARTER_BOARD_CONFIG = [
  QUARTER_1_BOARD_CONFIG,
  QUARTER_2_BOARD_CONFIG,
  QUARTER_3_BOARD_CONFIG,
  QUARTER_4_BOARD_CONFIG,
];

export const BoardFraction: FC<Props> = ({ allSlotInfo, boardSize }) => {
  const [currBoardIndex, setCurrBoardIndex] = useState(0);

  const config =
    boardSize === 'half' ? HALF_BOARD_CONFIG : QUARTER_BOARD_CONFIG;

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrBoardIndex((prev) => (prev + 1) % config.length),
      2000,
    );
    return () => clearTimeout(timer);
  }, [currBoardIndex, setCurrBoardIndex, config]);

  return (
    <div className="stacksboard-board-container">
      <div className="stacksboard-board-overlay" />
      <div className="stacksboard-board-middle">
        <img
          src="/logo-white.svg"
          style={{ height: '24px', width: '24px', marginRight: '0.25rem' }}
        />
        Stacksboard
      </div>
      {config[currBoardIndex < config.length ? currBoardIndex : 0].map(
        (row) => {
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
        },
      )}
    </div>
  );
};
