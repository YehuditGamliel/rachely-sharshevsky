import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Home.css';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import header from '../../img/header.jpg';
import jsonData from '../../assets/data.json'
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

  useEffect(() => {
    if (location.pathname === '/my-account') {
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
        {branches.map((branch) => {
          return <option>{branch.street}{branch.number}</option>;
        })}
      
   
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

      </div>
    </div>

    {login}

  </>);
}
export default Home
