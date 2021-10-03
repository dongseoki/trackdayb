import React, { useState, useEffect } from "react";
import "./Goal.css";
import { LeftNavigation } from '../components/index';
import axios from "axios";

// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Goal(props) {
  // goalFullList
  // let body = {
  //   "searchStartDatetime": "2021-09-01 09:00:00",
  //   "searchEndDatetime": "2021-09-31 09:00:00",
  //   "searchGoalIdList": [
  //     "1",
  //     "2",
  //     "3"],
  //   "searchKind":"deadline"
  // }
  console.log(props);

  // 검색결과(목표타이틀 리스트)
  const [goalFullList, setGoalFullList] = useState([]);

  useEffect(() => {
    let body = {
      "searchStartDatetime": "2021-09-01 09:00:00",
      "searchEndDatetime": "2021-09-31 09:00:00",
      "searchGoalIdList": [
        "1",
        "2",
        "3"],
      "searchKind":"deadline"
    }
    const fetchGoalFullList = async () => {
      try {
        const result = await axios.post("/goalManage/getGoalFullListTEST", body);
        setGoalFullList(result.data.goalFullList)
        console.log("result", result)
      } catch(err){
        console.error(err)
      }
    }
    fetchGoalFullList();
}, []);

  return (
    <div className="goal">
      {/* 사이드 */}
      <aside className="side">
        <LeftNavigation />
      </aside>
    
    <div className="goal-content">
      <h3>목표관리</h3>

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
          <GoalCard />
      </div>
    </div>
    </div>
  );
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

function GoalCard(props){
  return(
    <div className="card" id={props.goalId}>
      <h2>{props.title}</h2>
      <span>시작일: </span><span>{props.startDatetime}</span><br/>
      <span>종료일: </span><span>{props.endDatetime}</span><br/>
      <span>내용: </span><span>{props.content}</span><br/>
      <span>kind: </span><span>{props.kind}</span><br/>
      <span>진행률: </span><span>{props.progressRate}</span><br/>
    </div>
  )
}

export default Goal;