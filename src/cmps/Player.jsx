import React from 'react'

export function Player({ char }) {
    return (
        <img style={{ marginLeft: char.marginLeft, alignSelf: char.alignSelf }}
            className="player" src={char.gif} alt="" />
    )
}
