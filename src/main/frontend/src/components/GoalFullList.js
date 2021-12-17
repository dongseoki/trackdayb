import React, { useState, useContext } from "react";
import "./GoalFullList.css";
// import axios from "axios";
import axiosInstance from "../axiosConfig";
import GoalInsertFormModal from "./GoalInsertFormModal";
// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
//icon
import { RiDeleteBinLine } from "react-icons/ri";
import { BiLock } from "react-icons/bi";
import { CgArrowDown } from 'react-icons/cg';
import { CgArrowUp } from 'react-icons/cg';
import Button from '@mui/material/Button';
// 삭제버튼
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import GoalModifyFormModal from "./GoalModifyFormModal";

import { GoalFullListContext } from "../context/GoalFullListContext";
import { GoalSearchTitleListContext} from "../context/GoalSearchTitleListContext";
import { GoalTotalTitleListContext } from "../context/GoalTotalTitleListContext";

import { GoalModalSearchTitleListProvider } from "../context/GoalModalSearchTitleListContext";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function GoalFullList({orderColumn, setOrderColumn, orderType, setOrderType, gatherGoalYn, setGatherGoalYn, updateChecker, setUpdateChecker}) {
  const [ goalFullList, setGoalFullList ] = useContext(GoalFullListContext);
  const [ goalSearchTitleList, setGoalSearchTitleList ] = useContext(GoalSearchTitleListContext);
  const [ , , updateTotalTitle, setUpdateTotalTitle ] = useContext(GoalTotalTitleListContext);

  const toggleOrderType = (preValue)=>{
    if (preValue === 'asc'){
      return 'desc'
    }else {
      return 'asc'
    }
  }
  return (
    <div>
      <GoalModalSearchTitleListProvider>

      <div className='button-wrapper'>
        <Button className={gatherGoalYn ? "gather-btn active" : "gather-btn"} color="primary" variant={gatherGoalYn===true ? "contained" : "outlined"} onClick={()=>{setGatherGoalYn(!gatherGoalYn)}}>목표 모아보기</Button>
        <FormControl size="small">
        <InputLabel id="demo-simple-select-label">정렬</InputLabel>
        <Select
          className="orderColumn-select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderColumn}
          label="정렬"
          onChange={(e)=>{
              setOrderColumn(e.target.value)}
          }
        >
          <MenuItem value="">정렬</MenuItem>
          <MenuItem value="modification_datetime">최종수정일</MenuItem>
          <MenuItem value="start_datetime">시작일</MenuItem>
          <MenuItem value="end_datetime">종료일</MenuItem>
          <MenuItem value="progress_rate">진행률</MenuItem>
        </Select>
        </FormControl>
        <Button 
          disabled = {orderColumn === "" ? true : false} 
          variant="outlined" 
          className={orderColumn === "" ? "orderType-btn" : "orderType-btn active"}  
          title={orderType === "desc" ? "내림차순" : "오름차순"} 
          onClick={()=>{setOrderType(toggleOrderType(orderType))}}>
            {orderType === "desc" ? <CgArrowDown /> : <CgArrowUp />}
        </Button>
      </div>

      <div className="goal-cards-list">
        {goalFullList && goalFullList.map((goal, index) => (
          <GoalCard
            key={index}
            index={index}
            goalTitlePath={goal.goalTitlePath}
            title={goal.title}
            startDatetime={goal.startDatetime}
            endDatetime={goal.endDatetime}
            content={goal.content}
            goalId={goal.goalId}
            kind={goal.kind}
            progressRate={goal.progressRate}
            color={goal.color}
            topGoalColor={goal.topGoalColor}
            shareStatus={goal.shareStatus}
            periodicityInfo = {goal.periodicityInfo}
            goalSearchTitleList={goalSearchTitleList}
            setGoalSearchTitleList={setGoalSearchTitleList}
            goalFullList={goalFullList}
            setGoalFullList={setGoalFullList}
            updateTotalTitle={updateTotalTitle}
            setUpdateTotalTitle={setUpdateTotalTitle}
            orderColumn={orderColumn}
            orderType = {orderType}
            updateChecker={updateChecker}
            setUpdateChecker={setUpdateChecker}
          ></GoalCard>
        ))}
        <GoalInsertFormModal 
            orderColumn={orderColumn}
            orderType = {orderType}
            goalFullList={goalFullList}
            setGoalFullList={setGoalFullList}
            goalSearchTitleList={goalSearchTitleList}
            setGoalSearchTitleList={setGoalSearchTitleList}
            updateChecker={updateChecker}
            setUpdateChecker={setUpdateChecker}/>
      </div>
      </GoalModalSearchTitleListProvider>
    </div>
  )
}

