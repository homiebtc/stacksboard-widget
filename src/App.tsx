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
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { width } = useWindowDimensions();

  if (width !== undefined && boardSize === null) {
    if (width <= 144 * 3) boardSize = 'quarter';
    else if (width <= 144 * 6) boardSize = 'half';
  }

  useEffect(() => {
    setLoading(true);
    window
      .fetch('http://localhost:3000/api/graphql', {
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
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Something went wrong. Please reload the page.</div>;
  } else {
    content =
      boardSize === null || boardSize === 'full' ? (
        <Board allSlotInfo={slots} />
      ) : (
        <BoardFraction allSlotInfo={slots} boardSize={boardSize} />
      );
  }
  return <div className="stacksboard-container">{content}</div>;
};

export default App;
