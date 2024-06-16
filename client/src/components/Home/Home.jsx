import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from 'react-router-dom';
// import { UserContext } from "../../EyeglassesProvider";
import './Home.css';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import header from '../../img/header.jpg';
//import axios from 'axios'
// import PaymentForm from '../PaymentForm/PaymentForm';
import EmailVerification from'../EmailVerification/EmailVerification'


function Home(props) {   
    const navigate = useNavigate(); 
    const sendEmail = async () => {
        
        const email = '7897149@gmail.com'; // Replace with the recipient's email address
        const message = 'Hello, this is a test email!'; // Message content
    
        try {
            console.log(email,message)
            const response = await fetch('http://localhost:8082/send-basic-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            });
    
            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.error('Error sending email');
            }
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };
    
    // Call the sendEmail function when you want to trigger the email sending
 sendEmail();
    let location = useLocation();
    const [style,setStyle]=useState("activity")
    const [login,setLogin]= useState('');
    //  const { user, setCurrentUser } = useContext(UserContext);
    // useEffect(() => {
        
    // }, [navigate]);
    useEffect(() => {
       
        if(location.pathname === '/my-account') {
            
            setLogin(false);
             setStyle("activity")
        }
    }, [location]);

    // useEffect(() => {
    //    if( location.pathname.slice(1)=='my-account')
    //     {
    //        console.log("pp")
    //         setLogin(<></>)
    //           setStyle("activity")
    //     }
    // }, [navigate])
    // 

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (<>
             {/* <EmailVerification/> */}
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