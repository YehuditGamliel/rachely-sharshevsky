import Dialog from '@mui/material/Dialog';
import { APIRequests } from "../../APIRequests.js";
import { useState, useContext,useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { PaperContext } from "./../../hook/PaperProvider.jsx"

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function KindOfClasses() {
  const [kindOfGlassesId, setKindOfGlassesId] = useState('');
  const[kindOfGlasses,setKindOfGlasses]=useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(true);
  const { paper, setCurrentPaper,userData, setUpdateEyeData } = useContext(PaperContext);
  const theme = useTheme();
  const location = useLocation();
  const currentUrl = location.pathname;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selected, setSelected] = useState(null);
  const APIRequest = new APIRequests()

  const updateStyle = (kindOfGlasses) => {
    setIsButtonDisabled(false);
    setKindOfGlassesId(kindOfGlasses);
  };
 const addInformation=()=>{
  setUpdateEyeData(data => ({
    ...data,
    ['kindOfGlasses']: kindOfGlassesId,
  })); 
  if(kindOfGlassesId==1)
    {
      setCurrentPaper({"title":'CU6'})
      setUpdateEyeData(data => ({
            ...data,
            ['withOrWithoutPrescription']: 2,
            ['sizeOfGlasses']: {}
          }));
    }
    else{
      setCurrentPaper({"title":'withOrWithoutPrescription'}) 
    }
 }
  const fetchData = async () => {
    const response = await APIRequest.getRequest(`/invitation/kindOfGlasses`);
    const json = await response.json();
    if (response.status !== 200) {
      alert(json.error);
    } else {
      console.log("kindOfGlasses",json.data)
      setKindOfGlasses([...json.data])
    }
};
useEffect(()=>{
  fetchData();

},[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="scroll-dialog-title">
        המשקפיים ישמשו אותי עבור:
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        {kindOfGlasses.map((data, index) => (
          <div
            key={data.id}
            className={selected === data.id ? "border" : "noneBorder"}
          >
            <DemoPaper
              onClick={() => {
                updateStyle((data.id ));
                handleClick(data.id);
              }}
            >
              <div className="titleContainer">
                <img
                  className="glassesImage"
                  src={data.img}
                  alt={data.title}
                />
                <br />
                <nav className="title">{data.title}</nav>
              </div>
              {data.description}
            </DemoPaper>
          </div>
        ))}
      </DialogContent>
      <Button
        onClick={() =>
          addInformation()
        }
        disabled={isButtonDisabled}>
        אפשר להמשיך
      </Button>
    </Dialog>
  );
}
export default KindOfClasses;