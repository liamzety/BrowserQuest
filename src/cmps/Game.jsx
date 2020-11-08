import React, { useEffect, useRef, useState } from 'react';
//Characters
import minSprite from '../assets/images/min-att.png'
import advSprite from '../assets/images/adv.png'
//BG
import bg from '../assets/images/bg-dark-forest.png'
//Data
import charData from '../charData.json'
import { Enemy, Minotaur } from './Enemy';
import { Adv, Player } from './Player';

export function Game() {
  //Characters and BG
  const [adv, setAdv] = useState({
    ...charData.player,
    backgroundImage: `url(${advSprite})`
  })
  const [mino, setMino] = useState({
    ...charData.minotaur,
    backgroundImage: `url(${minSprite})`
  })
  const bgStyle = {
    backgroundImage: `url(${bg})`,
  }

  //Idle animation
  let idle = useRef(null)
  useEffect(() => {
    idle.current = setInterval(() => {
      setAdv(pervState => {
        let newState = {
          ...pervState
        }
        newState.posX = pervState.posX === '2000px' ? '1800px' : '2000px'
        return newState
      })
    }, 1000)
    return () => {
      clearInterval(idle.current)
    }
  }, [])

  //Active animation
  function animate() {
    clearInterval(idle.current)
    setMino(pervState => pervState.posX === '200px' ? '300px' : '200px')
    setTimeout(() => {
      setMino(pervState => pervState.posX === '200px' ? '300px' : '200px')
      idle.current = setInterval(() => {
        setMino(pervState => pervState.posX === '200px' ? '300px' : '200px')
      }, 1000);
    }, 500);
  }


  return (
    <section style={{ backgroundImage: bgStyle.backgroundImage }}
      className="game">
      <div className="zone-container">
        <div className="char-container">
          {/* enemy */}
          <Enemy char={mino} />
          {/* player */}
          <Player char={adv} />
        </div>
      </div>
      <button onClick={animate}>move</button>
    </section>
  );
}