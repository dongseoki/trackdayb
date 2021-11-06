import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosConfig";
export const GoalTotalTitleListContext = createContext();

export const GoalTotalTitleListProvider = (props) =>{
    const [ goalTotalTitleList, setGoalTotalTitleList ] = useState([]);
    const [ updateTotalTitle, setUpdateTotalTitle ] = useState(false);
    
    useEffect(()=>{
        const fetchGoalTotalTitleList = async () => {
          try{
            const result = await axios.get(
              "/goalManage/goalTitleList");
            setGoalTotalTitleList(result.data.goalTitleList);
          } catch(err) {
            console.error(err);
          }
        };
        fetchGoalTotalTitleList();
      }, [updateTotalTitle])

    return (
        <GoalTotalTitleListContext.Provider value={[ goalTotalTitleList, setGoalTotalTitleList, updateTotalTitle, setUpdateTotalTitle ]}>
            {props.children}
        </GoalTotalTitleListContext.Provider>
    )
}