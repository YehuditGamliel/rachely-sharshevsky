import React, { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import GoogleMaps from '../GoogleMap/GoogleMap.jsx'
import dataJson from '../../assets/data.json'
import '../Branches/Branches.css'
import { APIRequests } from '../../APIRequests.js';
function Branches() {

  const [branches, setBranches] = useState([])
  const [search, setSearch] = useState('city')
  const [branch, setBranch] = useState({});
  const [branchMap, setBranchMap] = useState('');
  const APIRequest = new APIRequests()

  useEffect(() => {
    const fetchData = async () => {
      const response = await APIRequest.getRequest(`/branch`)
      const json = await response.json();
      setBranches([...json.data])
      if (json.data[1])
        setBranchMap(json.data[1]);
    }
    fetchData()

  }, [])


  const lookForCity = (event) => {
    fetch(`http://localhost:8082/branch/${event.target.value}`, {
      method: 'GET',

    })
      .then(response => response.json())
      .then((json) => {
        console.log(json.data)
        if (json.status != 200) {
          alert(json.error)
        }
        else {
          setBranches([...json.data])
        }
      })
  };



  const itemTemplate = (branch) => {
    const handleClickBranch = () => {
      setBranchMap(branch); 
    };
    return (
      <div className="branch-item" onClick={handleClickBranch}>
        <div className="branch-detail">

          <div className="branch-address"> EyeCenter  סניף{branch.number}{branch.strre}{branch.city}</div>
          <div className="branch-hours"> <AccessTimeIcon /> שעות פעילות:{branch.hours}</div>
          <div className="branch-days"><CalendarTodayIcon /> ימי פתיחה:{branch.days}</div>
          <div className="branch-phone"><PhoneEnabledIcon />טלפון :{branch.phone}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div id="titles">
        <h id="title" >{dataJson.Branches[0].title}</h>
        <p>{dataJson.Branches[0].description}</p>
      </div>
      <div className="brances">


        <DataView value={branches} itemTemplate={itemTemplate} layout="list" />
        <div id="map">{branchMap ? (
          <GoogleMaps id="googleMap"
            lat={branchMap.lat}
            lng={branchMap.lng}
            street={branchMap.street}
            number={branchMap.number}
            phone={branchMap.phone}
            hours={branchMap.hours}
            days={branchMap.days}
          />
        ) : null}
        </div>
      </div>
    </>
  );

}
export default Branches;



// {search === 'map' ?
//   (<>

// <div className="shopping-cart">
//   <h2>Your Shopping Cart</h2>
//   {/* <DataView value={branch} itemTemplate={itemTemplate} layout="list" /> */}
// </div>
//   {/* {console.log(branches[0].lat ,branches[0].lng)} */}
//     <GoogleMaps lat={branches[0].lat} lng={branches[0].lng} street={branches[0].street} number={branches[0].number}
//       phone={branches[0].phone} hours={branches[0].hours} days={branches[0].days} />
//   </>
//   ) : null}
// {
//   (search == 'city') ? <select className="branches-chooseCity" onChange={lookForCity}>
//     <option selected>בחירת עיר</option>
//     {cities.map((city) => {
//       return <option>{city.city}</option>;
//     })}
//   </select> : <select className="branches-chooseCity" onChange={showDetails}>
//   <option selected>בחירת כתובת</option>
//     {branches.map((branch) => {
//       return <option>{branch.street}{branch.number}</option>;
//     })}
//     </select> }