//Data
import charData from '../charData.json'

export default {
    calcAtt
}

function calcAtt(dmgBy, typeIdx) {
    let dmg
    if (dmgBy === 'player') {
        //calculating dmg to enemy
        dmg = {
            amount: charData.player.skills[typeIdx].baseDmg + Math.floor(Math.random() * (charData.player.skills[typeIdx].baseDmg)),
            isCrit: false,
            isShown: true
        }
        //if attack is more then 1.5 times then absolve it and return it as 1.5
        //---UNLESS--- its 1.8 or more , in that case make it a a crit and return it.
        if (dmg.amount > charData.player.skills[typeIdx].baseDmg * 1.5 && dmg.amount < charData.player.skills[typeIdx].baseDmg * 1.8) {
            dmg.amount = charData.player.skills[typeIdx].baseDmg * 1.5
        }
        else if (dmg.amount >= charData.player.skills[typeIdx].baseDmg * 1.8) {
            dmg.isCrit = true
        }
        return dmg
    } else {
        //calculating dmg to player
        dmg = {
            amount: charData.wizard.skills[typeIdx].baseDmg + Math.floor(Math.random() * (charData.wizard.skills[typeIdx].baseDmg)),
            isCrit: false,
            isShown: true
        }
        if (dmg.amount > charData.wizard.skills[typeIdx].baseDmg * 1.5) {
            dmg.isCrit = true
        }
        return dmg
    }
}