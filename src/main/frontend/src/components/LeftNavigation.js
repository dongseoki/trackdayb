import React, { useState } from "react"
import "./LeftNavigation.css";


function LeftNavigation(){
    return (
        <nav className="left-nav">
            <LookupPeriod />
            <GoalList />
            <Search />
            
        </nav>
    )
}

function LookupPeriod(props){
    return (
      <div>
          <p>조회기간</p>
      </div>
    )
  }


function GoalList(props){
    return (
        <div>
            <p>목표선택</p>
            <ul>
                <li>주 1회 에세이 쓰기</li>
                <li>책 읽기</li>
                <li>운동하기</li>
                <li>달리기 30분</li>
            </ul>
        </div>
    )
}

function Search(props){
    return(
        <div>
            <p>검색</p>
            <input type="text" />
        </div>
    )
}



export default LeftNavigation;