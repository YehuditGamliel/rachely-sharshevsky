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

  const addingPurchaseDetails = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const arrPurchaseDetails = JSON.parse(localStorage.getItem('ShoppingCart'));
    for (const dataPurchase of arrPurchaseDetails) {
      const response = await APIRequest.postRequest(`/purchase`,
        [{
          SPHRight: dataPurchase.SizeOfGlasses.PWRRight,
          SPHLeft: dataPurchase.SizeOfGlasses.PWRLeft,
          CYLRight: dataPurchase.SizeOfGlasses.CYLRight,
          CYLLeft: dataPurchase.SizeOfGlasses.CYLLeft,
          PDFAR: dataPurchase.SizeOfGlasses.PDFAR,
          PDNEAR: dataPurchase.SizeOfGlasses.PDNEAR,
          idKindOfGlasses: 1,
          idCU6: 1,
          idKindOfPrescription: 1,
          status:1,
        }, {
          userName: currentUser.userName,
          price: dataPurchase.price,
          model: dataPurchase.model,
        }, {
          email:currentUser.email,
          model: dataPurchase.model,
        }])
      const json = await response.json()
      if (json.status != 200) {
        alert(json.error)
      }

      // fetch(`http://localhost:8082/purchase`, {
      //   method: 'POST',
      //   body: JSON.stringify([
      //     {
      //       SPHRight: dataPurchase.sizeOfGlasses.PWRRight,
      //       SPHLeft: dataPurchase.sizeOfGlasses.PWRLeft,
      //       CYLRight: dataPurchase.sizeOfGlasses.CYLRight,
      //       CYLLeft: dataPurchase.sizeOfGlasses.CYLLeft,
      //       PDFAR: dataPurchase.sizeOfGlasses.PDFAR,
      //       PDNEAR: dataPurchase.sizeOfGlasses.PDNEAR,
      //       idKindOfGlasses: 1,
      //       idCU6: 1,
      //       idKindOfPrescription: 1
      //     },
      //     {
      //     userName: currentUser.userName,
      //     price: dataPurchase.price,
      //     model: dataPurchase.model,
      //   },{
      //     stock:5,
      //     model: dataPurchase.model,
      //   }
      //   ]),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // }).then(response => response.json())
      //   .then((json) => {
      //     if (json.status != 200) {
      //       alert(json.error)
      //     }

      //   })

    }
  }


  return (
    <>
      <> <></>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons onClick={() => addingPurchaseDetails()} />
        </PayPalScriptProvider></>
        <button onClick={() => addingPurchaseDetails()}>לתשלום</button>
    </>
  );
}

export default PaymentForm;

