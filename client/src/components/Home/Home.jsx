import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from 'react-router-dom';
// import { UserContext } from "../../EyeglassesProvider";
import './Home.css';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import header from '../../img/header.jpg';
// import PayPalButtonsComponent from '../../components/PayPalButtonsComponent/PayPalButtonsComponent.jsx'
//import axios from 'axios'
// import PaymentForm from '../PaymentForm/PaymentForm';
import EmailVerification from'../EmailVerification/EmailVerification'
import jsonData from '../../assets/data.json'


import SimpleMap from '../SimpleMap.jsx'


function Home(props) {   
    const navigate = useNavigate(); 
    const sendEmail = async () => {
        
        const email = '7897149@gmail.com'; // Replace with the recipient's email address
        const message = 'Hello, this is a test email!'; // Message content
    
        try {
            console.log(email,message)
            const response = await fetch('https://localhost:8082/send-basic-email', {
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
 //sendEmail();
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
                <img  id="img" src={header}/>
                <h1 id="title">{jsonData.dataHome[0].title}</h1>
                <span id="text">
                {jsonData.dataHome[0].description}
                </span>
                <p className='subtitle'>
                {jsonData.dataHome[1].title}
                </p>
                <span id="text">{jsonData.dataHome[1].description}</span>
                <p className='subtitle'>
                {jsonData.dataHome[2].title}
                </p>
                <span id="text">{jsonData.dataHome[2].description}</span>
                <p>לסניפים שלנו :</p>
                <SimpleMap/>
                <div id='bottom'>
                    <span id='titleBottom'>צרו איתנו קשר</span>
                </div>

            </div>
        </div>
      
        {login}
      
    </>)
}
export default Home