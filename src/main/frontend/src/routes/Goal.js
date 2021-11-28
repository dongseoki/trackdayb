import React, { useState } from "react";
import "./Goal.css";
import LeftNavigation from "../components/LeftNavigation";
import GoalFullList from "../components/GoalFullList";
import { GoalFullListProvider } from "../context/GoalFullListContext";
import { GoalSearchTitleListProvider } from "../context/GoalSearchTitleListContext";
import { GoalTotalTitleListProvider } from "../context/GoalTotalTitleListContext";
import { useMediaQuery } from "react-responsive";
//icon
import {IoIosArrowDown} from "react-icons/io";
import {IoIosArrowUp} from "react-icons/io";
import useTitle from '../hooks/useTitle';


function Goal() {
  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("목표관리"), 100);
  // 검색조건
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  const [searchGoalIdList, setSearchGoalIdList] = useState([]);
  const [orderColumn, setOrderColumn] = useState("modification_datetime");
  const [orderType, setOrderType] = useState("desc");
  const [gatherGoalYn, setGatherGoalYn] = useState(true); //목표 모아보기 변수
  const [updateChecker, setUpdateChecker] = useState(true); // 목표 수정/신규 감지 변수
   
  // 반응형 화면 BreakPoint
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 740px)",
  });

  const isMiddleScreen = useMediaQuery({
    query: "(max-width: 1040px)",
  });

  // LeftNav 접기 State
  const [leftNavFoldState, setLeftNavFoldState] = useState(isMiddleScreen ? true : false);
  
  return (
    <div className="goal">
      <GoalTotalTitleListProvider>
      <GoalSearchTitleListProvider
        searchStartDatetime={searchStartDatetime}
        searchEndDatetime={searchEndDatetime}
        updateChecker={updateChecker}>
        <GoalFullListProvider
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          searchGoalIdList={searchGoalIdList}
          orderColumn={orderColumn}
          orderType={orderType}
          gatherGoalYn={gatherGoalYn}
          updateChecker={updateChecker}
        >
          <aside className="side">
          {isMiddleScreen ? <div className="left-nav-fold" onClick={()=>{setLeftNavFoldState(!leftNavFoldState)}}>목표 조회/선택 {leftNavFoldState ? <IoIosArrowDown/> : <IoIosArrowUp/> }</div> : null}
          {isMiddleScreen && leftNavFoldState ? null : (<LeftNavigation 
              searchStartDatetime={searchStartDatetime}
              searchEndDatetime={searchEndDatetime}
              setSearchStartDatetime={setSearchStartDatetime}
              setSearchEndDatetime={setSearchEndDatetime}
              searchGoalIdList={searchGoalIdList}
              setSearchGoalIdList={setSearchGoalIdList}
            />
          )}
          </aside>
          <section className="goal-content">
            <GoalFullList 
              orderColumn={orderColumn}
              setOrderColumn={setOrderColumn}
              orderType={orderType}
              setOrderType={setOrderType}
              gatherGoalYn={gatherGoalYn}
              setGatherGoalYn={setGatherGoalYn}
              updateChecker={updateChecker}
              setUpdateChecker={setUpdateChecker}
            />
          </section>
        </GoalFullListProvider>
      </GoalSearchTitleListProvider>
      </GoalTotalTitleListProvider>
    </div>
  );
}





export default Goal;