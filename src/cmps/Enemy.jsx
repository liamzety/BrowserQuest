import React from 'react'
import { GoTriangleDown } from 'react-icons/go'

export function Enemy({ char, onSelect }) {
    return (
        <div className='enemy char-container relative'
            style={{ marginRight: char.marginRight, alignSelf: char.alignSelf }}
            onClick={onSelect}>
            <img className="enemy-sprite" src={char.gif} alt="" />
            { char.isSelected && <GoTriangleDown className="absolute" />}
        </div>
    )
}
