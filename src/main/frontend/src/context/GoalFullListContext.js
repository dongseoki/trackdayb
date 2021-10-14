import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const GoalFullListContext = createContext();

export const GoalFullListProvider = (props) => {
    const [ goalFullList, setGoalFullList ] = useState([]);
    useEffect(() => {
        const fetchGoalFullList = async () => {
          try {
            const result = await axios.get("/goalManage/goalFullList", {
              params: {
                searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
                searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
                // searchKind:"deadline",
                orderColumn: props.orderColumn,
                orderType:"asc",
                searchGoalIdList:props.searchGoalIdList.toString(),
              }
            });
            setGoalFullList(result.data.goalFullList)
            console.log("GoalFullList",result.data.goalFullList )
          } catch(err){
            console.error(err)
          }
        }
        fetchGoalFullList();
    }, [props.searchStartDatetime, props.searchEndDatetime, props.orderColumn, props.searchGoalIdList]);

    // YYYY-MM-DD 형태로 반환
    function makeYYMMDD(value){
        return value.toISOString().substring(0,10);
    }

    return (
        <GoalFullListContext.Provider value={[ goalFullList, setGoalFullList ]}>
            {props.children}
        </GoalFullListContext.Provider>
    )
}
