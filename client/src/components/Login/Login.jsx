import React, { useEffect, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
//import { UserContext } from "../../EyeglassesProvider.jsx";
import '../Login/Login.css'
import StatusCheck from '../StatusCheck/StatusCheck.jsx';
import Register from '../Register/Register'
import Alert from '@mui/material/Alert';
import { Password } from 'primereact/password';
import { UserContext } from "../../UserProvider.jsx";
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { APIRequests } from "../../APIRequests.js";
import { useCookies } from 'react-cookie';



function Login({ paper = 'defaultPaperValue' }) {
    let location = useLocation();
    const [value, setValue] = useState('');
    const [changePassword, setChangePassword] = useState(false)
    const [errorMassage, setErrorMassage] = useState("")
    const { user, setCurrentUser } = useContext(UserContext);
    const [showRegister, setShowRegister] = useState('');
    const [registerOrLogin, setRegisterOrLogin] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [loginOrNot, setLoginOrNot] = useState(true);
    const [roles, setRoles] = useState([]);
    const APIRequest = new APIRequests()
    const [cookies, setCookie] = useCookies(['token']);
    // const[showDialog,setShowDialog]=useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {

    };
    const handleClose = (id) => {

        console.log(id, "id")
        if (id == 0) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.role = 0;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            setCurrentUser(prevState => {
                return {
                    ...prevState,
                    role: 0,
                };
            });
        }

        setOpen(false);

        //   setLoginOrNot(false)

        if (paper == 'defaultPaperValue') {
            navigate('./home')
        }
        else {
            // alert("pp")

          
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIRequest.getRequest('/roles');
                const json = await response.json();

                if (response.status !== 200) {
                    alert(json.error);
                } else {
                    setRoles([...json.data]);
                }
            } catch (error) {
                alert('An error occurred while fetching data');
                console.error(error);
            }
        };

        fetchData();
    }, [open])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });
    const { register: passwords, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm({
        defaultValues: {
            username: '',
            oldPassword: '',
            newPassword: '',
            verifyPassword: ''
        }
    });

    const userExist = async (userDetails) => {
        const response = await APIRequest.postRequest(`/authorization/login`, { userName: userDetails.userName, password: userDetails.password })
        const json = await response.json();
        return json;
        // let response = await fetch(`http://localhost:8082/authorization`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         userName: userDetails.userName,
        //         password: userDetails.password,
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // })
        // return response.json();
    }

    const login = async (user) => {
        let json = await userExist(user)
        console.log("json", json)
        if (json.status == 200) {
            setCookie('token', json.token, { path: '/' });
            localStorage.setItem('currentUser', JSON.stringify(
                { userName: user.userName, email: json.email, role: json.role }));
            setCurrentUser({ userName: user.userName, email: json.email, role: json.role })
            if (json.role == 1) {
                setOpen(true);
            }




            else {
                navigate('./home')
            }
        }
        else {
            if (json.status == 400) {
                return (
                    <Alert severity="error">The username or password you entered is incorrect, please try again or sign up.</Alert>
                );
            }
            else {
                alert(json.error)
            }
        }
        // alert(currentUser)
    }

    const handleChangePassword = async (passwords) => {
        if (passwords.newPassword != passwords.verifyPassword)
            setErrorMassage("verity is not correct,try again")
        else {
            setErrorMassage(" ")
            let json = await userExist({ username: passwords.username, password: passwords.oldPassword })
            if (json.status == 200) {
                const response = await APIRequest.putRequest(`/authorization/login`, { username: passwords.username, password: passwords.newPassword })
                const json = response.json();
                if (json.status != 200) {
                    alert(json.error)
                }
                // fetch(`http://localhost:8082/authorization/login`, {
                //     method: 'PUT',
                //     body: JSON.stringify({
                //         userId: json.data[0].id,
                //         username: passwords.username,
                //         password: passwords.newPassword
                //     }),
                //     headers: {
                //         'Content-type': 'application/json; charset=UTF-8',
                //     }
                // }).then(response => response.json())
                //     .then((json) => {
                //         if (json.status != 200) {
                //             alert(json.error)
                //         }
                //     })
            }
            else if (json.status == 400) {
                <Alert severity="error">The username or password you entered is incorrect, please try again or sign up.</Alert>
            }
            else {
                alert(json.error)

            }
        }
    }

    const setRegister = () => {
        setRegisterOrLogin(false)
        setShowRegister(<Register />)
    }
    return (
        <>
        {console.log(registerOrLogin,"login")}
           {console.log((location.pathname.split('/')[4]==undefined),location.pathname.split('/'),"ppp")}
            {/* {alert("pp")} */}
            {(open) ?
                //   <Button variant="outlined" onClick={handleClickOpen}>
                //     Open responsive dialog
                //   </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            איך ברצונך להמשיך?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        {console.log(roles)}
                        {roles.map((role, index) =>
                            <Button autoFocus onClick={() => handleClose(role.id)}>
                                {role.roleDescription}
                            </Button>)
                        }
                        {/* <Button autoFocus onClick={()=>handleClose(1)}>
           כמנהל
          </Button>
          <Button onClick={()=>handleClose(0)} autoFocus>
            כלקוח
          </Button> */}
                    </DialogActions>
                </Dialog>
                : <>
                    {!user.userName ?
                        <>{
                            registerOrLogin ? <div className='login-background'>
                                <div className='login-box'>
                                    <button onClick={() => setRegister()}>Register</button>
                                    {!changePassword ?
                                        <form onSubmit={handleSubmit(login)}>
                                            <div className='user-box'>
                                                <input type='text' name='userName' {...register("userName",
                                                    { required: true, minLength: 2 })} placeholder='שם משתמש' />
                                                {errors.username && errors.username.type === "minLength" &&
                                                    (<span className='span'>username must be a minimum of 2 characters long!</span>)}
                                                {errors.username && errors.username.type === "required" &&
                                                    (<span className='span'>username is required</span>)}
                                            </div>
                                            <div className='user-box'>
                                                <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
                                                <input type='password' name='password' {...register("password",
                                                    { required: true, minLength: 6 })} placeholder='סיסמא' />
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
                                                <input type='text' name='username' {...passwords("username",
                                                    { required: true, minLength: 2 })} placeholder='usename' />
                                                {errors.username && errors.username.type === "minLength" &&
                                                    (<span className='span'>username must be a minimum of 2 characters long!</span>)}
                                                {errors.username && errors.username.type === "required" &&
                                                    (<span className='span'>username is required</span>)}
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
                                : <Register paper1={paper} />
                             
                        }</> : (<StatusCheck />)


                    }</>}
        </>

    )

}
export default Login;








// const handleChangePassword = async (passwords) => {
//     if (passwords.newPassword != passwords.verifyPassword)
//         setErrorMassage("verity is not correct,try again")
//     else {
//         setErrorMassage(" ")
//         let json = await userExist({ username: passwords.username, password: passwords.oldPassword })
//         if (json.status == 200) {
//             fetch(`http://localhost:8082/authorization`, {
//                 method: 'PUT',
//                 body: JSON.stringify({
//                     username: passwords.username,
//                     password: passwords.newPassword
//                 }),
//                 headers: {
//                     'Content-type': 'application/json; charset=UTF-8',
//                 }
//             }).then(response => response.json())
//                 .then((json) => {
//                     if (json.status != 200) {
//                         alert(json.error)
//                     }
//                 })
//         }
//         else if (json.status == 400) {
//             <Alert severity="error">The username or password you entered is incorrect, please try again or sign up.</Alert>
//         }
//         else {
//             alert(json.error)

//         }
//     }
// }
// const userExist = async (userDetails) => {
//     const response = await APIRequest.postRequest(`/authorization`, { userName: userDetails.userName, password: userDetails.password });
//     const json = await response.json();
//     return json;
// }


