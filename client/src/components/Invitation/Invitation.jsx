import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import './Invitation.css'
import KindOfGlasses from './KindOfGlasses.jsx'
import CU6 from './CU6/CU6'
import { PaperContext } from "../../../src/PaperProvider.jsx"
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
  const [scroll, setScroll] = useState('paper');
  
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [alert, setAlert] = useState()
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
    console.log("😁","useEffect",paper.title)
    if(paper.title=='ShoppingCart'){

       setCurrentPaper({  title: 'kindOfGlasses'  })
    }
    // setCurrentPaper({  title: 'kindOfGlasses'  })
    
    
    setOpen(true)
    
    setScroll('paper');
  },[paper.title])


  return (
    <React.Fragment>
  {(()=>{
    console.log("userData",userData,"👌")
    console.log("@@@@@@@@@@@@22222",paper.title)
    switch (paper.title) {
      
      case 'login':
        return <Login paper='invition' />;
      case 'withOrWithoutPrescription':
        return <WithOrWithoutPrescription  />;
      case 'sizeOfGlasses':
        return <SizeOfGlasses  />;
      case 'CU6':
        return <CU6/>;
      case 'ShoppingCart':
        const shoppingCart = { ...eyeglasses, ...userData };
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
        setCurrentEyeglasses({ ...eyeglasses, ...userData });
        navigate(`/shoppingCart`);
        break;
      case 'paymentForm':
        setCurrentEyeglasses({ ...eyeglasses, ...userData });
        navigate(`/paymentForm`);
        break;
      default:
        return <KindOfGlasses  />;
    }
  })()}
</React.Fragment>
  );
}
export default Invitation;


