import React, { FC } from 'react';
import type { SlotInfo } from './App';

type Props = {
  slotInfo?: SlotInfo;
  isXL: boolean;
};

export const Slot: FC<Props> = ({ slotInfo, isXL }) => {
  const height = isXL ? `144px` : `72px`;
  const width = height;

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
      />
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
      <img className="stacksboard-slot-img" src={slotInfo?.imageUrl} />
    </div>
  );
};
