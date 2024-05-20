import React from "react";
import { useLocation} from "react-router-dom";
import { useState,useEffect  } from "react";


function SpecificInfo(){
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const {state} = useLocation();
    const { photo,model } = state;
    

useEffect(() => {
  fetch(`http://localhost:8082/eyeglasses/${model}`, {
    method: 'GET',

  })
    .then(response => response.json())
    .then((json) => {
      if (json.status != 200) {
        alert(json.error)
      }
      else {
        // console.log("!!!!!!!!!!!!!!!!"+json.dat)
        setDisplaypecificInfo(json.data[0])
       
      }
    })
}, [])
   
   
    return(<>
    {console.log(displaySpecificInfo)}
    <p>{displaySpecificInfo.description}</p>
    <p>{displaySpecificInfo.color}</p>
     <img src={photo}/>
    </>)
}
export default SpecificInfo;