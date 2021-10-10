import React, { useState, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';
import axios from "axios";
import GoalTitleList from "./GoalTitleList";

function LeftNavigation(props){
    
  // goalTitleLIst
  // 검색결과(목표타이틀 리스트)
  const [goalTitleList, setGoalTitleList] = useState([]);
  
  useEffect(() => {
    let body = {
        searchStartDatetime : makeYYMMDD(props.searchStartDatetime),
        searchEndDatetime : makeYYMMDD(props.searchEndDatetime),
      }
      console.log("body", body)
      const fetchGoalTitleList = async () => {
          try {
              setGoalTitleList(null);
              const result = await axios.get("/goalManage/goalTitleList", {
                  params:{
                    // searchGoalIdList=1,2,3,
                    searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
                    searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
                    // searchKind:"deadline",
                  }
              });
              setGoalTitleList(result.data.goalTitleList);
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