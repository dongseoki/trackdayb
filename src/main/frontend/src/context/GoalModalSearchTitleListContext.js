import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../axiosConfig";
import dayjs from "dayjs";
export const GoalModalSearchTitleListContext = createContext();
// 입력폼 내부 기간 관련 목표제목리스트
export const GoalModalSearchTitleListProvider = (props) =>{
  const [ goalModalSearchTitleList, setGoalModalSearchTitleList ] = useState([]);
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  
  useEffect(()=>{
      const fetchGoalModalSearchTitleList = async () => {
        try{
          const result = await axiosInstance.get(
            "/goalManage/goalTitleList",
            {
                params : {
                    searchStartDatetime: props.writeDate ? dayjs(props.writeDate).format("YYYY-MM-DD") : dayjs(startDatetime).format("YYYY-MM-DD"), // Time 용 검색조건 & Goal 용 검색조건
                    searchEndDatetime: props.writeDate ? dayjs(props.writeDate).format("YYYY-MM-DD") : dayjs(endDatetime).format("YYYY-MM-DD")
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