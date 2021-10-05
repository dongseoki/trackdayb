import React, { useState, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';
import axios from "axios";
import GoalTitleList from "./GoalTitleList";

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
                startDate={props.searchStartDatetime}
                endDate={props.searchEndDatetime}
                setStartDate={props.setSearchStartDatetime} 
                setEndDate={props.setSearchEndDatetime}/>
            </div>
            <GoalTitleList goalTitleList={goalTitleList}/>
        </nav>
    )
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}


export default LeftNavigation;