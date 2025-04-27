import React, { ReactElement, useEffect, useState } from 'react';
import {
  DEFAULT_BLOCKS_BY_LEVEL,
  DEFAULT_DECREASER_INTERVAL_PERCENT,
  DEFAULT_INCREASE_SCORE,
  DEFAULT_INTERVAL,
  DEFAULT_START_SCORE,
  DEFAULT_TIMER_CONGRATS
} from './app/configs';
import { activeBlock, deactiveBlock } from './app/utils/blocks.utils';
import { GameStatus } from './app/types/game-status.type';
import { genereteInitialStatus } from './app/utils/game-status.utils';
import { Block } from './app/components/Block';
import { Footer } from './app/components/Footer';
import { Congrats } from './app/components/Congrats';
import './assets/styles.scss';
import 'animate.css';

const App = () => {
  const [ gameStatus ] = useState<GameStatus>(genereteInitialStatus());
  const [ blocks ] = useState<number>(gameStatus.level * DEFAULT_BLOCKS_BY_LEVEL);
  const [ timer, setTimer ] = useState<number>(DEFAULT_INTERVAL);
  const [ showCongrats, setShowCongrats ] = useState<boolean>(false);
  const [ scores, setScores ] = useState<number>(DEFAULT_START_SCORE);

  const clickBlock = (blockId: number) => {
    gameStatus.sequence.push(Number(blockId));

    if (
      gameStatus.theSequence.length === gameStatus.sequence.length &&
      gameStatus.theSequence.every((value, index) => value === gameStatus.sequence[index])
    ) {
      setScores( scores + DEFAULT_INCREASE_SCORE + ( DEFAULT_INTERVAL - parseInt(String(timer))));
      // show congrats
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), DEFAULT_TIMER_CONGRATS);
      // restart game, with less timer
      setTimer(timer * DEFAULT_DECREASER_INTERVAL_PERCENT);
      // restart game
      restartGame();
    } else if (gameStatus.theSequence.length === gameStatus.sequence.length) {
      alert("Oh nooo!! :[");
      document.location.reload();
    }
  };

  const renderBlocks = () => {
    const el: ReactElement[] | null = [];
    for (let block=0; block < blocks; block++) {
      el.push(<Block key={block} block={block} clickBlock={clickBlock}/>)
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
    // clear options
    gameStatus.sequence = [];
    // shuffle items
    gameStatus.theSequence = gameStatus.theSequence.sort(() => .5 - Math.random());
    // start again
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

  useEffect(() => {
    (window as any).__LEAD_ANALYTICS_PROJECT_ID__ = "680e4868ed0f88a78dac307b";

    const script = document.createElement('script');
    script.src = 'https://cdn.leadanalytics.click/api/tracker';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Congrats show={showCongrats} />
      <div id="main">
        <div id="title"><span>GENIUS</span></div>
        <div id="header">{renderBlocks()}</div>
        <Footer scores={scores} />
      </div>
    </div>
  );
}

export default App;
