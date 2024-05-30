import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import './Home.css';
import logo from '../../img/logo.png'
import Login from '../Login/Login';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import header from '../../img/header.jpg';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';



function Home(props) {
    //const { state } 
    // const { state } = useLocation();
    // const {} = state;
    let location = useLocation();
  

    const [style,setStyle]=useState("activity")
    const [login,setLogin]= useState('');
    // const navigate = useNavigate();
    // const { currentUser, setCurrentUser } = useContext(UserContext);
    useEffect(() => {
       if( location.pathname.slice(1)=='my-account')
        {
            setLogin('')
              setStyle("activity")
        }
         
      
    }, [location])


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    // const { id } = useParams();
    // useEffect(() => {
    //     if (user.id == "")
    //         navigate('/login')
    //    else if (id != user.id) {
    //         navigate(`/home/users/2`)
    //         alert("not logal!")
    //     }
    // }, [id])

   
 
    // const LogOut = () => {
    //     localStorage.clear();
    //     setCurrentUser('')
    //     navigate('/login');
    // }

    return (<>
{/* <button onClick={()=>t()}></button> */}
        {/* <button className='button' onClick={LogOut}>Logout</button> */}
        <div id={style}>
            <div id="links">
                <img src={logo} id="logo" />
                {/* <header>{user.userName}</header> */}
                <nav id="links">
                    <ul>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={1} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>

                        <li> <Link to={"./posts"}>בית </Link></li>
                        <li> <Link to={"eyeglasses"}>משקפי ראיה </Link></li>
                        <li> <Link to={"./todos"}>משקפי שמש </Link></li>
                        <li> <Link to={"./info"}>משקפי קריאה </Link></li>
                        <li> <Link to={"./posts"}>עדשות </Link></li>
                        <li> <Link to={"./todos"}>בדיקת ראיה </Link></li>
                        <li> <Link to={"./info"}>יצירת קשר </Link></li>
                        <li>
                        <Tab icon={<PersonPinIcon />} onClick={()=>{setLogin(<Login/>)
                    setStyle("notActivity")}} /></li>
                    {/*  */}
                    {location.pathname.slice(1)=='my-account'?
                        <li>{ JSON.parse(localStorage.getItem('currentUser')).userName}</li>
                        :<></>}
                     
                    </ul>

                </nav>
                <Outlet />

            </div>
            
            
           
            <div>
                <img  id={style} src={header}/>
                <h1 id="title">אופטיקה אי-סנטר</h1>
                <p id="text">
                    אתר “אופטיקה אי-סנטר” הוקם בכדי לתת ללקוחות שלנו את המענה המהיר והמקצועי ביותר ובשירות ישיר עד לפתח ביתכם. באתר תוכלו למצוא מגוון מוצרי אופטיקה מובחרים: עדשות מגע, משקפי ראייה ומשקפי שמש,
                    וכן תוכלו להשאיר את פרטיכם במידה ותרצו להתייעץ עם הצוות המקצועי שלנו.
                    החזון של אופטיקה אי-סנטר לאפשר לכל שכבות האוכלוסייה בישראל לרכוש משקפי ראייה, משקפי שמש ועדשות מגע, במחיר השווה לכל נפש.
                    בפעילותה שברה הרשת את המונופול שהיה קיים בתחום האופטיקה בישראל כאשר הציעה משקפיים במחירים הוגנים וזולים ומבצעים אשר גררו אחריהם הוזלת מחירים בכל הענף.
                </p>
                <div id='bottom'>
                    <p id='titleBottom'>צרו איתנו קשר</p>
                </div>

            </div>

        </div>
        {login}
    </>)
}
export default Home