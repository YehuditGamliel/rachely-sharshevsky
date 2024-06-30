import { useState } from 'react';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentForm = () => {

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

  const addingPurchaseDetails = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const arrPurchaseDetails = JSON.parse(localStorage.getItem('ShoppingCart'));
    for (const dataPurchase of arrPurchaseDetails) {
      fetch(`http://localhost:8082/purchase`, {
        method: 'POST',
        body: JSON.stringify([{
          userName: currentUser.userName,
          price: dataPurchase.price,
          model: dataPurchase.model,
          idEyeData: 1
        },
        {
          SPHRight: dataPurchase.sizeOfGlasses.PWRRight,
          SPHLeft: dataPurchase.sizeOfGlasses.PWRLeft,
          CYLRight: dataPurchase.sizeOfGlasses.CYLRight,
          CYLLeft: dataPurchase.sizeOfGlasses.CYLLeft,
          PDFAR: dataPurchase.sizeOfGlasses.PDFAR,
          PDNEAR: dataPurchase.sizeOfGlasses.PDNEAR,
          idKindOfGlasses: 1,
          idCU6: 1,
          idKindOfPrescription: 1
        }]),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(response => response.json())
        .then((json) => {
          if (json.status != 200) {
            alert(json.error)
          }
          else {
          }
        })

    }
  }

  
  return (
    <>
      <> <></>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons onClick={() => addingPurchaseDetails()} />
        </PayPalScriptProvider></>
    </>
  );
}

export default PaymentForm;

