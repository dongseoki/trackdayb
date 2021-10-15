import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GoalTotalTitleListContext = createContext();

export const GoalTotalTitleListProvider = (props) =>{
    const [ goalTotalTitleList, setGoalTotalTitleList ] = useState([]);
    
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
      }, [])

    return (
        <GoalTotalTitleListContext.Provider value={[ goalTotalTitleList, setGoalTotalTitleList ]}>
            {props.children}
        </GoalTotalTitleListContext.Provider>
    )
}