// import axios from "axios";
import axiosInstance from "../axiosConfig";
import React, { createContext, useEffect, useState } from "react";

export const GoalFullListContext = createContext();

export const GoalFullListProvider = (props) => {
    const [ goalFullList, setGoalFullList ] = useState([]);
    useEffect(() => {
        const fetchGoalFullList = async () => {
          try {
            if (!props.searchGoalIdList.length){
              setGoalFullList([])
            }else{
            const result = await axiosInstance.get("/goalManage/goalFullList", {
              params: {
                searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
                searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
                // searchKind:"deadline",
                orderColumn: props.orderColumn,
                orderType: props.orderType,
                searchGoalIdList:props.searchGoalIdList.toString(),
                gatherGoalYn: props.gatherGoalYn===true ? "Y" : "N", //목표 모아보기변수
              }
            });
            console.log('목표 전체 리스트', result.data.goalFullList)
            setGoalFullList(result.data.goalFullList)
          }
          } catch(err){
            console.error(err)
          }
        }
        fetchGoalFullList();
    }, [props.searchStartDatetime, props.searchEndDatetime, props.orderColumn, props.orderType, props.searchGoalIdList, props.gatherGoalYn, props.updateChecker]);

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
