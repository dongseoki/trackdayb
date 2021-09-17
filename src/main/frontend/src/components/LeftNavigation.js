import React, { useState } from "react"
import "./LeftNavigation.css";


function LeftNavigation(){
    return (
        <nav className="left-nav">
            <LookupPeriod />
            <GoalList />
            <SearchButton />
        </nav>
    )
}

function LookupPeriod(props){
    return (
      <div>
          <p>조회기간</p>
          <input type="date"></input>
      </div>
    )
  }


function GoalList(props){
    return (
        <div>
            <p>목표선택</p>
            <div className="goal-list">
                <ul>
                    <li><p className="class-1">주 1회 에세이 쓰기</p><div className="color-tag"></div></li>
                    <li><p className="class-2">주 1회 에세이 쓰기</p><div className="none-tag"></div></li>
                    <li><p className="class-2">주 1회 에세이 쓰기</p><div className="none-tag"></div></li>
                    <li><p className="class-1">주 1회 에세이 쓰기</p><div className="color-tag"></div></li>
                    <li><p className="class-2">주 1회 에세이 쓰기</p><div className="none-tag"></div></li>
                </ul>
            </div>
        </div>
    )
}

function SearchButton(props){
    return (
        <div>
            <button>검색</button>
        </div>
    )
}

export default LeftNavigation;