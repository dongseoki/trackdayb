import React, { useReducer, createContext, useEffect } from "react";
import goalReducer from '../reducers/goal';
import axiosInstance from "../axiosConfig";

export const GoalContext = createContext();

export const GoalProvider = (props) => {

  const initialData = {
    loadGoalDataLoading : false,
    goalData : [],
    loadGoalDataError : null        
  };

  const [ state, dispatch ] = useReducer(goalReducer, initialData);

  console.log('state', state)
  
  const fetchGoalList = async () => {
    dispatch({type : "LOAD_GOALDATA_REQUEST"});
    try {
      // if (!props.searchGoalIdList.length){   
      //   setGoalFullList([])
      // }else{
      const result = await axiosInstance.get("/goalManage/goalFullList")
      // const result = await axiosInstance.get("/goalManage/goalFullList", {
      //   params: {
      //     searchStartDatetime:makeYYMMDD(props.searchStartDatetime),
      //     searchEndDatetime:makeYYMMDD(props.searchEndDatetime),
      //     // searchKind:"deadline",
      //     ...(props.orderColumn && { orderColumn: props.orderColumn}), //값이 있을때만 parmas 보냄
      //     ...(props.orderColumn && { orderType: props.orderType}), //값이 있을때만 parmas 보냄
      //     searchGoalIdList:props.searchGoalIdList.toString(),
      //     gatherGoalYn: props.gatherGoalYn===true ? "Y" : "N", //목표 모아보기변수
      //   }
      // });
      console.log('목표 전체 리스트', result.data.goalFullList)
      // setGoalFullList(result.data.goalFullList)
      dispatch({type:'LOAD_GOALDATA_SUCCESS', data: result.data.goalFullList })
    // }
    } catch(err){
      // console.error(err)
      dispatch({type:'LOAD_GOALDATA_FAILURE', err:err})
    }
  }


  useEffect(() => {
    fetchGoalList();
  }, [props.searchStartDatetime, props.searchEndDatetime, props.orderColumn, props.orderType, props.searchGoalIdList, props.gatherGoalYn, props.updateChecker]);

  // YYYY-MM-DD 형태로 반환
  function makeYYMMDD(value){
    // korea utc timezone(zero offset) 설정
    let offset = value.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    let dateOffset = new Date(value.getTime() - offset);
    return dateOffset.toISOString().substring(0,10);
  }

  return (
    <GoalContext.Provider value={{ state, dispatch}}>
      {props.children}
    </GoalContext.Provider>
  )
}

