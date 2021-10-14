import React, { useState } from "react";
import "./Goal.css";
import LeftNavigation from "../components/LeftNavigation";
import GoalFullList from "../components/GoalFullList";
import { GoalFullListProvider } from "../context/GoalFullListContext";

function Goal() {
  // 검색조건(조회기간)
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  const [orderColumn, setOrderColumn] = useState("modification_datetime");
  const [searchGoalIdList, setSearchGoalIdList] = useState([]);
   
  return (
    <div className="goal">
      <GoalFullListProvider
        searchStartDatetime={searchStartDatetime}
        searchEndDatetime={searchEndDatetime}
        searchGoalIdList={searchGoalIdList}
        orderColumn={orderColumn}
      >
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
            orderColumn={orderColumn}
            setOrderColumn={setOrderColumn}
          />
        </div>
      </GoalFullListProvider>
    </div>
  );
}





export default Goal;