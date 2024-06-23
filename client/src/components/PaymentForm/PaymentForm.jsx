import { useState, useContext } from 'react';
import Cards from 'react-credit-cards-2';
import Button from '@mui/material/Button';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Login from '../Login/Login.jsx'
import SimpleMap from '../SimpleMap.jsx';
const PaymentForm = () => {
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
};
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
const payment=()=>{
  console.log(eyeglasses)
  // fetch(`https://localhost:8082/todos`, {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           userEmail:eyeglasses.email,
  //           price:eyeglasses.price,
  //           model: eyeglasses.nodel,
  //           SPHRight:eyeglasses.SPHRight,
  //           SPHLeft:eyeglasses.SPHLeft,
  //           CYLRight:eyeglasses.CYLRight,
  //               // userId: id
  //         }),
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //         }
  //       })
  //         .then((response) => response.json())
  //         .then((json) => {
  //           if (json.status != 200) {
  //             alert(json.error)
  //           }
  //           else {
              
  //           }
  //         })

}
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    console.log(name,value)
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return ( 
    <>
       {/* eyeglasses.userName?(<Login/>): */}
    <> <></>
    <PayPalScriptProvider options={initialOptions}>
    <PayPalButtons />
 </PayPalScriptProvider></>
 {/* ?<></> */}
   
 </>
  );
}

export default PaymentForm;