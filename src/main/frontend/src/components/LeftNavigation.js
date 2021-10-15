import React, { useState, useEffect } from "react"
import "./LeftNavigation.css";
import DateRangePickerCustom from './DateRangePickerCustom';
import axios from "axios";
import GoalTitleList from "./GoalTitleList";

function LeftNavigation(props){
  const [goalTitleList, setGoalTitleList] = useState([]);

  useEffect(() => {
      const fetchGoalTitleList = async () => {
          try {
              setGoalTitleList(null);
              const result = await axios.get("/goalManage/goalTitleList", {
                  params:{
                    searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
                    searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
                    // searchKind:"deadline",
                  }
              });
              setGoalTitleList(result.data.goalTitleList);
              console.log("골 타이틀 리스트", result.data.goalTitleList)
              let tempGoalIdList = new Array();
              result.data.goalTitleList.map((goal)=>{
                tempGoalIdList.push(parseInt(goal.goalId))
              })
              props.setSearchGoalIdList(tempGoalIdList);
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
            <GoalTitleList 
                goalTitleList={goalTitleList}
                searchGoalIdList={props.searchGoalIdList}
                setSearchGoalIdList={props.setSearchGoalIdList}
            />
        </nav>
    )
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
    return value.toISOString().substring(0,10);
}


export default LeftNavigation;