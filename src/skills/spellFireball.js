//PLAYER ANIMATIONS
import playerMove from "../assets/images/king-move.gif";
//ENEMY ANIMATIONS
import enemyIdle from "../assets/images/wizard-idle.gif";
import enemyHit from "../assets/images/wizard-hit.gif";
import enemyDeath from "../assets/images/wizard-death.gif";
import enemyDead from "../assets/images/wizard-dead.gif";
//Spells
import fireballStart from "../assets/images/firball.gif";
import fireballEnd from "../assets/images/fireball-end.gif";
import calcService from "../services/calcService";
import { _timeout } from "../cmps/Game";

//Player spell
export async function onSpellFireball({
  setPlayer,
  setEnemy,
  enemyCb,
  player,
  enemy,
  spell,
  setSpell,
}) {
  // Mana deduction
  setPlayer((prevState) => {
    return {
      ...prevState,
      currMana: prevState.currMana - prevState.skills[2].manaCost,
    };
  });
  //Send spell
  setSpell((prevState) => {
    return {
      ...prevState,
      left: "calc(100% - 200px)",
      opacity: "1",
    };
  });
  //Enemy hit
  await _timeout(800);
  const dmgModel = calcService.calcAtt("player", 2);
  setEnemy((prevState) => {
    // Check if dead
    if (prevState.currHp - dmgModel.amount <= 0) {
      // Enemy dead
      return {
        ...prevState,
        currHp: 0,
        dmgModel,
        gif: enemyDeath,
      };
    }
    return {
      // Enemy hit
      ...prevState,
      currHp: prevState.currHp - dmgModel.amount.toFixed(),
      dmgModel,
      gif: enemyHit,
    };
  });

  //Spell explosion
  setSpell((prevState) => {
    return {
      ...prevState,
      type: fireballEnd,
    };
  });

  //Hide spell
  await _timeout(300);
  setSpell((prevState) => {
    return {
      ...prevState,
      opacity: "0",
    };
  });

  if (enemy.currHp - dmgModel.amount <= 0) {
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyDead,
      };
    });
    await _timeout(1000);
    setPlayer((prevState) => {
      return {
        ...prevState,
        gif: playerMove,
        marginLeft: "120%",
        transition: "1.5s",
      };
    });
  }

  //Enemy change to idle and reset dmg
  if (enemy.currHp - dmgModel.amount > 0) {
    setEnemy((prevState) => {
      return {
        ...prevState,
        dmgModel: {
          amount: null,
          isCrit: false,
          isShown: false,
        },
        gif: enemyIdle,
      };
    });
  }

  //Take spell back
  await _timeout(1000);
  setSpell((prevState) => {
    return {
      ...prevState,
      left: "200px",
      type: fireballStart,
    };
  });
  //Make enemy turn
  await _timeout(300);
  if (enemy.currHp - dmgModel.amount > 0) enemyCb();
}
