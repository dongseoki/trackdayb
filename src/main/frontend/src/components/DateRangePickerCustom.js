import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';

function DateRangePickerCustom(props) {
    
    return (
      <>
        <DatePicker
          selected={props.searchStartDatetime}
          onChange={(date) => props.setSearchStartDatetime(date)}
          selectsStart
          startDate={props.searchStartDatetime}
          endDate={props.searchEndDatetime}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
        <DatePicker
          selected={props.searchEndDatetime}
          onChange={(date) => props.setSearchEndDatetime(date)}
          selectsEnd
          startDate={props.searchStartDatetime}
          endDate={props.searchEndDatetime}
          minDate={props.searchStartDatetime}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
      </>
    );
  };


  export default DateRangePickerCustom;