import React, { useState, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function LeftNavigation(props){
    
  // goalTitleLIst
  // 검색결과(목표타이틀 리스트)
  const [goalTitleList, setGoalTitleList] = useState([]);
  const [resultCode, setResultCode] = useState("");
  const defaultSearchTime = " 09:00:00";
  
  useEffect(() => {
    let body = {
        searchStartDatetime : makeYYMMDD(props.searchStartDatetime) + defaultSearchTime,
        searchEndDatetime : makeYYMMDD(props.searchEndDatetime) + defaultSearchTime,
      }
      console.log("body", body)
      const fetchGoalTitleList = async () => {
          try {
              setGoalTitleList(null);
              const result = await axios.post(
                  "/goalManage/getGoalTitleList", body);
              setGoalTitleList(result.data.goalTitleList);
              setResultCode(result.data.resultCode);
          } 
          catch(err){
              console.error(err)
          }
      };
      fetchGoalTitleList();
  }, [props.searchStartDatetime, props.searchEndDatetime]);
  if (!goalTitleList) return null;
    return (
        <nav className="left-nav">
            <div className="search-date-range">
                <p>조회기간</p>
                <DateRangePickerCustom 
                searchStartDatetime={props.searchStartDatetime}
                searchEndDatetime={props.searchEndDatetime}
                setSearchStartDatetime={props.setSearchStartDatetime} 
                setSearchEndDatetime={props.setSearchEndDatetime}/>
            </div>
            <GoalTitleList goalTitleList={goalTitleList}/>
        </nav>
    )
}

function GoalTitleList({goalTitleList}){
    // 목표-부모&자식 묶기
    const argGoalTitleObject = ArrangeGoalTitleList(goalTitleList)

    return (
        <div>
            <p>목표선택</p>
            <div className="goal-list">
                <ul>
                    {argGoalTitleObject && Object.keys(argGoalTitleObject).map((key, index) => {
                        
                        if(argGoalTitleObject[key].children.length === 0){
                            return (
                                <GoalTitleParentCards 
                                    key={argGoalTitleObject[key].goalId}
                                    goalId = {argGoalTitleObject[key].goalId}
                                    title={argGoalTitleObject[key].title}
                                    parentId={argGoalTitleObject[key].parentId}
                                    color ={argGoalTitleObject[key].color}
                                ></GoalTitleParentCards>
                                )
                        }else{
                            return (
                                <div>
                                    <GoalTitleParentCards 
                                        key={argGoalTitleObject[key].goalId}
                                        goalId = {argGoalTitleObject[key].goalId}
                                        title={argGoalTitleObject[key].title}
                                        parentId={argGoalTitleObject[key].parentId}
                                        color ={argGoalTitleObject[key].color}
                                    ></GoalTitleParentCards>

                                    {argGoalTitleObject[key].children.map((child, index) => (
                                        <GoalTitleChildCards 
                                        key={child.goalId}
                                        goalId = {child.goalId}
                                        title={child.title}
                                        parentId={child.parentId}
                                        color ={child.color}
                                    ></GoalTitleChildCards>
                                    )
                                    )}
                                </div>
                            )
                        }
                    })
                }
                </ul>
            </div>
        </div>
    )
}

function GoalTitleParentCards({title, goalId, color}) {
    return (
        <li key={goalId}>
            <Checkbox {...label} defaultChecked />
            <p className="class-2">{title}</p>
            <div className="color-tag" style={{ backgroundColor : color}}></div>
        </li>
    )
}

function GoalTitleChildCards({title, goalId}) {
    const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    return (
        <li key={goalId}>
            <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <p className="class-2">{title}</p>
            <div className="none-tag"></div>
        </li>
    )
}



// 목표 부모-자식 묶기
function ArrangeGoalTitleList(goalTitleList){
    const arrangedObj = new Object();
    goalTitleList.map((goal, index) => {
        if(!goal.parentId) {
            arrangedObj[goal.goalId] = goal
            arrangedObj[goal.goalId]["children"] = []
        }else if(Object.keys(arrangedObj).includes(goal.parentId)){
            arrangedObj[goal.parentId]["children"].push(goal)
        }
    })
    return arrangedObj
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}


export default LeftNavigation;