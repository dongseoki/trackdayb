import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../axiosConfig";
export const GoalSearchTitleListContext = createContext();

export const GoalSearchTitleListProvider = (props) =>{
    const [ goalSearchTitleList, setGoalSearchTitleList ] = useState([]);
    
    useEffect(()=>{
        const fetchGoalSearchTitleList = async () => {
          try{
            const result = await axiosInstance.get(
              "/goalManage/goalTitleList", {
                params:{
                  searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
                  searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
                  // searchKind:"deadline",
                }
              });
            setGoalSearchTitleList(result.data.goalTitleList);
            
          } catch(err) {
            console.error(err);
          }
        };
        fetchGoalSearchTitleList();
      }, [props.searchStartDatetime, props.searchEndDatetime, props.updateChecker])

    return (
        <GoalSearchTitleListContext.Provider value={[ goalSearchTitleList, setGoalSearchTitleList ]}>
            {props.children}
        </GoalSearchTitleListContext.Provider>
    )
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  // korea utc timezone(zero offset) 설정
  let offset = value.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(value.getTime() - offset);
  return dateOffset.toISOString().substring(0,10);
}