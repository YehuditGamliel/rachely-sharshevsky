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
import BranchDetails from '../BranchDetailes.jsx'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


// import SimpleMap from '../GoogleMap.jsx'
import GoogleMap from '../GoogleMap.jsx';


function Home(props) {  
      const [cities, setCities ] = useState([]); 
      const [branches,setBranches]=useState([])
      const[googleMapDetails,setGoogleMapDetails]=useState(false)
      const [search,setSearch]=useState('city')
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
    //  const { branches, setBranches } = useContext(UserContext);
    useEffect(() => {
       
            fetch(`http://localhost:8082/branch`, {
              method: 'GET',
            
            })
              .then(response => response.json())
              .then((json) => {
                if (json.status != 200) {
                  alert(json.error)
                }
                else {
                //   console.log("json.data",json.data)
                //   console.log("displayEyeglasses",displayEyeglasses)
                  setCities([...json.data])
                  console.log('city',cities)
                  setSearch('city')
                }
              })
            
            },
          [])
    useEffect(() => {
       
        if(location.pathname === '/my-account') {
            
            setLogin(false);
             setStyle("activity")
        }
    }, [location]);
    const lookForCity = (event) => {
    console.log(event.target.value)
        fetch(`http://localhost:8082/branch/${event.target.value}`, {
            method: 'GET',
          
          })
            .then(response => response.json())
            .then((json) => {
              if (json.status != 200) {
                alert(json.error)
              }
              else {
              //   console.log("json.data",json.data)
              //   console.log("displayEyeglasses",displayEyeglasses)
                setBranches([...json.data])
                console.log("branch",branches)
                setSearch('branch')
              }
            })
          
          };
          const showDetails = (event) => {
            console.log("🥻", event.target.value);
            setGoogleMapDetails([...event.target.value])
                // <GoogleMap lat={event.target.value.lat} lng={event.target.value.lng} address={"זולטי 9 רמת שלמה ירושלים"} />

           
        }
      
    

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (<>
    {
(search=='city')?<select className="branches-chooseCity" onChange={lookForCity}>     
<option selected>בחירת עיר</option>
 {cities.map((city) => {
   return <option>{city.city}</option>;
 })}
</select>:<select className="branches-chooseCity" onChange={showDetails}>     
<option selected>בחירת סניף</option>

 {branches.map((branch) => {
    {console.log("p",branch)}
   return <option>{branch.street}</option>;
 })}
</select>

    }
 
     {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={branches}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    /> */}

        <div id={style}>
        {console.log("😍",googleMapDetails)}
            {(googleMapDetails!=false)?
               console.log("😍🤷‍♀️",googleMapDetails)
            :
             <></>
            }
             


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
                <div id='bottom'>
                    <span id='titleBottom'>צרו איתנו קשר</span>
                </div>

            </div>
        </div>
      
        {login}
      
    </>);
}
export default Home