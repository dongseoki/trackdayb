import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../axiosConfig";
import dayjs from "dayjs";
export const GoalSearchTitleListContext = createContext();

export const GoalSearchTitleListProvider = (props) =>{
    const [ goalSearchTitleList, setGoalSearchTitleList ] = useState([]);
    
    useEffect(()=>{
        const fetchGoalSearchTitleList = async () => {
          try{
            const result = await axiosInstance.get(
              "/goalManage/goalTitleList", {
                params:{
                  searchStartDatetime:dayjs(props.searchStartDatetime).format("YYYY-MM-DD"),
                  searchEndDatetime:dayjs(props.searchEndDatetime).format("YYYY-MM-DD"),
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