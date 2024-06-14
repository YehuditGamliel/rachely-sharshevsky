import * as React from 'react';
import { useAuth } from '../../hook/AuthProvider.jsx'

import{useContext} from 'react';
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate, Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import SpecificInfo from '../SpecificInfo/SpecificInfo';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import WebcamGlassesOverlay from '../WebcamGlassesOverlay/WebcamGlassesOverlay.jsx';


// import '../SingleEyeglassee/SingleEyeglassee.css'
const ExpandMore = styled((props) => {
  // const [displaySepcificInfo , setDisplaySepcificInfo] = useState();
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const buyEyeglasses = (id) => {

  fetch(`https://localhost:8082/eyeglasses/${model}`, {
    method: 'PUT',
    body: JSON.stringify({
      // model: props.model,
      price: props.price,
      photo: props.photo,
      p: props.stock

    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(json => {
      if (json.status == 200) {
        alert("p")
        // setTodos(todos.map((todo) => {
        //   if (todo.id == idTodo) {
        //     return { id: id, title: valuesTodo.title, completed: valuesTodo.completed }
        //   }
        //   return todo
        // }))
      }
      else {
        alert(json.error)
      }
    })
}

 function SingleEyeglasses(props) {
  const { user, loginAction, logOut } = useAuth();

 const { eyeglasses,setCurrentEyeglasses } = useContext(EyeglassesContext);
  const [expanded, setExpanded] = React.useState(false);
  const [showCamera, setShowCamera] = React.useState(false);  const navigate = useNavigate();
 
  const displaySpecificInfo=()=>{
    setCurrentEyeglasses({"photo":props.photo,"model":props.model,"title":props.title,"price":props.price})
     navigate(`/eyeglasses/${props.model}`)
  
  }
  const displayEditingGlassesDetails=()=>{
    setCurrentEyeglasses({"photo":props.photo,"model":props.model,"title":props.title,"price":props.price})
     navigate(`/EditingGlasses/${props.model}`)
  
  }
  return (
    <>
    
    <Card id ="cards" sx={{ maxWidth: 300 }}>
      <CardHeader 
        title={props.title}
        />
     {showCamera?<WebcamGlassesOverlay img={props.photo} />:
        <CardMedia id="img"
        component="img"
        height="170"
        image={ props.photo}
        alt="Eyeglasses"
        />}
        
        {/* {showCamera && <WebcamGlassesOverlay /> } */}
      <span> {props.price}</span>
      <span>ש"ח</span>
          <CardActions disableSpacing>
            {user!=''?<Button onClick={()=>displayEditingGlassesDetails()} variant="contained" > שינוי פרטים
              </Button>:<></>
                           }
              <Button  onClick={()=>displaySpecificInfo()} variant="contained" endIcon={<ChevronLeftIcon />}>
                לפרטים
              </Button>
              <Button onClick={() => setShowCamera(prevState => !prevState)} variant="contained" endIcon={<CameraAltIcon />}>  איך זה עלי?
              </Button>
          </CardActions>

    </Card>
   
    </>
  );
}

export default SingleEyeglasses;