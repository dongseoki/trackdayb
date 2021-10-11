import React, { useState } from "react";
import "./Goal.css";
import LeftNavigation from "../components/LeftNavigation";
import GoalFullList from "../components/GoalFullList";

function Goal() {
  // 검색조건(조회기간)
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  //체크박스 선택
  const [searchGoalIdList, setSearchGoalIdList] = useState([]);
   
  return (
    <div className="goal">
      {/* 사이드 */}
      <aside className="side">
        <LeftNavigation 
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          setSearchStartDatetime={setSearchStartDatetime}
          setSearchEndDatetime={setSearchEndDatetime}
          searchGoalIdList={searchGoalIdList}
          setSearchGoalIdList={setSearchGoalIdList}
        />
      </aside>
    
    <div className="goal-content">
      <h3>목표관리</h3>

      <GoalFullList 
        searchStartDatetime={searchStartDatetime}
        searchEndDatetime={searchEndDatetime}
        setSearchStartDatetime={setSearchStartDatetime}
        setSearchEndDatetime={setSearchEndDatetime}
        searchGoalIdList={searchGoalIdList}
        setSearchGoalIdList={setSearchGoalIdList}
      />

      
    </div>
    </div>
  );
}





export default Goal;