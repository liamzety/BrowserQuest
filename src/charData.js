//PLAYER ANIMATIONS
import playerIdle from "./assets/images/king-idle.gif";
//ENEMY ANIMATIONS
import enemyIdle from "./assets/images/wizard-idle.gif";
export const charData = {
  player: {
    hitAnimationLockTimestamp: 0,
    isMirrored: false,
    isAttLocked: false,
    gif: playerIdle,
    x: 50,
    y: 150,
    dmgModel: {
      amount: null,
      isCrit: false,
      isShown: true,
    },
    name: "my name",
    portrait: null,
    lvl: 1,
    type: "player",
    hp: 100,
    currHp: 100,
    currMana: 100,
    mana: 100,
    manaRegen: 15,
    skills: [
      {
        name: "basic_attack",
        manaCost: 0,
        baseDmg: 85,
      },
      {
        name: "double_attack",
        manaCost: 15,
        baseDmg: 8,
      },
      {
        name: "spell_fireball",
        manaCost: 25,
        baseDmg: 15,
      },
      {
        name: "heal",
        manaCost: 50,
        baseHeal: 25,
      },
    ],
  },

  enemy: {
    hitAnimationLockTimestamp: 0,
    isMirrored: true,
    isAttLocked: false,
    gif: enemyIdle,
    x: 800,
    y: 150,
    dmgModel: {
      amount: null,
      isCrit: false,
      isShown: true,
    },
    name: "Big Bad Wizard",
    isSelected: true,
    lvl: 1,
    type: "enemy",
    hp: 125,
    currHp: 125,
    currMana: 50,
    mana: 50,
    manaRegen: 15,
    skills: [
      {
        name: "att1",
        manaCost: 0,
        baseDmg: 1,
      },
      {
        name: "att2",
        manaCost: 25,
        baseDmg: 10,
      },
      {
        name: "heal",
        manaCost: 50,
        baseHeal: 15,
      },
    ],
  },
};
