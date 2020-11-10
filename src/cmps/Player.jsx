import React from 'react'

export function Player({ char }) {
    return (
        <div className='player char-container relative' style={{ marginLeft: char.marginLeft, alignSelf: char.alignSelf }}>
            <img className="player-sprite" src={char.gif} alt="" />
            <div className="absolute">{char.currHp}/{char.hp}</div>
            { char.dmgDoneTo.isShown &&
                <div className="dmg-output absolute"
                    style={{ color: char.dmgDoneTo.isCrit ? 'red' : 'green' }}>

                    {char.dmgDoneTo.amount}

                </div>}
        </div>
    )
}
