import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from "react";
import { UserContext } from "../../UserProvider"
import Button from '@mui/material/Button';
import '../Register/Register.css'
import Login from '../Login/Login.jsx'

function Register() {
  const { user, setCurrentUser } = useContext(UserContext);
  const [extraDetails, setExterDetails] = useState(false)
  const [showLogin,setShowLogin]=useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      verifyPassword: ''
    }
  });

  const { register: moreDetails, handleSubmit: handleSubmit2, formState: { errors: errors1 } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  });

  const VerifyPassword = (user) => {
    if (user.password != user.verifyPassword) { return false; }
    else { return true; }
  }

  const checkRegister = (user) => {
    fetch(`http://localhost:8082/authorization/signUp?email=${user.email}
    }`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status == 200) {
          if (!VerifyPassword(user))
            alert("Password verification is incorrect,try again!")
          else {
            setExterDetails(true);
            setCurrentUser({ userName: user.userName })
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
  const checkMoreDetails = (currentUser) => {
    fetch(`http://localhost:8082/authorization/signUp`, {
      method: 'POST',
      body: JSON.stringify({

        name: currentUser.name,
        userName: user.userName,
        email: currentUser.email,
        phone: currentUser.phone,
        password: user.password


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
          setCurrentUser({ id: json.data, userName: user.userName, email: user.email })
          localStorage.setItem('currentUser', JSON.stringify({ id: json.data, userName: user.userName, email: user.email }))
          navigate(`/home/users/${json.data}`)
        }

      })
  }



  return (
    <>
      {!extraDetails ? (<div className="register-box">
        <form onSubmit={handleSubmit(checkRegister)}>
        <Button onClick={()=>setShowLogin(<Login/>)}>Login</Button>
          {/* <Link className='linkRegister' to="/login">Login</Link> */}
          <h2>Sign Up</h2>
          <div className="user-box">
            <input type='text' name='email' {...register("email",
              { required: true, minLength: 2, maxLength: 15 })} placeholder="email" />
            {/* {errors.email && errors.email.type === "minLength" &&
              (<span>userName must be a minimum of 2 characters long!</span>)}
            {errors.userName && errors.userName.type === "maxlength" &&
              (<span>userName can be a maximum of 15 characters long</span>)}
            {errors.userName && errors.userName.type === "required" &&
              (<span>userName is required</span>)} */}
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
        : (
          <div className="register-box2">
            <h2>Extra Details</h2>
            <form onSubmit={handleSubmit2(checkMoreDetails)}>
              <div className="user-box2">
                <input type='text' {...moreDetails("name", { maxLength: 20 })} placeholder="name" />
                {errors.name && <span className="span">A name can be a maximum of 20 characters long</span>}
              </div>
              <div className="user-box2">
                <input type='email' {...moreDetails("email", { required: true })} placeholder="email" />
                {errors1.email && errors1.email.type === "required" && (<span className="span">email is required</span>)}
              </div>
              <div className="user-box2">
                <input type='number' {...moreDetails("phone", { maxLength: 10 })} placeholder="phone" />
                {errors.phone && <span className="span">phone number can be a maximum of 10 numbers long</span>}
              </div>
              <button type='submit' className='submit'>submit</button>
            </form>
            {showLogin}
            </div>
        )
      }
    </>
  )
}
export default Register;
