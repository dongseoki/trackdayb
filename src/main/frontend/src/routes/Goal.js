import React, { useEffect, useState } from "react";
import "./Goal.css";
import LeftNavigation from "../components/LeftNavigation";
import GoalFullList from "../components/GoalFullList";
import { useMediaQuery } from "react-responsive";
//icon
import {IoIosArrowDown} from "react-icons/io";
import {IoIosArrowUp} from "react-icons/io";
import useTitle from '../hooks/useTitle';
import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';
import { LOAD_GOALTOTALFULLLIST_REQUEST, 
        LOAD_GOALTOTALTITLELIST_REQUEST,
        LOAD_GOALSEARCHFULLLIST_REQUEST,
        LOAD_GOALSEARCHTITLELIST_REQUEST } from "../reducers/goal";

function Goal() {
  const dispatch = useDispatch();

  // 로컬변수들
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  const [ searchGoalIdList, setSearchGoalIdList ] = useState([]);
  // 정렬조건 로컬변수
  const [ orderColumn, setOrderColumn ] = useState("");
  const [ orderType, setOrderType ] = useState("desc");
  const [ gatherGoalYn, setGatherGoalYn ] = useState(false); //목표 모아보기 변수

  // 목표 전체 
  useEffect(() => {
    dispatch({
      type : LOAD_GOALTOTALFULLLIST_REQUEST,
    });
    dispatch({
      type : LOAD_GOALTOTALTITLELIST_REQUEST,
    });
  }, [])

  // 목표제목 조건 update Action
  useEffect(()=> {
    dispatch({
      type : LOAD_GOALSEARCHTITLELIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(searchStartDatetime).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(searchEndDatetime).format("YYYY-MM-DD"),
      }
    })
  }, [searchStartDatetime, searchEndDatetime])
  
  //목표 전체
  useEffect(()=> {
    dispatch({
      type : LOAD_GOALSEARCHFULLLIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(searchStartDatetime).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(searchEndDatetime).format("YYYY-MM-DD"),
        searchGoalIdList : searchGoalIdList.toString(),
        ...(orderColumn ? { 
          orderColumn : orderColumn,
          orderType : orderType
        } : null
        ),
        gatherGoalYn : gatherGoalYn === true ? "Y" : "N"
      }
    })
  }, [searchStartDatetime,searchEndDatetime, searchGoalIdList, orderColumn, orderType, gatherGoalYn])


  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("목표관리"), 100);
   
  // 반응형 화면 BreakPoint
  const isMiddleScreen = useMediaQuery({
    query: "(max-width: 1040px)",
  });

  // LeftNav 접기 State
  const [leftNavFoldState, setLeftNavFoldState] = useState(isMiddleScreen ? true : false);
  
  return (
    <div className="goal">
      <aside className="side">
        {isMiddleScreen ? <div className="left-nav-fold" onClick={()=>{setLeftNavFoldState(!leftNavFoldState)}}>목표 조회/선택 {leftNavFoldState ? <IoIosArrowDown/> : <IoIosArrowUp/> }</div> : null}
        {isMiddleScreen && leftNavFoldState ? null : 
        (<LeftNavigation
          searchStartDatetime = {searchStartDatetime}
          setSearchStartDatetime = {setSearchStartDatetime}
          searchEndDatetime = {searchEndDatetime}
          setSearchEndDatetime = {setSearchEndDatetime}
          searchGoalIdList = {searchGoalIdList}
          setSearchGoalIdList = {setSearchGoalIdList}
        />)
        }
      </aside>
      <section className="goal-content">
        <GoalFullList 
        orderColumn ={orderColumn}
        setOrderColumn={setOrderColumn}
        orderType={orderType}
        setOrderType={setOrderType}
        gatherGoalYn={gatherGoalYn}
        setGatherGoalYn={setGatherGoalYn}
        />
      </section>
    </div>
  );
}





export default Goal;