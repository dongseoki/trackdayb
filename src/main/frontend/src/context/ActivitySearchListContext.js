// 시간관리탭 참조 데이터용 활동 리스트 검색결과
import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../axiosConfig";
export const ActivitySearchListContext = createContext();

export const ActivitySearchListProvider = (props) =>{
    const [ activitySearchList, setActivitySearchList ] = useState([]);

    useEffect(()=>{
        const fetchActivitySearchList = async () => {
            try {
                // YYYY-MM-DD 형태로 반환
                function makeYYMMDD(value){
                    return value.toISOString().substring(0,10);
                }
                if(!props.searchGoalIdList.length){
                    setActivitySearchList([])
                } else{
                    const result = await axiosInstance.get("/timeManage/activityList", {
                        params:{
                            searchStartDatetime :makeYYMMDD(props.searchStartDatetime),
                            searchEndDatetime : makeYYMMDD(props.searchEndDatetime),
                            orderColumn: "start_datetime",
                            orderType: "asc",
                            searchGoalIdList: props.searchGoalIdList.toString(),
                            otherIncludedYn: props.otherIncludedYn ? 'Y' : 'N'
                        },
                    });
                    // 리스트에 세팅하기(원본)
                    setActivitySearchList(result.data.activityList);
                }
            } catch(err){
                console.error(err)
            }
        }
        fetchActivitySearchList();
      }, [props.searchStartDatetime, props.searchEndDatetime, props.searchGoalIdList, props.otherIncludedYn])

    return (
        <ActivitySearchListContext.Provider value={[ activitySearchList, setActivitySearchList ]}>
            {props.children}
        </ActivitySearchListContext.Provider>
    )
}