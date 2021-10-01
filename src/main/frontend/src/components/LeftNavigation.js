import React, { useState, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';

import axios from "axios";

function LeftNavigation(props){
  // goalTitleLIst
  // 검색결과(목표타이틀 리스트)
  const [goalTitleList, setGoalTitleList] = useState([]);
  const [resultCode, setResultCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    let body = {
        searchStartDatetime : props.searchStartDatetime,
        searchEndDatetime : props.searchEndDatetime,
      }
      
      const fetchGoalTitleList = async () => {
          try {
              setError(null);
              setGoalTitleList(null);
              setLoading(true);
              const response = await axios.post(
                  "/goalManage/getGoalTitleListTEST", body);
              setGoalTitleList(response.data.goalTitleList);
              setResultCode(response.data.resultCode);
              console.log("resultCode : ", resultCode);
          } 
          catch(e){
              setError(e);
          }
          setLoading(false);
      };
      fetchGoalTitleList();
  }, [props.searchStartDatetime, props.searchEndDatetime]);
  if (loading) return <div> 로딩중...</div>;
  if (error) return <div>에러발생</div>;
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