function GoalCard({index, goalTitlePath, title, startDatetime, endDatetime, content, goalId, kind, progressRate, color, topGoalColor, shareStatus, periodicityInfo, goalSearchTitleList, setGoalSearchTitleList, goalFullList, setGoalFullList, updateTotalTitle, setUpdateTotalTitle, orderColumn, orderType, updateChecker, setUpdateChecker}){
  let goalTitlePathList = goalTitlePath.split("/")
  goalTitlePathList.pop()
  return(
        //color&topGoalColor 모두 없으면 css에 고정값 (회색 사용)
        <div className="card" style={{ borderLeft : `7px solid`, borderColor : topGoalColor}} id={goalId} > 
          <div className="card-button-wrapper">
            {(shareStatus==="N") ? (<BiLock className="lock-icon" title="비공개"/>) : null}
            <GoalModifyFormModal 
              modifyData = {goalFullList[index]}
              targetIndex={index}
              orderColumn={orderColumn}
              orderType = {orderType}
              goalSearchTitleList={goalSearchTitleList}
              setGoalSearchTitleList={setGoalSearchTitleList}
              updateChecker={updateChecker}
              setUpdateChecker={setUpdateChecker}
            />
            <DeleteModal 
              goalId={goalId} 
              goalSearchTitleList={goalSearchTitleList}
              setGoalSearchTitleList={setGoalSearchTitleList}
              goalFullList={goalFullList}
              setGoalFullList ={setGoalFullList}
              updateTotalTitle={updateTotalTitle}
              setUpdateTotalTitle={setUpdateTotalTitle}
              updateChecker={updateChecker}
              setUpdateChecker={setUpdateChecker}/>
          </div>
          <div className="path-tag-wrapper">
            {goalTitlePathList.length>0 ? goalTitlePathList.map((goal, index) => (
              <>
                <span className="path-tag" title={goal}>{goal.substring(0,2)}...</span><span>/</span>              
              </>
            )): <span></span> }
          </div>

          <div className="title">{title}</div>
          <div className="content">{content}</div>
          <div className="datetime">{startDatetime.substring(0,10)} ~ {endDatetime.substring(0,10)}</div>
          <div>{(kind==="regular") ? (<><span className="tag">주기성</span> <PeriodicityInfo periodicityInfo ={periodicityInfo} /></>) : (<span className="tag">기한성</span>)}</div>
          <div className="progressRate">{progressRate ? progressRate : 0}%</div>
        </div>
    )
}

function PeriodicityInfo({periodicityInfo}){
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
function DeleteModal({goalId, goalSearchTitleList, setGoalSearchTitleList, goalFullList, setGoalFullList, updateTotalTitle, setUpdateTotalTitle, updateChecker, setUpdateChecker}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async ()=>{
    try{
      const result= await axiosInstance.delete("/goalManage/goal", {
        params:{
          goalId: goalId
        }
      })
      handleClose()
      // setGoalFullList(goalFullList.filter(goal => goal.goalId !== goalId));
      // setGoalSearchTitleList(goalSearchTitleList.filter(goal => goal.goalId !== goalId))
      setUpdateTotalTitle(!updateTotalTitle)
      setUpdateChecker(!updateChecker) // GoalFullList DB에서 새로 데이터 받아오기
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