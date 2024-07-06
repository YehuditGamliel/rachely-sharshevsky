import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { APIRequests } from '../../APIRequests';
import JsonData from '../../assets/data.json'
import Button from '@mui/material/Button';

function EditPurchase({ purchase, statuses }) {
  const [status, setStatus] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [userEyeData, setUserEyeData] = useState({})
  const [EyeDataDetails, setEyeDataDetails] = useState([])
  const APIReqests = new APIRequests();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    const fetchData = async () => {
      try {
        let response = await APIReqests.getRequest(`/purchase/userName/${purchase.userName}`);
        let json = await response.json();
        setUserEyeData(...json.data);
      }
      catch (error) {
        alert(error)
      }
    }
    fetchData();
  };

  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
    const fetchData = async () => {
      try {
        let response = await APIReqests.getRequest(`/purchase/EyeData/${purchase.idEyeData}`);
        let json = await response.json();
        setEyeDataDetails([...json.data]);
      }
      catch (error) {
        alert(error)
      }
    }
    fetchData();
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setStatus(selectedValue);
  };

  const handleClick = (event) => {
    fetch(`http://localhost:8082/purchase/${purchase.idEyeData}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "status": status
        }
      ),
    })
    .catch(error => {
       alert(error.message)
     });
  };

  return (
    <>
      <div className="col-12" >
        <div className="purchase-item" >
          <p>לפרטי הלקוח</p>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className="collapse-content">
              {JsonData.userDetails.map((data, index) => (
                <p key={index} paragraph>
                  {data.title}{userEyeData[data.value]}
                </p>
              ))}
            </CardContent>
          </Collapse>
          <p>לפרטי נתוני עיניים</p>
          <ExpandMore
            expand={expanded2}
            onClick={handleExpandClick2}
            aria-expanded={expanded2}
            aria-label="show more" >
            <ExpandMoreIcon />
          </ExpandMore>

          <Collapse in={expanded2} timeout="auto" unmountOnExit>
            <CardContent className="collapse-content">
              {EyeDataDetails.map((data, index) => (
                Object.keys(data).map((key, innerIndex) => (
                  <p key={index + '-' + innerIndex} paragraph>{key + ": " + data[key]}</p>
                ))
              ))}
            </CardContent>
          </Collapse>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={status}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">
                <em>{purchase.title}</em>
              </MenuItem>
              {purchase.status == 1 && [
                <MenuItem key={2} value={2}>{statuses[1].title}</MenuItem>,
                <MenuItem key={3} value={3}>{statuses[2].title}</MenuItem>
              ]}
              {purchase.status === 2 && [
                <MenuItem key={3} value={3}>{statuses[2].title}</MenuItem>
              ]}
            </Select>
            <FormHelperText>עדכון סטטוס</FormHelperText>
          </FormControl>
          <Button onClick={handleClick}>עדכון סטטוס</Button>
          <p className="purchase-detail">
            {JsonData.dataUser.map((data, index) => (
              <p className="purchase" key={index} paragraph>
                {data.title}{purchase[data.value]}
              </p>
            ))}
            <p className="product-date"> תאריך: {purchase.date && new Date(purchase.date).toISOString().split('T')[0]}</p>
          </p>
        </div>
      </div>
    </>
  );

}
export default EditPurchase;