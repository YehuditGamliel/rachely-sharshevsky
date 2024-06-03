

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


import Paper from '@mui/material/Paper';
import { useState, useContext } from 'react';
import { UserContext } from "../../UserProvider";
import { styled } from '@mui/material/styles';
//import ShoppingCart from '../ShoppingCart/ShoppingCart'
import PaymentForm from '../PaymentForm/PaymentForm'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Invitation.css'


import KindOfClasses from './kindOfGlasses/kindOfGlasses';
import CU6 from './CU6/CU6'
import WithOrWithoutPrescription from './WithOrWithoutPrescription/WithOrWithoutPrescription';
import SizeOfGlasses from './SizeOfGlasses/SizeOfGlasses';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function Invitation(model) {
  const [userEyesData, setUserEyesdata] = useState({ model: model.model });
  const [paymentForm, setPaymentForm] = useState('');
  const [shoppingCart, setShoppingCart] = useState('');
  const { user, setCurrentUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [disable, setDisable] = useState(1);
  const [style, setStyle] = useState("noneBorder");
  const [paper, setPaper] = useState({ title: 'kindOfGlasses' })
  const [buttonBorder, setButtonBorder] = useState({ a: "noneBorder", b: "noneBorder", c: "noneBorder", d: "noneBorder" })
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [kindOfGlasses, setKindOfGlasses] = useState('')
  const [withOrWithoutPrescription, setWithOrWithoutPrescription] = useState('')
  const [sizeOfGlasses,setSizeOfGlasses]=useState({"PWRRight":0,"CYLRight":0,"PWRLeft":0,"CYLLeft":0,"PDFAR":62,"PDNEAR":62});
  //const [CU6, setCU6] = useState('')
  
 
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
  const addInformation = (name, id, title) => {
  console.log("pppp",name, id, title)
  // if(title=='paymentForm'){
  //   setPaymentForm(<PaymentForm/>)
  // }
    if(name=='sizeOfGlasses'){
      
      setUserEyesdata(userItem => ({
        ...userItem,
        [name]: id
      }));
    }
    else{
      // var valueInt = Number(value);
      setUserEyesdata(userItem => ({
        ...userItem,
        [name]: id
      }));
    }
console.log(userEyesData)
    if (name == 'withOrWithoutPrescription') {
      if (id == "1")
        setPaper({ title: 'verification' })
        //setLogin(<Login />)
    }

    setButtonDisabled(false)
    setButtonBorder({ 1: "noneBorder", 2: "noneBorder", 3: "noneBorder", 4: "noneBorder" })
    
    if (title == 'sizeOfGlasses' && id == 1) {
     alert(id)
      setPaper({ title: 'CU6' })
    }
    else {
      setPaper({ title: title })
    }
    console.log(userEyesData)
  };

 
  const changeStyle=(char)=>{
    // alert(char)
    switch (char) {
      case '1': {
        setButtonBorder({ a: "border", b: "noneBorder", c: "noneBorder", d: "noneBorder" })
        break;
      }
      case 'b': {
        setButtonBorder({ a: "noneBorder", b: "border", c: "noneBorder", d: "noneBorder" })
        break;
      }
      case 'c': {
        setButtonBorder({ a: "noneBorder", b: "noneBorder", c: "border", d: "noneBorder" })
        break;
      }
      default: {
        setButtonBorder({ a: "noneBorder", b: "noneBorder", c: "noneBorder", d: "border" })
      }
    }
  }
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={()=>{handleClickOpen('paper')
         setPaper({ title: 'kindOfGlasses' })}

      } startIcon={<RemoveRedEyeIcon />}>לבחירת עדשות</Button>
      {(() => {
        if (paper.title == 'kindOfGlasses') {
          return (
            <KindOfClasses 
                addInformation={addInformation} changeStyle={changeStyle} buttonBorder={buttonBorder}/> 
          )
        } else if (paper.title == 'withOrWithoutPrescription') {
          return (
            <WithOrWithoutPrescription buttonBorder={buttonBorder} isButtonDisabled={isButtonDisabled}  changeStyle={changeStyle} addInformation={addInformation}/> 
          )
        }
        else if (paper.title == 'sizeOfGlasses') {
          return (
       <SizeOfGlasses buttonBorder={buttonBorder} isButtonDisabled={isButtonDisabled}  changeStyle={changeStyle} addInformation={addInformation}/>
          )
        }
        else if(paper.title == 'verification'){
         return(
          <>
          <p>hi.....</p>
          </>
         )
        }
        else if(paper.title == 'CU6'){
         
          return ( 
            <CU6 buttonBorder={buttonBorder} isButtonDisabled={isButtonDisabled}  changeStyle={changeStyle} addInformation={addInformation}/>

          )
        }
        else{
          return(<PaymentForm/>)
        }
        console.log({ user })
      })()}
       
    </React.Fragment>
  );}

export default Invitation;
