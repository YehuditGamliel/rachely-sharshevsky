import React, { useEffect, useState, useContext, useRef } from "react";
import {Outlet, useParams, Link, useNavigate } from "react-router-dom";
import './Eyeglasses.css'
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import logo from'../../img/logo.png'
import  SingleEyeglassee  from '../SingleEyeglasses/SingleEyeglasses.jsx';
// import Mirror from'../../components/Mirror/Mirror.jsx'


function Eyeglasses() {

  const [displayEyeglasses, setDisplayEyglasses] = useState([]);
  const [loadMore, setLoadMore] = useState(true)
  const [eyeglassesPage, setEyeglassesPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
   // {console.log("p",eyeglasses)}
   if(loadMore == true){
    fetch(`http://localhost:8082/eyeglasses?_page=${eyeglassesPage}`, {
      method: 'GET',
    
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          console.log("json.data",json.data)
          console.log("displayEyeglasses",displayEyeglasses)
          setDisplayEyglasses([...displayEyeglasses, ...json.data])
        }
      })
      setLoadMore(false)
      setEyeglassesPage(eyeglassesPage+1)
    }
  }, [loadMore])

  const glassesInfo = async (glassesId) => {
    navigate(`/home`)
  }


  return (<>
  {/* <Mirror/> */}
  {console.log("displayEyeglasses",displayEyeglasses)}
    <div id='container'>
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        <SingleEyeglassee model={eyeglasses.model} price={eyeglasses.price} photo={eyeglasses.photo} title=
        {eyeglasses.title} />
      </div>)
      }
      <button onClick={() => { setLoadMore(true) }}>load more</button>
      </div>
  </>)
}
export default Eyeglasses;

