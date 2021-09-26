import React, { useEffect, useState } from "react";
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

function Time() {
  const [goalList, setGoalList] = useState([]);
  useEffect(() => {
    axios
      .post("/goalManage/getGoalTitleListTEST")
      .then(({ data }) => setGoalList(data.goalTitleList));
  }, []);

  return (
    <div className="time">
      {/* 사이드 */}
      <aside className="side">
        <LeftNavigation goalList={goalList}/>
      </aside>

      {/* 참조데이터 */}
      <div className="timeline">
        타임라인
      </div>
      

      {/* 기록 */}
      <div className="write">
        <div>2021-09-18</div>
        <div className="cards"></div>
        <div className="writeForm">
          <TimePickers id='starttime' label="시작시간"/>
          <TimePickers id='endtime' label="종료시간"/>
          <span>목표선택</span>
          <span>목표 리스트 모달창</span>
          <GoalListModal />
          <MultilineTextFields />
          <div>평가</div><span>점수선택(80%)</span>
        </div>
      </div>
    </div>
  );
}

function TimePickers(props){
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={props.id}
        label={props.label}
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
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




function MultilineTextFields() {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '40ch',
        background: 'white',
      },
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          variant="outlined"
        />
      </div>
    </form>
  );
}

export default Time;