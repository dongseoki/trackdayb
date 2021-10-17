import React, { useState, useContext } from "react";
import "./GoalFullList.css";
import axios from "axios";
import GoalInsertFormModal from "./GoalInsertFormModal";
// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
//icon
import { RiDeleteBinLine } from "react-icons/ri";
import { BiLock } from "react-icons/bi";
// 삭제버튼
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import GoalModifyFormModal from "./GoalModifyFormModal";

import { GoalFullListContext } from "../context/GoalFullListContext";
import { GoalSearchTitleListContext} from "../context/GoalSearchTitleListContext";
import { GoalTotalTitleListContext } from "../context/GoalTotalTitleListContext";

function GoalFullList({orderColumn, setOrderColumn}) {
  const [ goalFullList, setGoalFullList ] = useContext(GoalFullListContext);
  const [goalSearchTitleList, setGoalSearchTitleList ] = useContext(GoalSearchTitleListContext);
  const [ , , updateTotalTitle, setUpdateTotalTitle ] = useContext(GoalTotalTitleListContext);

  return (
    <div>
      <div className="button-wrapper">
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
            shareStatus={goal.shareStatus}
            periodicityInfo = {goal.periodicityInfo}
            goalSearchTitleList={goalSearchTitleList}
            setGoalSearchTitleList={setGoalSearchTitleList}
            goalFullList={goalFullList}
            setGoalFullList={setGoalFullList}
            updateTotalTitle={updateTotalTitle}
            setUpdateTotalTitle={setUpdateTotalTitle}
          ></GoalCard>
        ))}
        <GoalInsertFormModal goalFullList={goalFullList}
            setGoalFullList={setGoalFullList}
            goalSearchTitleList={goalSearchTitleList}
            setGoalSearchTitleList={setGoalSearchTitleList}/>
      </div>
    </div>
  )
}

function GoalCard({index, title, startDatetime, endDatetime, content, goalId, kind, progressRate, color, shareStatus, periodicityInfo, goalSearchTitleList, setGoalSearchTitleList, goalFullList, setGoalFullList, updateTotalTitle, setUpdateTotalTitle}){
  return(
        <div className="card" style={{ borderLeft : `7px solid`, borderColor : color}} id={goalId} >
          <div className="card-button-wrapper">
            {(shareStatus==="N") ? (<BiLock className="lock-icon" title="비공개"/>) : null}
            <GoalModifyFormModal 
              modifyData = {goalFullList[index]}
            />
            <DeleteModal 
              goalId={goalId} 
              goalSearchTitleList={goalSearchTitleList}
              setGoalSearchTitleList={setGoalSearchTitleList}
              goalFullList={goalFullList}
              setGoalFullList ={setGoalFullList}
              updateTotalTitle={updateTotalTitle}
              setUpdateTotalTitle={setUpdateTotalTitle}/>
          </div>
          <div className="title">{title}</div>
          <div className="content">{content}</div>
          <div className="datetime">{startDatetime.substring(0,10)} ~ {endDatetime.substring(0,10)}</div>
          <div>{(kind==="regular") ? (<><span className="tag">주기성</span> <PeriodicityInfo periodicityInfo ={periodicityInfo} /></>) : (<span className="tag">기한성</span>)}</div>
          {progressRate ? <div className="progressRate">{progressRate}%</div> : null}
        </div>
    )
}

function PeriodicityInfo({periodicityInfo}){
  // console.log("함수안에 들어갔다", periodicityInfo)
  const timeUnitToString = (value)=>{
    if(value === "D"){
      return "매일"
    }else if(value === "W"){
      return "매주"
    }else if(value === "M"){
      return "매월"
    }else{
      return null
    }
  }
  return (
    <>
    <span className="tag">{timeUnitToString(periodicityInfo.timeUnit)}</span>
    {periodicityInfo.count ? <span className="tag">{periodicityInfo.count}회</span> : null}
    {(periodicityInfo.sunYn === "Y") ? <span className="tag">일</span>: null}
    {(periodicityInfo.monYn === "Y") ? <span className="tag">월</span>: null}
    {(periodicityInfo.tueYn === "Y") ? <span className="tag">화</span>: null}
    {(periodicityInfo.wedsYn === "Y") ? <span className="tag">수</span>: null}
    {(periodicityInfo.thurYn === "Y") ? <span className="tag">목</span>: null}
    {(periodicityInfo.friYn === "Y") ? <span className="tag">금</span>: null}
    {(periodicityInfo.satYn === "Y") ? <span className="tag">토</span>: null}
    </>
  )
}


// 삭제 버튼 모달
function DeleteModal({goalId, goalSearchTitleList, setGoalSearchTitleList, goalFullList, setGoalFullList, updateTotalTitle, setUpdateTotalTitle}) {
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
      handleClose()
      setGoalFullList(goalFullList.filter(goal => goal.goalId !== goalId));
      setGoalSearchTitleList(goalSearchTitleList.filter(goal => goal.goalId !== goalId))
      setUpdateTotalTitle(!updateTotalTitle)
    }catch(err){
      console.error(err)
    }
  }

  return (
    <>
      <button className="deleteBtn" variant="outlined" onClick={handleClickOpen}>
        <RiDeleteBinLine style={{verticalAlign:"middle"}} title="삭제"/>
      </button>
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
    </>
  );
}


export default GoalFullList;