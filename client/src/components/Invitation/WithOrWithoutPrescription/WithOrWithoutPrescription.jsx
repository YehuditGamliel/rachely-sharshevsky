
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
import prescription2 from '../../../img/prescription2.jpg'

import jsonData from "../../../assets/data.json";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// import '..Invitation/Invitation.css'
const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 250,
    height: 110,
    padding: theme.spacing(3),
    ...theme.typography.body2,
    textAlign: 'center',
  }));
  
      

function WithOrWithoutPrescription({addInformation}){
    const [withOrWithoutPrescriptionId, setwithOrWithoutPrescriptionId] = useState('')
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
        const [open, setOpen] = React.useState(true);
        const theme = useTheme();
        const [selected, setSelected] = useState(null);
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
        const imageMapping = {
          prescription1,
          prescription2
        };
      const updateStyle = (withOrWithoutPrescription) => {
          setIsButtonDisabled(false)
          //alert(withOrWithoutPrescription)
          // var valueInt = Number(kindOfGlasses);
          // console.log(jsonData.kindOfGlassesArry[valueInt])
          setwithOrWithoutPrescriptionId(withOrWithoutPrescription)
         
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
                  {jsonData.withOrWithOutPrescription.map((data, index) =>
                    <div className={selected === index?"border":"noneBorder"}>
                      <DemoPaper onClick={() =>{ handleClick(index)
                       updateStyle((index+1).toString())}
                        
                      }>
                        <div className="titleContainer">
                          <img   className="glassesImage"
                  src={imageMapping[data.img]}
                  alt={data.title} /><br />
                          <nav className="title">{data.title}</nav>
                        </div>
                        {data.description}
                      </DemoPaper></div>
                )}
                 </div>
              <Button
                onClick={() => addInformation('withOrWithoutPrescription', withOrWithoutPrescriptionId, 'sizeOfGlasses')}
                disabled={isButtonDisabled == true}
              >אפשר להמשיך</Button>
              {/* {login} */}
            </Dialog>
      );
}
 export default WithOrWithoutPrescription;
//  <div className={buttonBorder.b}>
//  <DemoPaper onClick={() => updateStyle("2")}>
//    <div className="titleContainer">
//      <img className="glassesImage" src={glasses2} /><br />
//      <nav className="title">מלוי פרטי המרשם</nav>
//    </div>
//    על ידי העתקת הפרטים מהמרשם הקיים שלכם                    </DemoPaper>
// </div>
// import Dialog from '@mui/material/Dialog';

// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import DialogActions from '@mui/material/DialogActions';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import glasses1 from '../../../img/glasses1.jpg'
// import glasses2 from '../../../img/glasses2.jpg'
// import glasses3 from '../../../img/glasses3.jpg'
// import glasses4 from '../../../img/glasses4.png'
// import jsonData from "../../../assets/data.json";
// // import '..Invitation/Invitation.css'
// const DemoPaper = styled(Paper)(({ theme }) => ({
//     width: 250,
//     height: 110,
//     padding: theme.spacing(3),
//     ...theme.typography.body2,
//     textAlign: 'center',
//   }));
 
  
// function KindOfClasses({addInformation ,changeStyle, buttonBorder}){
//     const [kindOfGlassesId, setKindOfGlassesId] = useState('')
//     const updateStyle = (kindOfGlasses) => {
//         setIsButtonDisabled(false)
//         // var valueInt = Number(kindOfGlasses);
//         // console.log(jsonData.kindOfGlassesArry[valueInt])
//         setKindOfGlassesId(kindOfGlasses)
//         changeStyle(kindOfGlasses)
//   }

//       const [open, setOpen] = React.useState(true);
//       const theme = useTheme();
//       const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
//       const handleClickOpen = () => {
//         setOpen(true);
//       };
    
//       const handleClose = () => {
//         setOpen(false);
//       };
    
//     return (
//         <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//          <DialogTitle id="scroll-dialog-title" >המשקפיים ישמשו אותי עבור:</DialogTitle>
//     <DialogContent dividers={scroll === 'paper'}></DialogContent>
//             <div direction="row" spacing={2}>
//               {/* 1 */}
//               <div
//               className={buttonBorder.a}
//                >
//                 <DemoPaper onClick={() => updateStyle("1")}>
//                   <div className="titleContainer">
//                     <img className="glassesImage" src={glasses1} /><br />

//                     <nav className="title">ללא מרשם</nav>
//                   </div>
//                   משקפיים כאביזר אופנה למראה מתוחכם ושימושי. העדשות מגיעות עם הגנה מירבית מקרינת
//                   השמש UV400, בנוסף ניתן לשדרג לעדשות DEFENDER המגינות מפני
//                   קרינת מסכים.</DemoPaper></div>
//               {/* 2 */}
//               <div 
//              className={buttonBorder.b}
//               >
//                 <DemoPaper onClick={() => updateStyle("2")}>
//                   <div className="titleContainer">
//                     <img className="glassesImage" src={glasses2} /><br />
//                     <nav className="title">עדשות למרחק</nav>
//                   </div>
//                   עוזרות לראות בצורה ברורה לאובייקטים
//                   במרחק ממך.הצורך בעדשות אלה יגבר בתנאי תאורה מוגבלים
//                 </DemoPaper>
//               </div>
//               {/* 3 */}
//               <div 
//              className={buttonBorder.c}
//               >
//                 <DemoPaper onClick={() => updateStyle("3")}>
//                   <div className="titleContainer">
//                     <img className="glassesImage" src={glasses3} /><br />
//                     <nav className="title">עדשות לקריאה</nav>
//                   </div>
//                   מיועדות לעזור לך לראותפרטים במרחק קרוב(קריאה מספר או צפייה במסך מחשב)
//                 </DemoPaper>
//               </div>
//               {/* 4 */}
//               <div   className={buttonBorder.d}
//               >
//                 <DemoPaper onClick={() => updateStyle("4")}>
//                   <div className="titleContainer">
//                     <img className="glassesImage" src={glasses4} /><br />
//                     <nav className="title">מולטיפוקל</nav>
//                   </div>
//                   לראות גם לרחוק וגם לקרוב בעדשה אחת,
//                   ע"י 3 מוקדים הממוקמים באיזורים שונים של העדשה
//                 </DemoPaper>
//               </div>
//             </div>
        
//         <Button
//           onClick={() => addInformation('kindOfGlasses', kindOfGlassesId , 'withOrWithoutPrescription')}
//          disabled={isButtonDisabled == true}
//         >אפשר להמשיך</Button>
        
    
//     </Dialog>
//     )
// }
