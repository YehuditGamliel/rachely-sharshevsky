import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from 'react-router-dom';
// import { UserContext } from "../../EyeglassesProvider";
import './Home.css';
// import useSound from 'use-sound';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
// import useSound from 'use-sound';
import header from '../../img/header.jpg';
// import PayPalButtonsComponent from '../../components/PayPalButtonsComponent/PayPalButtonsComponent.jsx'
//import axios from 'axios'
// import PaymentForm from '../PaymentForm/PaymentForm';
import EmailVerification from'../EmailVerification/EmailVerification'
import jsonData from '../../assets/data.json'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SingleBranchDetailes from '../Login/SingleBranchDetailes.jsx';
// import  Map  from '../Map.jsx';
import r from '../r.mp3'

// import SimpleMap from '../GoogleMap.jsx'
import GoogleMaps from '../GoogleMap.jsx';


function Home(props) {  
    // const [play, { stop }] = useSound(r);
      const [cities, setCities ] = useState([]); 
      const [branches,setBranches]=useState([])
      const [search,setSearch]=useState('city')
      const [branch,setBranch]=useState({})
    const navigate = useNavigate(); 
    
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
              .then((json) => {''
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
    const singleBranch = branches.find(t => `${t.street}${t.number}` === event.target.value);
    setBranch(singleBranch);
    setSearch('map')
    // return (
    // );
    console.log(singleBranch,branch,"🤦‍♂️🤦‍♂️")
}
      
    

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
//city, street, phoneNumber, days,hours
    return (<>
    
 {/* < button onMouseEnter={() => play()} onMouseLeave={() => stop()}></button> */}
{search === 'map' ?
    (<>
    {console.log("❤️",branches[0].lat)}
    {/* <GoogleMaps/> */}
      {/* <singleBranchDetailes city={branch.city} street={branch.street} number={branch.number} days={branch.days} hours={branch.hours}/> */}
      <GoogleMaps lat={branches[0].lat} lng={branches[0].lng} street={branches[0].street} number={branches[0].number}
      phone={branches[0].phone}hours={branches[0].hours}days={branches[0].days}/>
    </>
  ) : null}
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
   return <option>{branch.street}{branch.number}</option>;
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