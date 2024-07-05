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
  const [currentNavigate, setCurrentNavigate] = useState(false);
  const navigate = useNavigate();
  const { user, setCurrentUser } = useContext(UserContext);
  const APIRequest = new APIRequests()
  
  useEffect(() => {
    // alert("pp")
    console.log(location.pathname.split('/')[3], "url")
    if (location.pathname.split('/')[3] != undefined) {
      setCurrentNavigate(true)
      // history.pushState(null, '', `/eyeglasses/${location.pathname.split('/')[2]}/${location.pathname.split('/')[3]}/invitation`);
    }
  }, [])

  const checkStatusCheck = () => {
    fetch(`http://localhost:8082/purchase/getStatut`, {
      method: 'POST',
      body: JSON.stringify({
        userName: user.userName,
        idEyeData: numOfInvitation

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert("נתונים לא נכונים!")
        }
        else {
          alert(json.data[0])
          setStatus(json.data[0].title)
        } 
      })
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


