import React, { useState, useEffect } from "react";
import "./GoalFullList.css";
import axios from "axios";
// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//icon
import { FaPlus, FaLock } from "react-icons/fa";
//css
import { makeStyles } from '@material-ui/core/styles';
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//goalInsertForm
import TextField from '@material-ui/core/TextField';

function GoalFullList(props) {
    // 검색결과(목표타이틀 리스트)
  const [goalFullList, setGoalFullList] = useState([]);
  const defaultSearchTime = " 09:00:00";

  useEffect(() => {
    let body = {
      searchStartDatetime : makeYYMMDD(props.searchStartDatetime) + defaultSearchTime,
      searchEndDatetime : makeYYMMDD(props.searchEndDatetime) + defaultSearchTime,
    }
    const fetchGoalFullList = async () => {
      try {
        const result = await axios.post("/goalManage/getGoalFullList", body);
        setGoalFullList(result.data.goalFullList)
        console.log("result", result)
      } catch(err){
        console.error(err)
      }
    }
    fetchGoalFullList();
}, [props.searchStartDatetime, props.searchEndDatetime]);



    return (
        <div>
            <div className="align-buttons">
            <button>목표 모아보기</button>
            
            <ColorToggleButton 
            defalutValue="시작일 순"
            values={["시작일 순", "종료일 순","진행률 순"]}/>

            <ColorToggleButton 
            defalutValue="카드"
            values={["카드", "차트"]}/>
            </div>
            <div className="goal-cards-list">
                {goalFullList && goalFullList.map((goal, index) => (
                    <GoalCard
                        key={index}
                        title={goal.title}
                        startDatetime={goal.startDatetime}
                        endDatetime={goal.endDatetime}
                        content={goal.content}
                        goalId={goal.goalId}
                        kind={goal.kind}
                        progressRate={goal.progressRate}
                        color={goal.color}></GoalCard>
                ))}
                <GoalInsertFormModal />
            </div>

        
      </div>
    )
}

function GoalInsertFormModal(){
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
      <button className="goal-insert-btn" onClick={handleOpen}><FaPlus /></button>

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
            <GoalInsertForm />
            <button type="button" onClick={handleClose}>
              CLOSE
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function GoalInsertForm(){
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [toggleSelected, setToggleSelected] = useState(false)
  const [shareStatus, setshareStatus] = useState("N");
  return (
    <>
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
      <MultilineTextFields 
      value={content}
      setValue={setContent}/>
    </>
  )
}

function ColorToggleButton(props) {
    const [alignment, setAlignment] = React.useState(props.defalutValue);
  
    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  
    return (
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        size='small'
      >
        {props.values && props.values.map((value, index) => (
          <ToggleButton key={index}
            value={value}>{value}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }


function GoalCard({title, startDatetime, endDatetime, content, goalId, kind, progressRate, color}){
    return(
        <div className="card" style={{ borderLeft : `6px solid`, borderColor : color}} id={goalId}>
        <h2>{title}</h2>
        <span>시작일: </span><span>{startDatetime}</span><br/>
        <span>종료일: </span><span>{endDatetime}</span><br/>
        <span>내용: </span><span>{content}</span><br/>
        <span>kind: </span><span>{kind}</span><br/>
        <span>진행률: </span><span>{progressRate}</span><br/>
        </div>
    )
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


// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}

function toggleToString(value){
  if(value){ //공개하겠다
    return "Y"
  }else{
    return "N"
  }
}

export default GoalFullList;