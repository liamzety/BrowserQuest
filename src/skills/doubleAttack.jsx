//PLAYER ANIMATIONS
import playerIdle from "../assets/images/king-idle.gif";
import playerAtt from "../assets/images/king-att1.gif";
import playerMove from "../assets/images/king-move.gif";
//ENEMY ANIMATIONS
import enemyIdle from "../assets/images/wizard-idle.gif";
import enemyHit from "../assets/images/wizard-hit.gif";
import enemyDeath from "../assets/images/wizard-death.gif";
//Spells
import { _timeout } from "../cmps/Game";
import { useCalcAtt } from "../hooks/useCalcAtt";

async function doubleAttack({
  setPlayer,
  setEnemy,
  enemyCb,
  player,
  enemy,
  spell,
  setSpell,
}) {
  const { dmg, calcAtt } = useCalcAtt();
  // Mana deduction
  setPlayer((prevState) => {
    return {
      ...prevState,
      currMana: prevState.currMana - prevState.skills[1].manaCost,
    };
  });
  //Move Player to position
  setPlayer((prevState) => {
    return {
      ...prevState,
      gif: playerMove,
      marginLeft: "calc(100% - 500px)",
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
  let dmgModel = calcAtt("player", 1);
  setEnemy((prevState) => {
    if (prevState.currHp - dmgModel.amount <= 0) {
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
  dmgModel = calcAtt("player", 1);

  setEnemy((prevState) => {
    if (prevState.currHp - dmgModel.amount <= 0) {
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

export default doubleAttack;
