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
import glasses1 from '../../img/glasses1.jpg';
import glasses2 from '../../img/glasses2.jpg';
import glasses3 from '../../img/glasses3.jpg';
import glasses4 from '../../img/glasses4.png';
import jsonData from "../../assets/data.json";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 110,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

// Map for images
const imageMapping = {
  glasses1,
  glasses2,
  glasses3,
  glasses4,
};

function KindOfClasses({ addInformation }) {
  const [kindOfGlassesId, setKindOfGlassesId] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selected, setSelected] = useState(null);

  const updateStyle = (kindOfGlasses) => {
    setIsButtonDisabled(false);
    setKindOfGlassesId(kindOfGlasses);
  };

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
        {jsonData.kindOfGlassesArry.map((data, index) => (
          <div
            key={index}
            className={selected === index ? "border" : "noneBorder"}
          >
            <DemoPaper
              onClick={() => {
                updateStyle((index + 1).toString());
                handleClick(index);
              }}
            >
              <div className="titleContainer">
                <img
                  className="glassesImage"
                  src={imageMapping[data.img]}
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
          addInformation('kindOfGlasses', kindOfGlassesId, 'withOrWithoutPrescription')
        }
        disabled={isButtonDisabled}
      >
        אפשר להמשיך
      </Button>
    </Dialog>
  );
}

export default KindOfClasses;