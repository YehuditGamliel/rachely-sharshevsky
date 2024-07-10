import React, { useEffect, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import '../Login/Login.css'
import StatusCheck from '../StatusCheck/StatusCheck.jsx';
import Register from '../Register/Register'
import { UserContext } from "../../hook/UserProvider.jsx";
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


function Login({ paper = 'defaultPaperValue' }) {
    let location = useLocation();
    const [changePassword, setChangePassword] = useState(false)
    const [errorMassage, setErrorMassage] = useState("")
    const { user, setCurrentUser } = useContext(UserContext);
    const [showRegister, setShowRegister] = useState('');
    const [registerOrLogin, setRegisterOrLogin] = useState(true)
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const APIRequest = new APIRequests()
    const theme = useTheme();
    const navigate = useNavigate();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    
    const handleClose = (id) => {
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
        if (paper == 'defaultPaperValue') {
            navigate('./home')
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIRequest.getRequest('/roles');
                const json = await response.json();
                setRoles([...json.data]);
            } catch (error) {
               alert(error)
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
    
    const userExist = async (userDetails) => {
        try {
            const response = await APIRequest.postRequest(`/authorization/login`, { userName: userDetails.userName, password: userDetails.password })
            const json = await response.json();
            return json;
        } catch (error) {
            alert("!משתמש לא קיים, בבקשה להרשם")
        }
    }

    const login = async (user) => {
        let json = await userExist(user)
        localStorage.setItem('currentUser', JSON.stringify(
            { userName: user.userName, email: json.email, role: json.role }));
        setCurrentUser({ userName: user.userName, email: json.email, role: json.role })
        if (json.role == 1) {
            setOpen(true);
        }
        else {
            if (paper != 'defaultPaperValue') {
                navigate(`/eyeglasses/${location.pathname.split('/')[2]}/${location.pathname.split('/')[3]}/invitation`)
            }
            else {
                navigate('./home')
            }
        }
    }

    const setRegister = () => {
        setRegisterOrLogin(false)
        setShowRegister(<Register />)
    }

    return (
        <>
            {(open) ?
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            איך ברצונך להמשיך?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {roles.map((role, index) =>
                            <Button autoFocus onClick={() => handleClose(role.id)}>
                                {role.roleDescription}
                            </Button>)
                        }
                    </DialogActions>
                </Dialog>
                : <>
                    {!user.userName ?
                        <>{
                            registerOrLogin ? <div className='login-background'>
                                <div className='login-box'>
                                    <button onClick={() => setRegister()}>משתמש חדש</button>
                                    {!changePassword ?
                                        <form onSubmit={handleSubmit(login)}>
                                            <div className='user-box'>
                                                <input type='text' name='userName' {...register("userName",
                                                    { required: true, minLength: 2, maxLength: 15 })} placeholder='שם משתמש' />
                                                {errors.username && errors.username.type === "minLength" &&
                                                    (<span className='span'>שם משתמש צריך להיות לפחות עם 2 תווים</span>)}
                                                {errors.username && errors.username.type === "maxLength" &&
                                                    (<span className='span'>שם משתמש לא יכול להיות יותר מ 15 תווים</span>)}
                                                {errors.username && errors.username.type === "required" &&
                                                    (<span className='span'>שם משתמש שדה חובה</span>)}
                                            </div>
                                            <div className='user-box'>
                                                <input type='password' name='password' {...register("password",
                                                    { required: true, minLength: 6 })} placeholder='סיסמא' />
                                                {errors.password && errors.password.type === "minLength" &&
                                                    (<span className='span'>סיסמא צריכה להיות לפחות עם 6 תווים</span>)}
                                                {errors.password && errors.password.type === "required" &&
                                                    (<span className='span'>סיסמא שדה חובה</span>)}
                                            </div>
                                            <button type='submit' className='submit'>שליחה</button>
                                        </form>
                                        : <><p>{errorMassage}</p>
                                            </>
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
