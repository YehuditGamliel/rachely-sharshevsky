import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import './ListOfPurchase.css';  // Import custom CSS for additional styling
import { APIRequests } from '../../APIRequests';
// import Button from '@mui/icons-material/DeleteOutlineOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';


export default function ListOfPurchase() {
  const [purchases, setPurchases] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(0);
  const [sortedPurchases, setSortedPurchases] = useState(0)
  const [editStatus,setEditStatus]=useState()
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = (id) => {
    setAnchorEl(null);
    setSortedPurchases(id);

  };
//   const handleChange = ( value) => {
//     setEditStatus({
//        "status":value
//     });
// };
// useEffect(() => {
//   console.log(editStatus);
// }, [editStatus]);

// const handleChange = (field, value) => {
//   setEditStatus({
//       ...editStatus,
//       [field]: value,
//   });
// };




  const navigate = useNavigate();
  const APIReqests = new APIRequests();
  useEffect(() => {

    const fetchData = async () => {
      let response = null;
      let json = null;

      if (sortedPurchases === 0) {
        response = await APIReqests.getRequest(`/purchase`);
        json = await response.json();
      } else {
        response = await APIReqests.getRequest(`/purchase/status/${sortedPurchases}`);
        json = await response.json();
      }

      // console.log("👌", json.data);
      if (response.status !== 200) {
        alert(json.error);
      } else {
        setPurchases([...json.data]);
      }
    }
    fetchData();
   

  }, [sortedPurchases]);

  const itemTemplate = (purchase) => {
    return (
      <>
      { setEditStatus(purchase.status)}
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
            {/* <Button onClick={() => removeFromCart(product.model)}>
            <DeleteOutlineOutlinedIcon />
          </Button> */}
                {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl> */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>


          </div>
        </div>
      </>
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productModel) => {
    //אם בחר כמה מאותו משקפיים למחוק את הכל?
    const updatedProducts = purchases.filter((product) => product.model !== productModel);
    setPurchases(updatedProducts);
    localStorage.setItem("ShoppingCart", JSON.stringify(updatedProducts));
  };

  return (<>
    <div className="ListOfPurchase">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        הזמנות
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleClose(1)}>הזמנות חדשות</MenuItem>
        <MenuItem onClick={() => handleClose(2)}>הזמנות מוכנות</MenuItem>
        <MenuItem onClick={() => handleClose(0)}>כל ההזמנות </MenuItem>
      </Menu>
      {console.log("👌", purchases)}
      <h2>ההזמנות שלנו</h2>
      <DataView value={purchases} itemTemplate={itemTemplate} layout="list" />
    </div>


  </>
  );
}
// date
// :
// "2024-11-10T22:00:00.000Z"
// id
// :
// 100001
// idEyeData
// :
// 1
// isActive
// :
// 1
// model
// :
// "3"
// price
// :
// 3
// status
// :
// 1
// userName
// :
// "dani"