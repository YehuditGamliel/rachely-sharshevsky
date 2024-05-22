import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import glasses1 from '../../img/glasses1.jpg'
import glasses2 from '../../img/glasses2.jpg'
import glasses3 from '../../img/glasses3.jpg'
import glasses4 from '../../img/glasses4.png'

import './Invitation.css'

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function Invitation(model) {
  const [userItem, setUserItem] = useState({model:model.model});

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  // const [age, setAge] = React.useState('');
  const [disable, setDisable] = useState(1)
  const [style, setStyle] = useState("noneBorder");
  const [paper,setPaper]=useState({title:'kindOfGlasses'})
  const [buttonBorder, setButtonBorder] = useState({ a: "noneBorder", b: "noneBorder", c: "noneBorder", d: "noneBorder" })
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [kindOfGlasses, setKindOfGlasses] = useState('')
  const [qualityGlasses,setQualityGlasses]=useState('')
  const kindOfGlassesArry = ["withoutPrescription", "distanceLenses", "readingGlasses","multifocal"];
  const qualityGlassesArry = ["1.5", "1.6", "1.67","1.74"];
  const [diffrentBetweenEyes,setDiffrentBetweenEyes]=useState('same')

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (event) => {
  //     event.currentTarget.disabled = false;
  // };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
 
  const addInformation = (name, value,arry,title) => {
    {
      var valueInt = Number(value);
      //qualityGlasses  prescriptionDetails
      //  console.log("pp",value,n,arry[n])
      console.log(userItem)
    }
    {console.log(isButtonDisabled)}
    setButtonDisabled(false)
   setPaper({title:title})
   {console.log(isButtonDisabled)}
   setButtonBorder({ a: "noneBorder", b: "noneBorder", c: "noneBorder", d: "noneBorder" })

    setUserItem(userItem => ({
      ...userItem,
      [name]: arry[valueInt]
    }));
  
  };
  const inputSizes=(type)=>{
    setDiffrentBetweenEyes(type)

  }
const changeStyle = (char,title) => {
  switch(title){
    case 'kindOfGlasses':{
      setKindOfGlasses(char)
      break;
    }
      
    case'qualityGlasses':{
    {console.log(title,char)}
    setQualityGlasses(char)
    


 break;
 }
 

  }
  setButtonDisabled(false)
    switch (char) {
    case '1': {
      setButtonBorder({ a: "border", b: "noneBorder", c: "noneBorder", d: "noneBorder" })

      break;
    }
    case '2': {
      setButtonBorder({ a: "noneBorder", b: "border", c: "noneBorder", d: "noneBorder" })
      break;
    }
    case '3': {
      setButtonBorder({ a: "noneBorder", b: "noneBorder", c: "border", d: "noneBorder" })
      break;
    }
    default: {
      setButtonBorder({ a: "noneBorder", b: "noneBorder", c: "noneBorder", d: "border" })
    }
  }
 
}
return (
  <React.Fragment>
    <Button variant="outlined" onClick={handleClickOpen('paper')} startIcon={<RemoveRedEyeIcon />}>לבחירת עדשות</Button>
    {(() => {
        if (paper.title=='kindOfGlasses') {
          return (
            <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title" >המשקפיים ישמשו אותי עבור</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
              >
                <div direction="row" spacing={2}>
                  {/* 1 */}
                  <div className={buttonBorder.a}>
                    <DemoPaper onClick={() => changeStyle("1",'kindOfGlasses')}>
                      <div className="titleContainer">
                        <img className="glassesImage" src={glasses1} /><br />
                        <nav className="title">ללא מרשם</nav>
                      </div>
                      משקפיים כאביזר אופנה למראה מתוחכם ושימושי. העדשות מגיעות עם הגנה מירבית מקרינת
                      השמש UV400, בנוסף ניתן לשדרג לעדשות DEFENDER המגינות מפני
                      קרינת מסכים.</DemoPaper></div>
                  {/* 2 */}
                  <div className={buttonBorder.b}>
                    <DemoPaper onClick={() => changeStyle("2",'kindOfGlasses')}>
                      <div className="titleContainer">
                        <img className="glassesImage" src={glasses2} /><br />
                        <nav className="title">עדשות למרחק</nav>
                      </div>
                      עוזרות לראות בצורה ברורה לאובייקטים
                      במרחק ממך.הצורך בעדשות אלה יגבר בתנאי תאורה מוגבלים
                    </DemoPaper>
                  </div>
                  {/* 3 */}
                  <div className={buttonBorder.c}>
                    <DemoPaper onClick={() => changeStyle("3",'kindOfGlasses')}>
                      <div className="titleContainer">
                        <img className="glassesImage" src={glasses3} /><br />
                        <nav className="title">עדשות לקריאה</nav>
                      </div>
                      מיועדות לעזור לך לראותפרטים במרחק קרוב(קריאה מספר או צפייה במסך מחשב)
                    </DemoPaper>
                  </div>
                  {/* 4 */}
                  <div className={buttonBorder.d}>
                    <DemoPaper onClick={() => changeStyle("4",'kindOfGlasses')}>
                      <div className="titleContainer">
                        <img className="glassesImage" src={glasses4} /><br />
                        <nav className="title">מולטיפוקל</nav>
                      </div>
                      לראות גם לרחוק וגם לקרוב בעדשה אחת,
                      ע"י 3 מוקדים הממוקמים באיזורים שונים של העדשה
                    </DemoPaper>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
              <Button
                onClick={()=>addInformation('kindOfGlasses', kindOfGlasses,kindOfGlassesArry,'qualityGlasses')}
                disabled={isButtonDisabled == true}
              >אפשר להמשיך</Button>
          </Dialog>
          )
        }  else if(paper.title=='qualityGlasses') {
          return (
            <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title" >איכות עדשה</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
              >
                <div direction="row" spacing={2}>
                  {/* 1 */}
                  <div className={buttonBorder.a}>
                    <DemoPaper onClick={() => changeStyle("1",'qualityGlasses')}>
                      <div className="titleContainer">
                        <nav className="title">1.5 עובי-CU6</nav>
                      </div>
                      סטנדרט ציפויים מתקדם המגינים
                      מפני שריטות,
                      קרינה והשתקפויות
                      <p>כלול</p>
                      </DemoPaper></div>
                  {/* 2 */}
                  <div className={buttonBorder.b}>
                    <DemoPaper onClick={() => changeStyle("2",'qualityGlasses')}>
                      <div className="titleContainer">
                        <nav className="title">1.6 עובי-CU6</nav>
                      </div>
                      עובי העדשה קטן יותר בכ25%
                      <br/>
                      סטנדרט ציפויים מתקדם המגינים מפני שריטות,
                      קרינה והשתקפויות
                      <p>199$</p>


                                     </DemoPaper>
                  </div>
                  {/* 3 */}
                  <div className={buttonBorder.c}>
                    <DemoPaper onClick={() => changeStyle("3",'qualityGlasses')}>
                      <div className="titleContainer">
                        <nav className="title">1.67 עובי-CU6</nav>
                      </div>
                      עובי העדשה קטן יותר בכ35%
                      <br/>
                      סטנדרט ציפויים מתקדם המגינים מפני שריטות,
                      קרינה והשתקפויות
                      <p>499$</p>
                    </DemoPaper>
                  </div>
                  {/* 4 */}
                  <div className={buttonBorder.d}>
                    <DemoPaper onClick={() => changeStyle("4",'qualityGlasses')}>
                      <div className="titleContainer">
                        <nav className="title">1.74 עובי-CU6</nav>
                      </div>
                      עובי העדשה קטן יותר בעד 40%
                      <br/>
                      סטנדרט ציפויים מתקדם המגינים מפני שריטות,
                      קרינה והשתקפויות
                      <p>699$</p>                    </DemoPaper>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
              <Button
                onClick={()=>addInformation('qualityGlasses', qualityGlasses,qualityGlassesArry,'sizeOfGlasses')}
            
                disabled={isButtonDisabled == true}
              >אפשר להמשיך</Button>
          </Dialog>
          )
        }
        else{
          return (
            <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title" >נא להזין את פרטי המרשם שלך:</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
             <Button onClick={()=>inputSizes('diffrent')}>מספר זהה בשתי העיניים</Button>
             <Button onClick={()=>inputSizes('same')}>מספר שונה בכל עין</Button>
             {(diffrentBetweenEyes=='same')?
             (<p>עין ימין ושמאל</p>
            )
             :<></>}
          
            </DialogContent>
              <Button
                onClick={()=>addInformation('qualityGlasses', qualityGlasses,qualityGlassesArry,'sizeOfGlasses')}
                disabled={isButtonDisabled == true}
              >אפשר להמשיך</Button>
          </Dialog>
          )
        }
        // {console.log("pp",qualityGlasses)}
        {console.log(userItem)}
      })()}

  </React.Fragment>
  );
}
export default Invitation;
