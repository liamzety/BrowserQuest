import React, { useEffect, useState } from 'react';
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
//Cmps
import { Enemy } from './Enemy';
import { Player } from './Player';
import { ActionsBar } from './ActionsBar';
//Spells
import fireballStart from '../assets/images/firball.gif'
import fireballEnd from '../assets/images/fireball-end.gif'


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

  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [spell, setSpell] = useState({
    type: fireballStart,
    left: '200px',
    opacity: '0'
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

    }
  }, [isPlayerTurn])


  function handleKeyDown(ev) {
    setIsPlayerTurn(false)
    if (!isPlayerTurn) return

    switch (ev.key) {
      case '1':
        animatePlayerAtt()
        break;
      case '2':
        animatePlayerSpell()
        break;
      case '3':

        break;
      default:
        break;
    }

  }

  //Active animation
  function animatePlayerAtt() {
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
      }, 300);
    }, 700);
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

  function animatePlayerSpell() {
    //send spell
    setSpell(pervState => {
      return {
        ...pervState,
        left: 'calc(100% - 200px)',
        opacity: '1'
      }
    })
    //enemy hit
    setTimeout(() => {
      setEnemy(pervState => {
        return {
          ...pervState,
          gif: enemyHit
        }
      })
      //spell explosion
      setSpell(pervState => {
        return {
          ...pervState,
          type: fireballEnd
        }
      })
    }, 800);

    //hide spell
    setTimeout(() => {
      setSpell(pervState => {
        return {
          ...pervState,
          opacity: '0'
        }
      })
      setEnemy(pervState => {
        return {
          ...pervState,
          gif: enemyIdle
        }
      })
    }, 1500);
    //take spell back
    setTimeout(() => {
      setSpell(pervState => {
        return {
          ...pervState,
          left: '200px',
          type: fireballStart
        }
      })
    }, 2300);
    //animate enemy 
    setTimeout(() => {
      animateEnemy()
    }, 3300);
  }

  function animateEnemy() {
    //Move to position
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyMove,
        marginRight: 'calc(100% - 500px)',
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
      setTimeout(() => {
        setPlayer(pervState => {
          return {
            ...pervState,
            gif: playerHit
          }
        })
      }, 300);


    }, 700);
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
    setTimeout(() => {
      setIsPlayerTurn(true)
      console.log('go!',)
    }, 2000);

  }

  function onSelect() {
    setEnemy(pervState => {
      return {
        ...pervState,
        isSelected: true
      }
    })
  }

  return (
    <section style={{ backgroundImage: bgStyle.backgroundImage }}
      className="game">
      <div className="zone-container flex align-center">
        <div className="chars-container flex space-between relative w100">
          {/* player */}
          <Player char={player} />
          {/* enemy */}
          <Enemy onSelect={onSelect} char={enemy} />
          <img className="spell absolute" src={spell.type}
            style={{ opacity: spell.opacity, left: spell.left }} alt="" />
        </div>
      </div>
      <ActionsBar animatePlayerAtt={animatePlayerAtt} />
    </section>
  );
}