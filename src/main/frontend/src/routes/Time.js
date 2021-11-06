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

//TimeLine
import ActivitySearchTimeline from '../components/ActivitySearchTimeline';
import { GoalSearchTitleListProvider } from "../context/GoalSearchTitleListContext";
import { GoalModalSearchTitleListProvider} from "../context/GoalModalSearchTitleListContext";
import ActivityTimeline from "../components/ActivityTimeline";
//context
import { ActivitySearchListProvider } from "../context/ActivitySearchListContext";
import { ActivitySearchGroupbyProvider} from "../context/ActivitySearchGroupbyContext";

function Time() {
  // 검색조건
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  const [searchGoalIdList, setSearchGoalIdList] = useState([]);
  const [writeDate, setWriteDate] = useState(new Date());
  const [otherIncludedYn, setOtherIncludedYn ] = useState(true); //시간관리 기타포함
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

  return (
    <div className="time">
      <GoalSearchTitleListProvider
        searchStartDatetime={searchStartDatetime}
        searchEndDatetime={searchEndDatetime}>
        <aside className="side">
          <LeftNavigation 
            searchStartDatetime={searchStartDatetime}
            searchEndDatetime={searchEndDatetime}
            setSearchStartDatetime={setSearchStartDatetime}
            setSearchEndDatetime={setSearchEndDatetime}
            searchGoalIdList={searchGoalIdList}
            setSearchGoalIdList={setSearchGoalIdList}
            otherIncludedYn={otherIncludedYn}
            setOtherIncludedYn={setOtherIncludedYn}
            />
        </aside>
        <ActivitySearchListProvider
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          searchGoalIdList={searchGoalIdList}
          otherIncludedYn={otherIncludedYn}
        >
          <ActivitySearchGroupbyProvider>
          <div className="timeline-search">
            <ActivitySearchTimeline/>
          </div>

          <div className="timeline">
            <GoalModalSearchTitleListProvider
              writeDate={writeDate}>
                            
              <div className="date-picker-wrapper">
                <button onClick={MinusOneDay}><IoIosArrowBack/></button>
                <DatePicker
                  className="date-picker"
                  selected={writeDate}
                  onChange={(date) => {
                    setWriteDate(date);
                  }}
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                />
                <button onClick={PlusOneDay}><IoIosArrowForward/></button>
              </div>
              <ActivityTimeline 
              writeDate={writeDate}
              checker={checker}/>
            </GoalModalSearchTitleListProvider>
          </div>
          </ActivitySearchGroupbyProvider>
        </ActivitySearchListProvider>
      </GoalSearchTitleListProvider>
    </div>
  );
}

export default Time;