import React, { useState, useEffect, FC } from 'react';
import logo from './logo.svg';
import './App.css';
import { useWindowDimensions } from './hooks';
import { Board } from './board';
import { HalfBoard } from './halfBoard';

export type SlotInfo = {
  id: string;
  contractName: string;
  nftId: number;
  forSale: boolean;
  minted: boolean;
  price: number;
  imageUrl: string;
  ownerName: string;
  ownerUri: string;
  description: string;
  ownerAddress: string;
  twitterHandle: string;
  instagramHandle: string;
  discordUri: string;
  youtubeUri: string;
  telegramUri: string;
  baseNftId: number;
};

const slotsQuery = `
  query GetAllSlots($contractName: String!) {
    allSlots(contractName: $contractName) {
      id
      contractName
      nftId
      forSale
      minted
      price
      imageUrl
      ownerName
      ownerUri
      description
      ownerAddress
      twitterHandle
      instagramHandle
      discordUri
      youtubeUri
      telegramUri
      baseNftId
    }
  }
    `;

type Props = {
  domElement: Element;
};

const App: FC<Props> = ({ domElement }) => {
  const contractId = domElement.getAttribute('stacksboard-widget-contract')!;
  const isHalfBoard = domElement.getAttribute('stacksboard-half-size');
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
    content = !!isHalfBoard ? (
      <HalfBoard allSlotInfo={slots} />
    ) : (
      <Board allSlotInfo={slots} />
    );
  }
  return <div className="stacksboard-container">{content}</div>;
};

export default App;
