import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import '../Register/Register.css'
import Login from '../Login/Login.jsx'
import OTPInput, { ResendOTP } from "otp-input-react";
import { APIRequests } from "../../APIRequests";
import JsonData from '../../assets/data.json'
import Invitation from "../Invitation/Invitation.jsx";

function Register({paper1= 'defaultPaperValue' }) {
  const [showLogin, setShowLogin] = useState(<Login />);
  const [loginOrRegister, setLoginOrRegister] = useState(true);
  const [authorization, setAuthorization] = useState(false)
  const [invitation,setInvitation]=useState(false)
  const APIRequest = new APIRequests();
  const [tempUser,setTempUse]=useState()
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      verifyPassword: ''
    }
  });

  const [OTP, setOTP] = useState("");
  useEffect(() => {
    if (OTP.length === 6) {
      verificationOtp();
      console.log('Starting function after OTP entry:', OTP);
    
    }
  }, [OTP]);

  const verificationOtp = async () => {
    try{
      const response = await APIRequest.postRequest(`/authorization/verify`, { userName: tempUser.userName, otp: OTP });
          localStorage.setItem('currentUser', JSON.stringify({ userName: tempUser.userName, email: tempUser.email,role:0 }))
          if (paper1 == 'defaultPaperValue') {
            navigate('./home')
          }
        else {
            setInvitation(true)
        }
       }
    catch(error){
      alert("הקוד שהוזן לא תקין , אנא הרשם שנית")
    }
  }

  const VerifyPassword = (user) => {
    if (user.password != user.verifyPassword) { return false; }
    else { return true; }
  }

  const checkRegister = async (user) => {
    if (!VerifyPassword(user)) {
      alert("Password verification is incorrect,try again!")
      return;
    }
    try{
      const response = await APIRequest.postRequest(`/authorization/signUp`, { email: user.email, userName: user.userName, password: user.password });
      setAuthorization(true)
      setTempUse({userName: user.userName, email: user.email})
    }
    catch(error)
    {
      alert("שם משתמש קיים בבקשה להרשם מחדש")
      setShowLogin(<Login />)
    }
  };

  const setLogin = () => {
    setLoginOrRegister(false)
    setShowLogin(<Login />)
  }

  return (
    <> 
    <div className="register-box">
      {invitation ? <Invitation /> :
        <div>
          {authorization ? (
            <>
              <p id="otpTitle">{JsonData.otpMessage.title}</p>
              <p id="otpP">{JsonData.otpMessage.p}</p>
              <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
            </>
          ) : (
            loginOrRegister ? (
              <>
                <form onSubmit={handleSubmit(checkRegister)}>
                  <button id="buttonLogin" type="button" onClick={() => setLogin()}>כניסה</button>
                  <div className="user-box">
                    <input
                      type='text'
                      name='userName'
                      {...register("userName", { required: true, minLength: 2, maxLength: 15 })}
                      placeholder="שם משתמש"
                    />
                    {errors.userName && errors.userName.type === "minLength" && <span>שם משתמש צריך להכיל לפחות 2 תווים</span>}
                    {errors.userName && errors.userName.type === "maxlength" && <span>שם משתמש צריך להכיל מקסימום 15 תווים</span>}
                    {errors.userName && errors.userName.type === "required" && <span>שם משתמש הוא שדה חובה</span>}
                  </div>
                  <div className="user-box">
                    <input
                      type='email'
                      {...register("email", { required: true })}
                      placeholder="אמייל"
                    />
                    {errors.email && errors.email.type === "required" && <span className="span">מייל הוא שדה חובה</span>}
                  </div>
                  <div className="user-box">
                    <input
                      type='password'
                      name='password'
                      {...register("password", { required: true, minLength: 6 })}
                      placeholder="סיסמא"
                    />
                    {errors.password && errors.password.type === "minLength" && <span className="span">סיסמא צריכה להכיל לפחות 6 תווים</span>}
                    {errors.password && errors.password.type === "required" && <span className="span">סיסמא זה שדה חובה</span>}
                  </div>
                  <div className="user-box">
                    <input
                      type='password'
                      name='verifyPassword'
                      {...register("verifyPassword", { required: true, minLength: 6 })}
                      placeholder="אימות סיסמא"
                    />
                    {errors.verifyPassword && errors.verifyPassword.type === "minLength" && <span className="span">סיסמא לאימות צריכה להכיל לפחות 6 תווים</span>}
                    {errors.verifyPassword && errors.verifyPassword.type === "required" && <span className="span">סיסמא לאימות - חובה</span>}
                  </div>
                  <button className='submit' type='submit'>שליחה</button>
                </form>
              </>
            ) : (
              showLogin
            )
          )}
        </div>
      }
    </div></>
  );
}
export default Register;
