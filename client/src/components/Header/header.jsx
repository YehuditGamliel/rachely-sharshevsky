import { Link, Outlet } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../../img/logo.png'
import Login from '../Login/Login';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";

function Header(props) {
    const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [style, setStyle] = useState("activity")
    const [login, setLogin] = useState('');
    const [cartLength, setCartLength] = useState(0);
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setCurrentEyeglasses({ userName: currentUser.userName, email: currentUser.email,role:currentUser.role })
            // if(currentUser.role!=1)
            //navigate('/my-account');
        }
    }, [location])


    useEffect(() => {
       
        if (location.pathname === '/my-account'||location.pathname === '/home') {
            setLogin(false);
            setStyle("activity")
        }
    }, [location]);

    useEffect(() => {
        const storedCart = localStorage.getItem("ShoppingCart");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart)) {
                let length = 0;
                parsedCart.forEach(product => length += (product.amount > 1) ? product.amount / 2 + 0.5 : 1);
                setCartLength(length);
            }
        }
    }, [location]);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (<>
        <div id={style}>
            <div id="links">
                <img src={logo} id="logo" />
                <nav id="links">
                    <ul>
                        
                        {/* <li> <Link to={"./info"}>משקפי קריאה </Link></li> */}
                        {eyeglasses.role==1?<li> <Link to={"updateStatus"}>עדכון סטטוס הזמנה </Link></li>:<></>}
                        <li> <Link to={"eyeglasses"}>סניפים</Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי ספורט</Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי שמש </Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי נשים </Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי גברים</Link></li>
                        <li> <Link  to={"/"}>אודותינו </Link></li>
                        <li>
                            <li><IconButton onClick={()=>navigate('/ShoppingCart')} aria-label="cart">
                                <StyledBadge badgeContent={cartLength} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                            </li>
                            <Tab icon={<PersonPinIcon />} onClick={() => {
                                setLogin(<Login />)
                                setStyle("notActivity")
                            }} /></li>
                        {/* {console.log("eyeglasses", eyeglasses)} */}
                        {/* {location.pathname.slice(1) == 'my-account' ?
                            <li><span> Hi {eyeglasses.userName} </span></li>
                            : <></>} */}{eyeglasses.userName ?
                            <li><span> Hi {eyeglasses.userName} </span></li>
                            : <></>}
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
        {login}
    </>)
}
export default Header;


