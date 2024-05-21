import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import glasses1 from'../../img/glasses1.jpg'
import glasses2 from'../../img/glasses2.jpg'
 import glasses3 from'../../img/glasses3.jpg'
import glasses4 from'../../img/glasses4.png'

import './Invitation.css'

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function Invitation() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState('paper');
  // const [age, setAge] = React.useState('');
  const [disable,setDisable]=useState(1)
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleChange = (event) => {
      event.currentTarget.disabled = false;
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen('paper')} startIcon={<RemoveRedEyeIcon />}>לבחירת עדשות</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">המשקפיים ישמשו אותי עבור</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
          >
            <div direction="row" spacing={2}>
              <DemoPaper
                >
                <div className="titleContainer">
                <img  className="glassesImage"src={glasses1}/><br/>
                <nav className="title">ללא מרשם</nav>
                </div>
                 משקפיים כאביזר אופנה למראה מתוחכם ושימושי. העדשות מגיעות עם הגנה מירבית מקרינת
              השמש UV400, בנוסף ניתן לשדרג לעדשות DEFENDER המגינות מפני
              קרינת מסכים.</DemoPaper>
              <DemoPaper onClick={()=>alert("pp")}>
                <div className="titleContainer">
                <img  className="glassesImage"src={glasses2}/><br/>
                <nav className="title">עדשות למרחק</nav>
                </div>
                 עוזרות לראות בצורה ברורה לאובייקטים
                 במרחק ממך.הצורך בעדשות אלה יגבר בתנאי תאורה מוגבלים</DemoPaper>
                 <DemoPaper >
                <div className="titleContainer">
                <img  className="glassesImage"src={glasses3}/><br/>
                <nav className="title">עדשות לקריאה</nav>
                </div>
                 מיועדות לעזור לך לראותפרטים במרחק קרוב(קריאה מספר או צפייה במסך מחשב)
              </DemoPaper>
              <DemoPaper>
                <div className="titleContainer">
                <img  className="glassesImage"src={glasses4}/><br/>
                <nav className="title">מולטיפוקל</nav>
                </div>
                לראות גם לרחוק וגם לקרוב בעדשה אחת,
                ע"י 3 מוקדים הממוקמים באיזורים שונים של העדשה
                </DemoPaper>    
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  
          disabled
          id="buttonContinue"
          onClick={handleChange}>אפשר להמשיך</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default Invitation;
