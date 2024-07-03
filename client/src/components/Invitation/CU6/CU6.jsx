import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState, useContext,useEffect } from 'react';
import * as React from 'react';
import { PaperContext } from "../../../PaperProvider.jsx"

import prescription1 from '../../../img/prescription1.jpg'
import glasses2 from '../../../img/glasses2.jpg'
import glasses1 from '../../../img/glasses1.jpg'
// import jsonData from "../../../assets/data.json";
import { APIRequests } from "../../../APIRequests.js";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function CU6({ addInformation }) {
  const [selected, setSelected] = useState(null);
  const [CU6Id, setCU6Id] = useState('')
  const [CU6, setCU6] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [open, setOpen] = React.useState(true);
  const { paper, setCurrentPaper } = useContext(PaperContext);
  const theme = useTheme();
  const APIRequest = new APIRequests()

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const updateStyle = (withOrWithoutPrescription) => {
    setIsButtonDisabled(false)
    setCU6Id(withOrWithoutPrescription)

  }

  const fetchData = async () => {
   
      const response = await APIRequest.getRequest(`/invitation/CU6`);
      const json = await response.json();
      
      if (response.status !== 200) {
        alert(json.error);
      } else {
        console.log("cu6",json.data)
      setCU6([...json.data])
          //setDisplayEyglasses([...displayEyeglasses, ...json.data]);
       
      }
   
    
  };


  useEffect(()=>{
    fetchData();
  
  },[])

  const handleClick = (index) => {
    setSelected(index);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (<Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="scroll-dialog-title" >איך תרצו למלא את פרטי המרשם שלכם?</DialogTitle>
    <DialogContent dividers={scroll === 'paper'}></DialogContent>
    <div direction="row" spacing={2}>
      {CU6.map((data, id) =>
        <div className={selected === id ? "border" : "noneBorder"}>
          <DemoPaper onClick={() => {
            updateStyle(id )
            handleClick(id)
          }}>
            <div className="titleContainer">
            <nav className="title" dir="rtl"> CU6-עובי {data.CU6.replace(/^"(.*)"$/, '$1')}</nav>
            </div>
            <p> {data.description}</p>
            <p id="price">{data.price}₪</p>
          </DemoPaper></div>




      )}
    </div>
    <Button onClick={() => addInformation('CU6', CU6Id, 'paymentForm') }>לקניה</Button>
    <Button onClick={() => addInformation('CU6', CU6Id, 'ShoppingCart')}>להכנסה לסל</Button>
    {/* {login} */}
  </Dialog>
  );
}
export default CU6;


