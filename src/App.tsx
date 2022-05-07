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
    theSequence: [ 3, 6, 1, 10 ],
    sequence: [],
    level: 1,
  });
  const [ blocks, setBlocks ] = useState<number>(gameStatus.level * DEFAULT_BLOCKS_BY_LEVEL);

  // HANDLE CLICK
  const clickBlock = (event: MouseEvent, blockId: number) => {
    console.log(event, blockId);
  
    gameStatus.sequence.unshift(Number(blockId));
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
          key={block}
          onClick={(e: MouseEvent) => {
          e.preventDefault();
          clickBlock(e, block);
        }} className="block">
          <div className='block-cover'></div>
        </div>
      )
    }
    return el;
  }

  const blockElements: HTMLCollectionOf<Element> | null = document.getElementsByClassName("block");

  useEffect(() => {
      // your post layout code (or 'effect') here.
      function setBlockBackGroundColor(blockId: number, color: string) {
        if (blockElements)
          // @ts-ignore: Unreachable code error
          blockElements.item(blockId).style.backgroundColor = color;
      }
          
      function activeBlock(blockId: number | undefined) {
        setBlockBackGroundColor(blockId || 0, DEFAULT_BG_ACTIVE_COLOR);
      }
          
      function deactiveBlock(blockId: number | undefined) {
        setBlockBackGroundColor(blockId || 0, DEFAULT_BG_DEACTIVE_COLOR);
      }
      
      let oldItem: number | undefined = undefined;
      const sequence = [ ...gameStatus.theSequence ];
      
      const agente = setInterval(() => {
      
        if (sequence.length) {
          if (!oldItem) {
            oldItem = sequence.pop();
          } else {
            deactiveBlock(oldItem);
            oldItem = sequence.pop();
          }
          activeBlock(oldItem);
        } else if (oldItem) {
          deactiveBlock(oldItem);
        }
        
      }, DEFAULT_INTERVAL);
    },
    // array of variables that can trigger an update if they change. Pass an
    // an empty array if you just want to run it once after component mounted. 
    []
  );

  return (
    <div id="main">
    <div id="header">{renderBlocks()}</div>
    <div id="footer"></div>
    </div>
  );
}

export default App;
