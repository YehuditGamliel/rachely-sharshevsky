import React  from "react";
import useSound from 'use-sound';
import r from '../img/r.mp3'

function Instructions(){
    const [play, { stop }] = useSound(r);
  return(
    <>  < button onClick={() => play()} onMouseLeave={() => stop()}></button>
</>
  );
}
export default Instructions;