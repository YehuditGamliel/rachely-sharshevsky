import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './Eyeglasses.css'
import { UserContext } from "../../UserProvider";
// import   '../../img'
import logo from '../../img/logo.png';
function Eyeglasses() {
 
   const [displayEyeglasses,setDisplayEyglasses] = useState([]);

   const navigate = useNavigate();

  useEffect(() => {
      fetch(`http://localhost:8082/eyeglasses`, {
      method: 'GET',

    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          console.log(json.data[0])
          setDisplayEyglasses(...displayEyeglasses,json.data)
          //setLastSearch("all")
          //seeMore.current = false;
          //alert("oooooo")
        }
      })
    }, [])
    const glassesInfo = async (glassesId) => {
      navigate(`/home`)
    }
    
  
  return (<>
  <div id='container'>
    {console.log(displayEyeglasses)}
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        <div><img src={logo} id="image"/></div>
          <div id ="model">{eyeglasses.model}</div><br/> 
           <span>{eyeglasses.price}</span>
           {/* <span >{eyeglasses.photo}</span> */}
           <br/>
           <button onClick={() => glassesInfo(eyeglasses.model)} id="buttonInfo">למידע נוסף</button>

          
      </div>)}</div>
    
  </>)
}
export default Eyeglasses;
