import * as React from 'react';
import { useEffect ,useState, useContext } from 'react'

import { useNavigate } from 'react-router-dom';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
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
  }).then((response) => response.json())
    .then(json => {
      if (json.status == 200) {
        setIsExist(false)
      }
      else {
        alert(json.error)
      }
    })
};

const buyEyeglasses = (id) => {
  fetch(`https://localhost:8082/eyeglasses/${model}`, {
    method: 'PUT',
    body: JSON.stringify({
      // model: props.model,
      price: props.price,
      imgDisplay: props.imgDisplay,
      p: props.stock
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(json => {
      if (json.status == 200) {
      }
      else {
        alert(json.error)
      }
    })
}

function SingleEyeglasses(props) {

  const [isExist, setIsExist] = useState(true)
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  const [showCamera, setShowCamera] = useState(false); const navigate = useNavigate();
  const [glassesDisplay ,setGlassesDisplay] = useState("")
  const [glassesCamara , setGlassesCamara] = useState("")


  const buttonsFunc = () => {
    return (<><Button onClick={() => displayEditingGlassesDetails()} variant="contained" > שינוי פרטים
    </Button>
      <Button onClick={() => deleteEyeGlasses(props.model, setIsExist)} variant="contained" >
        <DeleteIcon />
      </Button></>);
  }

  const displaySpecificInfo = () => {
    console.log("glassesDisplay!!!!!!!!!!!!!!!1",glassesDisplay)

    setCurrentEyeglasses({ "imgDisplay": props.imgDisplay, "model": props.model, "title": props.title, "price": props.price })
    navigate(`/eyeglasses/${props.model}`)
  }

  const displayEditingGlassesDetails = () => {
    setCurrentEyeglasses({ "imgDisplay": props.imgDisplay, "model": props.model, "title": props.title, "price": props.price })
    navigate(`/EditingGlasses/${props.model}`)

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
            {eyeglasses.role==1 != '' ? buttonsFunc()
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

// import IconButton from '@mui/material/IconButton';
// import { styled } from '@mui/material/styles';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));