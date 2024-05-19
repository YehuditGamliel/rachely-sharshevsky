import Webcam from "react-webcam"
import { useRef } from "react"
function Mirror(){
const webRef=useRef(null);
let img = "httpst"
const showImage=()=>{
    img=webRef.current.getScreenShot();

};
return(
    <div className="App">
        React Webcam
        <Webcam ref={webRef}/>
        <button
        onClick={()=>{
            showImage();
        }}>
            show image in console
        </button>
        <br/>
        <img src={img}/>
    </div>
)
}
export default Mirror