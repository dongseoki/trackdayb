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
import ActivityTimeline from "../components/ActivityTimeline";
//context
import { ActivitySearchGroupbyProvider} from "../context/ActivitySearchGroupbyContext";
import { useMediaQuery } from "react-responsive";
import useTitle from '../hooks/useTitle';

import { useDispatch } from 'react-redux';
import { LOAD_ACTIVITYSEARCHFULLLIST_REQUEST,
        LOAD_ACTIVITYDAYLIST_REQUEST } from '../reducers/activity';
import {LOAD_GOALSEARCHTITLELIST_REQUEST,
        LOAD_GOALMODALTITLELIST_REQUEST } from "../reducers/goal";

import dayjs from 'dayjs';


function Time() {
  const dispatch = useDispatch();

  // 로컬변수들
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  const [otherIncludedYn, setOtherIncludedYn ] = useState(true); //시간관리 기타포함
  const [ searchGoalIdList, setSearchGoalIdList ] = useState([]);
  // 검색조건
  const [ writeDate, setWriteDate] = useState(new Date());  

  // 목표조회 조건 update Action
  useEffect(()=> {
    dispatch({
      type : LOAD_GOALSEARCHTITLELIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(searchStartDatetime).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(searchEndDatetime).format("YYYY-MM-DD"),
      }
    })
  }, [searchStartDatetime, searchEndDatetime])
  
  // 활동 조회 조건
  useEffect(()=> {
    dispatch({
      type : LOAD_ACTIVITYSEARCHFULLLIST_REQUEST,
      data : {
          searchStartDatetime : dayjs(searchStartDatetime).format("YYYY-MM-DD"),
          searchEndDatetime : dayjs(searchEndDatetime).format("YYYY-MM-DD"),
          otherIncludedYn : otherIncludedYn? 'Y' : 'N',
          searchGoalIdList : searchGoalIdList.toString()
          }
    });
  }, [searchStartDatetime, searchEndDatetime, otherIncludedYn, searchGoalIdList])

  // 오늘의 활동 타임라인
  useEffect(() => {
    dispatch({
      type : LOAD_ACTIVITYDAYLIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(writeDate).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(writeDate).format("YYYY-MM-DD"),
      }
    });
    // 작성일 변경시 내부 모달 목표 타이틀 리스트 업데이트
    dispatch({
      type : LOAD_GOALMODALTITLELIST_REQUEST,
      data : {
        searchStartDatetime : dayjs(writeDate).format("YYYY-MM-DD"),
        searchEndDatetime : dayjs(writeDate).format("YYYY-MM-DD"),
      }
    });
  },[writeDate])

  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("시간관리"), 100);

  
  const MinusOneDay = ()=>{
    let chDate = dayjs(writeDate).subtract(1, 'day').toDate()
    setWriteDate(chDate)
  }

  const PlusOneDay = ()=>{
    let chDate = dayjs(writeDate).add(1, 'day').toDate()
    setWriteDate(chDate)
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
        {isMiddleScreen && leftNavFoldState ? null : 
        (<LeftNavigation 
          searchStartDatetime = {searchStartDatetime}
          setSearchStartDatetime = {setSearchStartDatetime}
          searchEndDatetime = {searchEndDatetime}
          setSearchEndDatetime = {setSearchEndDatetime}
          otherIncludedYn = {otherIncludedYn}
          setOtherIncludedYn = {setOtherIncludedYn}
          searchGoalIdList = {searchGoalIdList}
          setSearchGoalIdList = {setSearchGoalIdList}
        />)}
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
              />
            {/* </GoalModalSearchTitleListProvider> */}
          </div>
        </section>
      </ActivitySearchGroupbyProvider>
    </div>
  );
}

export default Time;