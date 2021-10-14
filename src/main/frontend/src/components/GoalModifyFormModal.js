import React, { useState } from "react";
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


function GoalModifyFormModal({modifyData, index, goalFullList, setGoalFullList}){
    const YNtoTF = (value)=>{
        if(value === "Y"){
            return true
        }else{
            return false
        }
    }

    const [startDatetime, setStartDatetime] = useState(new Date(modifyData.startDatetime));
    const [endDatetime, setEndDatetime] = useState(new Date(modifyData.endDatetime));
    const [shareStatus, setshareStatus] = useState("N");
    const [title, setTitle] = useState(modifyData.title);
    const [content, setContent] = useState(modifyData.content);
    const [kind, setKind] = useState(modifyData.kind);
    //주기정보
    const [timeUnit, setTimeUnit] = useState(modifyData.periodicityInfo.timeUnit);
    const [type, setType] = useState(modifyData.periodicityInfo.type);
    const [count, setCount] = useState(modifyData.periodicityInfo.count);
    const [sun, setSun] = useState(YNtoTF(modifyData.periodicityInfo.sunYn))
    const [mon, setMon] = useState(YNtoTF(modifyData.periodicityInfo.monYn))
    const [tue, setTue] = useState(YNtoTF(modifyData.periodicityInfo.tueYn))
    const [wed, setWed] = useState(YNtoTF(modifyData.periodicityInfo.wedsYn))
    const [thu, setThu] = useState(YNtoTF(modifyData.periodicityInfo.thurYn))
    const [fri, setFri] = useState(YNtoTF(modifyData.periodicityInfo.fryYn))
    const [sat, setSat] = useState(YNtoTF(modifyData.periodicityInfo.satYn))
    const [progressRate, setProgressRate] = useState(parseInt(modifyData.progressRate));
    const [ parentId, setParentId ] = useState(modifyData.parentId)
    // const [ parentGoalTitle, setParentGoalTitle ] = useState("없음");
    // const [toggleSelected, setToggleSelected] = useState(false)
    // const [color, setColor] = useState(randomColor());
    // const defaultSearchTime = " 09:00:00";

    console.log('모달데이터', modifyData)
    console.log('시작일', new Date(modifyData.startDatetime))
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
                startDatetime = {startDatetime}
                setStartDatetime = {setStartDatetime}
                endDatetime={endDatetime}
                setEndDatetime = {setEndDatetime}
                shareStatus={shareStatus}
                setshareStatus={setshareStatus}
                title={title}
                setTitle={setTitle}
                content = {content}
                setContent = {setContent}
                kind={kind}
                setKind={setKind}
                timeUnit={timeUnit}
                setTimeUnit={setTimeUnit}
                type={type}
                setType={setType}
                count={count}
                setCount={setCount} 
                sun={sun} setSun={setSun}
                mon={mon} setMon={setMon}
                tue={tue} setTue={setTue}
                wed={wed} setWed={setWed}
                thu={thu} setThu={setThu}
                fri={fri} setFri={setFri}
                sat={sat} setSat={setSat}  
                progressRate={progressRate}
                setProgressRate={setProgressRate}
                
                parentId={parentId}
                setParentId={setParentId}
                // progressRate={modifyData.progressRate}
                // color={modifyData.color}
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