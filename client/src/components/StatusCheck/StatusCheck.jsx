import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StatusCheck/StatusCheck.css'
import { UserContext } from "../../hook/UserProvider.jsx";
import { Button } from '@mui/material';
import { APIRequests } from '../../APIRequests.js';
import Invitation from '../Invitation/Invitation.jsx';

const StatusCheck = () => {

  const [status, setStatus] = useState('')
  const [numOfInvitation, setnumOfInvitation] = useState();
  const [currentNavigate, setCurrentNavigate] = useState(false);
  const navigate = useNavigate();
  const { user, setCurrentUser } = useContext(UserContext);
  const APIRequest = new APIRequests()
  
  useEffect(() => {
    console.log(location.pathname.split('/')[3], "url")
    if (location.pathname.split('/')[3] != undefined) {
      setCurrentNavigate(true)
    }
  }, [])

  const checkStatusCheck = async () => {
    try{
      const response = await APIRequest.postRequest(`/purchase/getStatut`,{ userName: user.userName,idEyeData: numOfInvitation})
      const json = await response.json()
      console.log("json",response)
      setStatus(json.data[0].title)
    }
    catch(error){
      alert("!הנתונים לא נכונים")
    }
  }

  const exit=()=>{
    navigate('./home')
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
      {console.log("currentNavigate", currentNavigate)}
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
                  {status !== '' ? <p id="status">{status}</p> : null}
                  <button onClick={exit}>חזרה</button>
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


