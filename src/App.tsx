import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { DEFAULT_BG_ACTIVE_COLOR, DEFAULT_BG_DEACTIVE_COLOR, DEFAULT_BLOCKS_BY_LEVEL, DEFAULT_INTERVAL } from './app/configs';
import './assets/styles.scss';

export type GameStatus = {
  theSequence: number[]
  sequence: number[]
  level: number
};

function App() {

  // STATES
  const [ gameStatus, setGameStatus ] = useState<GameStatus>({
    theSequence: [ 3, 0, 1, 2 ],
    sequence: [],
    level: 1,
  });
  const [ blocks, setBlocks ] = useState<number>(gameStatus.level * DEFAULT_BLOCKS_BY_LEVEL);

  // HANDLE CLICK
  const clickBlock = (event: MouseEvent, blockId: number) => {
    console.log(event, blockId);
  
    gameStatus.sequence.push(Number(blockId));
    console.log(gameStatus.sequence);
  
    if (
      gameStatus.theSequence.length === gameStatus.sequence.length &&
      gameStatus.theSequence.every((value, index) => value === gameStatus.sequence[index])
    ) {
      alert("Parabéns!!");
      document.location.reload();
    } else if (gameStatus.theSequence.length === gameStatus.sequence.length) {
      alert("Deu Ruim :[");
      document.location.reload();
    }
  };

  // MAIN RENDER BLOCKS
  const renderBlocks = () => {
    const el: ReactElement[] | null = [];
    for (let block=0; block < blocks; block++) {
      el.push(
        <div
          id={`block-ref-${block}`}
          key={block}
          onClick={(e: MouseEvent) => {
          e.preventDefault();
          clickBlock(e, block);
        }} className="block">
          <div className='block-cover'>{block}</div>
        </div>
      )
    }
    return el;
  }

  let agente: any;

  useEffect(() => {
      // your post layout code (or 'effect') here.
      function setBlockBackGroundColor(blockId: number, color: string) {
        const el = document.getElementById(`block-ref-${blockId}`);
        if (el) el.style.backgroundColor = color;
      }
          
      function activeBlock(blockId: number | undefined) {
        setBlockBackGroundColor(blockId || 0, DEFAULT_BG_ACTIVE_COLOR);
      }
          
      function deactiveBlock(blockId: number | undefined) {
        setBlockBackGroundColor(blockId || 0, DEFAULT_BG_DEACTIVE_COLOR);
      }
      
      let oldItem: number | undefined = undefined;
      const sequence = [ ...gameStatus.theSequence ];
      
      agente = setInterval(() => {
      
        if (sequence.length) {
          if (oldItem === undefined) {
            oldItem = sequence.shift();
          } else {
            deactiveBlock(oldItem);
            oldItem = sequence.shift();
          }
          activeBlock(oldItem);
        } else if (oldItem != undefined) {
          deactiveBlock(oldItem);
        }
        
      }, DEFAULT_INTERVAL);
    },
    // array of variables that can trigger an update if they change. Pass an
    // an empty array if you just want to run it once after component mounted. 
    []
  );

  useEffect(() => {
    return () => {
      // Anything in here is fired on component unmount.
      if (agente) clearInterval(agente);
    }
  }, [])

  return (
    <div id="main">
    <div id="header">{renderBlocks()}</div>
    <div id="footer"></div>
    </div>
  );
}

export default App;
