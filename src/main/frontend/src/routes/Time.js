import React, { useState } from "react";
import "./Time.css";
import { LeftNavigation } from '../components/index';

//css
import { makeStyles } from '@material-ui/core/styles';
//time picker
import TextField from '@material-ui/core/TextField';

//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import axios from 'axios';

//TimeLine
import CustomizedTimeline from '../components/TimeLineCustom';

function Time() {

  //write Form
  const [date, setDate] = useState(new Date());
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting date ${date}`)
    alert(`Submitting Time ${startDatetime}`)
    alert(`Submitting endDatetime ${endDatetime}`)
    alert(`Submitting content ${content}`)
    
    let body = {
      date : date,
      startDatetime: startDatetime,
      endDatetime: endDatetime,
      content : content,
    };

    axios
    .post("http://localhost:5000/api/users/login", body)
    .then((res) => console.log(res));
  };

  return (
    <div className="time">
      {/* 사이드 */}
      <aside className="side">
        {/* <LeftNavigation goalList={goalList}/> */}
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
        <TextField
        id="date"
        type="date"
        value={date}
        onChange={e=> setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <div className="cards"></div>

        <div className="writeForm">
          {/* <form
            onSubmit={submitHandler}
            style={{ display: "flex", flexDirection: "Column" }}
          >
            <button type="submit">Login</button>
          </form> */}

          <form onSubmit={handleSubmit}>
            <TimePickers 
              id='starttime'
              label='시작시간'
              value={startDatetime}
              setTime={setStartDatetime}
            />
            <TimePickers 
              id='endtime'
              label='종료시간'
              value={endDatetime}
              setTime={setEndDatetime}
            />
            <div>목표선택</div>
            <GoalListModal />
            <MultilineTextFields 
              value={content}
              setValue={setContent}/>
            <div>평가</div><span>점수선택(80%)</span>


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
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          variant="outlined"
          value={props.value}
          onChange={setValue}
        />
      </div>
  );
}


export default Time;