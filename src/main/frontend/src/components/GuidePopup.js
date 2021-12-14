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


function GuidePopup(props) {
  const [open, setOpen] = [props.showGuide, props.setShowGuide];


    const images = [
        {
            label: '메인',
            imgPath:
            'img/guide/1main.png',
        },
        {
            label: '목표관리',
            imgPath:
            'img/guide/2goal.png',
        },
        {
            label: '목표 입력/수정',
            imgPath:
            'img/guide/3goal_add.png',
        },
        {
            label: '시간관리',
            imgPath:
            'img/guide/4time.png',
        },
        {
          label: '활동 입력/수정',
          imgPath:
          'img/guide/5time_add.png',
        },
        {
          label: '리포트',
          imgPath:
          'img/guide/6report.png',
        },
        {
          label: '커뮤니티',
          imgPath:
          'img/guide/7community.png',
        },
        {
          label: '커뮤니티 상세',
          imgPath:
          'img/guide/8community_detail.png',
        },
    ];
    
    const [activeStep, setActiveStep] = useState(0);
    const maxStep = images.length;

    const handleNext = () => {
      if(activeStep === maxStep - 1){
        handleClose();
      }else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
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
        width: "1200px",
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
  

  // const handleOpen = () => {
  //   setOpen(true);
  //   setActiveStep(0);
  // };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };
  
  return (
    <div className="guide-popup">
      {/* <button className="popupBtn" onClick={handleOpen}>guide</button> */}
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
            {/* <h3 id="transition-modal-title">{images[activeStep].label}</h3> */}
            <div>
                <Box
                    component="img"
                    sx={{
                    // height: 255,
                    display: 'block',
                    // maxWidth: 400,
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
                    // disabled={activeStep === maxStep - 1}
                >
                    {activeStep === maxStep-1 ? "Start" : "Next"}
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