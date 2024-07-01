
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import '../Register/Register.css'
import Login from '../Login/Login.jsx'
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import OtpInput from 'react-otp-input';
import { APIRequests } from "../../APIRequests";

function Register() {
  const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
  const [otp, setOtp] = useState('');
  const [extraDetails, setExterDetails] = useState(false)
  const [showLogin, setShowLogin] = useState(<Login />);
  const [loginOrRegister, setLoginOrRegister] = useState(true);
  const [authorization, setAuthorization] = useState(false)
  const APIRequest = new APIRequests();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      verifyPassword: ''
    }
  });

  useEffect(() => {
    if (otp.length === 6) {
      verificationOtp();
      console.log('Starting function after OTP entry:', otp);
    }
  }, [otp]);

  const verificationOtp = async () => {
    const response = await APIRequest.postRequest(`/authorization/verify`, { userName: eyeglasses.userName, otp: otp });
    const json = await response.json();
    if (json.status == 200) {
      if (json.data[0] == false)
        if (json.data[1] == "User not found")
          alert("משתמש לא קיים!")
        else {
          alert("הקוד שהוזן לא תקין , אנא בקש קוד חדש ונסה שנית")
        }
      else {
        localStorage.setItem('currentUser', JSON.stringify({ userName: eyeglasses.userName, email: eyeglasses.email }))
        navigate(`/my-account`)
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
    const response = await APIRequest.postRequest(`/authorization`, { email: user.email, userName: user.userName, password: user.password, isActive: 1 });
    if (response.status == 200) {
      setAuthorization(true)
      setCurrentEyeglasses({ userName: user.userName, email: user.email, password: user.password })
    }
    else if (response.status == 400) {
      alert("userName is already taken. Please choose another!")
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
    <>
      {authorization ?
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
        :
        loginOrRegister ?
          (
            <div className="register-box">
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
            </div>
          )
          :
          showLogin
      }
    </>
  );
}
export default Register;




//לבדוק איך צריך להראות ה url
// fetch(`http://localhost:8082/authorization`
//   , {
//     method: 'POST',
//     body: JSON.stringify({
//       email: user.email,
//       userName: user.userName,
//       password: user.password,
//       isActive: 1
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//   .then(response => response.json())
//   .then((json) => {
//     alert(json.status)
//     console.log(json)
//     if (json.status == 200) {


// setAuthorization(true)
// setCurrentEyeglasses({ userName: user.userName, email: user.email, password: user.password })

//     }
//     else if (json.status == 400) {
//       alert("userName is already taken. Please choose another!")
//       setLogin(<Login />)
//     }
//     else {
//       alert(json.error)
//     }
//   })


// fetch(`http://localhost:8082/authorization/verify`
    //   , {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       userName: eyeglasses.userName,
    //       otp: otp
    //     }),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   })
    //   .then(response => response.json())
    //   .then((json) => {
    //     alert("ppp")
    //     console.log(json)
    //     if (json.status == 200) {
    //       if (json.data[0] == false)
    //         if (json.data[1] == "User not found")
    //           alert("משתמש לא קיים!")
    //         else {
    //           alert("הקוד שהוזן לא תקין , אנא בקש קוד חדש ונסה שנית")
    //         }
    //       else {
    //         alert("pp")
    //         localStorage.setItem('currentUser', JSON.stringify({ userName: eyeglasses.userName, email: eyeglasses.email }))
    //         navigate(`/my-account`)
    //       }
    //     }

    //     else {
    //       alert(json.error)
    //     }
    //   })


    {/* {authorization ?
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      :
      showLogin
  }
     {loginOrRegister ?
        (
          <div className="register-box">
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
          </div>
        )
        :
        showLogin
    } */}
  

// }

// export default Register;



//לבדוק איך צריך להראות ה url
// fetch(`http://localhost:8082/authorization`
//   , {
//     method: 'POST',
//     body: JSON.stringify({
//       email: user.email,
//       userName: user.userName,
//       password: user.password,
//       isActive: 1
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//   .then(response => response.json())
//   .then((json) => {
//     alert(json.status)
//     console.log(json)
//     if (json.status == 200) {


// setAuthorization(true)
// setCurrentEyeglasses({ userName: user.userName, email: user.email, password: user.password })

//     }
//     else if (json.status == 400) {
//       alert("userName is already taken. Please choose another!")
//       setLogin(<Login />)
//     }
//     else {
//       alert(json.error)
//     }
//   })


// fetch(`http://localhost:8082/authorization/verify`
    //   , {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       userName: eyeglasses.userName,
    //       otp: otp
    //     }),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   })
    //   .then(response => response.json())
    //   .then((json) => {
    //     alert("ppp")
    //     console.log(json)
    //     if (json.status == 200) {
    //       if (json.data[0] == false)
    //         if (json.data[1] == "User not found")
    //           alert("משתמש לא קיים!")
    //         else {
    //           alert("הקוד שהוזן לא תקין , אנא בקש קוד חדש ונסה שנית")
    //         }
    //       else {
    //         alert("pp")
    //         localStorage.setItem('currentUser', JSON.stringify({ userName: eyeglasses.userName, email: eyeglasses.email }))
    //         navigate(`/my-account`)
    //       }
    //     }

    //     else {
    //       alert(json.error)
    //     }
    //   })

// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
// import { useState, useContext, useEffect } from "react";
// import '../Register/Register.css'
// import Login from '../Login/Login.jsx'
// import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
// import OtpInput from 'react-otp-input';
// import { APIRequests } from "../../APIRequests";

// function Register() {
//   const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
//   const [otp, setOtp] = useState('');
//   const [extraDetails, setExterDetails] = useState(false)
//   const [showLogin, setShowLogin] = useState(<Login />);
//   const [loginOrRegister, setLoginOrRegister] = useState(true);
//   const [authorization, setAuthorization] = useState(false)
//   const APIRequest = new APIRequests();
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       userName: '',
//       email: '',
//       password: '',
//       verifyPassword: ''
//     }
//   });

//   useEffect(() => {
//     if (otp.length === 6) {
//       verificationOtp();
//       console.log('Starting function after OTP entry:', otp);
//     }
//   }, [otp]);

//   const verificationOtp = async () => {
//     const response = await APIRequest.postRequest(`/authorization/verify`, { userName: eyeglasses.userName, otp: otp });
//     const json = await response.json();
//     if (json.status == 200) {
//       if (json.data[0] == false)
//         if (json.data[1] == "User not found")
//           alert("משתמש לא קיים!")
//         else {
//           alert("הקוד שהוזן לא תקין , אנא בקש קוד חדש ונסה שנית")
//         }
//       else {
//         localStorage.setItem('currentUser', JSON.stringify({ userName: eyeglasses.userName, email: eyeglasses.email }))
//         navigate(`/my-account`)
//       }
//     }
//     else {
//       alert(json.error)
//     }
//   }

//   const VerifyPassword = (user) => {
//     if (user.password != user.verifyPassword) { return false; }
//     else { return true; }
//   }

//   const checkRegister = async (user) => {
//     if (!VerifyPassword(user)) {
//       alert("Password verification is incorrect,try again!")
//       return;
//     }
//     const response = await APIRequest.postRequest(`/authorization`, { email: user.email, userName: user.userName, password: user.password, isActive: 1 });
//     console.log(response,"🤷‍♀️")
//     if (response.status == 200) {
//       setAuthorization(true)
//      // setCurrentEyeglasses({ userName: user.userName, email: user.email, password: user.password })
//     }
//     else if (response.status == 400) {
//       alert("userName is already taken. Please choose another!")
//       setLogin(<Login />)
//     }
//     else {
//       alert(response.error)
//     }
//   };

//   const setLogin = () => {
//     setShowLogin(<Login />)
//     setLoginOrRegister(false)
//   }

//   return (
//     <>
//       {authorization ?
       
//         <OtpInput
//           value={otp}
//           onChange={setOtp}
//           numInputs={6}
//           renderSeparator={<span>-</span>}
//           renderInput={(props) => <input {...props} />}
//         />
//         :
//         loginOrRegister ?
//           (
//             <div className="register-box">
//               <form onSubmit={handleSubmit(checkRegister)}>
//                 <button type="button" onClick={() => setLogin()}>Login</button>
//                 <h2>Sign Up</h2>
//                 <div className="user-box">
//                   <input
//                     type='text'
//                     name='userName'
//                     {...register("userName", { required: true, minLength: 2, maxLength: 15 })}
//                     placeholder="userName"
//                   />
//                   {errors.userName && errors.userName.type === "minLength" && <span>userName must be a minimum of 2 characters long!</span>}
//                   {errors.userName && errors.userName.type === "maxlength" && <span>userName can be a maximum of 15 characters long</span>}
//                   {errors.userName && errors.userName.type === "required" && <span>userName is required</span>}
//                 </div>
//                 <div className="user-box">
//                   <input
//                     type='email'
//                     {...register("email", { required: true })}
//                     placeholder="email"
//                   />
//                   {errors.email && errors.email.type === "required" && <span className="span">email is required</span>}
//                 </div>
//                 <div className="user-box">
//                   <input
//                     type='password'
//                     name='password'
//                     {...register("password", { required: true, minLength: 6 })}
//                     placeholder="password"
//                   />
//                   {errors.password && errors.password.type === "minLength" && <span className="span">password must be a minimum of 6 characters long!</span>}
//                   {errors.password && errors.password.type === "required" && <span className="span">password is required</span>}
//                 </div>
//                 <div className="user-box">
//                   <input
//                     type='password'
//                     name='verifyPassword'
//                     {...register("verifyPassword", { required: true, minLength: 6 })}
//                     placeholder="verifyPassword"
//                   />
//                   {errors.verifyPassword && errors.verifyPassword.type === "minLength" && <span className="span">verify password must be a minimum of 6 characters long!</span>}
//                   {errors.verifyPassword && errors.verifyPassword.type === "required" && <span className="span">verify password is required</span>}
//                 </div>
//                 <button className='submit' type='submit'>submit</button>
//               </form>
//             </div>
//           )
//           :
//           showLogin
//       }
//     </>
//   );
// }
// export default Register;




// //לבדוק איך צריך להראות ה url
// // fetch(`http://localhost:8082/authorization`
// //   , {
// //     method: 'POST',
// //     body: JSON.stringify({
// //       email: user.email,
// //       userName: user.userName,
// //       password: user.password,
// //       isActive: 1
// //     }),
// //     headers: {
// //       'Content-type': 'application/json; charset=UTF-8',
// //     },
// //   })
// //   .then(response => response.json())
// //   .then((json) => {
// //     alert(json.status)
// //     console.log(json)
// //     if (json.status == 200) {


// // setAuthorization(true)
// // setCurrentEyeglasses({ userName: user.userName, email: user.email, password: user.password })

// //     }
// //     else if (json.status == 400) {
// //       alert("userName is already taken. Please choose another!")
// //       setLogin(<Login />)
// //     }
// //     else {
// //       alert(json.error)
// //     }
// //   })


// // fetch(`http://localhost:8082/authorization/verify`
//     //   , {
//     //     method: 'POST',
//     //     body: JSON.stringify({
//     //       userName: eyeglasses.userName,
//     //       otp: otp
//     //     }),
//     //     headers: {
//     //       'Content-type': 'application/json; charset=UTF-8',
//     //     },
//     //   })
//     //   .then(response => response.json())
//     //   .then((json) => {
//     //     alert("ppp")
//     //     console.log(json)
//     //     if (json.status == 200) {
//     //       if (json.data[0] == false)
//     //         if (json.data[1] == "User not found")
//     //           alert("משתמש לא קיים!")
//     //         else {
//     //           alert("הקוד שהוזן לא תקין , אנא בקש קוד חדש ונסה שנית")
//     //         }
//     //       else {
//     //         alert("pp")
//     //         localStorage.setItem('currentUser', JSON.stringify({ userName: eyeglasses.userName, email: eyeglasses.email }))
//     //         navigate(`/my-account`)
//     //       }
//     //     }

//     //     else {
//     //       alert(json.error)
//     //     }
//     //   })