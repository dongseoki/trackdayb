import React, { useEffect, useState } from "react";
import "./Time.css";
import { LeftNavigation } from '../components/index';

//time picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';
//icon
import {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"
import {IoIosArrowDown} from "react-icons/io"
import {IoIosArrowUp} from "react-icons/io"

//TimeLine
import ActivitySearchTimeline from '../components/ActivitySearchTimeline';
import { GoalSearchTitleListProvider } from "../context/GoalSearchTitleListContext";
import { GoalModalSearchTitleListProvider} from "../context/GoalModalSearchTitleListContext";
import ActivityTimeline from "../components/ActivityTimeline";
//context
import { ActivitySearchListProvider } from "../context/ActivitySearchListContext";
import { ActivitySearchGroupbyProvider} from "../context/ActivitySearchGroupbyContext";
import { GoalTotalTitleListProvider } from "../context/GoalTotalTitleListContext";
import { useMediaQuery } from "react-responsive";
import useTitle from '../hooks/useTitle';

import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ACTIVITYSEARCHFULLLIST_REQUEST } from '../reducers/activity';


function Time() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type : LOAD_ACTIVITYSEARCHFULLLIST_REQUEST,
    });
  }, [])

  const { activitySearchFullList } = useSelector((state) => state.activity)

  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("시간관리"), 100);

  // 검색조건
  const [writeDate, setWriteDate] = useState(new Date());
  const [ checker, setChecker] = useState(true); //작성일 변경 감지 변수 

  const MinusOneDay = ()=>{
    let chdate = writeDate;
    chdate.setDate(chdate.getDate() -1);
    setWriteDate(chdate)
    setChecker(!checker)
  }

  const PlusOneDay = ()=>{
    let chdate = writeDate;
    chdate.setDate(chdate.getDate() +1);
    setWriteDate(chdate)
    setChecker(!checker)
  }

  // 반응형 화면 BreakPoint
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 740px)",
  });

  const isMiddleScreen = useMediaQuery({
    query: "(max-width: 1040px)",
  });
   
  // LeftNav 접기 State
  const [leftNavFoldState, setLeftNavFoldState] = useState(isMiddleScreen ? true : false);
  // Activity Search TimeLind 접기 State
  const [activeSearchFoldState, setActiveSearchFoldState] = useState(isSmallScreen ? true : false);
  
  return (
    <div className="time">
      <aside className="side">
        {isMiddleScreen ? <div className="left-nav-fold" onClick={()=>{setLeftNavFoldState(!leftNavFoldState)}}>목표 조회/선택 {leftNavFoldState ? <IoIosArrowDown/> : <IoIosArrowUp/> }</div> : null}
        {isMiddleScreen && leftNavFoldState ? null : (<LeftNavigation />)}
      </aside>
      <ActivitySearchGroupbyProvider>
        <section className='time-contents'>
          {isSmallScreen ? <div className="active-search-fold" onClick={()=>{setActiveSearchFoldState(!activeSearchFoldState)}}>액티비티 접기 {activeSearchFoldState ? <IoIosArrowDown/> : <IoIosArrowUp/> } </div> : null}
          {isSmallScreen && activeSearchFoldState ? null : (
          <div className="timeline-search">
            <ActivitySearchTimeline/>
          </div>
          )}
          <div className="timeline">
            {/* <GoalModalSearchTitleListProvider
              writeDate={writeDate}
              checker={checker}> */}
              <div className="date-picker-wrapper">
                <button className="arrow-icon" onClick={MinusOneDay}><IoIosArrowBack/></button>
                <div className="datePicker-wrap">
                  <DatePicker
                  className="date-picker"
                  selected={writeDate}
                  onChange={(date) => {
                    setWriteDate(date);
                  }}
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                /></div>
                <button className="arrow-icon" onClick={PlusOneDay}><IoIosArrowForward/></button>
              </div>
              <ActivityTimeline 
              writeDate={writeDate}
              checker={checker}/>
            {/* </GoalModalSearchTitleListProvider> */}
          </div>
        </section>
      </ActivitySearchGroupbyProvider>
    </div>
  );
}

export default Time;