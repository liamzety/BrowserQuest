import React from 'react'
import { GoTriangleDown } from 'react-icons/go'

export function Enemy({ char, onSelect }) {
    return (
        <div className='enemy char-container relative'
            style={{ marginRight: char.marginRight, alignSelf: char.alignSelf , opacity:`${char.currHp<=0 ? 0 : 1}`}}
            onClick={onSelect}>
            <img className="enemy-sprite" src={char.gif} alt="" />
            <div className="relative flex align-center justify-center">

            <div className="hp" style={{
                height: '20px',
                width: char.hp + 'px',
                backgroundColor: 'black',
                left: '70px'
            }}>
                <div className="curr-hp" style={{
                    height: '100%',
                    width: char.currHp + 'px',
                    backgroundColor: 'red'
                }}>
                </div>
            </div>
            <p class="absolute" style={{width:char.hp+'px', textAlign:'center'}}>{char.currHp <= 0 ? 0 : char.currHp}/{char.hp}</p> 
            </div>
            { char.dmgDoneTo.isShown &&
                <div className="dmg-output absolute"
                    style={{ color: char.dmgDoneTo.isCrit ? 'red' : 'green', fontSize: char.dmgDoneTo.isCrit ? '40px' : '25px' }}>
                    {char.dmgDoneTo.amount}
                </div>}

            { char.isSelected && <GoTriangleDown className="absolute" />}
        </div>
    )
}
