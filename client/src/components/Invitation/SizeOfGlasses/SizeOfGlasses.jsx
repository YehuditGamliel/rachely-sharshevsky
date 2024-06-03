

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
// import '..Invitation/Invitation.css'
const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 250,
    height: 110,
    padding: theme.spacing(3),
    ...theme.typography.body2,
    textAlign: 'center',
  }));
 

function SizeOfGlasses({addInformation ,changeStyle, buttonBorder}){
    const theme = useTheme();
    const [sizeOfGlasses,setSizeOfGlasses]=useState({"PWRRight":0,"CYLRight":0,"PWRLeft":0,"CYLLeft":0,"PDFAR":62,"PDNEAR":62});
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // const [withOrWithoutPrescriptionId, setwithOrWithoutPrescriptionId] = useState('')
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
        const [open, setOpen] = React.useState(true);
        const [plusNum,setPlusNum]=useState(false)

        const [minusNum,setMinusNum]=useState(false)
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (   
      
        
        <Dialog
              //fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
   
    <DialogTitle id="scroll-dialog-title" >נא להזין את פרטי המרשם שלך:</DialogTitle>
    <DialogContent dividers={scroll === 'paper'}>
      <p>עין ימין</p>
      <Button
      onClick={() =>{setPlusNum(true)
        setMinusNum(false) }
      }>+</Button>
      <Button onClick={()=>{setMinusNum(true) 
        setPlusNum(false)}}>-</Button>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={plusNum?PWROptionPlus:PWROptionMinus}
        onChange={(event, value) =>  setSizeOfGlasses ({ ...sizeOfGlasses, 'PWRRight': value})}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="מספר PWR/SPH" />}
      /> 
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={CYLOption}
        onChange={(event, value) =>  setSizeOfGlasses ({ ...sizeOfGlasses, 'CYLRight': value})}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="CYLצילינדר"/>}/> 
      <p>עין שמאל</p>
      <Button onClick={() =>{setPlusNum(true)
        setMinusNum(false) }
      }>+</Button>
      <Button onClick={()=>{setMinusNum(true) 
        setPlusNum(false)}}>-</Button>
      <Autocomplete onChange={(event, value) => setSizeOfGlasses ({ ...sizeOfGlasses, 'PWRLeft': value})}
        disablePortal
        id="combo-box-demo"
        options={plusNum?PWROptionPlus:PWROptionMinus}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="מספר PWR/SPH" />}  /> 
   
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={CYLOption}
        onChange={(event, value) =>   setSizeOfGlasses ({ ...sizeOfGlasses, 'CYLLeft': value})}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="CYLצילינדר"/>}                /> 
      <p>PD FAR : מרחק בין האישונים</p>
      <Autocomplete 
       onChange={(event, value) =>  setSizeOfGlasses ({ ...sizeOfGlasses, 'PDFAR': value})}
        disablePortal
        id="combo-box-demo"
        options={PDOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="PD FAR"/>}/> 
        <p>PD NEAR : מרחק בין האישונים</p>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={PDOptions}
        onChange={(event, value) =>  setSizeOfGlasses ({ ...sizeOfGlasses, 'PDNEAR': value})}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="PD NERA"/>} /> 
    <Button
      onClick={() => addInformation('sizeOfGlasses', sizeOfGlasses, 'CU6')}
     >אפשר להמשיך</Button>
   </DialogContent>
  </Dialog>
    );
   
}
const PWROptionMinus= Array.from(new Array(24 * 2)).map(
  (_, index) =>`-${Math.floor(index / 4)+index%4*0.25}   `,);
const PWROptionPlus = Array.from(new Array(24 * 2)).map(
(_, index) =>
  `+${Math.floor(index / 4)+index%4*0.25}`,);
const CYLOption=Array.from(new Array(8 * 2)).map(
(_, index) =>
  `-${Math.floor(index / 4)+index%4*0.25}`,);
const PDOptions= Array.from(new Array(20)).map(
(_, index) =>
  `${index+40}`,);
export default SizeOfGlasses;