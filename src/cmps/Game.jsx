import React, { useEffect, useState } from 'react';
//PLAYER ANIMATIONS
import playerIdle from '../assets/images/king-idle.gif'
import playerHit from '../assets/images/king-hit.gif'
import playerAtt from '../assets/images/king-att1.gif'
import playerMove from '../assets/images/king-move.gif'
import playerDeath from '../assets/images/king-death.gif'
import playerDead from '../assets/images/king-dead.gif'
//ENEMY ANIMATIONS
import enemyIdle from '../assets/images/wizard-idle.gif'
import enemyHit from '../assets/images/wizard-hit.gif'
import enemyAtt from '../assets/images/wizard-att1.gif'
import enemyMove from '../assets/images/wizard-move.gif'
import enemyDeath from '../assets/images/wizard-death.gif'
import enemyDead from '../assets/images/wizard-dead.gif'
//BG
import bg from '../assets/images/bg/back0.jpg'
//Data
import charData from '../charData.json'
//Cmps
import { Enemy } from './Enemy';
import { Player } from './Player';
import { ActionsBar } from './ActionsBar';
//Spells
import fireballStart from '../assets/images/firball.gif'
import fireballEnd from '../assets/images/fireball-end.gif'
import calcService from '../services/calcService';
import { GameOverModal } from './GameOverModal';

