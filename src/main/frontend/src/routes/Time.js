import React, { useState } from "react";
import "./Time.css";
import { LeftNavigation } from '../components/index';

//time picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';

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
            />
        </aside>
        <ActivitySearchListProvider
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          searchGoalIdList={searchGoalIdList}
        >
          <ActivitySearchGroupbyProvider>
          <div className="timeline">
            <ActivitySearchTimeline/>
          </div>

          <div className="write">
            <GoalModalSearchTitleListProvider
              writeDate={writeDate}>
                            
              <div className="date-picker-wrapper">
                <DatePicker
                  className="date-picker"
                  selected={writeDate}
                  onChange={(date) => {
                    setWriteDate(date);
                  }}
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                />
              </div>
              <ActivityTimeline writeDate={writeDate}/>
            </GoalModalSearchTitleListProvider>
          </div>
          </ActivitySearchGroupbyProvider>
        </ActivitySearchListProvider>
      </GoalSearchTitleListProvider>
    </div>
  );
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}


export default Time;