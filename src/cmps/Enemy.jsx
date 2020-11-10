import React from 'react'
import { GoTriangleDown } from 'react-icons/go'

export function Enemy({ char, onSelect }) {
    return (
        <div className='enemy char-container relative'
            style={{ marginRight: char.marginRight, alignSelf: char.alignSelf }}
            onClick={onSelect}>
            <img className="enemy-sprite" src={char.gif} alt="" />
            <div className="absolute">{char.currHp}/{char.hp}</div>
            { char.dmgDoneTo.isShown &&
                <div className="dmg-output absolute"
                    style={{ color: char.dmgDoneTo.isCrit ? 'red' : 'green', fontSize: char.dmgDoneTo.isCrit ? '40px' : '25px' }}>

                    {char.dmgDoneTo.amount}

                </div>}

            { char.isSelected && <GoTriangleDown className="absolute" />}
        </div>
    )
}
