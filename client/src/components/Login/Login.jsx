import React, { useEffect, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from "../../UserProvider";
import '../Login/Login.css'
import  Register from '../Register/Register'
import Alert from '@mui/material/Alert';

function Login() {
    const [changePassword, setChangePassword] = useState(false)
    const [errorMassage, setErrorMassage] = useState("")
    const { user, setCurrentUser } = useContext(UserContext);
    const [showRegister,setShowRegister]=useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (user) {
    //         navigate(`/home/users/${user.id}`)
    //     }
    // }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            password: '',
        }
    });
    const { register: passwords, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm({
        defaultValues: {
            userName: '',
            oldPassword: '',
            newPassword: '',
            verifyPassword: ''
        }
    });

    const userExist = async (userDetails) => {
        let response = await fetch(`http://localhost:8082/authorization/login`, {
            method: 'POST',
            body: JSON.stringify({
                userName: userDetails.userName,
                password: userDetails.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        return response.json();
    }

    const login = async (user) => {
        let json = await userExist(user)
        if (json.status == 200) {
            localStorage.setItem('currentUser', JSON.stringify(json.data[0]));
            setCurrentUser(json.data[0])
            navigate(`/home/users/${json.data[0].id}`)
        }
        else if (json.status == 400) {
            <Alert severity="error">The username or password you entered is incorrect, please try again or sign up..</Alert>
        }
        else {
            alert(json.error)

        }
    }
    const handleChangePassword = async (passwords) => {
        if (passwords.newPassword != passwords.verifyPassword)
            setErrorMassage("verity is not correct,try again")
        else {
            setErrorMassage(" ")
            let json = await userExist({ userName: passwords.userName, password: passwords.oldPassword })
            if (json.status == 200) {
                fetch(`http://localhost:8082/authorization/login`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        userId: json.data[0].id,
                        userName: passwords.userName,
                        password: passwords.newPassword
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }).then(response => response.json())
                    .then((json) => {
                        if (json.status != 200) {
                            alert(json.error)
                        }
                    })
            }
            else if (json.status == 400) {
                <Alert severity="error">The username or password you entered is incorrect, please try again or sign up.</Alert>
            }
            else {
                alert(json.error)

            }
        }



    }

    return (
        
        <div className='login-background'>
            <div className='login-box'>
                <button onClick={()=>setShowRegister(<Register/>)}>Register</button>
                {/* <Link className='linkRegister' to="/register">Register</Link><br /> */}
                {/* <Link onClick={() => setChangePassword(false)}>Login</Link> */}
                {!changePassword ?
                    <form onSubmit={handleSubmit(login)}>
                        <div className='user-box'>
                            <input type='text' name='userName' {...register("userName",
                                { required: true, minLength: 2 })} placeholder='usename' />
                            {errors.userName && errors.userName.type === "minLength" &&
                                (<span className='span'>userName must be a minimum of 2 characters long!</span>)}
                            {errors.userName && errors.userName.type === "required" &&
                                (<span className='span'>userName is required</span>)}
                        </div>
                        <div className='user-box'>
                            <input type='password' name='password' {...register("password",
                                { required: true, minLength: 6 })} placeholder='password' />
                            {errors.password && errors.password.type === "minLength" &&
                                (<span className='span'>password must be a minimum of 6 characters long!</span>)}
                            {errors.password && errors.password.type === "required" &&
                                (<span className='span'>password is required</span>)}
                        </div>
                        <Link onClick={() => setChangePassword(true)}>change password</Link><br/>
                        <button type='submit' className='submit'>submit</button>
                    </form>
                    : <><p>{errorMassage}</p>
                        <form onSubmit={handleSubmit2(handleChangePassword)}>
                            <input type='text' name='userName' {...passwords("userName",
                                { required: true, minLength: 2 })} placeholder='usename' />
                            {errors.userName && errors.userName.type === "minLength" &&
                                (<span className='span'>userName must be a minimum of 2 characters long!</span>)}
                            {errors.userName && errors.userName.type === "required" &&
                                (<span className='span'>userName is required</span>)}
                            <input type='password' name='oldPassword'{...passwords("oldPassword",
                                { required: true, minLength: 6 })} placeholder='old Password' />
                            {errors2.oldPassword &&
                                (<span className='span'>password must be a minimum of 6 characters long!</span>)}
                            <input type='password' name='newPassword' {...passwords("newPassword",
                                { required: true, minLength: 6 })} placeholder='new Password' />
                            {errors2.newPassword &&
                                (<span className='span'>password must be a minimum of 6 characters long!</span>)}
                            <input type='password' name='verifyPassword' {...passwords("verifyPassword",
                                { required: true, minLength: 6 })} placeholder='verify Password' />
                            {errors2.verifyPassword &&
                                (<span className='span'>password must be a minimum of 6 characters long!</span>)}<br />
                            <button type='submit' className='submit'>change</button>

                        </form></>
                }



            </div>
            {showRegister}
        </div>
    )

}
export default Login;



