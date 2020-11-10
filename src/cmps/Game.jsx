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
  //Turns managment
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [spell, setSpell] = useState({
    type: fireballStart,
    left: '200px',
    opacity: '0'
  })
  //
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

    }
  }, [isPlayerTurn])

  //Keys managment
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
  async function animatePlayerAtt() {
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
    //Player attack animation
    await _timeout(400)
    setPlayer(pervState => {
      return {
        ...pervState,
        gif: playerAtt,
      }
    })
    //Enemy hit
    await _timeout(300)
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyHit
      }
    })

    //Player move back
    await _timeout(500)
    setPlayer(pervState => {
      return {
        ...pervState,
        gif: playerIdle,
        marginLeft: '0',
        //on player return to initial: start / center / end
        // alignSelf: 'center'
      }
    })
    //Enemy change to idle
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyIdle
      }
    })
    //Make enemy turn
    await _timeout(1500)
    animateEnemy()

  }

  //Player spell
  async function animatePlayerSpell() {
    //Send spell
    setSpell(pervState => {
      return {
        ...pervState,
        left: 'calc(100% - 200px)',
        opacity: '1'
      }
    })
    //Enemy hit
    await _timeout(800)
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyHit
      }
    })
    //Spell explosion
    setSpell(pervState => {
      return {
        ...pervState,
        type: fireballEnd
      }
    })

    //Hide spell
    await _timeout(300)
    setSpell(pervState => {
      return {
        ...pervState,
        opacity: '0'
      }
    })
    //Enemy change to idle
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyIdle
      }
    })

    //Take spell back
    await _timeout(1000)
    setSpell(pervState => {
      return {
        ...pervState,
        left: '200px',
        type: fireballStart
      }
    })
    //Make enemy turn
    await _timeout(300)
    animateEnemy()
  }

  async function animateEnemy() {
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
    await _timeout(400)
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyAtt,

      }
    })
    //Player hit
    await _timeout(300)
    setPlayer(pervState => {
      return {
        ...pervState,
        gif: playerHit
      }
    })


    //Move back
    await _timeout(300)
    setEnemy(pervState => {
      return {
        ...pervState,
        gif: enemyIdle,
        marginRight: '0',
        //on enemy return to initial: start / center / end
        // alignSelf: 'center'

      }
    })
    //Player change to idle
    setPlayer(pervState => {
      return {
        ...pervState,
        gif: playerIdle
      }
    })
    //Player's turn
    await _timeout(400)
    setIsPlayerTurn(true)
  }

  //Select enemy
  function onSelect() {
    setEnemy(pervState => {
      return {
        ...pervState,
        isSelected: true
      }
    })
  }

  function _timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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