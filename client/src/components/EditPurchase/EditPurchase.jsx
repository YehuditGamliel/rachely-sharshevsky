import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { APIRequests } from '../../APIRequests';
import JsonData from '../../assets/data.json'
import Button from '@mui/material/Button';

function EditPurchase({ purchase, statuses }) {
  const [status, setStatus] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [userEyeData, setUserEyeData] = useState({})
  const [EyeDataDetails, setEyeDataDetails] = useState([])
  const APIReqests = new APIRequests();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    const fetchData = async () => {
      let response = await APIReqests.getRequest(`/purchase/userName/${purchase.userName}`);
      let json = await response.json();
      console.log(json.data)
      setUserEyeData(...json.data);
    }
    fetchData();
  };

  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
    const fetchData = async () => {
      let response = await APIReqests.getRequest(`/purchase/EyeData/${purchase.idEyeData}`);
      let json = await response.json();
      console.log(json.data, "EyeDataDetails")
      setEyeDataDetails([...json.data]);
    }
    fetchData();
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(status)
    setStatus(selectedValue);
  };

  const handleClick = (event) => {
    fetch(`http://localhost:8082/purchase/${purchase.id}`, {
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
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to update purchase');
        }
        return response.json();
      })
      .then(data => {
      })
      .catch(error => {
        console.error('Error updating purchase data:', error);
      });
  };

  return (
    <>
      <div className="col-12" >
        <div className="purchase-item" >
          <div className="purchase-detail">
            <div className="purchase-name">מחיר:{purchase.price}</div>
            <div className="product-date"> תאריך: {purchase.date && new Date(purchase.date).toISOString().split('T')[0]}</div>
            <div className="product-model">מודל:{purchase.model}</div>
            <div className="product-userName">שם:{purchase.userName}</div>
          </div>
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
          <Button onClick={handleClick}>עדכון</Button>
          <p>לפרטי הלקוח</p>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {JsonData.userDetails.map((data, index) => (
                <Typography key={index} paragraph>
                  {data.title}{userEyeData[data.value]}
                </Typography>
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
            <CardContent>
              {EyeDataDetails.map((data, index) => (
                Object.keys(data).map((key, innerIndex) => (
                  <Typography key={index + '-' + innerIndex} paragraph>{key + ": " + data[key]}</Typography>
                ))
              ))}
            </CardContent>
          </Collapse>
        </div>
      </div>
    </>
  );

}
export default EditPurchase;