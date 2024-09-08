import { useState } from "react";
import { usePlayerStore } from "../store/store";

export const useCalcAtt = () => {
  const { player, enemy } = usePlayerStore();
  const [dmg, setDmg] = useState({});

  function calcAtt(dmgBy, typeIdx) {
    let dmgLocal;
    if (dmgBy === "player") {
      //calculating dmg to enemy
      dmgLocal = {
        amount:
          player.skills[typeIdx].baseDmg +
          Math.floor(Math.random() * player.skills[typeIdx].baseDmg),
        isCrit: false,
        isShown: true,
      };
      //if attack is more then 1.5 times then absolve it and return it as 1.5
      //---UNLESS--- its 1.8 or more , in that case make it a a crit and return it.
      if (
        dmgLocal.amount > player.skills[typeIdx].baseDmg * 1.5 &&
        dmgLocal.amount < player.skills[typeIdx].baseDmg * 1.8
      ) {
        dmgLocal.amount = player.skills[typeIdx].baseDmg * 1.5;
      } else if (dmgLocal.amount >= player.skills[typeIdx].baseDmg * 1.8) {
        dmgLocal.isCrit = true;
      }
      return dmgLocal;
    } else {
      //calculating dmg to player
      dmgLocal = {
        amount:
          enemy.skills[typeIdx].baseDmg +
          Math.floor(Math.random() * enemy.skills[typeIdx].baseDmg),
        isCrit: false,
        isShown: true,
      };
      if (dmgLocal.amount > enemy.skills[typeIdx].baseDmg * 1.5) {
        dmgLocal.isCrit = true;
      }
      setDmg(dmgLocal);
      return dmgLocal;
    }
  }

  return { dmg, calcAtt };
};
