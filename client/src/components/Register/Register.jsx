
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import '../Register/Register.css'
import Login from '../Login/Login.jsx'
import { UserContext } from "../../UserProvider.jsx";
// import OtpInput from 'react-otp-input';
// import OtpInput1 from "../OtpInput1/OtpInput1.jsx";
import OTPInput, { ResendOTP } from "otp-input-react";
import { APIRequests } from "../../APIRequests";
import JsonData from '../../assets/data.json'
import Invitation from "../Invitation/Invitation.jsx";
import { Divider } from "@mui/material";
import { useCookies } from 'react-cookie';
function Register({paper1= 'defaultPaperValue' }) {
  const { user, setCurrentUser } = useContext(UserContext);
  // const [otp, setOtp] = useState('');
  const [extraDetails, setExterDetails] = useState(false)
  const [showLogin, setShowLogin] = useState(<Login />);
  const [loginOrRegister, setLoginOrRegister] = useState(true);
  const [authorization, setAuthorization] = useState(false)
  const [invitation,setInvitation]=useState(false)
  const APIRequest = new APIRequests();
  const [tempUser,setTempUse]=useState()
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
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
    const response = await APIRequest.postRequest(`/authorization/verify`, { userName: tempUser.userName, otp: OTP });
    const json = await response.json();
    console.log(json)
    if (json.status == 200) {
      if (json.data[0] == false)
        if (json.data[1] == "User not found")
          alert("משתמש לא קיים!")
        else {
          alert("הקוד שהוזן לא תקין , אנא בקש קוד חדש ונסה שנית")
        }
      else {
        console.log(tempUser,"💕",paper1 == 'defaultPaperValue')
        localStorage.setItem('currentUser', JSON.stringify({ userName: tempUser.userName, email: tempUser.email,role:0 }))
        if (paper1 == 'defaultPaperValue') {
          navigate('./home')
      }
      else {
        
          setInvitation(true)

        
      }
      }
    }
    else {
      alert(json.error)
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
    const response = await APIRequest.postRequest(`/authorization/signUp`, { email: user.email, userName: user.userName, password: user.password });
    
    console.log("response",response)
    if (response.status === 200) {
      const json = await response.json()
      setCookie('token', json.token, { path: '/' });
      setAuthorization(true)
           // setCurrentEyeglasses({ userName: user.userName, email: user.email, password: user.password })

      setTempUse({userName: user.userName, email: user.email})
    }
    else if (response.status == 400) {
      alert(json.error)
      setLogin(<Login />)
    }
    else {
      alert(response.error)
    }
  };

  const setLogin = () => {
    setShowLogin(<Login />)
    setLoginOrRegister(false)
  }

  return (
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
                  <button type="button" onClick={() => setLogin()}>Login</button>
                  <h2>Sign Up</h2>
                  <div className="user-box">
                    <input
                      type='text'
                      name='userName'
                      {...register("userName", { required: true, minLength: 2, maxLength: 15 })}
                      placeholder="userName"
                    />
                    {errors.userName && errors.userName.type === "minLength" && <span>userName must be a minimum of 2 characters long!</span>}
                    {errors.userName && errors.userName.type === "maxlength" && <span>userName can be a maximum of 15 characters long</span>}
                    {errors.userName && errors.userName.type === "required" && <span>userName is required</span>}
                  </div>
                  <div className="user-box">
                    <input
                      type='email'
                      {...register("email", { required: true })}
                      placeholder="email"
                    />
                    {errors.email && errors.email.type === "required" && <span className="span">email is required</span>}
                  </div>
                  <div className="user-box">
                    <input
                      type='password'
                      name='password'
                      {...register("password", { required: true, minLength: 6 })}
                      placeholder="password"
                    />
                    {errors.password && errors.password.type === "minLength" && <span className="span">password must be a minimum of 6 characters long!</span>}
                    {errors.password && errors.password.type === "required" && <span className="span">password is required</span>}
                  </div>
                  <div className="user-box">
                    <input
                      type='password'
                      name='verifyPassword'
                      {...register("verifyPassword", { required: true, minLength: 6 })}
                      placeholder="verifyPassword"
                    />
                    {errors.verifyPassword && errors.verifyPassword.type === "minLength" && <span className="span">verify password must be a minimum of 6 characters long!</span>}
                    {errors.verifyPassword && errors.verifyPassword.type === "required" && <span className="span">verify password is required</span>}
                  </div>
                  <button className='submit' type='submit'>submit</button>
                </form>
              </>
            ) : (
              showLogin
            )
            
          )}
        </div>
      }
    </div>
  );
}
export default Register;
