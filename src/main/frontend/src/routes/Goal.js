import React, { useState } from "react";
import "./Goal.css";
import LeftNavigation from "../components/LeftNavigation";
import GoalFullList from "../components/GoalFullList";

function Goal() {
  // 검색조건(조회기간)
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());

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

  
  return (
    <div className="goal">
      {/* 사이드 */}
      <aside className="side">
        <LeftNavigation 
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          setSearchStartDatetime={setSearchStartDatetime}
          setSearchEndDatetime={setSearchEndDatetime}
        />
      </aside>
    
    <div className="goal-content">
      <h3>목표관리</h3>

      <GoalFullList />

      
    </div>
    </div>
  );
}





export default Goal;