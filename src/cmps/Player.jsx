import React from 'react'

export function Player({ char }) {
    return (
        <div className="player sprite-container" style={{
            backgroundImage: char.backgroundImage,
            backgroundPositionX: char.posX,
            backgroundPositionY: char.posY,
        }}>
        </div>
    )
}
