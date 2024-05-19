import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { UserContext } from "../../UserProvider";
import './Home.css';
import logo from '../../img/logo.png'
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Home() {

    // const navigate = useNavigate();
    // const { user, setCurrentUser } = useContext(UserContext);

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
    {/* <div>
        <p id="p">בדיקה!</p>
        <Outlet/>
    </div> */}
    
        {/* <button className='button' onClick={LogOut}>Logout</button> */}
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
                    <li> <Link to={"./eyeglasses"}>משקפי ראיה </Link></li>
                    <li> <Link to={"./todos"}>משקפי שמש </Link></li>
                    <li> <Link to={"./info"}>משקפי קריאה </Link></li>
                    <li> <Link to={"./posts"}>עדשות </Link></li>
                    <li> <Link to={"./todos"}>בדיקת ראיה </Link></li>
                    <li> <Link to={"./info"}>יצירת קשר </Link></li>

                </ul>
          
            </nav>
            
        </div>
        <div>
            {/* <img src={header} id="header"/> */}
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


    </>)
}
export default Home