import React, { FC, useState } from 'react';
import type { SlotInfo } from './App';

type Props = {
  slotInfo?: SlotInfo;
  height: number;
  width: number;
  rowEmpty: boolean;
  isStacksboard: boolean;
};

export const Slot: FC<Props> = ({
  slotInfo,
  height,
  width,
  rowEmpty,
  isStacksboard,
}) => {
  const [triedCdn, setTriedCdn] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

  let imageUrl = slotInfo?.imageUrl;
  if (
    !slotInfo?.isGif &&
    !slotInfo.imageUrl.includes('.gif') &&
    !triedCdn &&
    slotInfo.imgixImageUrl &&
    isStacksboard
  ) {
    imageUrl = slotInfo?.imgixImageUrl;
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
      <img
        className="stacksboard-slot-img"
        src={imageUrl}
        // src={slotInfo?.imageUrl}
        onError={() => {
          if (!triedCdn) {
            setTriedCdn(true);
          }
        }}
        alt=""
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
};
