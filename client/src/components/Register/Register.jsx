import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from "react";
// import { UserContext } from "../../EyeglassesProvider.jsx"
import Button from '@mui/material/Button';
import '../Register/Register.css'
import Login from '../Login/Login.jsx'
// import { Tab } from "@mui/material";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";


import Tab from '@mui/material/Tab';
function Register() {
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);

  const [extraDetails, setExterDetails] = useState(false)
  const [showLogin,setShowLogin]=useState(<Login/>);
  const [loginOrRegister,setLoginOrRegister]=useState(true);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      verifyPassword: ''
    }
  });

  

  const VerifyPassword = (user) => {
    if (user.password != user.verifyPassword) { return false; }
    else { return true; }
  }

  const checkRegister = (user) => {
    fetch(`http://localhost:8082/authorization/signUp?email=${user.email}`
    , {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status == 200) {
          if (!VerifyPassword(user))
            alert("Password verification is incorrect,try again!")
          else {
            addNewUser(user);
          }
        }
        else if (json.status == 400) {
          alert("userName is already taken. Please choose another!")
        }
        else {
          alert(json.error)
        }
      })
  };

  const addNewUser = (currentUser) => {
    fetch(`http://localhost:8082/authorization/signUp`, {
      method: 'POST',
      body: JSON.stringify({
        email: currentUser.email,
        userName: currentUser.userName,
        password: currentUser.password,
        isActive:1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          setCurrentUser({ userName: currentUser.userName, email: currentUser.email })
          localStorage.setItem('currentUser', JSON.stringify({ userName: currentUser.userName, email: currentUser.email }))
          //navigate(`/home/users/${json.data}`)
        }

      })
  }

const setLogin=()=>{
  setShowLogin(<Login/>)
  setLoginOrRegister(false)
}

  return (
    <>
    {
      loginOrRegister?((<div className="register-box">
      <form onSubmit={handleSubmit(checkRegister)}>
        <button onClick={()=>setLogin()}>Login</button>
        <h2>Sign Up</h2>
        <div className="user-box">
          <input type='text' name='userName' {...register("userName",
            { required: true, minLength: 2, maxLength: 15 })} placeholder="userName" />
          {errors.userName && errors.userName.type === "minLength" &&
            (<span>userName must be a minimum of 2 characters long!</span>)}
          {errors.userName && errors.userName.type === "maxlength" &&
            (<span>userName can be a maximum of 15 characters long</span>)}
          {errors.userName && errors.userName.type === "required" &&
            (<span>userName is required</span>)}
        </div>
        <div className="user-box">
              <input type='email' {...register("email", { required: true })} placeholder="email" />
              {errors.email && errors.email.type === "required" && (<span className="span">email is required</span>)}
            </div>
        <div className="user-box">
          <input type='password' name='password' {...register("password",
            { required: true, minLength: 6 })} placeholder="password" />
          {errors.password && errors.password.type === "minLength" &&
            (<span className="span">password must be a minimum of 6 characters long!</span>)}
          {errors.password && errors.password.type === "required" &&
            (<span className="span">password is required</span>)}
        </div>
        <div className="user-box">
          <input type='password' name='verifyPassword' {...register("verifyPassword",
            { required: true, minLength: 6 })} placeholder="verifyPassword" />
          {errors.verifyPassword && errors.verifyPassword.type === "minLength" &&
            (<span className="span">verify password must be a minimum of 6 characters long!</span>)}
          {errors.verifyPassword && errors.verifyPassword.type === "required" &&
            (<span className="span">verify password is required</span>)}
        </div>
        <button className='submit' type='submit'>submit</button>
      </form></div>)
    ):showLogin
    }
    </>
  )
}
export default Register;
