import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';

function DateRangePickerCustom(props) {
    
    return (
      <>
        <DatePicker
          selected={props.startDate}
          onChange={(date) => props.setStartDate(date)}
          selectsStart
          startDate={props.startDate}
          endDate={props.endDate}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
        <DatePicker
          selected={props.endDate}
          onChange={(date) => props.setEndDate(date)}
          selectsEnd
          startDate={props.startDate}
          endDate={props.endDate}
          minDate={props.startDate}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
      </>
    );
  };


  export default DateRangePickerCustom;