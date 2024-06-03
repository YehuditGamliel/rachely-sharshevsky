import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import glasses1 from '../../../img/glasses1.jpg'
import glasses2 from '../../../img/glasses2.jpg'
import glasses3 from '../../../img/glasses3.jpg'
import glasses4 from '../../../img/glasses4.png'
import jsonData from "../../../assets/data.json";
// import '..Invitation/Invitation.css'
const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 250,
    height: 110,
    padding: theme.spacing(3),
    ...theme.typography.body2,
    textAlign: 'center',
  }));
 
function KindOfClasses({addInformation ,changeStyle, buttonBorder}){
    const [kindOfGlassesId, setKindOfGlassesId] = useState('')
    const updateStyle = (kindOfGlasses) => {
      console.log(buttonBorder)
        setIsButtonDisabled(false)
        setKindOfGlassesId(kindOfGlasses)
        changeStyle(kindOfGlasses)
  }
  const [isButtonDisabled,setIsButtonDisabled]=useState(true)
      const [open, setOpen] = React.useState(true);
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      const displayImg = useState({id:"1"})
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    return (
       
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
         <DialogTitle id="scroll-dialog-title" >המשקפיים ישמשו אותי עבור:</DialogTitle>
    <DialogContent dividers={scroll === 'paper'}></DialogContent>
        {jsonData.kindOfGlassesArry.map((data, index) => 
          //כאן הבעיה!!!!
            
            <div key={index}  className={buttonBorder.a}>
            
              <DemoPaper  onClick={() => updateStyle((index+1).toString())}>
                <div className="titleContainer">
                  <img className="glassesImage" src={data.img} ></img><br />
                  <nav className="title">{data.title}</nav>
                </div>
                {data.description}
                </DemoPaper>
                </div>
        )}
             <Button
          onClick={() => addInformation('kindOfGlasses', kindOfGlassesId , 'withOrWithoutPrescription')}
         disabled={isButtonDisabled == true}
        >אפשר להמשיך</Button>
    </Dialog>
        








            // <div direction="row" spacing={2}>
            //   {/* 1 */}
            
            //   {/* 2 */}
            //   <div 
            //  className={buttonBorder.b}
            //   >
            //     <DemoPaper onClick={() => updateStyle("2")}>
            //       <div className="titleContainer">
            //         <img className="glassesImage" src={glasses2} /><br />
            //         <nav className="title">עדשות למרחק</nav>
            //       </div>
            //       עוזרות לראות בצורה ברורה לאובייקטים
            //       במרחק ממך.הצורך בעדשות אלה יגבר בתנאי תאורה מוגבלים
            //     </DemoPaper>
            //   </div>
            //   {/* 3 */}
            //   <div 
            //  className={buttonBorder.c}
            //   >
            //     <DemoPaper onClick={() => updateStyle("3")}>
            //       <div className="titleContainer">
            //         <img className="glassesImage" src={glasses3} /><br />
            //         <nav className="title">עדשות לקריאה</nav>
            //       </div>
            //       מיועדות לעזור לך לראותפרטים במרחק קרוב(קריאה מספר או צפייה במסך מחשב)
            //     </DemoPaper>
            //   </div>
            //   {/* 4 */}
            //   <div   className={buttonBorder.d}
            //   >
            //     <DemoPaper onClick={() => updateStyle("4")}>
            //       <div className="titleContainer">
            //         <img className="glassesImage" src={glasses4} /><br />
            //         <nav className="title">מולטיפוקל</nav>
            //       </div>
            //       לראות גם לרחוק וגם לקרוב בעדשה אחת,
            //       ע"י 3 מוקדים הממוקמים באיזורים שונים של העדשה
            //     </DemoPaper>
            //   </div>
            // </div>
        
   
    )
}
export default KindOfClasses;