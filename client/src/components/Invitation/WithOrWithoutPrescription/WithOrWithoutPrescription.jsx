
import Dialog from '@mui/material/Dialog';
import { PaperContext } from "../../../hook/PaperProvider.jsx"
import { APIRequests } from "./../../../APIRequests.js";
import { useState, useContext, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { UserContext } from "../../../hook/UserProvider.jsx";
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function WithOrWithoutPrescription() {
  const [withOrWithoutPrescriptionId, setwithOrWithoutPrescriptionId] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [withOrWithOutPrescription, setwithOrWithoutPrescription] = useState([])
  const { paper, setCurrentPaper, userData, setUpdateEyeData } = useContext(PaperContext);
  const { user, setCurrentUser } = useContext(UserContext);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [selected, setSelected] = useState(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const APIRequest = new APIRequests()

  const updateStyle = (withOrNot) => {
    setIsButtonDisabled(false)
    setwithOrWithoutPrescriptionId(withOrNot)
  }

  const addInformation = async () => {
    setUpdateEyeData(data => ({
      ...data,
      ['WithOrWithoutPrescription']: withOrWithoutPrescriptionId
    }));
    if (withOrWithoutPrescriptionId === 1) {
      try {
        const response = await APIRequest.getRequest(`/eyesData/${user.userName}`);
        const json = await response.json();
        if (response.status !== 200) {
          alert("אין מרשמים קודמים")
          setUpdateEyeData(data => ({
            ...data,
            ['WithOrWithoutPrescription']: withOrWithoutPrescriptionId
          }));
        } else {
          setCurrentPaper({ "title": 'CU6' })
          setUpdateEyeData(data => ({
            ...data,
            ['sizeOfGlasses']: json.data
          }));
        }
      }
      catch (error) {
        alert(error)
      }
    }
    else {
      setCurrentPaper({ "title": 'sizeOfGlasses' })
    }
  };

  const handleClick = (index) => {
    setSelected(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIRequest.getRequest(`/invitation/withorwithoutprescription`);
        const json = await response.json();
        setwithOrWithoutPrescription([...json.data])
      }
      catch (error) {
        alert(error)
      }
    };
    fetchData();
  }, [])

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
      {withOrWithOutPrescription.map((data, index) =>
        <div className={selected === data.id ? "border" : "noneBorder"}>
          <DemoPaper onClick={() => {
            handleClick(data.id)
            updateStyle(data.id)
          }
          }>
            <div className="titleContainer">
              <img className="glassesImage"
                src={data.img}
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
  </Dialog>
  );
}
export default WithOrWithoutPrescription;
