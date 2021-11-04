import React, { useState } from "react";
import "./Time.css";
import { LeftNavigation } from '../components/index';
import ActivityInsertForm from "../components/ActivityInsertForm";
//time picker
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';

//TimeLine
import CustomizedTimeline from '../components/CustomizedTimeline';
import { GoalSearchTitleListProvider } from "../context/GoalSearchTitleListContext";
import { GoalModalSearchTitleListProvider} from "../context/GoalModalSearchTitleListContext";

function Time() {
  // 검색조건(조회기간)
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
        <div className="timeline">
          <CustomizedTimeline
            searchStartDatetime={searchStartDatetime}
            searchEndDatetime={searchEndDatetime}
            setSearchStartDatetime={setSearchStartDatetime}
            setSearchEndDatetime={setSearchEndDatetime}
          />
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

            <div className="cards"></div>

            <div className="writeForm">
              <ActivityInsertForm writeDate={writeDate}/>
            </div>

          </GoalModalSearchTitleListProvider>
        </div>
      </GoalSearchTitleListProvider>
    </div>
  );
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}


export default Time;