import React, { useState } from "react";
import "./Time.css";
import { LeftNavigation } from '../components/index';
import ActivityInsertForm from "../components/ActivityInsertForm";
//time picker
import TextField from '@material-ui/core/TextField';
//TimeLine
import CustomizedTimeline from '../components/CustomizedTimeline';
import { GoalSearchTitleListProvider } from "../context/GoalSearchTitleListContext";
import { GoalModalSearchTitleListProvider} from "../context/GoalModalSearchTitleListContext";

function Time() {
  // 검색조건(조회기간)
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());
  const [searchGoalIdList, setSearchGoalIdList] = useState([]);
  const [writeDate, setWriteDate] = useState(makeYYMMDD(new Date()));

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
            <div className="button-wrapper">
              <button>import</button>
              <button>export</button>
              <button>도움말</button>
              <button>양식다운로드</button>
            </div>
            <div className="date-picker-wrapper">
              <TextField
                className="date-picker"
                id="date"
                label="작성일"
                type="date"
                defaultValue={writeDate}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={function(e){
                  setWriteDate(e.target.value)
                }}
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