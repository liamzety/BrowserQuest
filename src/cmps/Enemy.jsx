import React from 'react'

export function Enemy({ char }) {
    return (
        <div className="enemy sprite-container" style={{
            backgroundImage: char.backgroundImage,
            backgroundPositionX: char.posX,
            backgroundPositionY: char.posY
        }}>
        </div>
    )
}
