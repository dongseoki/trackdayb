import React, { useState, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';

import axios from "axios";

function LeftNavigation(props){
  // goalTitleLIst
  // 검색결과(목표타이틀 리스트)
  const [goalTitleList, setGoalTitleList] = useState([]);
  const [resultCode, setResultCode] = useState("");

  

  useEffect(() => {
    let body = {
        searchStartDatetime : props.searchStartDatetime,
        searchEndDatetime : props.searchEndDatetime,
      }
      
      const fetchGoalTitleList = async () => {
          try {
              setGoalTitleList(null);
              const result = await axios.post(
                  "/goalManage/getGoalTitleListTEST", body);
              setGoalTitleList(result.data.goalTitleList);
              setResultCode(result.data.resultCode);
              console.log("resultCode : ", resultCode);
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
            <SearchButton />           
        </nav>
    )
}

function GoalTitleList(props){
    return (
        <div>
            <p>목표선택</p>
            <div className="goal-list">
                <ul>
                    {props.goalTitleList && props.goalTitleList.map((goal, index) => (
                        <GoalTitleCards key={index}
                            title={goal.title}></GoalTitleCards>
                    ))}
                </ul>
            </div>
        </div>
    )
}
function GoalTitleCards({title}) {
    return (
        <li><p className="class-2">{title}</p><div className="none-tag"></div></li>
    )
}
function SearchButton(props){
    return (
        <div>
            <button>검색</button>
        </div>
    )
}

export default LeftNavigation;