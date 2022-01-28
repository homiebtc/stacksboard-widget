import React, { FC } from 'react';
import type { SlotInfo } from './App';

type Props = {
  slotInfo?: SlotInfo;
  height: number;
  width: number;
  rowEmpty: boolean;
};

export const Slot: FC<Props> = ({ slotInfo, height, width, rowEmpty }) => {
  if (!slotInfo) {
    return (
      <div
        className="stacksboard-slot-container"
        style={{
          maxHeight: height,
          maxWidth: width,
          height: 'auto',
          backgroundColor: 'rgba(16, 185, 129, 1)',
        }}
      >
        {rowEmpty && (
          <img
            className="stacksboard-slot-img"
            style={{ opacity: 0 }}
            src={`https://via.placeholder.com/${height}x${width}`}
            alt=""
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="stacksboard-slot-container"
      style={{
        maxHeight: height,
        maxWidth: width,
        height: '100%',
      }}
    >
      <img className="stacksboard-slot-img" src={slotInfo?.imageUrl} alt="" />
    </div>
  );
};
