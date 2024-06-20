import { useState, useContext,useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import Button from '@mui/material/Button';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Login from '../Login/Login.jsx'
// import { Map, Marker} from "@vis.gl/react-google-maps";
import axios from 'axios';
import { Client } from "@googlemaps/google-maps-services-js";
const PaymentForm = () => {
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  // const [elevation, setElevation] = useState(null);
 

  
    // shows marker on London by default
    const [markerLocation, setMarkerLocation] = useState({
      lat: 51.509865,
      lng: -0.118092,
    });
  
   
     
  
  
  // useEffect(() => {
  //   const client = new Client({});
  //   client.elevation({
  //     params: {
  //       locations: [{ lat: 45, lng: -110 }],
  //       key: 38693587997 // Replace with your Google Maps API key
  //     },
  //     timeout: 1000 // milliseconds
  //   })
  //     .then(response => {
  //       setElevation(response.data.results[0].elevation);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching elevation data:', error);
  //     });
  // }, []);
//   const [state, setState] = useState({
//     number: '',
//     expiry: '',
//     cvc: '',
//     name: '',
//     focus: '',
//   });
// const payment=()=>{
//   console.log(eyeglasses)
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

// }
//   const handleInputChange = (evt) => {
//     const { name, value } = evt.target;
//     console.log(name,value)
    
//     setState((prev) => ({ ...prev, [name]: value }));
//   }

//   const handleInputFocus = (evt) => {
//     setState((prev) => ({ ...prev, focus: evt.target.name }));
//   }
const initialOptions = {
  clientId: "test",
  currency: "USD",
  intent: "capture",
};
// const client = new Client({});
// const client = new Client({
//   axiosInstance: axios
// });

// client.elevation({
//   params: {
//     locations: [{ lat: 45, lng: -110 }],
//     key:'AIzaSyBFDq1cT9s7a5PnMbO9MlRc1HiWgV12tJI' // Replace with your Google Maps API key
//   },
//   timeout: 1000 // milliseconds
// })
// .then(response => {
//   console.log(response.data.results[0].elevation);
// })
// .catch(error => {
//   console.error('Error fetching elevation data:', error);
// });
// client
//   .elevation({
//     params: {
//       locations: [{ lat: 45, lng: -110 }],
//       key: 38693587997
//     },
//     timeout: 1000 // milliseconds
//   })
//   .then(r => {
//     console.log(r.data.results[0].elevation);
//   })
//   .catch(e => {
//     console.log(e);
//   });
  return (
    <div className="map-container">
    <Map
      style={{ borderRadius: "20px" }}
      defaultZoom={13}
      defaultCenter={markerLocation}
      gestureHandling={"greedy"}
      disableDefaultUI
    >
      <Marker position={markerLocation} />
    </Map>
  </div>
    //eyeglasses.userName?(<Login/>):
//     <> <PayPalScriptProvider options={initialOptions}>
//     <PayPalButtons />
// </PayPalScriptProvider>

// </>
  //   <div>
  //     <Cards
  //       number={state.number}
  //       expiry={state.expiry}
  //       cvc={state.cvc}
  //       name={state.name}
  //       focused={state.focus}
  //     />
  //     <form>
  //       <input
  //         type="number"
  //         name="number"
  //         placeholder="Card Number"
  //         value={state.number}
  //         onChange={handleInputChange}
  //         onFocus={handleInputFocus}
  //       />
  //        <input
  //         type="expiry"
  //         name="expiry"
  //         placeholder="expiry Number"
  //         value={state.expiry}
  //         onChange={handleInputChange}
  //         onFocus={handleInputFocus}
  //       />
  //            <input
  //         type="cvc"
  //         name="cvc"
  //         placeholder="cvc Number"
  //         value={state.cvc}
  //         onChange={handleInputChange}
  //         onFocus={handleInputFocus}
  //       />
  //       <Button onClick={payment}>ds</Button>
  //     </form>
  //   </div>
  );
}

export default PaymentForm;