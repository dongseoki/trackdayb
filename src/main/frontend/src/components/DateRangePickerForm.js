import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';

function DateRangePickerForm(props) {
    return (
      <>
      <div className="date-picker-wrapper">
        <DatePicker
          className="date-picker"
          selected={props.startDate}
          onChange={(date) => {
            props.setStartDate(date);
          }}
          selectsStart
          startDate={props.startDate}
          endDate={props.endDate}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
        <div className="date-span">-</div>
        <DatePicker
          className="date-picker"
          selected={props.endDate}
          onChange={(date) => props.setEndDate(date)}
          selectsEnd
          startDate={props.startDate}
          endDate={props.endDate}
          minDate={props.startDate}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
      </div>
      </>
    );
  };


  export default DateRangePickerForm;