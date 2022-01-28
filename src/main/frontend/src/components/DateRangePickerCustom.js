import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';
function DateRangePickerCustom({startDate, endDate, setStartDate, setEndDate}) {
    return (
      <>
      <div className="date-picker-wrapper">
        <DatePicker
          className="date-picker"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
        <div className="date-span">-</div>
        <DatePicker
          className="date-picker"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
        />
      </div>
      </>
    );
  };


  export default DateRangePickerCustom;