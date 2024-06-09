import { Link, Outlet } from 'react-router-dom';
import React, { useContext, useState ,useEffect} from 'react';
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
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";


// const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     right: -3,
//     top: 13,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: '0 4px',
//   },
// }));

function Header() {

    let location = useLocation();
    const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [style, setStyle] = useState("activity")
    const [login, setLogin] = useState('');
    const [cartLength, setCartLength] = useState(0);

    useEffect(() => {
      // Retrieve the "ShoppingCart" array from localStorage
      const storedCart = localStorage.getItem("ShoppingCart");
  
      if (storedCart) {
        // Parse the JSON string to get the array
        const parsedCart = JSON.parse(storedCart);
  
        // Check if it is indeed an array
        if (Array.isArray(parsedCart)) {
          // Get the length of the array
          const length = parsedCart.length;
  
          // Set the length to state
          setCartLength(length);
          console.log("popo",)
        }
      }
    }, []);

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
                   
                        <li> <Link to={"./posts"}>בית </Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי ראיה </Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי שמש </Link></li>
                        <li> <Link to={"./info"}>משקפי קריאה </Link></li>
                        <li> <Link to={"./posts"}>עדשות </Link></li>
                        <li> <Link to={"./todos"}>בדיקת ראיה </Link></li>
                        <li> <Link to={"./info"}>יצירת קשר </Link></li>
                        <li>
                           <li><IconButton aria-label="cart">
                                <StyledBadge badgeContent={cartLength} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                            </li> 
                            <Tab icon={<PersonPinIcon />} onClick={() => {
                                setLogin(<Login />)
                                setStyle("notActivity")
                            }} /></li>
                        {location.pathname.slice(1) == 'my-account' ?
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