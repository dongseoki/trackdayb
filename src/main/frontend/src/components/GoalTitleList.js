import React, { useEffect, useState } from "react"
import Checkbox from '@mui/material/Checkbox';
import "./GoalTitleList.css"
//Tree 
import Tree from '@naisutech/react-tree'
//icon
import { RiArrowDropDownLine } from "react-icons/ri";

import { useDispatch } from 'react-redux';
import { LOAD_GOALSEARCHFULLLIST_REQUEST } from "../reducers/goal";
import { LOAD_ACTIVITYSEARCHFULLLIST_REQUEST } from "../reducers/activity";

//checkbox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function GoalTitleList({goalTitleList, searchGoalIdList, setSearchGoalIdList}) {
  const dispatch = useDispatch();
  // 조건 로컬 변수
  // const [ searchGoalIdList, setSearchGoalIdList ] = useState([]);
  
  // 목표조회&활동조회 조건 update Action
  // useEffect(()=> {
  //   dispatch({
  //     type : LOAD_GOALSEARCHFULLLIST_REQUEST,
  //     data : {
  //       searchGoalIdList : searchGoalIdList.toString()
  //     }
  //   })
  //   dispatch({
  //     type : LOAD_ACTIVITYSEARCHFULLLIST_REQUEST,
  //     data : {
  //       searchGoalIdList : searchGoalIdList.toString()
  //     }
  //   })
  // }, [searchGoalIdList])

  // TreeNode를 위한 goalIdList
  const [goalIdList, setGoalIdList] = useState([])
  useEffect(()=>{
    let tempGoalIdList = [];
    goalTitleList.forEach((goal) =>{
        tempGoalIdList.push(parseInt(goal.goalId))
    })
    setGoalIdList(tempGoalIdList)
  }, [goalTitleList]);
  
  let nodes = []
  goalTitleList.forEach((goal, index)=>{
      const goalObj = {};
      goalObj.label = goal.title
      goalObj.id = parseInt(goal.goalId)
      goalObj.dropdown=false
      if(goal.parentId){
        if(goalIdList.includes(parseInt(goal.parentId))){ //부모아이디가 검색결과 리스트에 있음
          goalObj.parentId = parseInt(goal.parentId)
        }else{
          goalObj.parentId = null
        }
      }else{
          goalObj.parentId = null
      }
      goalTitleList.forEach((goal2)=>{
        if(goal.goalId === goal2.parentId){
          goalObj.dropdown = true
        }
      })
      goalObj.color = goal.color
      goalObj.topGoalColor = goal.topGoalColor // 부모 컬러 기준
      goalObj.index = index
      nodes.push(goalObj)
  })

  // 체크박스 연동 searchGoalIdList 만들기
  useEffect(()=>{
    let tempGoalIdList = [];
    goalTitleList.forEach((goal) =>{
        tempGoalIdList.push(parseInt(goal.goalId))
    })
    setSearchGoalIdList(tempGoalIdList)
  }, [goalTitleList]);
  
  const myThemes = {
      modifiedDarkLarge: {
        text: 'black', // text color
        bg: 'white', // background color of whole tree
      }
    }

 const checkHandler = (e, checked, id)=>{
  e.stopPropagation() //이벤트 버블링 막기
  if (checked) {
    setSearchGoalIdList([...searchGoalIdList, id]);
  } else {
    // 체크 해제
    setSearchGoalIdList(searchGoalIdList.filter((el) => el !== id));
  }
 }
 const AllcheckHandler = (e, checked) =>{
   e.stopPropagation() //이벤트 버블링 막기
   if(checked){
     let tempGoalIdList = [];
    goalTitleList.forEach((goal) =>{
        tempGoalIdList.push(parseInt(goal.goalId))
    })
    setSearchGoalIdList(tempGoalIdList)
   }else{
    setSearchGoalIdList([]);
   }
 }
  return (
    <div>

      <div className="total-check-wrapper">
        <div className="checkbox-wrapper" onClick={(e) => {AllcheckHandler(e, e.target.checked)}}> 
          <Checkbox {...label} 
          checked={searchGoalIdList.length === goalTitleList.length ? true : false}
          />
        </div>
        <div className="total-check">전체체크</div>
      </div>

      <div className="goal-list">
        <Tree
        nodes={nodes} 
        theme="modifiedDarkLarge"
        customTheme={myThemes}
        noDataString="조회기간에 해당하는 목표가 없습니다."
        animations={true}
        NodeRenderer={({ data, isOpen, level, selected }) => {
          const classes = ['custom-node', isOpen ? 'open' : undefined, selected ? 'selected' : undefined].join(' ')
          return (
            <div className="goal-title-wrapper">
              <div className="checkbox-wrapper" style={{paddingLeft: `calc(${level* 10}px)`}} onClick={(e) => {checkHandler(e, e.target.checked, data.id)}}> 
                <Checkbox {...label} 
                checked={searchGoalIdList.includes(data.id) ? true : false}
                value={data.id}/>
              </div>
              <div className={classes} style={{ width: '100%', ['--icon-pos']: `calc(2px + ${level * 25}px)`,backgroundColor : hexToRgba(data.topGoalColor)}}>
                <div className="goal-title" style={{width:`calc(180px - ${level * 10}px)` }}>{data.label}</div>
                <div className="color-tag" style={{ backgroundColor : data.topGoalColor}}>
                  {data.dropdown ? <RiArrowDropDownLine className="arrow-icon"/> : null}
                </div>
              </div>
            </div>
          )
        }}
        >
        </Tree>
      </div>
    </div>
  )
}

// hex to rgba
function hexToRgba ( hexType ){ 
  if(!hexType){
    return "rgba(130,143,146, 0.08)"; //topGoalColor가 없는 경우(회색표시)
  }else{
  /* 맨 앞의 "#" 기호를 삭제하기. */ 
  var hex = hexType.trim().replace( "#", "" ); 
  
  /* rgb로 각각 분리해서 배열에 담기. */ 
  var rgb = ( 3 === hex.length ) ? 
  hex.match( /[a-f\d]/gi ) : hex.match( /[a-f\d]{2}/gi );     
  
  rgb.forEach(function (str, x, arr){     
      /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */ 
      if ( str.length === 1 ) str = str + str; 
      
      /* 10진수로 변환하기. */ 
      arr[ x ] = parseInt( str, 16 ); 
  }); 
  
  return "rgba(" + rgb.join(", ") + ", 0.1)"; 
  }
} 


export default GoalTitleList;