import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale';
import { Controller } from 'react-hook-form';

// function DateRangePickerForm({startDate, endDate, setStartDate, setEndDate}) {
function DateRangePickerForm({initialDate, control, watch}) {
    return (
      <>
      <div className="date-picker-wrapper">
        <Controller
          control={control}
          name="startDatetime"
          defaultValue={initialDate.startDate}
          render={({ field }) => (
            <DatePicker
              {...field}
              className="date-picker"
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
              }}
              selectsStart
              startDate={watch("startDatetime")}
              endDate={watch("endDatetime")}
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
            />
          )}
        />
        <div className="date-span">-</div>
        <Controller
          control={control}
          name="endDatetime"
          defaultValue={initialDate.endDate}
          render={({field}) => (
            <DatePicker
              {...field}
              className="date-picker"
              selected={field.value}
              onChange={(date) => {
                field.onChange(date)} 
              }
              selectsEnd
              startDate={watch("startDatetime")}
              endDate={watch("endDatetime")}
              minDate={watch("startDatetime")}
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
            />
          )}
        />
      </div>
      </>
    );
  };


  export default DateRangePickerForm;