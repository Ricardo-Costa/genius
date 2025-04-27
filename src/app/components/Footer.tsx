import React from "react";
import ifImg from './../../assets/if.png';

export const Footer = ({ scores }: { scores: number }) => {
  const [activeAnimation, setActiveAnimation] = React.useState(false);

  const handleClick = () => {
    setActiveAnimation(true);
    setTimeout(() => {
      setActiveAnimation(false);
    }, 5000); // Duration of the animation
  };

  return (
    <div id="footer">
      <div className='part-left'>
        <img data-lead-track="dinosaur-clicked" src={ifImg} draggable="false" className={activeAnimation?'dinosaur-animated':''} onClick={handleClick} />
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