import { _timeout } from "../cmps/Game";
import calcService from "../services/calcService";
//PLAYER ANIMATIONS
import playerIdle from "../assets/images/king-idle.gif";
import playerAtt from "../assets/images/king-att1.gif";
import playerMove from "../assets/images/king-move.gif";
//ENEMY ANIMATIONS
import enemyIdle from "../assets/images/wizard-idle.gif";
import enemyHit from "../assets/images/wizard-hit.gif";
import enemyDeath from "../assets/images/wizard-death.gif";

export async function onBasicAttack({
  setPlayer,
  setEnemy,
  enemyCb,
  player,
  enemy,
  spell,
  setSpell,
}) {
  //Move Player to position
  setPlayer((prevState) => {
    return {
      ...prevState,
      gif: playerMove,
      marginLeft: "calc(100% - 500px)",
      //on selected target choose start / center / end
      // alignSelf: 'start'
    };
  });
  //Player attack animation
  await _timeout(400);
  setPlayer((prevState) => {
    return {
      ...prevState,
      gif: playerAtt,
    };
  });
  //Enemy hit
  await _timeout(300);
  //setting dmg to the enemy
  const dmgModel = calcService.calcAtt("player", 0);
  setEnemy((prevState) => {
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
      ...prevState,
      currHp: prevState.currHp - dmgModel.amount,
      dmgModel,
      gif: enemyHit,
    };
  });
  //Player move back
  await _timeout(500);
  setPlayer((prevState) => {
    return {
      ...prevState,
      gif: playerIdle,
      marginLeft: "0",
      //on player return to initial: start / center / end
      // alignSelf: 'center'
    };
  });
  //Enemy change to idle and reset dmg
  if (enemy.currHp - dmgModel.amount > 0) {
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyIdle,
        dmgModel: {
          amount: null,
          isCrit: false,
          isShown: false,
        },
      };
    });

    //Make enemy turn
    await _timeout(1500);
    enemyCb();
  } else {
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
}
