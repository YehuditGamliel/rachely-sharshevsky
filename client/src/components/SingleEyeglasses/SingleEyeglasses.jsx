import * as React from 'react';
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
import { useNavigate, Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import SpecificInfo from '../SpecificInfo/SpecificInfo';

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
// const { state } = useLocation();

// const location = useLocation();
const buyEyeglasses = (id) => {

  fetch(`http://localhost:8082/eyeglasses/${model}`, {
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
 
  // const { state } = useLocation();
  //   const { data } = state;
   
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
 
  const displaySpecificInfo=()=>{

     navigate(`/eyeglasses/${props.model}`,{state:{photo:props.photo,model:props.model,title:props.title,price:props.price}})
  
  }
  return (
    
    <Card sx={{ maxWidth: 345 }}>
      {/* כותרת להוסיף מה שנרצה.... */}
      <CardHeader
        title={props.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.photo}
        alt="Paella dish"
      />
      <p> {props.price}</p>
      <p>ש"ח</p>
          <CardActions disableSpacing>
              <Button  onClick={()=>displaySpecificInfo()} variant="contained" endIcon={<ChevronLeftIcon />}>
                לפרטים
              </Button>
          </CardActions>

    </Card>
  );
}

export default SingleEyeglasses;