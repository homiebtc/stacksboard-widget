import React, { FC, useEffect, useState } from 'react';
import type { BoardSizes, SlotInfo } from './App';
import { Slot } from './slot';
import {
  COLLECTION_BOARD_CONFIG,
  HALF_COLLECTION_BOARD_CONFIG,
  HALF_STACKSBOARD_CONFIG,
  QUARTER_COLLECTION_BOARD_CONFIG,
  QUARTER_STACKSBOARD_CONFIG,
  STACKSBOARD_ROW_TO_TIER,
  TIERS,
} from './constants';
import { TierOptions } from './types';

function randomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

type Props = {
  allSlotInfo: SlotInfo[];
  boardSize: BoardSizes;
  doNotRotateImages: boolean;
  isStacksboard: boolean;
};

export const BoardFraction: FC<Props> = ({
  allSlotInfo,
  boardSize,
  doNotRotateImages,
  isStacksboard,
}) => {
  const [currBoardIndex, setCurrBoardIndex] = useState(0);

  const config = isStacksboard
    ? boardSize === 'half'
      ? HALF_STACKSBOARD_CONFIG
      : QUARTER_STACKSBOARD_CONFIG
    : boardSize === 'half'
    ? HALF_COLLECTION_BOARD_CONFIG
    : QUARTER_COLLECTION_BOARD_CONFIG;

  const height = isStacksboard ? 840 : 288;
  const maxWidth = boardSize === 'half' ? 576 : 288;

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
  if (!allSlotInfo) {
    return null;
  }

  return (
    <div className="stacksboard-board-container" style={{ height, maxWidth }}>
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
        (row, rowIndex) => {
          let rowEmpty = true;
          return (
            <div className="stacksboard-row-container" style={{ maxWidth }}>
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
                    isStacksboard={isStacksboard}
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
