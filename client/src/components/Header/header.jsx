import { Link, Outlet } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useLocation } from "react-router-dom";
//import { UserContext } from "../../EyeglassesProvider.jsx";
import './Header.css';
import logo from '../../img/logo.png'
import Login from '../Login/Login';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function Header() {
 
    let location = useLocation();
  
    const [style,setStyle]=useState("activity")
    const [login,setLogin]= useState('');
    // const { user, setCurrentUser } = useContext(UserContext);

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
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={0} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                        <li> <Link to={"./posts"}>בית </Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי ראיה </Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי שמש </Link></li>
                        <li> <Link to={"./info"}>משקפי קריאה </Link></li>
                        <li> <Link to={"./posts"}>עדשות </Link></li>
                        <li> <Link to={"./todos"}>בדיקת ראיה </Link></li>
                        <li> <Link to={"./info"}>יצירת קשר </Link></li>
                        <li>
                        <Tab icon={<PersonPinIcon />} onClick={()=>{setLogin(<Login/>)
                    setStyle("notActivity")}} /></li>
                    {location.pathname.slice(1)=='my-account'?
                    <li><span> Hi {user.userName} </span></li>
                        :<></>}
                    </ul>

                </nav>
                <Outlet />
            </div>          
        </div>
        {login}     
    </>)
}
export default Header;