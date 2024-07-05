import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../StatusCheck/StatusCheck.css'
import { UserContext } from "../../hook/UserProvider.jsx";
import jsonData from '../../assets/data.json'
import { Button } from '@mui/material';
import { APIRequests } from '../../APIRequests.js';
import Invitation from '../Invitation/Invitation.jsx';
import { useCookies } from 'react-cookie';

const StatusCheck = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [status, setStatus] = useState('')
  const [numOfInvitation, setnumOfInvitation] = useState();
  const[currentNavigate,setCurrentNavigate]=useState(false);
  const navigate = useNavigate();
  const { user, setCurrentUser } = useContext(UserContext);
  const APIRequest = new APIRequests()
  useEffect(() => {
    // alert("pp")
    console.log(location.pathname.split('/')[3],"url")
    if(location.pathname.split('/')[3]!=undefined){
      setCurrentNavigate(true)
      // history.pushState(null, '', `/eyeglasses/${location.pathname.split('/')[2]}/${location.pathname.split('/')[3]}/invitation`);
    }
}, [])
  const checkStatusCheck = () => {

   

    const response = APIRequest.postRequest(`/purchase/getStatut`, { userName: user.userName, id: numOfInvitation })
    const json = response.json()
    if (json.status != 200) {
      alert("נתונים לא נכונים!")
    }
    else {
      setStatus(json.data[0].status)
    }
  
  }
  const handleClick = (event) => {
    localStorage.clear()
    removeCookie('token', { path: '/' });
    navigate('./home')
    setCurrentUser({})
  }
  const handleInputChange = (event) => {
    setnumOfInvitation(event.target.value);
  };

  return (
    <>
    {console.log("currentNavigate",currentNavigate)}
     {currentNavigate ? <Invitation /> :
        <div>
          {user.role === 0 ? (
            <>
              <div className='status-background'>
                <Button onClick={handleClick}> יציאה</Button>
                <div className='status-box'>
                  <p className="titleForIntormations">מה עם ההזמנה שלי?</p>
                  <p className="titleForIntormations">אנא הכנס מספר הזמנה </p>
                  <input type="number" placeholder="מספר הזמנה" min="100000" max="999999" onChange={handleInputChange} />
                  <button onClick={() => checkStatusCheck()}>לבדיקת סטטוס ההזמנה</button>
                  <p className="titleForIntormations">סטטוס ההזמנה שלך:</p>
                  {status !== '' ? <p id="status">{jsonData.statusValue[1].status}</p> : null}
                </div>
              </div>
            </>
          ) : <div className='status-background'><Button className='buttonExit' onClick={handleClick}>יציאה</Button></div>
          }
        </div>
      }
    </>
  );
}
export default StatusCheck;


