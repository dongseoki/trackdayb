import React, { useState } from 'react';
//css
import { makeStyles } from '@material-ui/core/styles';
import "./GuidePopup.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//반응형
import { useMediaQuery } from "react-responsive";
//히스토리
import {useHistory} from "react-router-dom";


function GuidePopup() {
    const history = useHistory();
    
    const images = [
        {
            label: 'San Francisco – Oakland Bay Bridge, United States',
            imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Bird',
            imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Bali, Indonesia',
            imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
        },
        {
            label: 'Goč, Serbia',
            imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];
    
    const [activeStep, setActiveStep] = useState(0);
    const maxStep = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    // 반응형 화면 BreakPoint
    const isMobileScreen = useMediaQuery({
        query: "(max-width: 440px)",
    });


    const useStyles = makeStyles((theme) => ({
        modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        },
        paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 2, 2),
        width: "470px",
        fontSize: "14px",
        },
        paperMobile: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 2, 2),
        width: "100%",
        fontSize: "14px"
        },
    }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setActiveStep(0);
    console.log('history', history)
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div className="guide-popup">
      <button className="popupBtn" onClick={handleOpen}>guide</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className= {isMobileScreen ? classes.paperMobile : classes.paper}>
            <h3 id="transition-modal-title">{images[activeStep].label}</h3>
            <div>
                <Box
                    component="img"
                    sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                    }}
                    src={images[activeStep].imgPath}
                    alt={images[activeStep].label}
                />
            </div>

            <MobileStepper
                steps={maxStep}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxStep - 1}
                >
                    Next
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    Back
                </Button>
                }
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );

}
export default GuidePopup;