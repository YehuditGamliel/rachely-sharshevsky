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
  const [statuses,setStatuses]=useState([])
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    setAnchorEl(null);
    setSortedPurchases(id);
  };

  const navigate = useNavigate();
  const APIReqests = new APIRequests();

  useEffect(()=>{
    const fetchData = async () => {
       let response = await APIReqests.getRequest(`/purchase/status`);
       let json = await response.json();
      if (response.status !== 200) {
        alert(json.error);
      } else {
        setStatuses([...json.data]);
      }
    }
    fetchData();
  },[])
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
    <h2>ההזמנות שלנו</h2>
      <Button 
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        מיון הזמנות
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
       {statuses.map((status,index)=> <MenuItem onClick={() => handleClose(status.id)}>הזמנות ש{status.title}</MenuItem>)}
        <MenuItem onClick={() => handleClose(0)}>כל ההזמנות </MenuItem>
      </Menu>
      {purchases.map((purchase, index) => 
      
      <div key={index} class="purchase">{console.log("par",purchase)}
        <EditPurchase id="editPurchase" purchase={purchase} statuses={statuses}/>
      </div>)
      }
    </div>
  </>
  );
}
