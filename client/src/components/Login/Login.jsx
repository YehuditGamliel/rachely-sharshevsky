import React, { useEffect, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from "../../UserProvider";
import '../Login/Login.css'
import Register from '../Register/Register'
import Alert from '@mui/material/Alert';

function Login() {
    const [changePassword, setChangePassword] = useState(false)
    const [errorMassage, setErrorMassage] = useState("")
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [showRegister, setShowRegister] = useState('');
    const [registerOrLogin, setRegisterOrLogin] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/login`)
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const { register: passwords, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm({
        defaultValues: {
            email: '',
            oldPassword: '',
            newPassword: '',
            verifyPassword: ''
        }
    });

    const userExist = async (userDetails) => {
        alert(userDetails.email)
        let response = await fetch(`http://localhost:8082/authorization/login`, {
            method: 'POST',
            body: JSON.stringify({
                "email": "rsh61047@gmail.com",
                "password": "rS@61047"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        return response.json();
    }

    const login = async (user) => {
        let json = await userExist(user)
        // navigate(`/home/my-account`)
        if (json.status == 200) {
            localStorage.setItem('currentUser', JSON.stringify(
                { userName: json.data[0].userName, email: user.email }));
            setCurrentUser({ userName: json.data[0].userName, email: user.email })
            // navigate(`/home/my-account`,{state:{name:json.data[0].userName}})
           navigate(`/my-account`)

        }
        else if (json.status == 400) {
            <Alert severity="error">The email
                or password you entered is incorrect, please try again or sign up..</Alert>
        }
        else {
            alert(json.error)
        }
        // alert(currentUser)
    }

    const handleChangePassword = async (passwords) => {
        if (passwords.newPassword != passwords.verifyPassword)
            setErrorMassage("verity is not correct,try again")
        else {
            setErrorMassage(" ")
            let json = await userExist({ email: passwords.email, password: passwords.oldPassword })
            if (json.status == 200) {
                fetch(`http://localhost:8082/authorization/login`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        userId: json.data[0].id,
                        email: passwords.email,
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
                <Alert severity="error">The email or password you entered is incorrect, please try again or sign up.</Alert>
            }
            else {
                alert(json.error)

            }
        }
    }

    const setRegister = () => {
        setShowRegister(<Register />)
        setRegisterOrLogin(false)
    }
    return (
        <>
            {
                registerOrLogin ? <div className='login-background'>
                    <div className='login-box'>
                        <button onClick={() => setRegister()}>Register</button>
                        {!changePassword ?
                            <form onSubmit={handleSubmit(login)}>
                                <div className='user-box'>
                                    <input type='text' name='email' {...register("email",
                                        { required: true, minLength: 2 })} placeholder='usename' />
                                    {errors.email && errors.email.type === "minLength" &&
                                        (<span className='span'>email must be a minimum of 2 characters long!</span>)}
                                    {errors.email && errors.email.type === "required" &&
                                        (<span className='span'>email is required</span>)}
                                </div>
                                <div className='user-box'>
                                    <input type='password' name='password' {...register("password",
                                        { required: true, minLength: 6 })} placeholder='password' />
                                    {errors.password && errors.password.type === "minLength" &&
                                        (<span className='span'>password must be a minimum of 6 characters long!</span>)}
                                    {errors.password && errors.password.type === "required" &&
                                        (<span className='span'>password is required</span>)}
                                </div>
                                <Link onClick={() => setChangePassword(true)}>change password</Link><br />
                                <button type='submit' className='submit'>submit</button>
                            </form>
                            : <><p>{errorMassage}</p>
                                <form onSubmit={handleSubmit2(handleChangePassword)}>
                                    <input type='text' name='email' {...passwords("email",
                                        { required: true, minLength: 2 })} placeholder='usename' />
                                    {errors.email && errors.email.type === "minLength" &&
                                        (<span className='span'>email must be a minimum of 2 characters long!</span>)}
                                    {errors.email && errors.email.type === "required" &&
                                        (<span className='span'>email is required</span>)}
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

                </div>
                    : showRegister
            }
        </>

    )

}
export default Login;



