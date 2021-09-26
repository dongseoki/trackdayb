import React, { useState } from "react"
import "./LeftNavigation.css";


function LeftNavigation(props){
    return (
        <nav className="left-nav">
            <LookupPeriod />
            <GoalList goalList={props.goalList}/>
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
                    {props.goalList && props.goalList.map((goal, index) => (
                        <GoalCards key={index}
                            title={goal.title}></GoalCards>
                    ))}
                </ul>
            </div>
        </div>
    )
}
function GoalCards({title}) {
    return (
        <li><p className="class-2">{title}</p><div className="none-tag"></div></li>
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