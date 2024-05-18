import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './Eyeglasses.css'
import { UserContext } from "../../UserProvider";
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import logo from'../../img/logo.png'
import  SingleEyeglassee  from '../SingleEyeglasses/SingleEyeglasses.jsx';

function Eyeglasses() {

  const [displayEyeglasses, setDisplayEyglasses] = useState([]);

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
          setDisplayEyglasses(...displayEyeglasses, json.data)
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
      
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        {/* <div><img src={logo} id="image" /></div> */}
        {/* <div id="model">{eyeglasses.model}</div><br />
        <span>{eyeglasses.price}</span>
        <span >{eyeglasses.photo}</span>
        <br /> */}
        {/* <button onClick={() => glassesInfo(eyeglasses.model)} id="buttonInfo">למידע נוסף</button> */}
        {/* <IconButton color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton> */}
        <SingleEyeglassee title={eyeglasses.model} price={eyeglasses.price} photo={eyeglasses.photo}/>

      </div>)
      }
      </div>

  </>)
}
export default Eyeglasses;

