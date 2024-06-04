import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
// import { UserContext } from "../../EyeglassesProvider";
import './Home.css';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import header from '../../img/header.jpg';
//import axios from 'axios'
import PaymentForm from '../PaymentForm/PaymentForm';


function Home(props) {    
    let location = useLocation();
    const [style,setStyle]=useState("activity")
    const [login,setLogin]= useState('');
    //  const { user, setCurrentUser } = useContext(UserContext);
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

    return (<>

        <div id={style}>
            <div>
                <img  id={style} src={header}/>
                <h1 id="title">אופטיקה אי-סנטר</h1>
                <span id="text">
                    אתר “אופטיקה אי-סנטר” הוקם בכדי לתת ללקוחות שלנו את המענה המהיר והמקצועי ביותר ובשירות ישיר עד לפתח ביתכם. באתר תוכלו למצוא מגוון מוצרי אופטיקה מובחרים: עדשות מגע, משקפי ראייה ומשקפי שמש,
                    וכן תוכלו להשאיר את פרטיכם במידה ותרצו להתייעץ עם הצוות המקצועי שלנו.
                    החזון של אופטיקה אי-סנטר לאפשר לכל שכבות האוכלוסייה בישראל לרכוש משקפי ראייה, משקפי שמש ועדשות מגע, במחיר השווה לכל נפש.
                    בפעילותה שברה הרשת את המונופול שהיה קיים בתחום האופטיקה בישראל כאשר הציעה משקפיים במחירים הוגנים וזולים ומבצעים אשר גררו אחריהם הוזלת מחירים בכל הענף.
                </span>
                <div id='bottom'>
                    <span id='titleBottom'>צרו איתנו קשר</span>
                </div>

            </div>
        </div>
        {login}
      
    </>)
}
export default Home