import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Paper from '@mui/material/Paper';
import { useState, useContext } from 'react';
import Alert from '@mui/material/Alert';
//import { UserContext } from "../../EyeglassesProvider.jsx";
import { styled } from '@mui/material/styles';
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import PaymentForm from '../PaymentForm/PaymentForm'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Invitation.css'
import KindOfClasses from './kindOfGlasses/kindOfGlasses';
import CU6 from './CU6/CU6'
import WithOrWithoutPrescription from './WithOrWithoutPrescription/WithOrWithoutPrescription';
import SizeOfGlasses from './SizeOfGlasses/SizeOfGlasses';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function Invitation() {
  const [paymentForm, setPaymentForm] = useState('');
  const [shoppingCart, setShoppingCart] = useState('');
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [userEyesData, setUserEyesdata] = useState({ });
  const [disable, setDisable] = useState(1);
  const [style, setStyle] = useState("noneBorder");
  const [paper, setPaper] = useState({ title: '' })
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [kindOfGlasses, setKindOfGlasses] = useState('')
  const [withOrWithoutPrescription, setWithOrWithoutPrescription] = useState('')
  // {"PWRRight":0,"CYLRight":0,"PWRLeft":0,"CYLLeft":0,"PDFAR":62,"PDNEAR":62}
  const [sizeOfGlasses,setSizeOfGlasses]=useState();
  const [alert, setAlert] = useState()
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
  const addInformation = (name, id, title) => {
  console.log("pppp",name, id, title)
  // if(title=='paymentForm'){
  //   setPaymentForm(<PaymentForm/>)
  // }
    if(name=='sizeOfGlasses'){
      setUserEyesdata(userItem => ({
        ...userItem,
        [name]: id,
        // amount: 1
      }));
      
    }
    else{
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
      <Button variant="outlined" onClick={()=>{handleClickOpen('paper')
         
         eyeglasses.stock==0?

        setAlert(<Alert severity="error">אין מספיק במלאי!.</Alert>):setPaper({ title: 'kindOfGlasses' })}

      } startIcon={<RemoveRedEyeIcon />}>לבחירת עדשות</Button>
      {(() => {
        if (paper.title == 'kindOfGlasses') {
          return (
            <KindOfClasses 
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
        else if(paper.title == 'verification'){
         return(
          <>
          <p>hi.....</p>
          </>
         )
        }
        else if(paper.title == 'CU6'){
         
          return ( 
            <CU6  addInformation={addInformation} />
          )
        }
        else if(paper.title=="ShoppingCart")
          {
            console.log("aaaa",eyeglasses.amount)
            
           
            const shoppingCart = { ...eyeglasses, ...userEyesData };
            const storedCart = JSON.parse(localStorage.getItem("ShoppingCart")) || [];
            let updatedCart;
            
            // Check if the shoppingCart item is already in storedCart
            const itemIndex = storedCart.findIndex(item => item.model === shoppingCart.model);            
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
            navigate(`/shoppingCart`);
          }
        else if(paper.title=="paymentForm"){
          setCurrentEyeglasses( { ...eyeglasses, ...userEyesData })
          navigate(`/paymentForm`)
        }
        else{

        }
      })()}
    </React.Fragment>
  );}

export default Invitation;
