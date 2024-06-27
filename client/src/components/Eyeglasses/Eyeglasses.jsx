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
  const [selectedValue, setSelectedValue] = useState('everyOne');
  const [lastAction, setLastAction] = useState({ action: "", type: "" });
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
  const handleSortByChange = (event) => {
    // let start = seeMore.current ? todos.length : 0
     let value =  event.target.value;
     setSelectedValue(event.target.value);
     if(event.target.value=='everyOne'){
      navigate(`/eyeglasses`)
      fetch(`http://localhost:8082/eyeglasses?_page=${1}`, {
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
            setDisplayEyglasses([ ...json.data])
            setEyeglassesPage(eyeglassesPage+1)
          }
        })
          // console.log(displayEyeglasses,json.data)

          // setLastAction({ action: "sort", type: `${value}` });
     }
   else{
    navigate(`/eyeglasses?sortBy=${ value}`)
    fetch(`http://localhost:8082/eyeglasses?_page=${eyeglassesPage}&sort=${value}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          setDisplayEyglasses(json.data)
          console.log(displayEyeglasses,json.data)

          // setLastAction({ action: "sort", type: `${value}` });
        }
      })
   } 
  }

  return (<>
         <select id="sortBy"   value={selectedValue} onChange={handleSortByChange}>
          <option value="everyOne">evert one</option>
          {/* <option value="company">company</option> */}
          <option value="price" >price</option>
        </select>
  {console.log("displayEyeglasses",displayEyeglasses)}
    <div id='container'>
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        <SingleEyeglassee model={eyeglasses.model} price={eyeglasses.price} title=
        {eyeglasses.title} imgDisplay={eyeglasses.imgDisplay} imgCamara={eyeglasses.imgCamara}/>
        
      </div>)
      }
      <button onClick={() => { setLoadMore(true) }}>load more</button>
      </div>
  </>)
}
export default Eyeglasses;

