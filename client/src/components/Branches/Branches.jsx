import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import GoogleMaps from '../GoogleMap/GoogleMap.jsx'
import dataJson from '../../assets/data.json'
import '../Branches/Branches.css'
import { APIRequests } from '../../APIRequests.js';
function Branches() {
  const [branches, setBranches] = useState([])
  const [branchMap, setBranchMap] = useState('');
  const APIRequest = new APIRequests()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIRequest.getRequest(`/branch`)
        const json = await response.json();
        setBranches([...json.data])
        setBranchMap(json.data[1]);
      }
      catch (error) {
        alert(error)
      }
    }
    fetchData()
  }, [])

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



