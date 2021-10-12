import React from "react";
//css
import { makeStyles } from '@material-ui/core/styles';
import "./GoalInsertFormModal.css"
import axios from "axios";
//icon
import { FaPlus, FaLock } from "react-icons/fa";
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//goalInsertForm
import TextField from '@material-ui/core/TextField';
import DateRangePickerCustom from './DateRangePickerCustom';
import randomColor from "randomcolor";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//color picker
import { HexColorPicker } from "react-colorful";

// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';

//slider-score
import Slider from '@mui/material/Slider';
import GoalTitleListModal from "./GoalTitleListModal";

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import GoalInsertForm from "./GoalInsertForm";

import Button from '@mui/material/Button';


function GoalModifyFormModal(title, startDatetime, endDatetime, content, goalId, kind, progressRate, color, goalFullList, setGoalFullList){
    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          // border: '2px solid #000',
          borderRadius: "10px",
          boxShadow: theme.shadows[5],
          padding: theme.spacing(1, 3, 2),
        },
      }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <Button className="modifyBtn" variant="outlined" onClick={handleOpen}>
        수정
      </Button>
          {/* <button className="goal-insert-btn" onClick={handleOpen}><FaPlus /></button> */}
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
              <div className={classes.paper}>
                <h3 id="transition-modal-title">목표 수정</h3>
                <GoalInsertForm
                title={title}
                // startDatetime={startDatetime}
                // endDatetime={endDatetime}
                content={content}
                goalId={goalId}
                kind={kind}
                progressRate={progressRate}
                color={color}
                goalFullList={goalFullList}
                setGoalFullList={setGoalFullList}
                />
                <div className="button-wrapper">
                  <button type="submit" className="submitBtn" onClick={handleClose}>제출</button>
                  <button type="button" className="cancleBtn" onClick={handleClose}>취소</button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      );


}


  export default GoalModifyFormModal;