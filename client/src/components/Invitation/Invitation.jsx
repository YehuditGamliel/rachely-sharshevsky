import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';

import Header from '../Header/header.jsx';
import JsonData from '../../assets/data.json'
import './Invitation.css'
import KindOfGlasses from './KindOfGlasses.jsx'
import CU6 from './CU6/CU6'
import { PaperContext } from "../../../src/PaperProvider.jsx"
// import{PaperProvider } from '../../../src/PaperProvider.jsx'
// import {  PaperInvitationProvider } from "../../../src/components";

import WithOrWithoutPrescription from './WithOrWithoutPrescription/WithOrWithoutPrescription';
import SizeOfGlasses from './SizeOfGlasses/SizeOfGlasses';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import { UserContext } from '../../UserProvider.jsx';
import Login from '../Login/Login.jsx';


function Invitation() {

  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  
  const { paper, setCurrentPaper,userData, setUpdateEyeData } = useContext(PaperContext);
    const {user,setCurrentUser}=useContext(UserContext);
  const [open, setOpen] = useState(false);
  // const [register,setRegister]=useState(false)
  const [scroll, setScroll] = useState('paper');
  // const [userEyesData, setUserEyesdata] = useState({});
  // const [paper, setCurrentPaper] = useState({  title: 'kindOfGlasses'  })
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [alert, setAlert] = useState()
  // const [counter,setCounter]=useState(0)

  const navigate = useNavigate();


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll('paper');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    
  }, [open]);
  React.useEffect(()=>{
    console.log("😁",eyeglasses)
    setOpen(true)
    setScroll('paper');
    setCurrentPaper({  title: 'kindOfGlasses'  })
  },[])

  const addInformation = (name, id, title) => {
    if(name=='withOrWithoutPrescription'&&id==1){
     if(!user.userName)
      console.log('Register')
     setUserEyesdata(userItem => ({
      ...userItem,
      [name]: id,
    }));
    setCurrentPaper({ title: 'login' })
    return;
    }
   
   console.log("😂",)
     if(name=='CU6'){
     // Convert price to a number with validation
// const priceNumber = !isNaN(parseFloat(price)) ? parseFloat(price) : 0;

// Convert JsonData.CU6[1].price to a number with validation
const additionalPrice = !isNaN(parseFloat(JsonData.CU6[1].price)) ? parseFloat(JsonData.CU6[1].price) : 0;

// Perform addition if both values are valid numbers
if (!isNaN(additionalPrice)) {
  console.log("price", eyeglasses.price  + additionalPrice, additionalPrice);

  setCurrentEyeglasses(prevState => {
    return { ...prevState, price: eyeglasses.price  + additionalPrice };
  });
} else {
  console.log("Invalid price values. Could not perform addition.");
}
     }
    if (name == 'sizeOfGlasses') {
      setUserEyesdata(userItem => ({
        ...userItem,
        [name]: id,
      }));
    }
    else {
      setUserEyesdata(userItem => ({
        ...userItem,
        [name]: id
      }));
    }

    if (title == 'CU6'||(name == 'kindOfGlasses' && id == 1)) {
      console.log("😊", JsonData.idInvition[0].lastIndex++)
      // alert("ppppppp")
      setUserEyesdata(userItem => ({
        ...userItem,
        ['id']:JsonData.idInvition[0].lastIndex++
        
        
      }));
     
      if (name == 'kindOfGlasses' && id == 1) {
        setCurrentPaper({ title: 'CU6' })
        setUserEyesdata(userItem => ({
          ...userItem,
          ['withOrWithoutPrescription']: 0,
          ['sizeOfGlasses']: {}
        }));
        alert("pp")
      }
      else{
        setCurrentPaper({ title: title })
      }
     
      
    }
   
    
    setButtonDisabled(false)
    if (title == 'sizeOfGlasses' && id == 1) {
      
      setCurrentPaper({ title: 'CU6' })
    }
  
    else {
      setCurrentPaper({ title: title })
    }
    console.log(userEyesData)
  };

  return (
    <React.Fragment>
  {alert}

  
  {(()=>{
    console.log("userData",userData,"👌")
    switch (paper.title) {
      case 'login':
        return <Login paper='invition' />;
      case 'withOrWithoutPrescription':
        return <WithOrWithoutPrescription addInformation={addInformation} />;
      case 'sizeOfGlasses':
        return <SizeOfGlasses addInformation={addInformation} />;
      case 'verification':
        return <p>hi.....</p>;
      case 'CU6':
        return <CU6/>;
      case 'ShoppingCart':
        console.log("aaaa", eyeglasses.amount);
        const shoppingCart = { ...eyeglasses, ...userEyesData };
        const storedCart = JSON.parse(localStorage.getItem("ShoppingCart")) || [];
        let updatedCart;
        const itemIndex = storedCart.findIndex(item => item.id === shoppingCart.id);
        if (itemIndex !== -1) {
          if (storedCart[itemIndex].amount) {
            storedCart[itemIndex].amount++;
          } else {
            storedCart[itemIndex].amount = 1;
          }
          updatedCart = [...storedCart];
        } else {
          updatedCart = [...storedCart, shoppingCart];
        }
        localStorage.setItem("ShoppingCart", JSON.stringify(updatedCart));
        console.log(updatedCart);
        setCurrentEyeglasses({ ...eyeglasses, ...userEyesData });
        navigate(`/shoppingCart`);
        break;
      case 'paymentForm':
        setCurrentEyeglasses({ ...eyeglasses, ...userEyesData });
        navigate(`/paymentForm`);
        break;
      default:
        return <KindOfGlasses addInformation={addInformation} />;
    }
  })()}
</React.Fragment>
  );
}

export default Invitation;


