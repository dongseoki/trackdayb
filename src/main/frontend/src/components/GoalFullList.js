import React, { useState, useEffect } from "react";
import "./GoalFullList.css";
import axios from "axios";
import GoalInsertFormModal from "./GoalInsertFormModal";
// 토글버튼
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function GoalFullList(props) {
    // 검색결과(목표타이틀 리스트)
  const [goalFullList, setGoalFullList] = useState([]);

  useEffect(() => {
    const fetchGoalFullList = async () => {
      try {
        const result = await axios.get("/goalManage/goalFullList", {
          params: {
            // searchGoalIdList=1,2,3,
            searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
            searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
            // searchKind:"deadline",
            orderColumn:"start_datetime",
            orderType:"asc"
          }
        });
        setGoalFullList(result.data.goalFullList)
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

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}



export default GoalFullList;