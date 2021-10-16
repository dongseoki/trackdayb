import React, { useEffect, useState } from "react"
import Checkbox from '@mui/material/Checkbox';
import "./GoalTitleList.css"
//Tree 
import Tree from '@naisutech/react-tree'
//icon
import { RiArrowDropDownLine } from "react-icons/ri";
//checkbox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function GoalTitleList({goalTitleList, searchGoalIdList, setSearchGoalIdList}) {
  console.log("goalTitleList", goalTitleList)
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
      const goalObj = new Object();
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
          console.log("goal1", goal.goalId)
          goalObj.dropdown = true
        }
      })
      goalObj.color = goal.color
      goalObj.index = index
      nodes.push(goalObj)
  })
  console.log('node', nodes)

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
  return (
    <div>
      <p>목표선택</p>
      <div className="goal-list">
        <Tree
        nodes={nodes} 
        theme="modifiedDarkLarge"
        customTheme={myThemes}
        noDataString="조회기간에 해당하는 목표가 없습니다."
        NodeRenderer={({ data, isOpen, level, selected }) => {
          const classes = ['custom-node', isOpen ? 'open' : undefined, selected ? 'selected' : undefined].join(' ')
          return (
            <div className="goal-title-wrapper">
              <div className="checkbox-wrapper" onClick={(e) => {checkHandler(e, e.target.checked, data.id)}}> 
                <Checkbox {...label} 
                checked={searchGoalIdList.includes(data.id) ? true : false}
                value={data.id}/>
              </div>
              <div className={classes} style={{ width: '100%', ['--icon-pos']: `calc(2px + ${level * 25}px)`,backgroundColor : hexToRgba(data.color)}}>
                <div className="goal-title" style={{paddingLeft: `calc(10px + ${level * 10}px)`}}>{data.label}</div>
                <div className="color-tag" style={{ backgroundColor : data.color}}>
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
    return "rgba(130,143,146, 0.08)";
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