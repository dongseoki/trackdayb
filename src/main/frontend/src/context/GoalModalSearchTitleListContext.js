import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../axiosConfig";
export const GoalModalSearchTitleListContext = createContext();
// 입력폼 내부 기간 관련 목표제목리스트
export const GoalModalSearchTitleListProvider = (props) =>{
  const [ goalModalSearchTitleList, setGoalModalSearchTitleList ] = useState([]);
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  
  useEffect(()=>{
      const fetchGoalModalSearchTitleList = async () => {
        try{
          // YYYY-MM-DD 형태로 반환
          function makeYYMMDD(value){
            // korea utc timezone(zero offset) 설정
            let offset = value.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
            let dateOffset = new Date(value.getTime() - offset);
            return dateOffset.toISOString().substring(0,10);
          }
          const result = await axiosInstance.get(
            "/goalManage/goalTitleList",
            {
                params : {
                    searchStartDatetime: props.writeDate ? makeYYMMDD(props.writeDate) : makeYYMMDD(startDatetime), // Time 용 검색조건 & Goal 용 검색조건
                    searchEndDatetime: props.writeDate ? makeYYMMDD(props.writeDate) : makeYYMMDD(endDatetime)
                }
            });
          setGoalModalSearchTitleList(result.data.goalTitleList);
          console.log('result_test', result.data.goalTitleList);
        } catch(err) {
          console.error(err);
        }
      };
      fetchGoalModalSearchTitleList();
    }, [startDatetime, endDatetime, props.writeDate, props.checker])

    return (
        <GoalModalSearchTitleListContext.Provider value={[ goalModalSearchTitleList, setGoalModalSearchTitleList, startDatetime, setStartDatetime,endDatetime, setEndDatetime ]}>
            {props.children}
        </GoalModalSearchTitleListContext.Provider>
    )
}