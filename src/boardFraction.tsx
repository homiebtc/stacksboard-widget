import React, { FC, useEffect, useState } from 'react';
import type { BoardSizes, SlotInfo } from './App';
import { Slot } from './slot';
import { COLLECTION_BOARD_CONFIG, TIERS } from './constants';
import { TierOptions } from './types';

function randomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

type Props = {
  allSlotInfo: SlotInfo[];
  boardSize: BoardSizes;
  doNotRotateImages: boolean;
};

const HALF_1_COLLECTION_BOARD_CONFIG = COLLECTION_BOARD_CONFIG.map((row) =>
  row.slice(0, row.length / 2),
);

const HALF_2_COLLECTION_BOARD_CONFIG = COLLECTION_BOARD_CONFIG.map((row) =>
  row.slice(row.length / 2),
);

const QUARTER_1_COLLECTION_BOARD_CONFIG = HALF_1_COLLECTION_BOARD_CONFIG.map(
  (row) => row.slice(0, row.length / 2),
);

const QUARTER_2_COLLECTION_BOARD_CONFIG = HALF_1_COLLECTION_BOARD_CONFIG.map(
  (row) => row.slice(row.length / 2),
);

const QUARTER_3_COLLECTION_BOARD_CONFIG = HALF_2_COLLECTION_BOARD_CONFIG.map(
  (row) => row.slice(0, row.length / 2),
);

const QUARTER_4_COLLECTION_BOARD_CONFIG = HALF_2_COLLECTION_BOARD_CONFIG.map(
  (row) => row.slice(row.length / 2),
);

const HALF_COLLECTION_BOARD_CONFIG = [
  HALF_1_COLLECTION_BOARD_CONFIG,
  HALF_2_COLLECTION_BOARD_CONFIG,
];

const QUARTER_COLLECTION_BOARD_CONFIG = [
  QUARTER_1_COLLECTION_BOARD_CONFIG,
  QUARTER_2_COLLECTION_BOARD_CONFIG,
  QUARTER_3_COLLECTION_BOARD_CONFIG,
  QUARTER_4_COLLECTION_BOARD_CONFIG,
];

export const BoardFraction: FC<Props> = ({
  allSlotInfo,
  boardSize,
  doNotRotateImages,
}) => {
  const [currBoardIndex, setCurrBoardIndex] = useState(0);

  const config =
    boardSize === 'half'
      ? HALF_COLLECTION_BOARD_CONFIG
      : QUARTER_COLLECTION_BOARD_CONFIG;

  useEffect(() => {
    if (!doNotRotateImages) {
      const timer = setTimeout(
        () => setCurrBoardIndex((prev) => (prev + 1) % config.length),
        3000,
      );
      return () => clearTimeout(timer);
    } else {
      setCurrBoardIndex(randomInt(config.length));
    }
  }, [currBoardIndex, setCurrBoardIndex, config, doNotRotateImages]);

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
                const { height, width } =
                  TIERS[
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
        },
      )}
    </div>
  );
};
