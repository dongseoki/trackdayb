import React, { useState } from "react";
import "./Goal.css";
import LeftNavigation from "../components/LeftNavigation";
import GoalFullList from "../components/GoalFullList";
import { GoalFullListProvider } from "../context/GoalFullListContext";
import { GoalSearchTitleListProvider } from "../context/GoalSearchTitleListContext";

function Goal() {
  // 검색조건
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  const [searchGoalIdList, setSearchGoalIdList] = useState([]);
  const [orderColumn, setOrderColumn] = useState("modification_datetime");
  const [orderType, setOrderType] = useState("desc");

  return (
    <div className="goal">
      <GoalSearchTitleListProvider
        searchStartDatetime={searchStartDatetime}
        searchEndDatetime={searchEndDatetime}>
        <GoalFullListProvider
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          searchGoalIdList={searchGoalIdList}
          orderColumn={orderColumn}
          orderType={orderType}
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
            <GoalFullList 
              orderColumn={orderColumn}
              setOrderColumn={setOrderColumn}
              orderType={orderType}
              setOrderType={setOrderType}
            />
          </div>
        </GoalFullListProvider>
      </GoalSearchTitleListProvider>
    </div>
  );
}





export default Goal;