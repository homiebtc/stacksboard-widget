import React, { useState, useEffect, FC } from 'react';
import logo from './logo.svg';
import './App.css';
import { useWindowDimensions } from './hooks';
import { Board } from './board';
import { BoardFraction } from './boardFraction';

export type SlotInfo = {
  nftId: number;
  imageUrl: string;
};

export type BoardSizes = 'full' | 'half' | 'quarter' | null;

const slotsQuery = `
  query GetAllSlots($contractName: String!) {
    allSlots(contractName: $contractName) {
      nftId
      imageUrl
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
  let maxWidth = 1152;
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { width } = useWindowDimensions();

  const stacksboardBaseUrl = 'https://www.stacksboard.art/';
  const stacksboardUrl = `${stacksboardBaseUrl}collection/${contractId}`;

  if (width !== undefined && boardSize === null) {
    if (width <= 144 * 3) {
      boardSize = 'quarter';
      maxWidth = 1152 / 4;
    } else if (width <= 144 * 6) {
      boardSize = 'half';
      maxWidth = 1152 / 2;
    }
  }

  useEffect(() => {
    setLoading(true);
    window
      .fetch('https://www.stacksboard.art/api/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          query: slotsQuery,
          variables: { contractName: contractId },
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSlots(data?.data?.allSlots);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  let content = null;
  if (loading) {
    content = <div className="stacksboard-placeholder">Loading...</div>;
  } else if (error) {
    content = (
      <div className="stacksboard-placeholder">
        Something went wrong. Please reload the page.
      </div>
    );
  } else {
    content =
      boardSize === null || boardSize === 'full' ? (
        <Board allSlotInfo={slots} />
      ) : (
        <BoardFraction allSlotInfo={slots} boardSize={boardSize} />
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
      {/* <div className="stacksboard-container-middle">Stacksboard</div> */}
    </div>
  );
};

export default App;
