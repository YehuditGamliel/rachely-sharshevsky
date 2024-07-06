import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import './ListOfPurchase.css';  // Import custom CSS for additional styling
import { APIRequests } from '../../APIRequests';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditPurchase from '../EditPurchase/EditPurchase.jsx';

export default function ListOfPurchase() {
  const [purchases, setPurchases] = useState([]);
  const [anchorEl, setAnchorEl] = useState(0);
  const [sortedPurchases, setSortedPurchases] = useState(0)
  const [statuses, setStatuses] = useState([])
  const APIReqests = new APIRequests();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    setAnchorEl(null);
    setSortedPurchases(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await APIReqests.getRequest(`/purchase/status`);
        let json = await response.json();
        if (response.status !== 200) {
          alert(json.error);
        } else {
          setStatuses([...json.data]);
        }
      }
      catch (error) {
        alert(error)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      let json = null;
      if (sortedPurchases === 0) {
        try {
          response = await APIReqests.getRequest(`/purchase`);
          json = await response.json();
        }
        catch (error) {
          alert("אין הזמנות כאלו ברשימת רכישות!")
        }
      } else {
        try {
          response = await APIReqests.getRequest(`/purchase/status/${sortedPurchases}`);
          json = await response.json();
        }
        catch (error) {
          alert("אין הזמנות כאלו ברשימת רכישות!")
        }
      }
      setPurchases([...json.data]);
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
        {statuses.map((status, index) => <MenuItem onClick={() => handleClose(status.id)}>הזמנות ש{status.title}</MenuItem>)}
        <MenuItem onClick={() => handleClose(0)}>כל ההזמנות </MenuItem>
      </Menu>
      {console.log(purchases, "purchases")}
      {purchases.map((purchase, index) =>
        <div key={index} class="purchase">{console.log("par", purchase, purchase
        )}
          <EditPurchase id="editPurchase" purchase={purchase} statuses={statuses} />
        </div>)
      }
    </div>
  </>
  );
}
