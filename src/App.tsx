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
  const boardSize: BoardSizes = domElement.getAttribute(
    'stacksboard-board-size',
  ) as BoardSizes;
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const fetchSlots = async (contractId: string) => {
      console.log('contractId', contractId);
      const response = await window.fetch(
        // 'https://www.stacksboard.art/api/graphql',
        'http://localhost:3000/api/graphql',
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
      const { data, errors } = await response.json();
      console.log('data', data);
      console.log('errors', errors);
      if (response.ok) {
        setSlots(data?.allSlots);
      } else {
        // handle the graphql errors
        //   const error = new Error(
        //     errors?.map((e: any) => e.message).join('\n') ?? 'unknown',
        //   );
        //   return Promise.reject(error);
        setError(true);
      }
      setLoading(false);
    };
    fetchSlots(contractId);
    setLoading(true);
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
