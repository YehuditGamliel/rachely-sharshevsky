import React, { useState } from "react";
import useSound from 'use-sound';
import r from '../img/r.mp3'
import '../Instructions/Instructions.css'
import WebcamGlassesOverlay from '../WebcamGlassesOverlay/WebcamGlassesOverlay.jsx'
import jsonData from '../../assets/data.json'
function Instructions() {
    const [play, { stop }] = useSound(r);

    const handleDoubleClick = () => {
        stop();
    };

    return (
        <>
            {jsonData.istroctions.map((data, id) =>
                <div key={id} >
                    <p id="title">{data.title}</p>
                    <p id="p">{data.p}</p>
                </div>
            )}
            <button onClick={() => play()} onDoubleClick={handleDoubleClick}>לשמע ההוראות </button>
            <WebcamGlassesOverlay img={'http://localhost:8082/img/101-159-c_3-Front.jpg'} />

        </>
    );
}

export default Instructions;