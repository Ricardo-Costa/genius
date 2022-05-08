import React from "react";
import ifImg from './../../assets/if.png';

export const Footer = ({ scores }: { scores: number }) => {
  return (
    <div id="footer">
      <div className='part-left'>
        <img src={ifImg} draggable="false" />
      </div>
      <div className='part-right'>
        <div className='animate__animated animate__headShake'>Nickname: Player T-Rex</div>
        <div className='animate__animated animate__pulse animate__infinite	infinite'>
          Scores: <span className='score-value'>{scores}</span>
        </div>
      </div>
    </div>
  )
}