import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
// import './ListOfPurchase.css';  // Import custom CSS for additional styling
import { APIRequests } from '../../APIRequests';
// import Button from '@mui/icons-material/DeleteOutlineOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import jsonData from '../../assets/data.json'
import './EditPurchase.css'

function EditPurchase({purchase}) {
    const [status, setStatus] = React.useState('');
  
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
               "status":status
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
  

    //  return(<>{console.log(purchase)}</>)
        return (
          <>
    {console.log(purchase.status)}
            <div className="col-12" >
              <div className="purchase-item" >
                {/* <img className="product-image" src={product.status} alt={`Image of ${product.imgDisplay}`} /> */}
                <div className="purchase-detail">
                   <div className="purchase-name">מחיר:{purchase.price}</div>
                  
                <div className="product-date"> תאריך: {purchase.date && new Date(purchase.date).toISOString().split('T')[0]}</div>
              <div className="product-model">מודל:{ purchase.model}</div>
                  <div className="product-userName">שם:{purchase.userName}</div> 
                  {/* <TextField
                            label="סטטוס"
                            value={editStatus.status}
                            onChange={(e) => handleChange("status",e.target.value)}
    
                            disabled={false}
                        /> */}
                       
    
                  {/* <div className="purchase-rating"> */}
                    {/* <Rating value={product.rating} readOnly stars={5} cancel={false} /> */}
                  {/* </div> */}
                  <div className="purchase-tags">
                    {/* <Tag value={product.model} severity={getSeverity(product.inventoryStatus)} /> */}
                  </div>
                </div>
              
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={status}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>{jsonData.statusValue[purchase.status-1].status}</em>
              </MenuItem>
    {purchase.status === 1 && [
      // <MenuItem value={1}>{jsonData.statusValue[0].status}</MenuItem>,
      <MenuItem key={2} value={2}>{jsonData.statusValue[1].status}</MenuItem>,
      <MenuItem key={3} value={3}>{jsonData.statusValue[2].status}</MenuItem>
    ]}
    {purchase.status === 2 && [
      // <MenuItem value={2}>{jsonData.statusValue[1].status}</MenuItem>,
      <MenuItem key={3} value={3}>{jsonData.statusValue[2].status}</MenuItem>
    ]}
            </Select>
            <FormHelperText>עדכון סטטוס</FormHelperText>
          </FormControl>
          <Button onClick={handleClick}>עדכון</Button>
          {/* <Button onClick={handleClick}></Button> */}
    
              </div>
            </div>
          </>
        );
     

}
export default EditPurchase;