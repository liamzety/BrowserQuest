import React from 'react'

export function Enemy({ char }) {
    return (
        <img style={{ marginRight: char.marginRight, alignSelf: char.alignSelf }} className="enemy" src={char.gif} alt="" />
    )
}
