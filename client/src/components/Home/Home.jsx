import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Home.css';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import header from '../../img/header.jpg';
import jsonData from '../../assets/data.json'
import GoogleMaps from '../GoogleMap/GoogleMap.jsx'
import useSound from 'use-sound';
import r from '../img/r.mp3'


function Home(props) {
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([])
  const [search, setSearch] = useState('city')
  const [branch, setBranch] = useState({})
  const [style, setStyle] = useState("activity")
  const [login, setLogin] = useState('');
  let location = useLocation();
  let navigate = useNavigate()
  const [play, { stop }] = useSound(r);

  useEffect(() => {
    fetch(`http://localhost:8082/branch`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((json) => {
        ''
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          setCities([...json.data])
          setSearch('city')
        }
      })
  },[])
    
  useEffect(() => {
    // const storedProducts = JSON.parse(localStorage.getItem("ShoppingCart")) || [];

    // if(storedProducts){
    //   navigate('/my-account')
    // }
    if (location.pathname === '/my-account') {
      setLogin(false);
      setStyle("activity")
    }
  }, [location]);

  const lookForCity = (event) => {
    fetch(`http://localhost:8082/branch/${event.target.value}`, {
      method: 'GET',

    })
      .then(response => response.json())
      .then((json) => {
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          setBranches([...json.data])
          // console.log("branch", branches)
          setSearch('branch')
        }
      })
  };

  const showDetails = (event) => {
    const singleBranch = branches.find(t => `${t.street}${t.number}` === event.target.value);
    setBranch(singleBranch);
    setSearch('map')
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
  < button onMouseEnter={() => play()} onMouseLeave={() => stop()}></button>
    {search === 'map' ?
      (<>
      {/* {console.log(branches[0].lat ,branches[0].lng)} */}
        <GoogleMaps lat={branches[0].lat} lng={branches[0].lng} street={branches[0].street} number={branches[0].number}
          phone={branches[0].phone} hours={branches[0].hours} days={branches[0].days} />
      </>
      ) : null}
    {
      (search == 'city') ? <select className="branches-chooseCity" onChange={lookForCity}>
        <option selected>בחירת עיר</option>
        {cities.map((city) => {
          return <option>{city.city}</option>;
        })}
      </select> : <select className="branches-chooseCity" onChange={showDetails}>
        <option selected>בחירת סניף</option>

        {branches.map((branch) => {
          // { console.log("p", branch) }
          return <option>{branch.street}{branch.number}</option>;
        })}
      </select>
    }
    <div id={style}>
      <div>
        <img id="img" src={header} />
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
