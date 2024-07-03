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
import jsonData from '../../assets/data.json'
import EditPurchase from '../EditPurchase/EditPurchase.jsx';

export default function ListOfPurchase() {
  const [purchases, setPurchases] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(0);
  const [sortedPurchases, setSortedPurchases] = useState(0)
 

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
        alert("אין הזמנות כאלו ברשימת רכישות!");
      } else {
        setPurchases([...json.data]);
      }
    }
    fetchData();
   

  }, [sortedPurchases]);

 


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
        <MenuItem onClick={() => handleClose(2)}>הזמנות במעבדה</MenuItem>
        <MenuItem onClick={() => handleClose(3)}>הזמנות מוכנות</MenuItem>
        <MenuItem onClick={() => handleClose(0)}>כל ההזמנות </MenuItem>
      </Menu>
      {console.log("👌", purchases)}
      <h2>ההזמנות שלנו</h2>

      {purchases.map((purchase, index) => <div key={index} class="glasses">
        <EditPurchase purchase={purchase} />
      </div>)
      }
      {/* <DataView value={purchases} itemTemplate={itemTemplate} layout="list" /> */}
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