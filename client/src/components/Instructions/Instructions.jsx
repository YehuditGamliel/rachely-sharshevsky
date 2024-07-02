import React, { useState } from "react";
import useSound from 'use-sound';
import r from '../img/r.mp3'
import WebcamGlassesOverlay from '../WebcamGlassesOverlay/WebcamGlassesOverlay.jsx'

function Instructions(){
    const [play, { stop }] = useSound(r);
    
    const handleDoubleClick = () => {
        stop();
    };

    return(
        <>
            <button onClick={() => play()} onDoubleClick={handleDoubleClick}>לשמע ההוראות </button>
            <WebcamGlassesOverlay img={'http://localhost:8082/img/101-159-c_3-Front.jpg'}/>

        </>
    );
}

export default Instructions;