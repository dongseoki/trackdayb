import React, { useState, useContext, useEffect } from "react";
import "./GoalFullList.css";
// import axios from "axios";
import GoalInsertFormModal from "./GoalInsertFormModal";
import GoalCard from "./GoalCard";
//icon
import { CgArrowDown } from 'react-icons/cg';
import { CgArrowUp } from 'react-icons/cg';
import Button from '@mui/material/Button';

import { GoalModalSearchTitleListProvider } from "../context/GoalModalSearchTitleListContext";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useDispatch, useSelector } from 'react-redux';
import { LOAD_GOALSEARCHFULLLIST_REQUEST, LOAD_GOALSEARCHTITLELIST_REQUEST } from "../reducers/goal";

function GoalFullList() {
  const dispatch = useDispatch();
  // 정렬조건 로컬변수
  const [ orderColumn, setOrderColumn ] = useState("");
  const [ orderType, setOrderType ] = useState("desc");
  const [gatherGoalYn, setGatherGoalYn] = useState(false); //목표 모아보기 변수

  useEffect(() =>{
      dispatch({
        type : LOAD_GOALSEARCHFULLLIST_REQUEST,
        data : { 
          orderColumn : orderColumn,
          orderType : orderType,
          gatherGoalYn : gatherGoalYn
        }
      })
      dispatch({
        type : LOAD_GOALSEARCHTITLELIST_REQUEST,
        data : { 
          orderColumn : orderColumn,
          orderType : orderType,
          gatherGoalYn : gatherGoalYn 
        }
      })
  }, [orderColumn, orderType, gatherGoalYn])

  const { goalSearchFullList, goalSearchTitleList } = useSelector((state) => state.goal)


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
          onChange={(e)=> setOrderColumn(e.target.value)}
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
        {goalSearchFullList && goalSearchFullList.map((goal, index) => (
          <GoalCard
            key={goal.goalId}
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
            // setGoalSearchTitleList={setGoalSearchTitleList}
            goalSearchFullList={goalSearchFullList}
            // setGoalFullList={setGoalFullList}
            orderColumn={orderColumn}
            orderType = {orderType}
          ></GoalCard>
        ))}
        <GoalInsertFormModal/>
      </div>
      </GoalModalSearchTitleListProvider>
    </div>
  )
}




export default GoalFullList;