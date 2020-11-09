import React from 'react'

export function Player({ char }) {
    return (
        <div className='player char-container' style={{ marginLeft: char.marginLeft, alignSelf: char.alignSelf }}>
            <img className="player-sprite" src={char.gif} alt="" />
        </div>
    )
}
