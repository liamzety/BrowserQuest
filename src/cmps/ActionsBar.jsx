import React, { useState } from 'react'
import attack1 from '../assets/images/attack1.png'
import attack2 from '../assets/images/attack2.png'
import heal from '../assets/images/heal.png'
import skull from '../assets/images/skull.png'
import skullFlip from '../assets/images/skull-flip.png'


export function ActionsBar() {
    const [skullStyle, setSkullStyle] = useState({
        top: '-7px',
        right: '-18px',
        transform: 'rotate(35deg)'
    })
    function moveSkull() {
        setSkullStyle({
            top: '-38px',
            right: '-38px',
            transform: 'rotate(405deg)'
        })
        setTimeout(() => {
            setSkullStyle({
                top: '-7px',
                right: '-18px',
                transform: 'rotate(35deg)'
            })
        }, 1000);

    }
    return (
        <>
            <div className="actions-bar absolute">
                <div className="action-bar-container relative flex space-between align-center h100">
                    <div className="skills-container flex ">
                        <div className="skill-portrait-container flex justify-center align-center relative">
                            <img className="skill-portrait" src={attack1} alt="" />
                            <div className="keybind flex justify-center align-center absolute">1</div>
                        </div>
                        <div className="skill-portrait-container flex justify-center align-center relative">
                            <img className="skill-portrait" src={attack2} alt="" />
                            <div className="keybind flex justify-center align-center absolute">2</div>
                        </div>
                        <div className="skill-portrait-container flex justify-center align-center relative">
                            <img className="skill-portrait" src={heal} alt="" />
                            <div className="keybind flex justify-center align-center absolute">3</div>
                        </div>
                    </div>
                    <div className="settings-container flex space-between">
                        <div className="setting">setting1</div>
                        <div className="setting">setting2</div>
                        <div className="setting">setting3</div>
                    </div>
                    <img className="deco-skull absolute w100" src={skull} alt="" />
                    <img onClick={moveSkull}
                        style={{
                            top: skullStyle.top,
                            right: skullStyle.right,
                            transform: skullStyle.transform
                        }}
                        className="deco-skull absolute w100" src={skullFlip} alt="" />
                </div>
                <div className="actionsbar-bg-img-wrapper absolute w100 h100"></div>
                <div className="actionsbar-bg-img-wrapper absolute w100 h100"></div>
            </div>
        </>
    )
}
