import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Alert from '@mui/material/Alert';
import Header from '../Header/header.jsx';
import JsonData from '../../assets/data.json'
import './Invitation.css'
import KindOfGlasses from './KindOfGlasses.jsx'
import CU6 from './CU6/CU6'
import WithOrWithoutPrescription from './WithOrWithoutPrescription/WithOrWithoutPrescription';
import SizeOfGlasses from './SizeOfGlasses/SizeOfGlasses';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";


function Invitation() {

  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [userEyesData, setUserEyesdata] = useState({});
  const [paper, setPaper] = useState({ title: '' })
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [alert, setAlert] = useState()
  // const [counter,setCounter]=useState(0)

  const navigate = useNavigate();
  const withOrWithoutPrescriptionArry = ["prescriptionSaved", "fillingPrescription"]
  const CU6Arry = ["1.5", "1.6", "1.67", "1.74"];

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
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
  },[])

  const addInformation = (name, id, title) => {
   
   console.log("😂",CU6[id])
     if(name=='CU6'){
     
      console.log("price",eyeglasses.price)
      setCurrentEyeglasses(prevState => {
        return { ...prevState, price: price+JsonData.CU6[id].price }; // Update field2 with newValue
      });
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
        setPaper({ title: 'CU6' })
        setUserEyesdata(userItem => ({
          ...userItem,
          ['withOrWithoutPrescription']: 0,
          ['sizeOfGlasses']: {}
        }));
        alert("pp")
      }
      else{
        setPaper({ title: title })
      }
     
      
    }
   
    if (name == 'withOrWithoutPrescription') {
      if (id == "1")
        setPaper({ title: 'verification' })
    }
    setButtonDisabled(false)
    if (title == 'sizeOfGlasses' && id == 1) {
      alert(id)
      setPaper({ title: 'CU6' })
    }
  
    else {
      setPaper({ title: title })
    }
    console.log(userEyesData)
  };

  return (
    <React.Fragment>
      {alert}
      <Button variant="outlined" onClick={() => {
        handleClickOpen('paper')
        eyeglasses.stock == 0 ?
          setAlert(<Alert severity="error">אין מספיק במלאי!.</Alert>) : setPaper({ title: 'kindOfGlasses' })
      }

      } startIcon={<RemoveRedEyeIcon />}>לבחירת עדשות</Button>
      {(() => {
        if (paper.title == 'kindOfGlasses') {
          return (
            <KindOfGlasses
              addInformation={addInformation} />
          )
        } else if (paper.title == 'withOrWithoutPrescription') {
          return (
            <WithOrWithoutPrescription addInformation={addInformation} />
          )
        }
        else if (paper.title == 'sizeOfGlasses') {
          return (
            <SizeOfGlasses addInformation={addInformation} />
          )
        }
        else if (paper.title == 'verification') {
          return (
            <>
              <p>hi.....</p>
            </>
          )
        }
        else if (paper.title == 'CU6') {
          return (
            <CU6 addInformation={addInformation} />
          )
        }
        else if (paper.title == "ShoppingCart") {


            console.log("aaaa", eyeglasses.amount)
            const shoppingCart = { ...eyeglasses, ...userEyesData };
            const storedCart = JSON.parse(localStorage.getItem("ShoppingCart")) || [];
            let updatedCart;
  
            // Check if the shoppingCart item is already in storedCart
            const itemIndex = storedCart.findIndex(item => item.id === shoppingCart.id);
            // If the item is not already in the cart, add it
            if (itemIndex !== -1) {
              // Update the quantity of the existing item by increasing by 1 if the item and 'amount' property exist
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
            setCurrentEyeglasses({ ...eyeglasses, ...userEyesData })
            navigate(`/shoppingCart`);
          
  


        }
        else if (paper.title == "paymentForm") {
          setCurrentEyeglasses({ ...eyeglasses, ...userEyesData })
          navigate(`/paymentForm`)
        }
        else {

        }
      })()}
    </React.Fragment>
  );
}

export default Invitation;


