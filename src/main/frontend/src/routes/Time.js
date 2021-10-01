import React, { useState } from "react";
import "./Time.css";
import { LeftNavigation } from '../components/index';

//css
import { makeStyles } from '@material-ui/core/styles';
//time picker
import TextField from '@material-ui/core/TextField';
//toggle
import ToggleButton from '@mui/material/ToggleButton';
//slider-score
import Slider from '@mui/material/Slider';

//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import axios from 'axios';

//TimeLine
import CustomizedTimeline from '../components/TimeLineCustom';
//icon
import { FaLock } from "react-icons/fa";

function toggleToString(value){
  if(value){ //공개하겠다
    return "Y"
  }else{
    return "N"
  }
}
function Time() {
  //write Form
  //toggle- 비공개
  const [toggleSelected, setToggleSelected] = useState(false)
  const [shareStatus, setshareStatus] = useState("N");
  const [writeDate, setWriteDate] = useState(makeYYMMDD(new Date()));
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activityScore, setActivityScore] = useState("")

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("제출", writeDate, startDatetime, endDatetime, title, content)
    // alert(`Submitting Time ${startDatetime}`)
    // alert(`Submitting endDatetime ${endDatetime}`)
    // alert(`Submitting content ${content}`)
    
    let body = {
      title : title,
      startDatetime: writeDate +' '+ startDatetime + ':00',
      endDatetime: writeDate +' '+ endDatetime + ':00',
      content : content,
      shareStatus : shareStatus,
      activityScore : activityScore
    };
    console.log("body", body)
    axios
    .post("http://localhost:5000/api/users/login", body)
    .then((res) => console.log(res));
  };

  return (
    <div className="time">
      {/* 사이드 */}
      <aside className="side">
        <LeftNavigation/>
      </aside>

      {/* 참조데이터 */}
      <div className="timeline">
        타임라인
        <CustomizedTimeline/>
      </div>
      
      {/* 기록 */}
      <div className="write">
        <div className="button-wrapper">
          <button>import</button>
          <button>export</button>
          <button>도움말</button>
          <button>양식다운로드</button>
        </div>
        <div className="date-picker-wrapper">
        <TextField
          className="date-picker"
          id="date"
          label="작성일"
          type="date"
          defaultValue={writeDate}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={function(e){
            setWriteDate(e.target.value)
          }}
        />
        </div>
        <div className="cards"></div>

        <div className="writeForm">
          <form onSubmit={handleSubmit}>
            <div className="top-wrapper">
            <TimePickers 
              id='starttime'
              label='시작시간'
              value={startDatetime}
              setTime={setStartDatetime}
            />
            <p>~</p>
            <TimePickers 
              id='endtime'
              label='종료시간'
              value={endDatetime}
              setTime={setEndDatetime}
            />
            <ToggleButton
            color="primary"
            value="check"
            selected={toggleSelected}
            onChange={() => {
              setToggleSelected(!toggleSelected);
              setshareStatus(toggleToString(toggleSelected));
            }}
          ><FaLock/>
          </ToggleButton>
            </div>
            <p>목표선택</p>
            <GoalListModal />
            <div className="title-wrapper">
            <TextField 
            className="textfield-title"
              id="title" 
              label="제목" 
              size="small" 
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={function(e){
                setTitle(e.target.value)
              }}/>
              </div>
              <div className="content-wrapper">
            <MultilineTextFields 
              value={content}
              setValue={setContent}/>
              </div>
              <div className="activityScore-wrapper">
              <p>몰입도평가</p>
            <Slider
              className="slider-score"
              size="small"
              aria-label="activityScore"
              defaultValue={30}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={100}
              onChange={function(e){
                setActivityScore(e.target.value)
              }}
            />
            </div>
            <input type="submit" value="Submit" />
          </form>

        </div>
      </div>
    </div>
  );
}
function TimePickers(props){
  function setTime(e){
    e.preventDefault();
    props.setTime(e.target.value);
  }
  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();

  return (
      <TextField
        id={props.id}
        label={props.label}
        value={props.value}
        type="time"
        onChange={setTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
  );
}

function GoalListModal() {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
      <button type="button" onClick={handleOpen}>
        OPEN
      </button>
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
            <h2 id="transition-modal-title">목표 리스트</h2>
            <p id="transition-modal-description">활동과 관련된 목표를 선택하세요</p>
            <button type="button" onClick={handleClose}>
              CLOSE
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function MultilineTextFields(props) {
  function setValue(e){
    e.preventDefault();
    props.setValue(e.target.value);
  }
  return (
      <div>
        <TextField
          className="textfeild-content"
          id="content"
          label="내용"
          multiline
          rows={4}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={props.value}
          onChange={setValue}
        />
      </div>
  );
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}

export default Time;