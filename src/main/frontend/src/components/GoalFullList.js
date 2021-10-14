import React, { useState, useContext } from "react";
import "./GoalFullList.css";
import axios from "axios";
import GoalInsertFormModal from "./GoalInsertFormModal";
// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// 삭제버튼
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import GoalModifyFormModal from "./GoalModifyFormModal";

import { GoalFullListContext } from "../context/GoalFullListContext";

function GoalFullList({orderColumn, setOrderColumn}) {
  const [ goalFullList, setGoalFullList ] = useContext(GoalFullListContext);
  return (
    <div>
      <div className="align-buttons">
        <button>목표 모아보기</button>
        <ToggleButtonGroup
          color="primary"
          value={orderColumn}
          exclusive={true}
          onChange={(event, changeColumn) => {
            setOrderColumn(changeColumn)
          }}
        >
          <ToggleButton value="modification_datetime">최종수정일 순</ToggleButton>
          <ToggleButton value="start_datetime">시작일 순</ToggleButton>
          <ToggleButton value="end_datetime">종료일 순</ToggleButton>
          <ToggleButton value="progress_rate">진행률 순</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="goal-cards-list">
        {goalFullList && goalFullList.map((goal, index) => (
          <GoalCard
            key={index}
            index={index}
            title={goal.title}
            startDatetime={goal.startDatetime}
            endDatetime={goal.endDatetime}
            content={goal.content}
            goalId={goal.goalId}
            kind={goal.kind}
            progressRate={goal.progressRate}
            color={goal.color}
            goalFullList={goalFullList}
            setGoalFullList={setGoalFullList}
          ></GoalCard>
        ))}
        <GoalInsertFormModal 
          goalFullList={goalFullList}
          setGoalFullList ={setGoalFullList}/>
      </div>
    </div>
  )
}

function GoalCard({index, title, startDatetime, endDatetime, content, goalId, kind, progressRate, color, goalFullList, setGoalFullList}){
  
    return(
        <div className="card" style={{ borderLeft : `6px solid`, borderColor : color}} id={goalId} >
          
          <div className="card-button-wrapper">
            <GoalModifyFormModal 
              modifyData = {goalFullList[index]}
            />
            <DeleteModal goalId={goalId} goalFullList={goalFullList}
                setGoalFullList ={setGoalFullList}/>
          </div>
          <h2>{title}</h2>
          <span>시작일: </span><span>{startDatetime}</span><br/>
          <span>종료일: </span><span>{endDatetime}</span><br/>
          <span>내용: </span><span>{content}</span><br/>
          <span>kind: </span><span>{kind}</span><br/>
          <span>진행률: </span><span>{progressRate}</span><br/>
        </div>
    )
}


// 삭제 버튼 모달
function DeleteModal({goalId, goalFullList, setGoalFullList}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async ()=>{
    try{
      const result= await axios.delete("/goalManage/goal", {
        params:{
          goalId: goalId
        }
      })
      console.log("삭제결과", result)
      setGoalFullList(goalFullList.filter(goal => goal.goalId !== goalId));
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <Button className="deleteBtn" variant="outlined" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={deleteHandler} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default GoalFullList;