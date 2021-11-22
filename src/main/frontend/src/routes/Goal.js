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
        searchEndDatetime={searchEndDatetime}>
        <GoalFullListProvider
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          searchGoalIdList={searchGoalIdList}
          orderColumn={orderColumn}
          orderType={orderType}
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
            />
          </section>
        </GoalFullListProvider>
      </GoalSearchTitleListProvider>
      </GoalTotalTitleListProvider>
    </div>
  );
}





export default Goal;