import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
export const GoalModalSearchTitleListContext = createContext();

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
                    searchStartDatetime: props.writeDate ? props.writeDate : startDatetime, // Time 용 검색조건 & Goal 용 검색조건
                    searchEndDatetime: props.writeDate ? props.writeDate : endDatetime
                }
            });
          setGoalModalSearchTitleList(result.data.goalTitleList);
        } catch(err) {
          console.error(err);
        }
      };
      fetchGoalModalSearchTitleList();
    }, [startDatetime, endDatetime, props.writeDate])

    return (
        <GoalModalSearchTitleListContext.Provider value={[ goalModalSearchTitleList, setGoalModalSearchTitleList, startDatetime, setStartDatetime,endDatetime, setEndDatetime ]}>
            {props.children}
        </GoalModalSearchTitleListContext.Provider>
    )
}