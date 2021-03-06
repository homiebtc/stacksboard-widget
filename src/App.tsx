import React, { useState, useEffect, FC, useCallback } from 'react';
import './App.css';
import { useWindowDimensions } from './hooks';
import { Board } from './board';
import { BoardFraction } from './boardFraction';
import pRetry, { AbortError } from 'p-retry';

const STACKSBOARD_COLLECTION_ID =
  'SPGAKH27HF1T170QET72C727873H911BKNMPF8YB.stacks-board-slot';

export type SlotInfo = {
  nftId: number;
  imageUrl: string;
  imgixImageUrl: string;
  isGif: boolean;
};

export type BoardSizes = 'full' | 'half' | 'quarter' | null;

const slotsQuery = `
  query GetAllSlots($contractName: String!) {
    allSlots(contractName: $contractName) {
      nftId
      imageUrl
      imgixImageUrl
      isGif
    }
  }
    `;

type Props = {
  domElement: Element;
};

const App: FC<Props> = ({ domElement }) => {
  const contractId = domElement.getAttribute('stacksboard-widget-contract')!;
  let boardSize: BoardSizes = domElement.getAttribute(
    'stacksboard-widget-board-size',
  ) as BoardSizes;

  const doNotRotateImages =
    domElement.getAttribute('stacksboard-widget-rotate-images') === 'false';

  let maxWidth = 1152;
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { width } = useWindowDimensions();

  const isStacksboard = STACKSBOARD_COLLECTION_ID === contractId;

  const stacksboardBaseUrl = 'https://www.stacksboard.art/';
  const stacksboardUrl = isStacksboard
    ? stacksboardBaseUrl
    : `${stacksboardBaseUrl}collection/${contractId}`;

  if (width !== undefined && boardSize === null) {
    if (width <= 144 * 3) {
      boardSize = 'quarter';
    } else if (width <= 144 * 6) {
      boardSize = 'half';
    }
  }
  if (boardSize === 'quarter') {
    maxWidth = 1152 / 4;
  } else if (boardSize === 'half') {
    maxWidth = 1152 / 2;
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await window.fetch(
        'https://www.stacksboard.art/api/graphql',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            query: slotsQuery,
            variables: { contractName: contractId },
          }),
        },
      );
      const data = await response.json();
      if (data?.data?.allSlots) {
        setSlots(data.data.allSlots);
      } else {
        throw new AbortError(response.statusText);
      }
    } catch {
      throw new AbortError('error');
    }
  };

  useEffect(() => {
    pRetry(fetchData, { retries: 5 })
      .catch((e) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const className = isStacksboard
    ? 'stacksboard-placeholder'
    : 'collectionboard-placeholder';
  let content = null;
  if (!slots) {
    content = null;
  } else if (loading || slots.length === 0) {
    content = <div className={className}>Loading...</div>;
  } else if (error) {
    content = (
      <div className={className}>
        Something went wrong. Please reload the page.
      </div>
    );
  } else {
    content =
      boardSize === null || boardSize === 'full' ? (
        <Board allSlotInfo={slots} isStacksboard={isStacksboard} />
      ) : (
        <BoardFraction
          allSlotInfo={slots}
          boardSize={boardSize}
          doNotRotateImages={doNotRotateImages}
          isStacksboard={isStacksboard}
        />
      );
  }

  return (
    <div className="stacksboard-container">
      <a
        href={stacksboardUrl}
        target="_blank"
        style={{
          display: 'inline-block',
          width: '100%',
          maxWidth: `${maxWidth}px`,
        }}
      >
        {content}
      </a>
    </div>
  );
};

export default App;
