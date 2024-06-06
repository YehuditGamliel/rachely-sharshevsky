import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState, useContext } from 'react';
import * as React from 'react';
import prescription1 from '../../../img/prescription1.jpg'
import glasses2 from '../../../img/glasses2.jpg'
import glasses1 from '../../../img/glasses1.jpg'
import jsonData from "../../../assets/data.json";


import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 250,
    height: 110,
    padding: theme.spacing(3),
    ...theme.typography.body2,
    textAlign: 'center',
  }));
function CU6({addInformation}){
    const [selected, setSelected] = useState(null);
    const [CU6Id, setCU6Id] = useState('')
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
        const [open, setOpen] = React.useState(true);
        const theme = useTheme();
         
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      const updateStyle = (withOrWithoutPrescription) => {
          setIsButtonDisabled(false)
          setCU6Id(withOrWithoutPrescription)
          
    }
    
    const handleClick = (index) => {
        setSelected(index);
      };
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
    
 
    return (   <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
         <DialogTitle id="scroll-dialog-title" >איך תרצו למלא את פרטי המרשם שלכם?</DialogTitle>
    <DialogContent dividers={scroll === 'paper'}></DialogContent>
          <div direction="row" spacing={2}>
          {jsonData.CU6.map((data, index) =>
            <div className={selected === index?"border":"noneBorder"}>
              <DemoPaper onClick={() =>{ updateStyle((index+1).toString())
                 handleClick(index)
              }}>
                <div className="titleContainer">
                  <nav className="title">{data.title}</nav>
                </div>
               <p> {data.description}</p>
               <p id="price">{data.price}₪</p>
              </DemoPaper></div>
            
         
         
       
        )}
         </div>
                    <Button
                 onClick={() =>  addInformation('CU6Id', CU6Id , 'paymentForm')
                  
                 }>לקניה</Button>
             <Button onClick={() => addInformation('CU6Id', CU6Id , 'ShoppingCart')}>להכנסה לסל</Button>
      {/* {login} */}
    </Dialog>
);
    }
export default CU6;


