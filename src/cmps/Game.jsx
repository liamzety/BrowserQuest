import React, { useState } from 'react';
//PLAYER ANIMATIONS
import playerIdle from '../assets/images/king-idle.gif'
import playerHit from '../assets/images/king-hit.gif'
import playerAtt from '../assets/images/king-att1.gif'
import playerMove from '../assets/images/king-move.gif'
//ENEMY ANIMATIONS
import enemyIdle from '../assets/images/wizard-idle.gif'
import enemyHit from '../assets/images/wizard-hit.gif'
import enemyAtt from '../assets/images/wizard-att1.gif'
import enemyMove from '../assets/images/wizard-move.gif'
//BG
import bg from '../assets/images/bg-dark-forest.png'
//Data
import charData from '../charData.json'
import { Enemy } from './Enemy';
import { Player } from './Player';

export function Game() {
  //Characters and BG
  const [player, setPlayer] = useState({
    ...charData.player,
    gif: playerIdle,
    marginLeft: '',
    alignSelf: 'center'
  })
  const [enemy, setEnemy] = useState({
    ...charData.wizard,
    gif: enemyIdle,
    marginRight: '',
    alignSelf: 'center'
  })
  const bgStyle = {
    backgroundImage: `url(${bg})`,
  }

  //Active animation
  function animateAttack() {
    //Move Player to position
    setPlayer(pervState => {
      return {
        ...pervState,
        gif: playerMove,
        marginLeft: 'calc(100% - 500px)',
        //on selected target choose start / center / end
        // alignSelf: 'start'
      }
    })
    //Attack animation
    setTimeout(() => {
      setPlayer(pervState => {
        return {
          ...pervState,
          gif: playerAtt,
        }
      })
      setTimeout(() => {
        setEnemy(pervState => {
          return {
            ...pervState,
            gif: enemyHit
          }
        })
      }, 100);
    }, 1000);
    //Move back
    setTimeout(() => {
      setPlayer(pervState => {
        return {
          ...pervState,
          gif: playerIdle,
          marginLeft: '0',
          //on player return to initial: start / center / end
          // alignSelf: 'center'
        }
      })

      setEnemy(pervState => {
        return {
          ...pervState,
          gif: enemyIdle
        }
      })
    }, 1500);
    setTimeout(() => {
      animateEnemy()
    }, 3000);
  }


  function animateEnemy() {
    //Move to position
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyMove,
        marginRight: 'calc(100% - 500px)'
        //find lowest hp and attack change: start / center / end
        //alignSelf: 'start'
      }
    })
    //Attack animation
    setTimeout(() => {
      setEnemy(pervState => {
        return {
          ...pervState,
          gif: enemyAtt,

        }
      })
      setPlayer(pervState => {
        return {
          ...pervState,
          gif: playerHit
        }
      })

    }, 1000);
    //Move back
    setTimeout(() => {
      setEnemy(pervState => {
        return {
          ...pervState,
          gif: enemyIdle,
          marginRight: '0',
          //on enemy return to initial: start / center / end
          // alignSelf: 'center'

        }
      })
      setPlayer(pervState => {
        return {
          ...pervState,
          gif: playerIdle
        }
      })

    }, 1500);
  }

  return (
    <section style={{ backgroundImage: bgStyle.backgroundImage }}
      className="game">
      <div className="zone-container flex align-center">
        <div className="char-container flex space-between w100">
          {/* player */}
          <Player char={player} />
          {/* enemy */}
          <Enemy char={enemy} />
        </div>
      </div>
      <button className="absolute" onClick={animateAttack}>attack</button>
    </section>
  );
}