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
function CU6({addInformation ,changeStyle, buttonBorder}){
   
    const [CU6Id, setCU6Id] = useState('')
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
        const [open, setOpen] = React.useState(true);
        const theme = useTheme();
         
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      const updateStyle = (withOrWithoutPrescription) => {
          setIsButtonDisabled(false)
          setCU6Id(withOrWithoutPrescription)
          changeStyle(withOrWithoutPrescription)
    }
    
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
    
    // return (
        
    //         <Dialog
    //             open={open}
    //             onClose={handleClose}
    //             scroll={scroll}
    //             aria-labelledby="scroll-dialog-title"
    //             aria-describedby="scroll-dialog-description">
    //             <DialogTitle id="scroll-dialog-title" >איכות עדשה</DialogTitle>
    //             <DialogContent dividers={scroll === 'paper'}>
    //                 {/* <DialogContentText> */}
    //                 <div direction="row" spacing={2}>
    //                     {/* 1 */}
    //                     <div className={buttonBorder.a}>
    //                     <DemoPaper onClick={() => updateStyle("1")}>
    //                         <div className="titleContainer">
    //                         <nav className="title">1.5 עובי-CU6</nav>
    //                         </div>
    //                         סטנדרט ציפויים מתקדם המגינים
    //                         מפני שריטות,
    //                         קרינה והשתקפויות
    //                         <p>כלול</p>
    //                     </DemoPaper></div>
    //                     {/* 2 */}
    //                     <div className={buttonBorder.b}>
    //                     <DemoPaper onClick={() => updateStyle("2")}>
    //                         <div className="titleContainer">
    //                         <nav className="title">1.6 עובי-CU6</nav>
    //                         </div>
    //                         עובי העדשה קטן יותר בכ25%
    //                         <br />
    //                         סטנדרט ציפויים מתקדם המגינים מפני שריטות,
    //                         קרינה והשתקפויות
    //                         <p>199$</p>
    //                     </DemoPaper>
    //                     </div>
    //                     {/* c */}
    //                     <div className={buttonBorder.c}>
    //                     <DemoPaper onClick={() => updateStyle("3")}>
    //                         <div className="titleContainer">
    //                         <nav className="title">1.67 עובי-CU6</nav>
    //                         </div>
    //                         עובי העדשה קטן יותר בכ35%
    //                         <br />
    //                         סטנדרט ציפויים מתקדם המגינים מפני שריטות,
    //                         קרינה והשתקפויות
    //                         <p>499$</p>
    //                     </DemoPaper>
    //                 </div>
    //                 {/* d */}
    //                 <div className={buttonBorder.d}>
    //                   <DemoPaper onClick={() => updateStyle("4")}>
    //                     <div className="titleContainer">
    //                       <nav className="title">1.74 עובי-CU6</nav>
    //                     </div>
    //                     עובי העדשה קטן יותר בעד 40%
    //                     <br />
    //                     סטנדרט ציפויים מתקדם המגינים מפני שריטות,
    //                     קרינה והשתקפויות
    //                     <p>699$</p>                    </DemoPaper>
    //                 </div>
    //               </div>
    //             {/* </DialogContentText> */}
    //           </DialogContent>
   
    //         </Dialog>
    // )
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
            <div className={buttonBorder.a}>
              <DemoPaper onClick={() => updateStyle((index+1).toString())}>
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


