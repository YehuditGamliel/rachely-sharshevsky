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
            <button  id="buttonForInstruction" onClick={() => play()} onDoubleClick={handleDoubleClick}>לשמע ההוראות </button>
            <div id="camara">
            <WebcamGlassesOverlay  img={'http://localhost:8082/img/101-159-c_3-Front.jpg'} />
           </div>
        </>
    );
}

export default Instructions;