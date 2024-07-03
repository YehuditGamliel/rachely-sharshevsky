
import Dialog from '@mui/material/Dialog';
 import { PaperContext } from "../../../../src/PaperProvider.jsx"
 import { APIRequests } from "./../../../APIRequests.js";
 import { useState, useContext,useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { UserContext } from "../../../UserProvider.jsx";
import * as React from 'react';
import prescription1 from '../../../img/prescription1.jpg'
import prescription2 from '../../../img/prescription2.jpg'
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
  
      

function WithOrWithoutPrescription(){
    const [withOrWithoutPrescriptionId, setwithOrWithoutPrescriptionId] = useState('')
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
    const[withOrWithOutPrescription,setwithOrWithoutPrescription]=useState([])
       const { paper, setCurrentPaper,userData, setUpdateEyeData } = useContext(PaperContext);
       const {user,setCurrentUser}=useContext(UserContext);
        const [open, setOpen] = React.useState(true);
        const theme = useTheme();
        const [selected, setSelected] = useState(null);
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
        const imageMapping = {
          prescription1,
          prescription2
        };
        const APIRequest = new APIRequests()
      const updateStyle = (withOrNot) => {
          setIsButtonDisabled(false)
          //alert(withOrWithoutPrescription)
          // var valueInt = Number(kindOfGlasses);
          // console.log(jsonData.kindOfGlassesArry[valueInt])
          setwithOrWithoutPrescriptionId(withOrNot)
    }
    const addInformation = async () => {
      setUpdateEyeData(data => ({
        ...data,
       
        ['WithOrWithoutPrescription']: withOrWithoutPrescriptionId
      }));
      if (withOrWithoutPrescriptionId === 1) {
        if (!user.userName) {
          setCurrentPaper({ title: 'login' });
        } else {
          
            const response = await APIRequest.getRequest(`/eyesData/${user.userName}`);
            const json = await response.json();
            
            if (response.status !== 200) {
              alert(json.error);
              // setCurrentPaper({ title: 'withOrWithoutPrescription' });
            } else {
              console.log(json.data)
              setCurrentPaper({"title":'CU6'})
              setUpdateEyeData(data => ({
                    ...data,
                   
                    ['sizeOfGlasses']: json.data
                  }));
              // Handle successful response here
            }
         
        }
      }
      else{
        setCurrentPaper({"title":'SizeOfGlasses'})
      }
    };
      const handleClick = (index) => {
    setSelected(index);
  };

  const fetchData = async () => {
    const response = await APIRequest.getRequest(`/invitation/withorwithoutprescription`);
    const json = await response.json();
    if (response.status !== 200) {
      alert(json.error);
    } else {
      console.log("setwithOrWithoutPrescription",json.data)
      setwithOrWithoutPrescription([...json.data])
    }
  
};
useEffect(()=>{
  fetchData();

},[])

      

      
        const handleClose = () => {
          setOpen(false);
        };
        const handleClickOpen = () => {
          setOpen(true);
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
                  {withOrWithOutPrescription.map((data, index) =>
                    <div className={selected === data.id?"border":"noneBorder"}>
                      <DemoPaper onClick={() =>{
                         handleClick(data.id)
                       updateStyle(data.id)}
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
                onClick={() => addInformation()}
                disabled={isButtonDisabled == true}
              >אפשר להמשיך</Button>
              {/* {login} */}
            </Dialog>
      );
}
 export default WithOrWithoutPrescription;
//  import Dialog from '@mui/material/Dialog';
//  import { APIRequests } from "../../APIRequests.js";
//  import { useState, useContext,useEffect } from 'react';
//  import DialogContent from '@mui/material/DialogContent';
//  import DialogTitle from '@mui/material/DialogTitle';
//  import Paper from '@mui/material/Paper';
//  import { styled } from '@mui/material/styles';
//  import * as React from 'react';
//  import Button from '@mui/material/Button';
//  import useMediaQuery from '@mui/material/useMediaQuery';
//  import { useTheme } from '@mui/material/styles';
//  import glasses1 from '../../img/glasses1.jpg';
//  import glasses2 from '../../img/glasses2.jpg';
//  import glasses3 from '../../img/glasses3.jpg';
//  import glasses4 from '../../img/glasses4.png';
//  import { useLocation } from 'react-router-dom';
//  import { PaperContext } from "./../../../src/PaperProvider.jsx"
 
//  const DemoPaper = styled(Paper)(({ theme }) => ({
//    width: 250,
//    height: 110,
//    padding: theme.spacing(3),
//    ...theme.typography.body2,
//    textAlign: 'center',
//  }));
 
//  // Map for images
//  const imageMapping = {
//    glasses1,
//    glasses2,
//    glasses3,
//    glasses4,
//  };
 
//  function KindOfClasses() {
//    const [kindOfGlassesId, setKindOfGlassesId] = useState('');
//    const[kindOfGlasses,setKindOfGlasses]=useState([])
//    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//    const [open, setOpen] = useState(true);
//    const { paper, setCurrentPaper,userData, setUpdateEyeData } = useContext(PaperContext);
//    const theme = useTheme();
//    const location = useLocation();
//    const currentUrl = location.pathname;
//    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//    const [selected, setSelected] = useState(null);
//    const APIRequest = new APIRequests()
 
//    const updateStyle = (kindOfGlasses) => {
//      setIsButtonDisabled(false);
//      setKindOfGlassesId(kindOfGlasses);
//    };
//   const addInformation=()=>{
//    setUpdateEyeData(data => ({
//      ...data,
//      ['kindOfGlasses']: kindOfGlassesId,
     
//    })); 
//    if(kindOfGlassesId==1)
//      {
//        setCurrentPaper({"title":'CU6'})
//        setUpdateEyeData(data => ({
//              ...data,
//              ['withOrWithoutPrescription']: 0,
//              ['sizeOfGlasses']: {}
//            }));
            
//      }
//      else{
//        setCurrentPaper({"title":'withOrWithoutPrescription'}) 
        
//      }
//   }
//    const fetchData = async () => {
//      const response = await APIRequest.getRequest(`/invitation/kindOfGlasses`);
//      const json = await response.json();
//      if (response.status !== 200) {
//        alert(json.error);
//      } else {
//        console.log("kindOfGlasses",json.data)
//        setKindOfGlasses([...json.data])
//      }
   
//  };
//  useEffect(()=>{
//    fetchData();
 
//  },[])
 
//    const handleClickOpen = () => {
//      setOpen(true);
//    };
 
//    const handleClose = () => {
//      setOpen(false);
//    };
 
//    const handleClick = (index) => {
//      setSelected(index);
//    };
 
//    return (
//      <Dialog
//        fullScreen={fullScreen}
//        open={open}
//        onClose={handleClose}
//        aria-labelledby="responsive-dialog-title"
//      >
//        <DialogTitle id="scroll-dialog-title">
//          המשקפיים ישמשו אותי עבור:
//        </DialogTitle>
//        <DialogContent dividers={scroll === 'paper'}>
//          {kindOfGlasses.map((data, index) => (
//            <div
//              key={data.id}
//              className={selected === data.id ? "border" : "noneBorder"}
//            >
//              <DemoPaper
//                onClick={() => {
//                  updateStyle((data.id ));
//                  handleClick(data.id);
//                }}
//              >
//                <div className="titleContainer">
//                  <img
//                    className="glassesImage"
//                    src={imageMapping[data.img]}
//                    alt={data.title}
//                  />
//                  <br />
//                  <nav className="title">{data.title}</nav>
//                </div>
//                {data.description}
//              </DemoPaper>
//            </div>
//          ))}
//        </DialogContent>
//        <Button
//          onClick={() =>
//            addInformation()
//          }
//          disabled={isButtonDisabled}
//        >
//          אפשר להמשיך
//        </Button>
//      </Dialog>
//    );
//  }
//  export default KindOfClasses;