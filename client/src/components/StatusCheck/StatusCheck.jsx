import {useContext, useState,useEffect } from 'react';
import '../StatusCheck/StatusCheck.css'
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import jsonData from '../../assets/data.json'
const StatusCheck = () => {
  
  const [status,setStatus]=useState('')
const [numOfInvitation,setnumOfInvitation]=useState();
  
const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
// useEffect(() => {
//  setStatus('')
// }, []);
const checkStatusCheck=()=>{
  
  fetch(`http://localhost:8082/purchase/getStatut`, {
    method: 'POST',
    body: JSON.stringify({
      userName:eyeglasses.userName,
      id:numOfInvitation
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(response => response.json())
    .then((json) => {
      // console.log(json.data[0].status)
        if (json.status != 200) {
            alert("נתונים לא נכונים!")
        }
        else{
         setStatus(json.data[0].status) 
        }
    })

}
const handleInputChange = (event) => {
  setnumOfInvitation(event.target.value);
};
  
  return (
    <>
    <div className='status-background'>
    <div className='status-box'>
      <p>מה עם ההזמנה שלי?</p>
      <p>אנא הכנס מספר הזמנה </p>
      <input type="number"  placeholder="מספר הזמנה" min="100000" max="999999" onChange={handleInputChange}/>
      <button onClick={()=>checkStatusCheck()}></button>
       <p>סטטוס ההזמנה שלך:</p>
       {status!=''?<p id="status">{jsonData.statusValue[1].status}</p>:<></>}
      
      </div>
     
      </div>

    </>
  );
}

export default StatusCheck;


  //const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
//import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
// const handleInputChange = (evt) => {
  //   const { name, value } = evt.target;
  //   console.log(name, value)

  //   setState((prev) => ({ ...prev, [name]: value }));
  // }

  // const handleInputFocus = (evt) => {
  //   setState((prev) => ({ ...prev, focus: evt.target.name }));
  // }