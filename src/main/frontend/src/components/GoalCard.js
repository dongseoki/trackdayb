import React from 'react';

import { BiLock } from "react-icons/bi";

import GoalModifyFormModal from "./GoalModifyFormModal";

import GoalDeleteModal from "./GoalDeleteModal";

function GoalCard({ index, goalTitlePath, title, startDatetime, endDatetime, content, goalId, kind, progressRate, color, topGoalColor, shareStatus, periodicityInfo, goalSearchTitleList, setGoalSearchTitleList, goalSearchFullList, setGoalFullList, updateTotalTitle, setUpdateTotalTitle, orderColumn, orderType}){
    let goalTitlePathList = goalTitlePath.split("/")
    goalTitlePathList.pop()
    return(
          //color&topGoalColor 모두 없으면 css에 고정값 (회색 사용)
          <div className="card" style={{ borderLeft : `7px solid`, borderColor : topGoalColor}} id={goalId} > 
            <div className="card-button-wrapper">
              {(shareStatus==="N") ? (<BiLock className="lock-icon" title="비공개"/>) : null}
              <GoalModifyFormModal 
                modifyData = {goalSearchFullList[index]}
                targetIndex={index}
                goalId={goalId}
              />
              <GoalDeleteModal goalId={goalId}/>
            </div>
            <div className="path-tag-wrapper">
              {goalTitlePathList.length>0 ? goalTitlePathList.map((goal, index) => (
                <>
                  <span className="path-tag" title={goal}>{goal.substring(0,2)}...</span><span>/</span>              
                </>
              )): <span></span> }
            </div>
  
            <div className="title">{title}</div>
            <div className="content">{content}</div>
            <div className="datetime">{startDatetime.substring(0,10)} ~ {endDatetime.substring(0,10)}</div>
            <div>{(kind==="regular") ? (<><span className="tag">주기성</span> <PeriodicityInfo periodicityInfo ={periodicityInfo} /></>) : (<span className="tag">기한성</span>)}</div>
            <div className="progressRate">{progressRate ? progressRate : 0}%</div>
          </div>
      )
  }

  
function PeriodicityInfo({periodicityInfo}){
    const timeUnitToString = (value)=>{
      if(value === "D"){
        return "매일"
      }else if(value === "W"){
        return "매주"
      }else if(value === "M"){
        return "매월"
      }else{
        return null
      }
    }
    return (
      <>
      <span className="tag">{timeUnitToString(periodicityInfo.timeUnit)}</span>
      {periodicityInfo.count ? <span className="tag">{periodicityInfo.count}회</span> : null}
      {(periodicityInfo.sunYn === "Y") ? <span className="tag">일</span>: null}
      {(periodicityInfo.monYn === "Y") ? <span className="tag">월</span>: null}
      {(periodicityInfo.tueYn === "Y") ? <span className="tag">화</span>: null}
      {(periodicityInfo.wedsYn === "Y") ? <span className="tag">수</span>: null}
      {(periodicityInfo.thurYn === "Y") ? <span className="tag">목</span>: null}
      {(periodicityInfo.friYn === "Y") ? <span className="tag">금</span>: null}
      {(periodicityInfo.satYn === "Y") ? <span className="tag">토</span>: null}
      </>
    )
  }
export default GoalCard;
  