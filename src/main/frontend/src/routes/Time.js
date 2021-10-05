import React, { useState } from "react";
import "./Time.css";
import { LeftNavigation } from '../components/index';
import ActivityInsertForm from "../components/ActivityInsertForm";
//time picker
import TextField from '@material-ui/core/TextField';
//TimeLine
import CustomizedTimeline from '../components/CustomizedTimeline';



function Time() {
  // 검색조건(조회기간)
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());

  const [writeDate, setWriteDate] = useState(makeYYMMDD(new Date()));

  return (
    <div className="time">
      {/* 사이드 */}
      <aside className="side">
        <LeftNavigation 
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          setSearchStartDatetime={setSearchStartDatetime}
          setSearchEndDatetime={setSearchEndDatetime}
          />
      </aside>

      {/* 참조데이터 */}
      <div className="timeline">
        타임라인
        <CustomizedTimeline
          searchStartDatetime={searchStartDatetime}
          searchEndDatetime={searchEndDatetime}
          setSearchStartDatetime={setSearchStartDatetime}
          setSearchEndDatetime={setSearchEndDatetime}
        />
      </div>
      
      {/* 기록 */}
      <div className="write">
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
      </div>
    </div>
  );
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}


export default Time;