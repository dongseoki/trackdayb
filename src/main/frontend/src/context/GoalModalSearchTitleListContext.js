import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GoalModalSearchTitleListContext = createContext();

export const GoalModalSearchTitleListProvider = (props) =>{
    const [ goalModalSearchTitleList, setGoalModalSearchTitleList ] = useState([]);
    // const [ updateTotalTitle, setUpdateTotalTitle ] = useState(false);
    const [startDatetime, setStartDatetime] = useState(new Date());
    const [endDatetime, setEndDatetime] = useState(new Date());

    useEffect(()=>{
        const fetchGoalModalSearchTitleList = async () => {
          try{
            const result = await axios.get(
              "/goalManage/goalTitleList",
              {
                  params : {
                      searchStartDatetime:startDatetime,
                      searchEndDatetime:endDatetime
                  }
              });
            setGoalModalSearchTitleList(result.data.goalTitleList);
          } catch(err) {
            console.error(err);
          }
        };
        fetchGoalModalSearchTitleList();
      }, [startDatetime, endDatetime])

    return (
        <GoalModalSearchTitleListContext.Provider value={[ goalModalSearchTitleList, setGoalModalSearchTitleList, startDatetime, setStartDatetime,endDatetime, setEndDatetime ]}>
            {props.children}
        </GoalModalSearchTitleListContext.Provider>
    )
}