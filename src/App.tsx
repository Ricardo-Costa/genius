import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { DEFAULT_BLOCKS_BY_LEVEL, DEFAULT_DECREASER_INTERVAL_PERCENT, DEFAULT_INTERVAL, DEFAULT_START_SCORE } from './app/configs';
import { activeBlock, deactiveBlock } from './app/utils/blocks.utils';
import './assets/styles.scss';

export type GameStatus = {
  theSequence: number[]
  sequence: number[]
  level: number
};

const App = () => {
  // STATES
  const [ gameStatus ] = useState<GameStatus>({
    theSequence: [ 3, 0, 1, 2 ],
    sequence: [],
    level: 1,
  });
  const [ blocks ] = useState<number>(gameStatus.level * DEFAULT_BLOCKS_BY_LEVEL);
  const [ timer, setTimer ] = useState<number>(DEFAULT_INTERVAL);
  const [ scores, setScores ] = useState<number>(DEFAULT_START_SCORE);

  // HANDLE CLICK
  const clickBlock = (event: MouseEvent, blockId: number) => {  
    gameStatus.sequence.push(Number(blockId));
  
    if (
      gameStatus.theSequence.length === gameStatus.sequence.length &&
      gameStatus.theSequence.every((value, index) => value === gameStatus.sequence[index])
    ) {
      alert("Parabéns!!");
      // document.location.reload();

      // restart game, with less timer
      setTimer(timer * DEFAULT_DECREASER_INTERVAL_PERCENT);
      // restart game
      restartGame();

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
        }} className="block"></div>
      )
    }
    return el;
  }

  let agente: any;

  const startGame = () => {
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
      
    }, timer);
  }

  const restartGame = () => {
    if (agente) clearInterval(agente);
    gameStatus.sequence = [];
    startGame();
  }

  useEffect(() => {
      // your post layout code (or 'effect') here.
      startGame();
    },
    // array of variables that can trigger an update if they change. Pass an
    // an empty array if you just want to run it once after component mounted. 
    []
  );

  // useEffect(() => {
  //   return () => {
  //     // Anything in here is fired on component unmount.
  //     if (agente) clearInterval(agente);
  //   }
  // }, [])

  return (
    <div id="main">
    <div id="header">{renderBlocks()}</div>
    <div id="footer">
      <div>Nickname: Player 1</div>
      <div>Scores: <span className='score-value'>{scores}</span></div>
    </div>
    </div>
  );
}

export default App;
