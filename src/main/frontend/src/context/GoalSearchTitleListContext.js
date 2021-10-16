import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GoalSearchTitleListContext = createContext();

export const GoalSearchTitleListProvider = (props) =>{
    const [ goalSearchTitleList, setGoalSearchTitleList ] = useState([]);
    
    useEffect(()=>{
        const fetchGoalSearchTitleList = async () => {
          try{
            const result = await axios.get(
              "/goalManage/goalTitleList", {
                params:{
                  searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
                  searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
                  // searchKind:"deadline",
                }
              });
            setGoalSearchTitleList(result.data.goalTitleList);
            // console.log("Context : 목표타이틀 조건검색", result.data.goalTitleList)
          } catch(err) {
            console.error(err);
          }
        };
        fetchGoalSearchTitleList();
      }, [props.searchStartDatetime, props.searchEndDatetime])

    return (
        <GoalSearchTitleListContext.Provider value={[ goalSearchTitleList, setGoalSearchTitleList ]}>
            {props.children}
        </GoalSearchTitleListContext.Provider>
    )
}

// YYYY-MM-DD 형태로 반환
function makeYYMMDD(value){
  return value.toISOString().substring(0,10);
}