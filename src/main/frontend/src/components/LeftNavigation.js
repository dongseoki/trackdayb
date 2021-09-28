import React, { useState, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';

import axios from "axios";

function LeftNavigation(){
  // goalTitleLIst
  // 검색조건(조회기간)
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  // 검색결과(목표타이틀 리스트)
  const [goalTitleList, setGoalTitleList] = useState([]);
  
  useEffect(() => {
      let body = {
        searchStartDatetime : searchStartDatetime,
        searchEndDatetime : searchEndDatetime,
      }
      console.log(body)
      axios
      .post("/goalManage/getGoalTitleListTEST", body)
      .then(({ data }) => setGoalTitleList(data.goalTitleList));
  }, [searchStartDatetime, searchEndDatetime]);

    return (
        <nav className="left-nav">
            <div className="search-date-range">
                <p>조회기간</p>
                <DateRangePickerCustom 
                searchStartDatetime={searchStartDatetime}
                searchEndDatetime={searchEndDatetime}
                setSearchStartDatetime={setSearchStartDatetime} 
                setSearchEndDatetime={setSearchEndDatetime}/>
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