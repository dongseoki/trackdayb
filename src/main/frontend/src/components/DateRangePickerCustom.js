import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';
import { useDispatch } from 'react-redux';
import { LOAD_GOALSEARCHFULLLIST_REQUEST, LOAD_GOALSEARCHTITLELIST_REQUEST } from "../reducers/goal";

function DateRangePickerCustom() {

  const dispatch = useDispatch();

  // 로컬변수들
  const [searchStartDatetime, setSearchStartDatetime] = useState(new Date());
  const [searchEndDatetime, setSearchEndDatetime] = useState(new Date());

  // 목표조회 조건 update Action
  useEffect(()=> {
    dispatch({
      type : LOAD_GOALSEARCHFULLLIST_REQUEST,
      data : {
        searchStartDatetime : makeYYMMDD(searchStartDatetime),
        searchEndDatetime : makeYYMMDD(searchEndDatetime)
      }
    })
    dispatch({
      type : LOAD_GOALSEARCHTITLELIST_REQUEST,
      data : {
        searchStartDatetime : makeYYMMDD(searchStartDatetime),
        searchEndDatetime : makeYYMMDD(searchEndDatetime)
      }
    })
  }, [searchStartDatetime, searchEndDatetime])

  // YYYY-MM-DD 형태로 반환
  function makeYYMMDD(value){
    // korea utc timezone(zero offset) 설정
    let offset = value.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    let dateOffset = new Date(value.getTime() - offset);
    return dateOffset.toISOString().substring(0,10);
  }


    return (
      <>
      <div className="date-picker-wrapper">
        <DatePicker
          className="date-picker"
          selected={searchStartDatetime}
          onChange={(date) => {
            setSearchStartDatetime(date);
          }}
          selectsStart
          startDate={searchStartDatetime}
          endDate={searchEndDatetime}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
        <div className="date-span">-</div>
        <DatePicker
          className="date-picker"
          selected={searchEndDatetime}
          onChange={(date) => setSearchEndDatetime(date)}
          selectsEnd
          startDate={searchStartDatetime}
          endDate={searchEndDatetime}
          minDate={searchStartDatetime}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
      </div>
      </>
    );
  };


  export default DateRangePickerCustom;