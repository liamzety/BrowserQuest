import React from 'react'

export function Player({ char }) {
    return (
        <div className='player char-container relative' style={{ marginLeft: char.marginLeft, alignSelf: char.alignSelf, transition: char.transition }}>
            <img className="player-sprite" src={char.gif} alt="" />
            <div className="hp absolute" style={{
                height: '20px',
                width: char.hp + 'px',
                backgroundColor: 'black',
                left: '70px'
            }}>

                <div className="curr-hp absolute flex align-center" style={{
                    height: '100%',
                    width: char.currHp + 'px',
                    backgroundColor: 'red'
                }}>
                   <p style={{width:char.hp+'px', textAlign:'center'}}>{char.currHp <= 0 ? 0 : char.currHp}/{char.hp}</p> 
                </div>
            </div>
            { char.dmgDoneTo.isShown &&
                <div className="dmg-output absolute"
                    style={{
                        color: char.dmgDoneTo.isCrit ? 'red' : 'green',
                        fontSize: char.dmgDoneTo.isCrit ? '40px' : '25px',
                        opacity: char.currHp <= 0 ? 0 : 1,
                        transition: '.5s'
                    }}>

                    {char.dmgDoneTo.amount}

                </div>}
        </div>
    )
}
