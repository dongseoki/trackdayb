// 시간관리탭 참조 데이터용 활동리스트 날짜로 그룹바이 만들기(오브젝트)
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivitySearchListContext } from "./ActivitySearchListContext";
import { useSelector } from "react-redux";

export const ActivitySearchGroupbyContext = createContext();

export const ActivitySearchGroupbyProvider = (props) =>{
    // const [ activitySearchList,  ] = useContext(ActivitySearchListContext)
    
    const { activitySearchFullList } = useSelector((state) => state.activity)

    const [ activitySearchGroupby, setActivitySearchGroupby ] = useState({});

    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
 
    useEffect(()=>{
        const fetchActivitySearchGroupby = () => {
            let tmpActivityList = activitySearchFullList;
            tmpActivityList.forEach((activity, index)=>{
                activity['writeDate'] = activity['startDatetime'].substring(0, 10)
            })
            // writeDate 기준 그룹바이 
            tmpActivityList = groupBy(tmpActivityList, 'writeDate')
            // 그룹바이 데이터 (실제 랜더링할 때 사용)
            setActivitySearchGroupby(tmpActivityList)
        }
        fetchActivitySearchGroupby();
      }, [activitySearchFullList])

    return (
        <ActivitySearchGroupbyContext.Provider value={[ activitySearchGroupby, setActivitySearchGroupby ]}>
            {props.children}
        </ActivitySearchGroupbyContext.Provider>
    )
}