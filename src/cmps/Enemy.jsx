import React from 'react'

export function Enemy({ char }) {
    return (
        <div className="sprite-container">
            <img className="enemy" src={char.gif} alt="" />
        </div>
    )
}
