import { useState } from 'react';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { APIRequests } from '../../APIRequests';
import { Button } from '@mui/material';

const PaymentForm = () => {
  const APIRequest = new APIRequests()

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

//   const removeArrayFromLocalStorage = () => {
//     // Retrieve all data from local storage
//     const allData = JSON.parse(localStorage.getItem('yourLocalStorageKey'));

// };

  const addingPurchaseDetails = async () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const arrPurchaseDetails = JSON.parse(localStorage.getItem('ShoppingCart'));

        for (const dataPurchase of arrPurchaseDetails) {
            const response = await APIRequest.postRequest(`/purchase`, [
                {
                    SPHRight: dataPurchase.SizeOfGlasses.PWRRight,
                    SPHLeft: dataPurchase.SizeOfGlasses.PWRLeft,
                    CYLRight: dataPurchase.SizeOfGlasses.CYLRight,
                    CYLLeft: dataPurchase.SizeOfGlasses.CYLLeft,
                    PDFAR: dataPurchase.SizeOfGlasses.PDFAR,
                    PDNEAR: dataPurchase.SizeOfGlasses.PDNEAR,
                    idKindOfGlasses: 1,
                    idCU6: 1,
                    idKindOfPrescription: 1,
                    status: 1,
                },
                {
                    
                    userName: currentUser.userName,
                    price: dataPurchase.price,
                    model: dataPurchase.model,
                },
                {
                    
                    model: dataPurchase.model,
                },{
                  email: currentUser.email,
                }
            ]);
            const json = await response.json();
            localStorage.removeItem('ShoppingCart')
            
            alert("הקניה בוצעה בהצלחה. ברגעים אלו נשלח אליך מייל לאישור");
        }
    } catch (error) {
        alert("אין אפשרות לבצע קניה!");
    }
};


  return (
    <>
      <> 

          <h2 id="payingTitle">לתשלום נא בחר אפשרות תשלום</h2>
        <PayPalScriptProvider className="payingButton" options={initialOptions}>
          <PayPalButtons  className="payingButton" onClick={() => addingPurchaseDetails()} />
        </PayPalScriptProvider></>
        {/* <button onClick={() => addingPurchaseDetails()}>לתשלום</button> */}
    </>
  );
}

export default PaymentForm;