export function Game() {
  //Characters and BG
  const [player, setPlayer] = useState({
    ...charData.player,
    gif: playerIdle,
    marginLeft: '',
    alignSelf: 'center',
    dmgDoneTo: {
      amount: null,
      isCrit: false,
      isShown: true
    }
  })
  const [enemy, setEnemy] = useState({
    ...charData.wizard,
    gif: enemyIdle,
    marginRight: '',
    alignSelf: 'center',
    dmgDoneTo: {
      amount: null,
      isCrit: false,
      isShown: true
    }
  })
  const bgStyle = {
    backgroundImage: `url(${bg})`,
  }
  //Turns managment
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  //Player spell
  const [spell, setSpell] = useState({
    type: fireballStart,
    left: '200px',
    opacity: '0'
  })

  const [isGameOver, setGameOver] = useState(false)

  useEffect(() => {
    console.log('enemy now after getting hit:', enemy.currHp)

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


  async function animatePlayerAtt() {
    //Move Player to position
    setPlayer(prevState => {
      return {
        ...prevState,
        gif: playerMove,
        marginLeft: 'calc(100% - 500px)',
        //on selected target choose start / center / end
        // alignSelf: 'start'
      }
    })
    //Player attack animation
    await _timeout(400)
    setPlayer(prevState => {
      return {
        ...prevState,
        gif: playerAtt,
      }
    })
    //Enemy hit
    await _timeout(300)
    //setting dmg to the enemy
    const dmgDoneTo = calcService.calcAtt('player', 0)
    setEnemy(prevState => {
      if (prevState.currHp - dmgDoneTo.amount <= 0) {
        return {
          ...prevState,
          currHp: 0,
          dmgDoneTo,
          gif: enemyDeath
        }
      }
      return {
        ...prevState,
        currHp: prevState.currHp - dmgDoneTo.amount,
        dmgDoneTo,
        gif: enemyHit
      }
    })
    //Player move back
    await _timeout(500)
    setPlayer(prevState => {
      return {
        ...prevState,
        gif: playerIdle,
        marginLeft: '0',
        //on player return to initial: start / center / end
        // alignSelf: 'center'
      }
    })
    //Enemy change to idle and reset dmg
    if (enemy.currHp - dmgDoneTo.amount > 0) {
      setEnemy(prevState => {
        return {
          ...prevState,
          gif: enemyIdle,
          dmgDoneTo: {
            amount: null,
            isCrit: false,
            isShown: false
          }
        }
      })

      //Make enemy turn
      await _timeout(1500)
      animateEnemy()
    } else {
      await _timeout(1000)
      setPlayer(prevState => {
        return {
          ...prevState,
          gif: playerMove,
          marginLeft: '120%',
          transition: '1.5s'
        }
      })
    }
  }

  //Player spell
  async function animatePlayerSpell() {
    //Send spell
    setSpell(prevState => {
      return {
        ...prevState,
        left: 'calc(100% - 200px)',
        opacity: '1'
      }
    })
    //Enemy hit
    await _timeout(800)
    const dmgDoneTo = calcService.calcAtt('player', 1)
    setEnemy(prevState => {
      // Check if dead
      if (prevState.currHp - dmgDoneTo.amount <= 0) {
        return {
          ...prevState,
          currHp: 0,
          dmgDoneTo,
          gif: enemyDeath
        }
      }
      return {
        ...prevState,
        currHp: prevState.currHp - dmgDoneTo.amount.toFixed(),
        dmgDoneTo,
        gif: enemyHit
      }
    })

    //Spell explosion
    setSpell(prevState => {
      return {
        ...prevState,
        type: fireballEnd
      }
    })

    //Hide spell
    await _timeout(300)
    setSpell(prevState => {
      return {
        ...prevState,
        opacity: '0'
      }
    })

    if (enemy.currHp - dmgDoneTo.amount <= 0) {
      setEnemy(prevState => {
        return {
          ...prevState,
          gif: enemyDead
        }
      })
      await _timeout(1000)
      setPlayer(prevState => {
        return {
          ...prevState,
          gif: playerMove,
          marginLeft: '120%',
          transition: '1.5s'
        }
      })
    }


    //Enemy change to idle and reset dmg
    if (enemy.currHp - dmgDoneTo.amount > 0) {
      setEnemy(prevState => {
        return {
          ...prevState,
          dmgDoneTo: {
            amount: null,
            isCrit: false,
            isShown: false
          },
          gif: enemyIdle
        }
      })
    }

    //Take spell back
    await _timeout(1000)
    setSpell(prevState => {
      return {
        ...prevState,
        left: '200px',
        type: fireballStart
      }
    })
    //Make enemy turn
    await _timeout(300)
    if (enemy.currHp - dmgDoneTo.amount > 0) animateEnemy()
  }

  async function animateEnemy() {
    //Move to position
    setEnemy(prevState => {
      return {
        ...prevState,
        gif: enemyMove,
        marginRight: 'calc(100% - 500px)',
        //find lowest hp and attack change: start / center / end
        //alignSelf: 'start'
      }
    })
    //Attack animation
    await _timeout(400)
    setEnemy(prevState => {
      return {
        ...prevState,
        gif: enemyAtt,

      }
    })
    //Player hit
    await _timeout(300)
    //setting dmg to the player
    const dmgDoneTo = calcService.calcAtt('enemy', 0)

    setPlayer(prevState => {
      if (prevState.currHp - dmgDoneTo.amount <= 0) {
        return {
          ...prevState,
          currHp: 0,
          dmgDoneTo,
          gif: playerDeath
        }
      }
      return {
        ...prevState,
        currHp: (prevState.currHp - dmgDoneTo.amount).toFixed(),
        dmgDoneTo,
        gif: playerHit
      }
    })

    if (player.currHp - dmgDoneTo.amount <= 0) {
      setPlayer(prevState => {
        return {
          ...prevState,
          gif: playerDead
        }
      })
    }


    //Move back
    await _timeout(300)
    setEnemy(prevState => {
      return {
        ...prevState,
        gif: enemyIdle,
        marginRight: '0',
        //on enemy return to initial: start / center / end
        // alignSelf: 'center'
      }
    })
    //Player change to idle and reset dmg
    if (player.currHp - dmgDoneTo.amount > 0) {
      setPlayer(prevState => {
        return {
          ...prevState,
          gif: playerIdle,
          dmgDoneTo: {
            amount: null,
            isCrit: false,
            isShown: false
          }
        }
      })
      //Player's turn
      await _timeout(400)
      setIsPlayerTurn(true)
    } else {
      setGameOver(true)
    }
  }

  //Select enemy
  function onSelect() {
    setEnemy(prevState => {
      return {
        ...prevState,
        isSelected: true
      }
    })
  }

  function restartGame() {
    setPlayer({
      ...charData.player,
      gif: playerIdle,
      marginLeft: '',
      alignSelf: 'center',
      dmgDoneTo: {
        amount: null,
        isCrit: false,
        isShown: true
      }
    })
    setEnemy({
      ...charData.wizard,
      gif: enemyIdle,
      marginRight: '',
      alignSelf: 'center',
      dmgDoneTo: {
        amount: null,
        isCrit: false,
        isShown: true
      }
    })
    setIsPlayerTurn(true)
    setGameOver(false)
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
      {isGameOver && <GameOverModal restartGame={restartGame} />}
    </section>
  );
}