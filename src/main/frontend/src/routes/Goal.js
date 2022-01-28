import React, { useEffect, useState } from "react";
import "./Goal.css";
import LeftNavigation from "../components/LeftNavigation";
import GoalFullList from "../components/GoalFullList";
import { useMediaQuery } from "react-responsive";
//icon
import {IoIosArrowDown} from "react-icons/io";
import {IoIosArrowUp} from "react-icons/io";
import useTitle from '../hooks/useTitle';

import { useDispatch } from 'react-redux';
import { LOAD_GOALTOTALFULLLIST_REQUEST, LOAD_GOALTOTALTITLELIST_REQUEST } from "../reducers/goal";

function Goal() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type : LOAD_GOALTOTALFULLLIST_REQUEST,
    });
    dispatch({
      type : LOAD_GOALTOTALTITLELIST_REQUEST,
    });
  }, [])

  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("목표관리"), 100);
   
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
      <aside className="side">
        {isMiddleScreen ? <div className="left-nav-fold" onClick={()=>{setLeftNavFoldState(!leftNavFoldState)}}>목표 조회/선택 {leftNavFoldState ? <IoIosArrowDown/> : <IoIosArrowUp/> }</div> : null}
        {isMiddleScreen && leftNavFoldState ? null : (<LeftNavigation/>)}
      </aside>
      <section className="goal-content">
        <GoalFullList/>
      </section>
    </div>
  );
}





export default Goal;