import { useState, useContext } from 'react';
import Cards from 'react-credit-cards-2';
import Button from '@mui/material/Button';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";


const PaymentForm = () => {
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);

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
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
         <input
          type="expiry"
          name="expiry"
          placeholder="expiry Number"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
             <input
          type="cvc"
          name="cvc"
          placeholder="cvc Number"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <Button onClick={payment}>ds</Button>
      </form>
    </div>
  );
}

export default PaymentForm;