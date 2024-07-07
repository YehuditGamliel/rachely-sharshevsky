import * as React from 'react';
import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { EyeglassesContext } from "../../hook/EyeglassesProvider.jsx";
import {  UserContext } from "../../hook/UserProvider.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import WebcamGlassesOverlay from '../WebcamGlassesOverlay/WebcamGlassesOverlay.jsx';

const deleteEyeGlasses = (model, setIsExist) => {
  fetch(`http://localhost:8082/eyeglasses/${model}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
                },
  }).then((response) => response.json())
    .then(json => {
      console.log(json)
        setIsExist(false)
     
    }).catch((error) => alert(error))
};


function SingleEyeglasses(props) {
  const [isExist, setIsExist] = useState(true)
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  const {user,setCurrentUser} = useContext(UserContext)
  const [showCamera, setShowCamera] = useState(false); const navigate = useNavigate();
  const buttonsFunc = () => {
    console.log("eyeGlassesSingle",eyeglasses)
    return (<><Button onClick={() => displayEditingGlassesDetails()} variant="contained" > שינוי פרטים
    </Button>
      <Button onClick={() => deleteEyeGlasses(props.model, setIsExist)} variant="contained" >
        <DeleteIcon />
      </Button></>);
  }
  
  const displaySpecificInfo = () => {
    setCurrentEyeglasses({ "imgDisplay": props.imgDisplay, "model": props.model, "title": props.title, "price": props.price })
    navigate(`/eyeglasses/${location.pathname.split('/')[2]}/${props.model}`)
  }

  const displayEditingGlassesDetails = () => {
    setCurrentEyeglasses({ "imgDisplay": props.imgDisplay, "model": props.model, "title": props.title, "price": props.price })
    navigate(`/EditingGlasses/${location.pathname.split('/')[2]}/${props.model}`)
  }

  return (
    <>
      {isExist ?
        <Card id="cards" sx={{ maxWidth: 300 }}>
          <CardHeader
            title={props.title}
          />
          {showCamera ? <WebcamGlassesOverlay img={props.imgCamara} /> :
            <CardMedia id="img"
              component="img"
              height="170"
              image={props.imgDisplay}
              alt="Eyeglasses"
            />}
          <span> {props.price}</span>
          <span>ש"ח</span>
          <CardActions disableSpacing>
            {console.log()}
            {user.role==1 != '' ? buttonsFunc()
              : <></>}
            <Button onClick={() => displaySpecificInfo()} variant="contained" endIcon={<ChevronLeftIcon />}>
              לפרטים
            </Button>
            <Button onClick={() => setShowCamera(prevState => !prevState)} variant="contained" endIcon={<CameraAltIcon />}>  איך זה עלי?
            </Button>
          </CardActions>
        </Card> : <></>}
    </>
  );
}

export default SingleEyeglasses;

